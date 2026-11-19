const request = require('supertest');

const app = require('../app');


describe("GET /", () => {
  it("deve retornar status 200 OK", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});


describe("PUT /:id", () => {
  it("deve retornar status 400 Bad Request para id inválido", async () => {
    const response = await request(app)
      .put("/abc") // id inválido
      .send({ task: "Nova tarefa" });
      console.log("Status:", response.status);
    expect(response.status).toBe(400);
  });

  it("deve retornar status 400 Bad Request para task vazia", async () => {
    const response = await request(app)
      .put("/1") // id válido
      .send({ task: "" }); // task vazia
    expect(response.status).toBe(400);
  });

  it("deve retornar status 200 OK para atualização bem-sucedida", async () => {
    const response = await request(app)
      .put("/1") // id válido
      .send({ task: "Tarefa atualizada" }); // task válida
    expect(response.status).toBe(200);
  });
});