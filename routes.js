const express = require("express");
const sanitizeHtml = require("sanitize-html");
const validator = require("validator");
const Todo = require("./TodoModel");
const routes = express.Router();

// CRIAR
routes.post("/", async (req, res) => {
  const sanitizedTask = sanitizeHtml(req.body.task);
  
  if (!sanitizedTask.trim()) {
    return res.status(400).redirect("/");
  }
  
  await Todo.create({ task: sanitizedTask });
  res.status(201).redirect("/");
});

// LER
routes.get("/", async (req, res) => {
  const todoList = await Todo.findAll();
  res.status(200).render("index", { todoList });
});

// ATUALIZAR
routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!validator.isInt(id)) return res.status(400).redirect("/");

  const todo = await Todo.findByPk(id);

  if (todo) {
    const sanitizedTask = sanitizeHtml(req.body.task);

    if (!sanitizedTask.trim()) {
      return res.status(400).redirect("/");
    }
    
    todo.task = sanitizedTask;
    await todo.save();
  }

  res.status(200).redirect("/");
});

// DELETAR
routes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!validator.isInt(id)) return res.status(400).redirect("/");

  const todo = await Todo.findByPk(id);
  if (todo) await todo.destroy();

  res.status(200).redirect("/");
});


// TELA DE EDIÇÃO
routes.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  if (!validator.isInt(id)) return res.status(400).redirect("/");
  
  const todo = await Todo.findByPk(id);
  if (!todo) return res.status(404).redirect("/");

  res.status(200).render("edit", { todo });
});


// Alternar (concluir/desfazer)
routes.post("/:id/toggle", async (req, res) => {
  const { id } = req.params;
  if (!validator.isInt(id)) return res.status(400).redirect("/");

  const todo = await Todo.findByPk(id);
  if (todo) {
    todo.finish = !todo.finish;
    await todo.save();
  }
  res.status(200).redirect("/");
});

module.exports = routes;