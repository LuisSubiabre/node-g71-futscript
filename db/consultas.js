const { Pool } = require("pg");
const format = require("pg-format");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "213658",
  database: "futscript",
  allowExitOnIdle: true,
});

const getTeams = async () => {
  const query = "SELECT * FROM equipos";
  const { rows: teams } = await pool.query(query);
  return teams;
};

const getPlayers = async (teamID) => {
  const query = format("SELECT * FROM jugadores WHERE id_equipo = %L", teamID);
  const { rows: players } = await pool.query(query);
  return players;
};

const addTeam = async (equipo) => {
  const query = {
    text: "INSERT INTO equipos(name) VALUES($1)",
    values: [equipo.nombre],
  };
  const { rowCount, rows } = await pool.query(query);
  if (rowCount === 0) {
    throw new Error("No se pudo registrar el equipo");
  }
  return rows[0];
};

const addPlayer = async ({ jugador, teamID }) => {
  const query = {
    text: "INSERT INTO jugadores(name, position, id_equipo) VALUES($1, $2, $3)",
    values: [jugador.nombre, jugador.posicion, teamID],
  };
  const { rowCount, rows } = await pool.query(query);
  if (rowCount === 0) {
    throw new Error("No se pudo registrar el jugador");
  }
  return rows[0];
};

module.exports = { getTeams, addTeam, getPlayers, addPlayer };
