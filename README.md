# Euro Stueckelung

A small web application and REST API to calculate an optimal euro currency denomination breakdown and the difference to a previous breakdown.

This repository contains two main parts:

- `backend` — Spring Boot (Java 21) REST API that performs denomination calculations.
- `frontend` — Angular (v20) single-page application that provides a UI and ships as static assets.

## Table of contents

- What it does
- Architecture
- Prerequisites
- Local development
  - Backend
  - Frontend
- Build and package (production)
- Running with Docker
- API reference (example)
- Tests
- License & contact

## What it does

The application accepts an amount (in cents) and an optional "old breakdown" of existing coins/notes and returns:

- `breakdown` — the minimal number of euro-denominations (notes and coins, represented in cents) required to represent the amount.
- `difference` — a list of denomination deltas compared to the supplied old breakdown (useful for change management or cashier adjustments).

Use cases: cash handling tools, cashier terminals, educational tools for currency decomposition.

## Architecture

- Frontend: Angular 20, built as a localized (en-US + de) static site. Built artifacts are placed under `dist` and can be served from the Spring Boot `static` folder.
- Backend: Spring Boot 3.5.x (Java 21). Provides a single public endpoint for calculating denominations.
- Docker: multi-stage Dockerfile builds the frontend, then the backend, and assembles a lightweight runtime image.

## Prerequisites

- Java 21 (for local backend runs) or Docker (recommended for running the complete app in a container)
- Maven (if building the backend locally without Docker)
- Node.js + npm (if developing the frontend locally)

Recommended (for development):

- Node.js 22+ and npm
- Maven 3.9+
- JDK 21

## Local development

### Backend (run locally)

From repository root:

1. Build and run with Maven:

```bash
cd backend
./mvnw spring-boot:run
```

The backend will start on port 8080 by default. If you need to change the port, set `server.port` as a JVM argument or in `application.properties`.

### Frontend (run locally)

From repository root:

```bash
cd frontend
npm ci
npm start
```

The Angular dev server serves the app at http://localhost:4200 by default. There is a `de` configuration for running the localized German build: `npm run de`.

## Build and package (production)

There are two common ways to produce a production artifact.

1. Using Maven (builds backend jar only):

```bash
cd backend
./mvnw clean package -DskipTests
# resulting jar: backend/target/backend-0.0.1-SNAPSHOT.jar
```

2. Using the provided multi-stage Dockerfile (recommended) — this builds the frontend, copies static assets into the backend, builds the backend and produces a small runtime image:

```bash
docker build -t euro-stueckelung:latest .
```

The Docker image produced runs the Spring Boot app on port 8080 and serves the frontend static files under `/` (including localized variants under `/de/`).

## Running with Docker

Build and run the container (single-machine):

```bash
docker build -t euro-stueckelung:latest .
docker run --rm -p 8080:8080 euro-stueckelung:latest
```

Open http://localhost:8080 (or http://localhost:8080/de/ for the German localized site).

## API reference (example)

Endpoint

- POST /api/public/denomination/v1

Request JSON body (example):

```json
{
  "value": 12345,
  "oldBreakdown": {
    "1000": 1,
    "200": 3
  }
}
```

Notes:

- `value` is the requested amount in cents (e.g. 12345 = €123.45).
- `oldBreakdown` is optional. Keys are denominations in cents (e.g. 20000 = €200 note, 100 = €1 coin).

Response (example):

```json
{
  "newValue": 12345,
  "breakdown": {
    "10000": 1,
    "2000": 1,
    "100": 3,
    "20": 2,
    "5": 1
  },
  "difference": [
    { "denomination": 10000, "value": 1 },
    { "denomination": 200, "value": -3 }
  ]
}
```

The backend uses the following denominations (in cents):

20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1

## Tests

### Backend

Run unit tests with Maven:

```bash
cd backend
./mvnw test
```

### Frontend

Run Angular tests:

```bash
cd frontend
npm ci
npm test
```

## License & contact

This project is licensed under the MIT License — see the `LICENSE` file in the repository root for details.

For questions about the code, reach out to the repository owner.

---
