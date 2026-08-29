#!/bin/bash
set -uo pipefail

mkdir -p /logs/verifier

# Ensure Redis is running
if ! pgrep -x "redis-server" > /dev/null; then
    redis-server --daemonize yes || service redis-server start || true
fi

# Ensure data files exist
if [ -f "/app/environment/data/setup_environment.py" ]; then
    if [ ! -f "/app/environment/data/design_db.sqlite" ] || [ ! -f "/app/environment/data/picorv32-v1.0.tar.gz" ]; then
        python3 /app/environment/data/setup_environment.py || true
    fi
fi
mkdir -p /app/data
if [ -d "/app/environment/data" ]; then
    cp -rn /app/environment/data/* /app/data/ 2>/dev/null || true
fi

# Function to check if service is healthy
is_healthy() {
    python3 -c "import urllib.request; resp=urllib.request.urlopen('http://127.0.0.1:8000/health'); exit(0 if b'\"status\":\"ok\"' in resp.read() or b'\"status\": \"ok\"' in resp.read() else 1)" > /dev/null 2>&1
}

# Ensure FastAPI service is running
if ! is_healthy; then
    if [ -f "/app/run_service.sh" ]; then
        /app/run_service.sh &
        for i in {1..30}; do
            if is_healthy; then
                break
            fi
            sleep 0.5
        done
    fi
fi

python3 -m pytest --ctrf /logs/verifier/ctrf.json /tests/test_outputs.py -rA
rc=$?

if [ "$rc" -eq 0 ]; then
  echo 1 > /logs/verifier/reward.txt
else
  echo 0 > /logs/verifier/reward.txt
fi
