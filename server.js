const app = require("./app");
const sequelize = require("./src/config/database");

const PORT = 3000;

sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco:", error);
  });
