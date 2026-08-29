.PHONY: all install build test run docker-build docker-run clean

all: install build test

install:
	npm install

build:
	npm run build

test:
	npm run test

run:
	npm start

docker-build:
	docker build -t game-development .

docker-run:
	docker run -p 3000:3000 game-development

clean:
	rm -rf dist node_modules
