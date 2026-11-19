const express = require("express");
const methodOverride = require("method-override");
const routes = require("./src/routes");

const app = express();

// config
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// arquivos estáticos que poderão ser acessados diretamente pelo navegador
app.use(express.static("public"));

// para usar métodos PUT e DELETE via formulário
app.use(methodOverride("_method"));

// rotas
app.use("/", routes);

module.exports = app;