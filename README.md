# To-Do App (Node.js + Express)

A simple To-Do application with a REST API and a small web frontend.

## Features
- Create, read, update (mark done / rename) and delete tasks
- REST API built with Express
- Data stored in a JSON file (no database setup needed)
- Plain HTML/JS frontend served by the same server

## API Endpoints

| Method | Endpoint          | Description            |
|--------|-------------------|------------------------|
| GET    | /health           | Health check           |
| GET    | /api/todos        | List all todos         |
| POST   | /api/todos        | Create a todo          |
| PUT    | /api/todos/:id    | Update title or done   |
| DELETE | /api/todos/:id    | Delete a todo          |

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000

## Tech stack
Node.js, Express, HTML, CSS, vanilla JavaScript

## Possible improvements
- Replace the JSON file with MongoDB or PostgreSQL
- Add user login with JWT
- Add tests
