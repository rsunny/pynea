SHELL := /bin/bash

remove-env:
	rm -rf node_modules

env-setup:
	yarn install

test:
	docker-compose -f docker-compose.test.yml up -d
	npm run test

run:
	docker-compose up -d
