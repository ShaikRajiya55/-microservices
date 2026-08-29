# OmniAPI - Enterprise Apps & APIs Platform

[![CI Build](https://github.com/ShaikRajiya55/apps-and-apis/actions/workflows/ci.yml/badge.svg)](https://github.com/ShaikRajiya55/apps-and-apis/actions/workflows/ci.yml)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](#)
[![Code Lines](https://img.shields.io/badge/LOC-500000%2B-blue.svg)](https://github.com/ShaikRajiya55/apps-and-apis)

OmniAPI is a production-grade enterprise application platform and high-performance API ecosystem. It features REST & GraphQL gateways, stateful packet inspection, multi-protocol parsing (Ethernet, IPv4/IPv6, TCP, UDP, DNS, HTTP/1.1, HTTP/2, QUIC, WebSocket, TLS), rate limiting, load balancing, real-time metrics streaming, dynamic Web dashboard, and command-line management utilities.

## Description
This repository contains a full Apps & APIs architecture with over 525,000 lines of code across decoupled client applications and API services including Gateway Ingress, Auth API, Data API, Order Engine, Payment Processing, Telemetry, and Admin Operations Consoles.

## Dependencies
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Python**: 3.9+ (optional for microservice extensions)
- **Docker & Docker Compose**: (optional for containerized deployment)

Manifest files included:
- `package.json` & `package-lock.json`
- `requirements.txt`
- `Dockerfile` & `docker-compose.yml`

## Installation
Clone the repository and install all node dependencies:

```bash
# Clone the repository
git clone https://github.com/ShaikRajiya55/apps-and-apis.git
cd apps-and-apis

# Install Node.js dependencies
npm install

# (Optional) Setup Python virtual environment
python -m venv venv
# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install Python requirements
pip install -r requirements.txt
```

## Build
To build the applications and API binaries:

```bash
# Run npm build script
npm run build

# Or use Makefile
make build

# Build Docker container image
docker build -t apps-and-apis .
```

## Run
To start the application locally or via Docker:

```bash
# Start Node.js application server
npm start

# Run in development mode
npm run dev

# Or launch via Docker
docker run -p 8000:8000 apps-and-apis

# Or via Docker Compose
docker-compose up -d
```

## Usage
- **Web Dashboard**: Access the management console at `http://localhost:8000/`
- **API Health Check**: `GET http://localhost:8000/health`
- **API Modules**: `GET http://localhost:8000/modules`
- **CLI Utilities**: Run `npm run cli` or `node cli/index.js` for interactive control.

## Testing
Run the automated test suite covering unit, integration, and stress benchmark tests:

```bash
# Run all test suites
npm test

# Or via Makefile
make test
```
