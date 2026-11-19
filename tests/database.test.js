const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite:///:memory:', { logging: false });

describe('Conexão com o banco de dados', () => {
  test('Deve conectar ao banco de dados sem erros', async () => {
    try {
      await sequelize.authenticate();
      expect(true).toBe(true); 
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});