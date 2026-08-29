.PHONY: all build test clean docker-build

all: build test

build:
	npm run build

test:
	npm test

docker-build:
	docker build -t devops-platform .

clean:
	rm -rf dist node_modules
