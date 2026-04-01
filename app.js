const express = require("express");
const methodOverride = require("method-override");
const sequelize = require("./database");
const routes = require("./routes");

const app = express();
const PORT = 3000;

// sincronizando o banco
sequelize.sync();

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

// iniciando o servidor
app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});