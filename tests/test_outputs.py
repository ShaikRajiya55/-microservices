"""Automated test suite for RTL Port Contract Reconciliation Service."""

import hashlib
import json
import os
from pathlib import Path
import subprocess
import time
import pytest
import requests

BASE_URL = os.getenv("TEST_BASE_URL", "http://127.0.0.1:8000")


def wait_for_service(timeout: int = 15):
    start = time.time()
    while time.time() - start < timeout:
        try:
            r = requests.get(f"{BASE_URL}/health", timeout=2)
            if r.status_code == 200 and r.json().get("status") == "ok":
                return True
        except Exception:
            pass
        time.sleep(0.5)
    return False


@pytest.fixture(scope="session", autouse=True)
def ensure_service_running():
    if not wait_for_service(timeout=10):
        run_script = Path("/app/run_service.sh")
        if run_script.exists():
            subprocess.Popen(["/bin/bash", str(run_script)])
            assert wait_for_service(timeout=20), "Service failed to start via /app/run_service.sh"
        else:
            pytest.fail("/app/run_service.sh does not exist and service is not responding at http://127.0.0.1:8000")


def test_required_artifacts_exist():
    """Verify that /app/main.py and /app/run_service.sh exist and run_service.sh is executable."""
    main_path = Path("/app/main.py")
    script_path = Path("/app/run_service.sh")

    assert main_path.exists(), "/app/main.py does not exist"
    assert main_path.stat().st_size > 0, "/app/main.py is empty"
    assert script_path.exists(), "/app/run_service.sh does not exist"
    assert os.access(script_path, os.X_OK), "/app/run_service.sh is not executable"


def test_health_check_endpoint():
    """Verify GET /health returns HTTP 200 with all status checks set to True."""
    resp = requests.get(f"{BASE_URL}/health", timeout=5)
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    
    data = resp.json()
    assert data.get("status") == "ok", f"Expected status 'ok', got {data.get('status')}"
    assert data.get("redis") is True, "Redis connection status must be true"
    assert data.get("sql") is True, "SQL database status must be true"
    assert data.get("verilog_archive") is True, "Verilog archive status must be true"


def test_list_modules_endpoint():
    """Verify GET /modules returns a sorted array of available hardware modules."""
    resp = requests.get(f"{BASE_URL}/modules", timeout=5)
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"

    data = resp.json()
    assert "modules" in data, "Response missing 'modules' key"
    modules = data["modules"]
    assert isinstance(modules, list), "'modules' must be a list"
    assert len(modules) >= 3, f"Expected at least 3 modules, found {len(modules)}"

    assert "picorv32" in modules, "picorv32 missing from modules list"
    assert "picorv32_axi" in modules, "picorv32_axi missing from modules list"
    assert "picorv32_pcpi_mul" in modules, "picorv32_pcpi_mul missing from modules list"

    assert modules == sorted(modules), "Module list is not in strict ascending ASCII lexicographical order"


def test_verilog_base_extraction():
    """Verify base Verilog port parsing for picorv32_pcpi_mul without overrides."""
    resp = requests.get(f"{BASE_URL}/modules/picorv32_pcpi_mul/contract", timeout=5)
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"

    data = resp.json()
    assert data.get("module_name") == "picorv32_pcpi_mul"
    ports = data.get("ports", [])
    assert len(ports) > 0, "picorv32_pcpi_mul ports list cannot be empty"

    port_map = {p["name"]: p for p in ports}
    assert "clk" in port_map
    assert port_map["clk"]["direction"] == "input"
    assert port_map["clk"]["width"] == 1
    assert port_map["clk"]["source"] == "VERILOG"

    assert "pcpi_insn" in port_map
    assert port_map["pcpi_insn"]["direction"] == "input"
    assert port_map["pcpi_insn"]["width"] == 32
    assert port_map["pcpi_insn"]["msb"] == 31
    assert port_map["pcpi_insn"]["lsb"] == 0
    assert port_map["pcpi_insn"]["source"] == "VERILOG"


def test_sql_override_precedence():
    """Verify SQL DB overrides precedence over base Verilog ports for picorv32."""
    resp = requests.get(f"{BASE_URL}/modules/picorv32/contract", timeout=5)
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"

    data = resp.json()
    ports = data.get("ports", [])
    port_map = {p["name"]: p for p in ports}

    # 1. mem_addr should be overridden from Verilog 32-bit to SQL DB 64-bit [63:0]
    assert "mem_addr" in port_map
    assert port_map["mem_addr"]["source"] == "SQL_DB", "mem_addr source must be SQL_DB"
    assert port_map["mem_addr"]["msb"] == 63
    assert port_map["mem_addr"]["lsb"] == 0
    assert port_map["mem_addr"]["width"] == 64

    # 2. db_status_flag is a new port introduced in SQL DB
    assert "db_status_flag" in port_map
    assert port_map["db_status_flag"]["source"] == "SQL_DB"

    # 3. trace_data has is_active=0 in SQL DB, so it should be excluded
    assert "trace_data" not in port_map, "trace_data port should be excluded due to SQL DB is_active=0"


def test_redis_eco_override_and_deletion():
    """Verify Redis ECO override precedence (REDIS_ECO > SQL_DB > VERILOG) and deletion semantics."""
    mod_name = "picorv32"

    # 1. Create Redis ECO override for mem_wdata (expanding width to 128-bit)
    eco_payload = {
        "port_name": "mem_wdata",
        "direction": "output",
        "msb": 127,
        "lsb": 0,
        "status": "ACTIVE"
    }
    post_resp = requests.post(f"{BASE_URL}/modules/{mod_name}/eco", json=eco_payload, timeout=5)
    assert post_resp.status_code == 200, "POST ECO failed"

    # Query contract and assert REDIS_ECO wins
    contract_resp = requests.get(f"{BASE_URL}/modules/{mod_name}/contract", timeout=5)
    assert contract_resp.status_code == 200
    ports = contract_resp.json().get("ports", [])
    port_map = {p["name"]: p for p in ports}

    assert "mem_wdata" in port_map
    assert port_map["mem_wdata"]["source"] == "REDIS_ECO"
    assert port_map["mem_wdata"]["msb"] == 127
    assert port_map["mem_wdata"]["width"] == 128

    # 2. Delete mem_wdata via DELETE ECO endpoint (setting DELETED in Redis)
    del_resp = requests.delete(f"{BASE_URL}/modules/{mod_name}/eco/mem_wdata", timeout=5)
    assert del_resp.status_code == 200

    # Query contract and assert mem_wdata is now completely excluded from contract
    contract_resp2 = requests.get(f"{BASE_URL}/modules/{mod_name}/contract", timeout=5)
    assert contract_resp2.status_code == 200
    ports2 = contract_resp2.json().get("ports", [])
    port_map2 = {p["name"]: p for p in ports2}

    assert "mem_wdata" not in port_map2, "mem_wdata should be excluded after DELETED ECO record"


def test_checksum_integrity_and_sorting():
    """Verify SHA-256 checksum computation and strict port sorting."""
    resp = requests.get(f"{BASE_URL}/modules/picorv32_axi/contract", timeout=5)
    assert resp.status_code == 200

    data = resp.json()
    ports = data.get("ports", [])
    assert len(ports) > 0

    # Check port sorting
    names = [p["name"] for p in ports]
    assert names == sorted(names), "Ports must be sorted in strict ascending ASCII order by name"

    # Recompute SHA-256 over formatted lines: <name>:<direction>:<msb>:<lsb>:<source>\n
    lines = [f"{p['name']}:{p['direction']}:{p['msb']}:{p['lsb']}:{p['source']}\n" for p in ports]
    expected_hash = hashlib.sha256("".join(lines).encode("utf-8")).hexdigest()

    assert data.get("checksum") == expected_hash, f"Checksum mismatch: expected {expected_hash}, got {data.get('checksum')}"


def test_idempotence_and_width_invariants():
    """Property test for contract idempotence and width = abs(msb - lsb) + 1 invariant."""
    mod_name = "picorv32_pcpi_mul"

    # Fetch initial response
    r1 = requests.get(f"{BASE_URL}/modules/{mod_name}/contract", timeout=5).json()

    # Repeat 5 times to verify idempotence
    for _ in range(5):
        r_next = requests.get(f"{BASE_URL}/modules/{mod_name}/contract", timeout=5).json()
        assert r1["checksum"] == r_next["checksum"], "Checksum must be idempotent across identical queries"
        assert r1["ports"] == r_next["ports"], "Ports list must be idempotent across identical queries"

    # Check width range invariant on all returned ports
    for p in r1["ports"]:
        expected_width = abs(p["msb"] - p["lsb"]) + 1
        assert p["width"] == expected_width, f"Width invariant broken for port {p['name']}: got {p['width']}, expected {expected_width}"


def test_nonexistent_module_404():
    """Verify requesting a non-existent module returns HTTP 404 Not Found."""
    resp = requests.get(f"{BASE_URL}/modules/nonexistent_core_v99/contract", timeout=5)
    assert resp.status_code == 404, f"Expected 404 for unknown module, got {resp.status_code}"
    data = resp.json()
    assert "detail" in data
    assert "nonexistent_core_v99" in data["detail"]
