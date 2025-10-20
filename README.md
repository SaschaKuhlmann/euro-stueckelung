# Denomination

A small web application and REST API to calculate an optimal euro currency denomination breakdown and the difference to a previous breakdown.

This repository contains two main parts:

- `backend` — Spring Boot (Java 21) REST API that performs denomination calculations.
- `frontend` — Angular (v20) single-page application that provides a UI and ships as static assets.

## Table of contents

- What it does
- Calculation modes & units
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

The application accepts an amount (in Euro) and calculates:

- `breakdown` — the minimal number of euro-denominations (notes and coins) required to represent the amount.
- `difference` — a list of denomination deltas compared to a previous calculation.

## Calculation modes & units

The application supports two calculation modes which can be selected in the frontend UI (frontend/backend toggle):

- Frontend mode (UI): all inputs and visuals in the frontend use euros as the unit. Users enter amounts in euros (for example "123.45" for €123.45) and the UI displays breakdowns and totals in euro values. In this mode the calculation happens in the browser — no API call is required.

- Backend mode (API): when the frontend is switched to backend mode it sends a request to the backend calculation endpoint. The backend API expects and returns values in cents (integer). For example, €123.45 must be converted to 12345 when sent to the API. The backend response `breakdown` and `difference` maps use denominations in cents as keys.

Important: When integrating or scripting against the API, always convert euro amounts to cents before calling the endpoint. The README's API examples show the API/cents shape.

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

Open http://localhost:8080 (or http://localhost:8080/de/ for the German localized site. This does not work when using Angulars dev server).

## API reference (example)

Endpoint

- POST /api/public/denomination/v1

Request JSON body (example):

```json
{
  "value": 12345,
  "oldBreakdown": {
    "20000": 0,
    "10000": 0,
    "5000": 0,
    "2000": 0,
    "1000": 1,
    "500": 0,
    "200": 3,
    "100": 0,
    "50": 0,
    "20": 0,
    "10": 0,
    "5": 0,
    "2": 0,
    "1": 0
  }
}
```

Notes:

-- Frontend apps/UI: users enter and see amounts in euros (e.g. 123.45 means €123.45). The frontend will convert to cents for backend calls when in backend mode.
-- API/backend: `value` is the requested amount in cents (e.g. 12345 = €123.45). `oldBreakdown` is a map that MUST include every denomination key (in cents) with integer counts — unused denominations should be 0. The backend `breakdown` in the response follows the same shape (all keys present). `difference` is a compact list of denomination deltas.

Response (example):

```json
{
  "newValue": 12345,
  "breakdown": {
    "20000": 0,
    "10000": 1,
    "5000": 0,
    "2000": 1,
    "1000": 0,
    "500": 0,
    "200": 0,
    "100": 3,
    "50": 0,
    "20": 2,
    "10": 0,
    "5": 1,
    "2": 0,
    "1": 0
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
