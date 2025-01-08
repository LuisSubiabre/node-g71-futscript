const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils.js");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ message: "Se requieren todos los campos" });
    }

    if (username === "admin" && password === "1234") {
      const payload = {
        usuario: username,
      };
      const token = jwt.sign(payload, secretKey);

      res.send({ message: `Bienvenido ${username}, tu token es ${token}` });
    } else {
      res.status(401).send({ message: "Usuario o contraseña incorrectos" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error en el servidor: " + err.message });
  }
};

module.exports = { login };
