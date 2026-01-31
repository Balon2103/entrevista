const express = require("express");
const router = express.Router();
const gestionCtrl = require("../1.2-controladores/gestion.controlador.js");

// --- RUTAS PARA LA ESPECIALISTA ---
router.post("/validar-paciente", gestionCtrl.validarOCrearCarpeta);

// --- RUTAS PARA EL FORMULARIO DEL PADRE ---
router.post("/historias", gestionCtrl.guardarEntrevistaCompleta);

// --- RUTAS DE CONSULTA Y APOYO ---
router.get("/historias/check", (req, res) => {
  res.json({ status: "API de Historias Médicas funcionando correctamente" });
});

// Ruta para guardar/actualizar secciones específicas
router.post("/guardar-entrevista", gestionCtrl.guardarEntrevistaCompleta);

// --- RUTA PARA GENERAR LINK ÚNICO ---
router.post("/generar-entrevista", gestionCtrl.generarLinkUnico);

module.exports = router;
