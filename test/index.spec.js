const request = require("supertest");
const server = require("../index.js");

describe("TEST /equipos", () => {
  it("GET /equipos: Array status 200", async () => {
    const response = await request(server).get("/equipos");
    const status = response.statusCode;
    expect(status).toBe(200);
  });
  it("POST /Login: obtener un Object", async () => {
    const credenciales = { username: "admin", password: "1234" };
    const response = await request(server).post("/login").send(credenciales);
    const status = response.statusCode;
    expect(status).toBe(200);
  });
  it("POST /Login: credenciales incorrectas", async () => {
    const credenciales = { username: "nimda", password: "4321" };
    const response = await request(server).post("/login").send(credenciales);
    const status = response.statusCode;
    expect(status).toBe(401);
  });
  it("POST /equipos/:teamID/jugadores: status 201", async () => {
    const jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYWRtaW4iLCJpYXQiOjE3MzYzNjY1Mjd9.R8-jfxlQVVeKRD1j-hCj8AJ5LfLWWB9XiIWH-BZW0Ww";
    const jugador = { nombre: "Jugador de prueba", posicion: 1 };

    const response = await request(server)
      .post("/equipos/1/jugadores")
      .set("Authorization", `Bearer ${jwt}`)
      .send(jugador);

    expect(response.statusCode).toBe(201);
  });
});
