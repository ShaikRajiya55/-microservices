.PHONY: all install build start dev test test-coverage lint clean docker-build docker-up

all: install build test

install:
	npm install

build:
	npm run build

start:
	npm start

dev:
	npm run dev

test:
	npm test

test-coverage:
	npm run test:coverage

lint:
	npm run lint

clean:
	rm -rf dist node_modules coverage

docker-build:
	docker build -t nexuscart-app:latest .

docker-up:
	docker-compose up -d
