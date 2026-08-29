# OpsMatrix Enterprise DevOps Platform

OpsMatrix is a high-performance, enterprise-grade DevOps Orchestration, Infrastructure Monitoring, CI/CD DAG Engine, and Security Compliance Control Suite.

## Dependencies
- Node.js >= 18.0.0
- Docker & Docker Compose
- TypeScript >= 5.0.0
- Express & WebSocket Services

## Installation
```bash
npm install
```

## Build
```bash
npm run build
```

## Run
```bash
# Start backend service
npm start

# Or run via Docker container
docker build -t devops-platform .
docker run -p 8080:8080 devops-platform
```

## Usage
```bash
# Run Developer CLI commands
npm run cli -- pipeline list

# Execute automated test suite
npm test
```
