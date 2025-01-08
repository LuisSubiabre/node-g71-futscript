const { getPlayers, addPlayer } = require("../db/consultas");

const obtenerJugadores = async (req, res) => {
  const { teamID } = req.params;
  const jugadores = await getPlayers(teamID);
  res.json(jugadores);
};

const registrarJugador = async (req, res) => {
  try {
    const { teamID } = req.params;
    const jugador = req.body;
    if (!jugador.nombre || !jugador.posicion) {
      return res
        .status(400)
        .send({ message: "Se requiere nombre y posición del jugador" });
    }
    await addPlayer({ jugador, teamID });
    res.json({ message: "Jugador agregado con éxito" });
  } catch (err) {
    res.status(500).send({ message: "Error en el servidor: " + err.message });
  }
};

module.exports = { obtenerJugadores, registrarJugador };
