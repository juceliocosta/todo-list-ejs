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
  try{
    await Todo.create({ task: sanitizedTask });
    res.status(201).redirect("/");

  } catch (error) {
    res.status(500).redirect("/");
  }
});

// LER
routes.get("/", async (req, res) => {
  try{
    const todoList = await Todo.findAll();
    res.status(200).render("index", { todoList });

  } catch (error) {
    res.status(500).redirect("/");
  }
});

// ATUALIZAR
routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const sanitizedTask = sanitizeHtml(req.body.task);

  if (!validator.isInt(id) || !sanitizedTask.trim()) {
    return res.status(400).redirect("/");
  }
  try {
    const todo = await Todo.update(
      { task: sanitizedTask },
      { where: { id } }
    );
    res.status(200).redirect("/");

  } catch (error) {
    res.status(500).redirect("/");
  }
});

// DELETAR
routes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!validator.isInt(id)) return res.status(400).redirect("/");

  try {
    const todo = await Todo.destroy({ where: { id } });
    if (todo === 0) return res.status(404).redirect("/");
    res.status(200).redirect("/");

  } catch (error) {
    res.status(500).redirect("/");
  }
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