const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");

// Middleware: parse JSON bodies and serve the frontend from /public
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---- Tiny "database": a JSON file ----
function loadTodos() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (err) {
    return []; // file missing or empty -> start with no todos
  }
}

function saveTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// ---- Routes ----

// Health check (useful for deployment platforms)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// READ all todos
app.get("/api/todos", (req, res) => {
  res.json(loadTodos());
});

// CREATE a todo
app.post("/api/todos", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  const todos = loadTodos();
  const todo = { id: Date.now(), title: title.trim(), done: false };
  todos.push(todo);
  saveTodos(todos);
  res.status(201).json(todo);
});

// UPDATE a todo (toggle done or change title)
app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  if (typeof req.body.title === "string" && req.body.title.trim()) {
    todo.title = req.body.title.trim();
  }
  if (typeof req.body.done === "boolean") {
    todo.done = req.body.done;
  }
  saveTodos(todos);
  res.json(todo);
});

// DELETE a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todos = loadTodos();
  const remaining = todos.filter((t) => t.id !== id);
  if (remaining.length === todos.length) {
    return res.status(404).json({ error: "Todo not found" });
  }
  saveTodos(remaining);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
