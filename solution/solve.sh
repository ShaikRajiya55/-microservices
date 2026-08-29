#!/usr/bin/env bash
set -euo pipefail

echo "==> Starting Oracle Reference Solution Setup..."

# 1. Ensure Redis Server is running
if ! pgrep -x "redis-server" > /dev/null; then
    echo "==> Launching redis-server daemon..."
    redis-server --daemonize yes || service redis-server start || true
fi

# Ensure data directory and data files exist
mkdir -p /app/data
if [ -d "/app/environment/data" ]; then
    cp -rn /app/environment/data/* /app/data/ 2>/dev/null || true
fi
if [ ! -f "/app/data/design_db.sqlite" ] || [ ! -f "/app/data/picorv32-v1.0.tar.gz" ]; then
    if [ -f "/app/environment/data/setup_environment.py" ]; then
        python3 /app/environment/data/setup_environment.py || true
        cp -rn /app/environment/data/* /app/data/ 2>/dev/null || true
    fi
fi

# 2. Write /app/main.py (FastAPI Application with Verilog Parameter Math Evaluator)
cat << 'EOF' > /app/main.py
import hashlib
import json
import os
import re
import sqlite3
import tarfile
from typing import Dict, Any, List, Optional, Set

from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
import redis

app = FastAPI(title="RTL Port Contract Reconciliation Service")

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))


def resolve_sqlite_path() -> str:
    env_p = os.getenv("SQLITE_DB_PATH")
    if env_p and os.path.exists(env_p):
        return env_p
    for p in [
        "/app/data/design_db.sqlite",
        "/app/environment/data/design_db.sqlite",
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "environment", "data", "design_db.sqlite"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "design_db.sqlite"),
    ]:
        if os.path.exists(p):
            return p
    return "/app/data/design_db.sqlite"


def resolve_tarball_path() -> str:
    env_p = os.getenv("PICORV32_TARBALL_PATH")
    if env_p and os.path.exists(env_p):
        return env_p
    for p in [
        "/app/data/picorv32-v1.0.tar.gz",
        "/app/environment/data/picorv32-v1.0.tar.gz",
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "environment", "data", "picorv32-v1.0.tar.gz"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "picorv32-v1.0.tar.gz"),
    ]:
        if os.path.exists(p):
            return p
    return "/app/data/picorv32-v1.0.tar.gz"


def get_redis_client():
    return redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0, decode_responses=True)


def eval_param_expr(expr_str: str, params: Dict[str, int]) -> int:
    clean_expr = expr_str.strip()
    if not clean_expr:
        return 0
    for param_name, param_val in params.items():
        clean_expr = re.sub(rf'\b{param_name}\b', str(param_val), clean_expr)
    try:
        clean_expr = re.sub(r'[^0-9\+\-\*\/\(\)\s]', '', clean_expr)
        if clean_expr.strip():
            return int(eval(clean_expr))
    except Exception:
        pass
    return 0


def parse_verilog_tarball(tarball_path: str) -> Dict[str, Dict[str, Dict[str, Any]]]:
    modules: Dict[str, Dict[str, Dict[str, Any]]] = {}
    if not os.path.exists(tarball_path):
        return modules

    try:
        with tarfile.open(tarball_path, "r:gz") as tar:
            for member in tar.getmembers():
                if member.name.endswith(".v") or member.name.endswith(".sv"):
                    f = tar.extractfile(member)
                    if f is None:
                        continue
                    content = f.read().decode("utf-8", errors="replace")
                    
                    # Strip comments
                    content = re.sub(r'//.*', '', content)
                    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)

                    module_pattern = re.compile(
                        r'\bmodule\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:#\s*\(([\s\S]*?)\)\s*)?\(([\s\S]*?)\);',
                        re.MULTILINE
                    )

                    for match in module_pattern.finditer(content):
                        mod_name = match.group(1)
                        param_block = match.group(2) or ""
                        port_block = match.group(3) or ""
                        
                        params: Dict[str, int] = {}
                        param_matches = re.findall(
                            r'\bparameter\s+(?:\[[\s\S]*?\]\s*)?([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*([^,;\)]+)',
                            param_block
                        )
                        for p_name, p_val in param_matches:
                            try:
                                p_val_clean = p_val.strip()
                                if "'h" in p_val_clean:
                                    p_val_num = int(p_val_clean.split("'h")[-1], 16)
                                else:
                                    p_val_num = int(eval_param_expr(p_val_clean, params))
                                params[p_name] = p_val_num
                            except Exception:
                                pass

                        mod_ports: Dict[str, Dict[str, Any]] = {}
                        decl_pattern = re.compile(
                            r'\b(input|output|inout)\s+(?:reg\s+|wire\s+|logic\s+)?(?:\[\s*([^:]+)\s*:\s*([^\]]+)\s*\])?\s*([^;,]+)',
                            re.IGNORECASE
                        )

                        for line in port_block.split('\n'):
                            line = line.strip()
                            if not line:
                                continue
                            
                            m = decl_pattern.search(line)
                            if m:
                                direction = m.group(1).lower()
                                msb_expr = m.group(2)
                                lsb_expr = m.group(3)
                                raw_names = m.group(4)
                                
                                if msb_expr is not None:
                                    msb = eval_param_expr(msb_expr, params)
                                else:
                                    msb = 0

                                if lsb_expr is not None:
                                    lsb = eval_param_expr(lsb_expr, params)
                                else:
                                    lsb = 0
                                
                                names = [n.strip() for n in raw_names.split(',') if n.strip()]
                                for p_name in names:
                                    p_name = re.sub(r'\b(reg|wire|logic)\b', '', p_name).strip()
                                    if p_name and not p_name.startswith('//'):
                                        mod_ports[p_name] = {
                                            "direction": direction,
                                            "msb": msb,
                                            "lsb": lsb,
                                            "source": "VERILOG"
                                        }

                        modules[mod_name] = mod_ports
    except Exception as e:
        print(f"Error parsing Verilog tarball: {e}")

    return modules


def get_sql_ports(db_path: str, module_name: Optional[str] = None):
    active_ports: Dict[str, Dict[str, Dict[str, Any]]] = {}
    deleted_ports: Dict[str, Set[str]] = {}

    if not os.path.exists(db_path):
        return active_ports, deleted_ports

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        if module_name:
            cursor.execute(
                "SELECT module_name, port_name, direction, msb, lsb, is_active FROM rtl_ports WHERE module_name = ?",
                (module_name,)
            )
        else:
            cursor.execute(
                "SELECT module_name, port_name, direction, msb, lsb, is_active FROM rtl_ports"
            )
            
        rows = cursor.fetchall()
        for mod, port, direction, msb, lsb, is_active in rows:
            if mod not in active_ports:
                active_ports[mod] = {}
                deleted_ports[mod] = set()
                
            if is_active == 1:
                active_ports[mod][port] = {
                    "direction": direction,
                    "msb": msb,
                    "lsb": lsb,
                    "source": "SQL_DB"
                }
            else:
                deleted_ports[mod].add(port)
                
        conn.close()
    except Exception as e:
        print(f"Error querying SQL DB: {e}")

    return active_ports, deleted_ports


def get_redis_ports(module_name: Optional[str] = None):
    active_ports: Dict[str, Dict[str, Dict[str, Any]]] = {}
    deleted_ports: Dict[str, Set[str]] = {}

    try:
        r = get_redis_client()
        pattern = f"eco:port:{module_name}:*" if module_name else "eco:port:*"
        keys = r.keys(pattern)
        
        for key in keys:
            parts = key.split(":")
            if len(parts) >= 4:
                mod = parts[2]
                port = ":".join(parts[3:])
                
                val_str = r.get(key)
                if not val_str:
                    continue
                
                val = json.loads(val_str)
                if mod not in active_ports:
                    active_ports[mod] = {}
                    deleted_ports[mod] = set()
                    
                status_val = val.get("status", "ACTIVE").upper()
                if status_val == "ACTIVE":
                    active_ports[mod][port] = {
                        "direction": val.get("direction", "input"),
                        "msb": val.get("msb", 0),
                        "lsb": val.get("lsb", 0),
                        "source": "REDIS_ECO"
                    }
                elif status_val == "DELETED":
                    deleted_ports[mod].add(port)
    except Exception as e:
        print(f"Error querying Redis: {e}")

    return active_ports, deleted_ports


class EcoPayload(BaseModel):
    port_name: str
    direction: str
    msb: int
    lsb: int
    status: str = "ACTIVE"


@app.get("/health")
def health_check():
    redis_ok = False
    try:
        r = get_redis_client()
        redis_ok = r.ping()
    except Exception:
        redis_ok = False

    db_path = resolve_sqlite_path()
    tar_path = resolve_tarball_path()

    sql_ok = os.path.exists(db_path)
    tarball_ok = os.path.exists(tar_path)

    return {
        "status": "ok" if (redis_ok and sql_ok and tarball_ok) else "degraded",
        "redis": redis_ok,
        "sql": sql_ok,
        "verilog_archive": tarball_ok
    }


@app.get("/modules")
def list_modules():
    tar_path = resolve_tarball_path()
    db_path = resolve_sqlite_path()
    verilog_mods = parse_verilog_tarball(tar_path)
    sql_active, _ = get_sql_ports(db_path)
    redis_active, _ = get_redis_ports()

    all_mods = set(verilog_mods.keys()) | set(sql_active.keys()) | set(redis_active.keys())
    return {"modules": sorted(list(all_mods))}


@app.get("/modules/{name}/contract")
def get_module_contract(name: str):
    tar_path = resolve_tarball_path()
    db_path = resolve_sqlite_path()
    verilog_mods = parse_verilog_tarball(tar_path)
    sql_active_map, sql_deleted_map = get_sql_ports(db_path, name)
    redis_active_map, redis_deleted_map = get_redis_ports(name)

    verilog_ports = verilog_mods.get(name, {})
    sql_ports = sql_active_map.get(name, {})
    sql_deleted = sql_deleted_map.get(name, set())
    redis_ports = redis_active_map.get(name, {})
    redis_deleted = redis_deleted_map.get(name, set())

    all_port_names = set(verilog_ports.keys()) | set(sql_ports.keys()) | set(redis_ports.keys())

    if not all_port_names and name not in verilog_mods and name not in sql_active_map and name not in redis_active_map:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Module '{name}' not found"
        )

    reconciled_ports = []
    for port_name in sorted(list(all_port_names)):
        winner = None

        if port_name in redis_ports:
            winner = redis_ports[port_name]
        elif port_name in redis_deleted:
            continue
        elif port_name in sql_ports:
            winner = sql_ports[port_name]
        elif port_name in sql_deleted:
            continue
        elif port_name in verilog_ports:
            winner = verilog_ports[port_name]

        if winner:
            msb = winner["msb"]
            lsb = winner["lsb"]
            width = abs(msb - lsb) + 1
            reconciled_ports.append({
                "name": port_name,
                "direction": winner["direction"],
                "msb": msb,
                "lsb": lsb,
                "width": width,
                "source": winner["source"]
            })

    if not reconciled_ports:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Module '{name}' not found"
        )

    lines = [
        f"{p['name']}:{p['direction']}:{p['msb']}:{p['lsb']}:{p['source']}\n"
        for p in reconciled_ports
    ]
    checksum_str = "".join(lines)
    checksum = hashlib.sha256(checksum_str.encode("utf-8")).hexdigest()

    return {
        "module_name": name,
        "port_count": len(reconciled_ports),
        "checksum": checksum,
        "ports": reconciled_ports
    }


@app.post("/modules/{name}/eco")
def create_or_update_eco(name: str, payload: EcoPayload):
    r = get_redis_client()
    key = f"eco:port:{name}:{payload.port_name}"
    val = {
        "direction": payload.direction,
        "msb": payload.msb,
        "lsb": payload.lsb,
        "status": payload.status.upper()
    }
    r.set(key, json.dumps(val))
    return {"status": "applied", "key": key}


@app.delete("/modules/{name}/eco/{port_name}")
def delete_eco(name: str, port_name: str):
    r = get_redis_client()
    key = f"eco:port:{name}:{port_name}"
    val = {"status": "DELETED"}
    r.set(key, json.dumps(val))
    return {"status": "deleted", "key": key}
EOF

# 3. Create /app/run_service.sh
cat << 'EOF' > /app/run_service.sh
#!/usr/bin/env bash
set -euo pipefail

# Ensure Redis is started
if ! pgrep -x "redis-server" > /dev/null; then
    redis-server --daemonize yes || service redis-server start || true
fi

# Ensure data files exist
mkdir -p /app/data
if [ -d "/app/environment/data" ]; then
    cp -rn /app/environment/data/* /app/data/ 2>/dev/null || true
fi
if [ ! -f "/app/data/design_db.sqlite" ] || [ ! -f "/app/data/picorv32-v1.0.tar.gz" ]; then
    if [ -f "/app/environment/data/setup_environment.py" ]; then
        python3 /app/environment/data/setup_environment.py || true
        cp -rn /app/environment/data/* /app/data/ 2>/dev/null || true
    fi
fi

# Run Uvicorn FastAPI Server on port 8000
exec uvicorn main:app --host 0.0.0.0 --port 8000 --app-dir /app
EOF

chmod +x /app/run_service.sh

# 4. Start the service in the background if not already running on port 8000
is_healthy() {
    python3 -c "import urllib.request; resp=urllib.request.urlopen('http://127.0.0.1:8000/health'); exit(0 if b'\"status\":\"ok\"' in resp.read() or b'\"status\": \"ok\"' in resp.read() else 1)" > /dev/null 2>&1
}

if ! is_healthy; then
    echo "==> Starting FastAPI service on port 8000..."
    /app/run_service.sh &
    
    # Wait for service readiness
    for i in {1..30}; do
        if is_healthy; then
            echo "==> Service is up and healthy!"
            break
        fi
        sleep 0.5
    done
fi

echo "==> Oracle Reference Solution successfully executed!"