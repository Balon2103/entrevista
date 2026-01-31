const express = require('express');
const router = express.Router();
const gestionCtrl = require('../1.2-controladores/gestion.controlador.js');

// --- RUTAS PARA LA ESPECIALISTA ---

//  si el paciente existe o crear la carpeta inicial (Número de Historia)
router.post('/validar-paciente', gestionCtrl.validarOCrearCarpeta);

// --- RUTAS PARA EL FORMULARIO DEL PADRE ---

// Esta es la ruta que recibe las 12 secciones del formulario
router.post('/historias', gestionCtrl.guardarEntrevistaCompleta);

// --- RUTAS DE CONSULTA Y APOYO ---

router.get('/historias/check', (req, res) => {
    res.json({ status: "API de Historias Médicas funcionando correctamente" });
});

// Ruta para guardar/actualizar secciones específicas si fuera necesario
router.post('/guardar-entrevista', gestionCtrl.guardarEntrevistaCompleta);

module.exports = router;