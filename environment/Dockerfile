FROM public.ecr.aws/docker/library/python:3.13-slim-bookworm@sha256:01f42367a0a94ad4bc17111776fd66e3500c1d87c15bbd6055b7371d39c124fb

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        asciinema \
        ca-certificates \
        curl \
        git \
        procps \
        redis-server \
        sqlite3 \
        tar \
        tmux \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    fastapi==0.115.8 \
    uvicorn==0.34.0 \
    redis==5.2.1 \
    httpx==0.28.1 \
    requests==2.32.3 \
    pytest==8.4.1 \
    pytest-json-ctrf==0.3.5 \
    hypothesis==6.125.1

COPY data/ /app/data/

RUN python3 /app/data/setup_environment.py

VOLUME ["/app"]
