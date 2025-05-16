## Table of Contents

* [Project Overview](#project-overview)
* [Tech Stack](#tech-stack)
* [Repository Structure](#repository-structure)
* [Frontend Setup (Client)](#frontend-setup-client)

  * [Part 1: Dynamic User Form](#part-1-dynamic-user-form)
  * [Part 2: Task List UI](#part-2-task-list-ui)
  * [Part 3: Real‑Time Task Updates](#part-3-real-time-task-updates)
* [Backend Setup (Server)](#backend-setup-server)
* [Swagger / API Documentation](#swagger--api-documentation)
* [Running Tests](#running-tests)
* [Design Decisions & How It Works](#design-decisions--how-it-works)
* [Branching Strategy](#branching-strategy)

---

## Project Overview

This repository contains two main folders:

* **client/** – an Angular v19 frontend implementing three parts of the frontend assignment: dynamic forms, task list with filters & pagination, and real‑time updates via RxJS.
* **server/** – an Express + TypeScript + MongoDB backend with Swagger docs, a cron job for auto‑closing stale tasks, and Jest unit tests.

---

## Tech Stack

* **Frontend**

  * Angular v19 (standalone components)
  * RxJS for real‑time updates
  * TypeScript, CSS

* **Backend**

  * Node.js 16+ with Express.js
  * TypeScript
  * MongoDB via Mongoose
  * Swagger/OpenAPI (swagger-ui-express + swagger-jsdoc)
  * node‑cron for scheduled jobs
  * Jest + Supertest for unit tests

---

## Repository Structure

```
/
├─ client/         # Angular frontend
│  ├─ src/
│  ├─ angular.json
│  └─ ...
├─ server/         # Express backend
│  ├─ src/
│  ├─ tsconfig.json
│  ├─ jest.config.js
│  └─ ...
└─ README.md
```

---

## Frontend Setup (Client)

1. **Navigate** into the `client/` folder:

   ```bash
   cd client
   ```
2. **Install** dependencies:

   ```bash
   npm install
   ```
3. **Run** in development mode:

   ```bash
   ng serve --open
   ```

   The app will open at `http://localhost:4200`.

### Part 1: Dynamic User Form

* **Branch:** `feat/part1-implementation`
* Implements a reactive form that swaps nested `FormGroup`s based on the selected user type (Admin, Guest, Subscriber).
* Uses `FormArray` for permissions with a custom validator, and real‑time validation feedback.
* **How to view:**

  ```bash
  git checkout feat/part1-implementation
  ng serve
  ```

### Part 2: Task List UI

* **Branch:** `feat/part2-implementation`
* Fetches tasks from a mock API (`jsonplaceholder.typicode.com/todos`) via an Angular service.
* Provides filter buttons (All, Pending, Completed).
* Implements client-side pagination with a reusable `PaginationComponent`.
* **How to view:**

  ```bash
  git checkout feat/part2-implementation
  ng serve
  ```

### Part 3: Real‑Time Task Updates

* **Branch:** `feat/part3-implementation`
* Simulates WebSocket updates using RxJS `interval()` and a `Subject`.
* Every 5 seconds, toggles a random task’s status or adds a new one.
* Uses `takeUntil` and cleanup to avoid memory leaks.
* **How to view:**

  ```bash
  git checkout feat/part3-implementation
  ng serve
  ```

---

## Backend Setup (Server)

1. **Navigate** into the `server/` folder:

   ```bash
   cd server
   ```
2. **Install** dependencies:

   ```bash
   npm install
   ```
3. **Configure** your `.env` (in `server/`):

   ```env
   MONGO_URI=your-mongo-uri
   PORT=3000
   ```
4. **Run** in development mode:

   ```bash
   npm run dev
   ```

   * Express server on `http://localhost:3000`
   * Swagger UI on `http://localhost:3000/api-docs`

---

## Swagger / API Documentation

* Automatically generated from JSDoc comments in `server/src/routes/*.ts`.
* Available at:

  ```
  http://localhost:3000/api-docs
  ```

---

## Running Tests

### Backend

* **Jest unit test** for `POST /users` lives in `server/src/tests/user.test.ts`.
* Run all tests:

  ```bash
  cd server
  npm test
  ```

---

## Design Decisions & How It Works

* **Standalone Angular Components** for simpler import management and better tree‑shaking.
* **Reactive Forms** used in Part 1 for dynamic control of nested form groups.
* **RxJS Subjects & interval()** simulate real‑time WebSocket streams without external dependencies.
* **Mongoose Schema Index** on `(title, userId)` enforces unique tasks per user.
* **node-cron** job runs every minute to auto‑complete “in-progress” tasks older than 2 hours.
* **Swagger‑JSDoc** keeps docs close to code, ensuring they stay up to date.
* **Jest + Supertest** for fast, isolated route testing in TypeScript.

---

## Branching Strategy

* **Frontend**

  * `feat/part1-implementation` – Dynamic User Form
  * `feat/part2-implementation` – Task List UI
  * `feat/part3-implementation` – Real‑Time Updates

* **Backend**

  * `setup/express-backend` – Initial Express + TypeScript + MongoDB setup with Swagger
  * `feat/backend-api-implementation` – All task/user routes, cron job, tests

---

Feel free to explore each branch independently for a focused view on each part, or clone the repo and switch between them to see incremental progress.
