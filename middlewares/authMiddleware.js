const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils.js");

const validarToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Puedes acceder a los datos del token desde req.user
    next();
  } catch (err) {
    return res.status(401).send({ message: "Token inválido o expirado" });
  }
};

module.exports = { validarToken };
