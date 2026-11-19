const express = require("express");
const sanitizeHtml = require("sanitize-html");
const validator = require("validator");
const Todo = require("./models/TodoModel");
const routes = express.Router();
// CRIAR
routes.post("/", async (req, res) => {
  const sanitizedTask = sanitizeHtml(req.body.task);

  if (!sanitizedTask.trim()) {
    const todoList = await Todo.findAll();
    return res.status(400).render("index", { todoList, error: "A tarefa não pode estar vazia" });
  }

  try {
    await Todo.create({ task: sanitizedTask });
    return res.redirect(303, "/");

  } catch (error) {
    return res.status(500).render("server-error", { error: "Erro no servidor ao criar a tarefa" });
  }
});

// LER
routes.get("/", async (req, res) => {
  try{
    const todoList = await Todo.findAll();
    res.status(200).render("index", { todoList });

  } catch (error) {
    return res.status(500).render("server-error", { error: "Erro no servidor ao consultar tarefas" });
  }
});

// ATUALIZAR
routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const sanitizedTask = sanitizeHtml(req.body.task);

  if (!validator.isInt(id) || !sanitizedTask.trim()) {
    const todoList = await Todo.findAll();
    return res.status(400).render("index", { todoList, error: "A tarefa não pode estar vazia" });
  }
  try {
    const todo = await Todo.update(
      { task: sanitizedTask },
      { where: { id } }
    );
    const todoList = await Todo.findAll();
    res.status(200).render("index", { todoList });

  } catch (error) {
    return res.status(500).render("server-error", { error: "Erro no servidor ao atualizar a tarefa" });
  }
});

// DELETAR
routes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!validator.isInt(id)) return res.redirect(303, "/");

  try {
    const todo = await Todo.destroy({ where: { id } });
    if (todo === 0) return res.status(404).render("404", {
      error: "Tarefa não encontrada."
    });
    
    const todoList = await Todo.findAll();
    res.status(200).render("index", { todoList });

  } catch (error) {
    return res.status(500).render("server-error", { error: "Erro no servidor ao deletar a tarefa" });
  }
});


// TELA DE EDIÇÃO
routes.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  if (!validator.isInt(id) ) return res.redirect(303, "/");
  
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).render("404", {
      error: "Tarefa não encontrada."
    });
  
    return res.status(200).render("edit", { todo });

  } catch (error) {
    return res.status(500).render("server-error", { error: "Erro no servidor ao consultar a tarefa" });
  }
});


// Alternar (concluir/desfazer)
routes.post("/:id/toggle", async (req, res) => {
  const { id } = req.params;
  if (!validator.isInt(id) ) return res.redirect(303, "/");

  try {
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).render("404", {
      error: "Tarefa não encontrada."
    });
    
    todo.finish = !todo.finish;
    await todo.save();
    return res.redirect(303, "/");

  } catch (error) {
    return res.status(500).render("server-error", { error: "Erro no servidor ao alternar a tarefa" });
  }
});

module.exports = routes;