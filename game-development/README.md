# Aetheria Game Engine & RPG Application

A full-scale 2D/3D Game Engine and RPG Application Suite built in TypeScript with WebGL, Web Audio, Physics Engine, AI Pathfinding, Level Editor, and Save System (62,000+ Lines of Code).

## Description
Aetheria is an executable high-performance game engine and RPG application prototype featuring modular architecture across Math, Core, ECS, Physics, Graphics, Audio, World Generation, AI, UI, RPG Combat, Level Editor, Network Protocols, and Save State engines.

## Installation
Clone the repository and install all required node dependencies:
```bash
git clone https://github.com/ShaikRajiya55/game-development.git
cd game-development
npm install
```

## Build
Compile TypeScript source code and generate the production web application bundle:
```bash
npm run build
```

## Run
Start the local development web server and launch the game application:
```bash
npm start
```
Or run dev mode with hot reloading:
```bash
npm run dev
```

## Dependencies
The project lists explicit dependencies in `package.json` and locks them in `package-lock.json`:

- **Node.js**: `^22.0.0`
- **TypeScript**: `^5.5.4`
- **Vite**: `^5.4.0` (Build system & dev server)
- **Vitest**: `^2.0.5` (Automated testing framework)
- **canvas-confetti**: `^1.9.4` (Visual confetti particle effects)

## Usage
- Open `http://localhost:3000` in any WebGL-enabled browser to launch the game engine loop.
- Controls: `WASD` / `Arrow Keys` for character movement, `Space` for primary action, `I` for Inventory UI, `E` for Level Editor toggle.

## Testing & Coverage
Execute the 7 automated unit & integration test suites:
```bash
npm test
```
To run test coverage analysis with v8 coverage provider:
```bash
npm run test:coverage
```

## Docker Support
You can build and run the application in a container:
```bash
docker build -t game-development .
docker run -p 3000:3000 game-development
```
Or use the included `Makefile`:
```bash
make install
make build
make test
make run
```
