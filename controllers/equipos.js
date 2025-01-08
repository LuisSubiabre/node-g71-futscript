const { getTeams, addTeam } = require("../db/consultas");

const obtenerEquipos = async (req, res) => {
  const equipos = await getTeams();
  res.json(equipos);
};

const agregarEquipo = async (req, res) => {
  try {
    const equipo = req.body;
    if (!equipo.nombre) {
      return res.status(400).send({ message: "Se requiere nombre del equipo" });
    }
    await addTeam(equipo);
    res.send({ message: "Equipo agregado con éxito" });
  } catch (err) {
    res.status(500).send({ message: "Error en el servidor: " + err.message });
  }
};

module.exports = { obtenerEquipos, agregarEquipo };
