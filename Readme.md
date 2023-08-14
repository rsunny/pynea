## Assumptions made:

- Add entities will only add new ones, updation is not considered.
- Used `neogma` as the neo4j supporting library, this supports strict typing of the data that is flowing through neo4j. `neo4j-driver` also have type based constraints and lot more easier to use than `neogma` but `neogma` seemed to be more robust.

# Sweet Management System

The Sweet Management System is a Node.js application that integrates with Neo4j to manage entities such as Machines, Sweets, and Orders.

## Features

- Add new Machines, Sweets, and Orders to the system.
- Create relationships between Machines and Sweets, and between Orders and Sweets.
- Query for various information, such as listing sweets produced by a machine, orders containing a specific sweet, etc.

## Prerequisites

- Node.js
- Neo4j database - (spun up by the docker-compose)
- Docker

## Access API Documentation

After running the application, access the API documentation using Swagger UI:
Start the application and open your browser and visit http://localhost:3000/api-docs to explore and interact with the API endpoints using Swagger.

## How to Use

The project comes with a Makefile that simplifies common tasks. Here's how to use it:

- Install project dependencies using Yarn: `make env-setup`
- Run tests in a Docker container using docker-compose.test.yml: `make test`
  (_Note: TestSuite have an race conditional issue with the neo4j contianer. Make the container run, give it a moment and run the `npm run test` if it is failing._)
- Run the application in a Docker container: `make run`

## Improvements

- Improve the test suite and split into multiple files.
- Improve the jsdocs for the swagger, make it more reusable.
- Improve the interface for each request and response rather than using the generic ones.
