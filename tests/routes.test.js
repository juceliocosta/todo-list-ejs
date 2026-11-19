const request = require("supertest");
const app = require("../app");
const Todo = require("../src/models/TodoModel");

jest.mock("../src/models/TodoModel");

describe("GET /", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  test("deve retornar a página index.html com status 200", async () => {
    Todo.findAll.mockResolvedValue([{task: 'Tarefa 1', finish: false}]);

    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html');
    expect(response.text).toContain('Tarefa 1');
        
  });

  test("deve retornar status 500 caso ocorra um erro no banco de dados", async () => {
    Todo.findAll.mockRejectedValue(new Error("Erro no banco"));

    const response = await request(app).get("/");
    expect(response.status).toBe(500);
  });

});