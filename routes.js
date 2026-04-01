const express = require("express");
const sanitizeHtml = require("sanitize-html");
const Todo = require("./TodoModel");
const routes = express.Router();

// CRIAR
routes.post("/", async (req, res) => {
  const sanitizedTask = sanitizeHtml(req.body.task);
  
  if (!sanitizedTask.trim()) {
    return res.status(400).redirect("/");
  }
  
  await Todo.create({ task: sanitizedTask });
  res.redirect("/");
});

// LER
routes.get("/", async (req, res) => {
  const todoList = await Todo.findAll();
  res.render("index", { todoList });
});

// ATUALIZAR
routes.put("/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);

  if (todo) {
    const sanitizedTask = sanitizeHtml(req.body.task);

    if (!sanitizedTask.trim()) {
      return res.status(400).redirect("/");
    }
    
    todo.task = sanitizedTask;
    await todo.save();
  }

  res.redirect("/");
});

// DELETAR
routes.delete("/:id", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) await todo.destroy();

  res.redirect("/");
});


// TELA DE EDIÇÃO
routes.get("/:id/edit", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (!todo) return res.redirect("/");

  res.render("edit", { todo });
});


// Alternar (concluir/desfazer)
routes.post("/:id/toggle", async (req, res) => {
  const todo = await Todo.findByPk(req.params.id);
  if (todo) {
    todo.finish = !todo.finish;
    await todo.save();
  }
  res.redirect("/");
});

module.exports = routes;