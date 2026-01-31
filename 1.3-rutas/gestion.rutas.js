const express = require("express");
const router = express.Router();
const gestionCtrl = require("../1.2-controladores/gestion.controlador.js");
const { v4: uuidv4 } = require("uuid"); // <-- Para generar IDs únicas

// --- RUTAS PARA LA ESPECIALISTA ---
// si el paciente existe o crear la carpeta inicial (Número de Historia)
router.post("/validar-paciente", gestionCtrl.validarOCrearCarpeta);

// --- RUTAS PARA EL FORMULARIO DEL PADRE ---
// Esta es la ruta que recibe las 12 secciones del formulario
router.post("/historias", gestionCtrl.guardarEntrevistaCompleta);

// --- RUTAS DE CONSULTA Y APOYO ---
router.get("/historias/check", (req, res) => {
  res.json({ status: "API de Historias Médicas funcionando correctamente" });
});

// Ruta para guardar/actualizar secciones específicas si fuera necesario
router.post("/guardar-entrevista", gestionCtrl.guardarEntrevistaCompleta);

// --- NUEVA RUTA PARA GENERAR LINK ÚNICO ---
router.post("/generar-entrevista", (req, res) => {
  // Generar un ID único
  const uniqueId = uuidv4();

  // Opcional: guardar en la DB
  // const Entrevista = require('../models/Entrevista');
  // Entrevista.create({ _id: uniqueId, creadaEn: new Date() });

  // Construir link completo apuntando al subdominio
  const url = `https://entrevista.fupagua.org/${uniqueId}`;

  // Devolver el link en JSON
  res.json({ url });
});

module.exports = router;
