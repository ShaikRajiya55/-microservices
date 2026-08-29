# NexOS Embedded Systems Application

Industrial Real-Time Embedded Operating System & IoT Edge Gateway Software Stack.

## Overview
NexOS is an industrial-grade, preemptive real-time operating system and edge gateway platform written in ANSI C/C++. It includes a micro-kernel, hardware abstraction layer (HAL), device drivers, industrial protocol engines (Modbus, MQTT, CANopen, CoAP, CBOR), flash wear-leveling storage, edge DSP, and cryptographic secure dual-bank OTA bootloading.

## Features
- **Kernel**: Preemptive task scheduler, mutexes with priority inheritance, semaphores, IPC queues.
- **HAL**: Unified interfaces for GPIO, UART, SPI, I2C, CAN, ADC, DAC, PWM, Timers, RTC.
- **Drivers**: MPU6050, BME280, W25Qxx Flash, SSD1306 OLED, LoRa, Ethernet, GPS.
- **Protocols**: Modbus RTU/TCP, MQTT 3.1.1, CANopen, CoAP, CBOR, JSON Telemetry.
- **Storage**: Flash Translation Layer (FTL) wear-leveling, NVS Key-Value store, Embedded FS, Syslog.
- **DSP**: FIR/IIR filters, Radix-2 FFT spectral analyzer, Extended Kalman Filter, PID controller.
- **Security**: AES-256 cipher, SHA-256 digest, HMAC-SHA256, CRC32, Dual-Bank OTA.

## Requirements & Dependencies
- GCC / Clang / MSVC compiler supporting C99 or later
- CMake 3.10+ or GNU Make
- Node.js 18+ (optional test runner)
- Docker (optional containerized execution)

## Installation & Build Instructions

### Using Makefile
```bash
# Clone the repository
git clone https://github.com/ShaikRajiya55/embedded-systems.git
cd embedded-systems

# Build the project
make all

# Run the test suite
make test
```

### Using CMake
```bash
mkdir build && cd build
cmake ..
make
./nexos_test_runner
```

### Using Node.js
```bash
npm install
npm run build
npm test
npm start
```

### Using Docker
```bash
docker build -t nexos-embedded .
docker run --rm nexos-embedded
```

## License
Proprietary - All Rights Reserved.
