const Paciente = require('../1.1-modelos/paciente.modelo.js');

const gestionCtrl = {};

// 1. VALIDAR / CREAR CARPETA (Para la especialista)
gestionCtrl.validarOCrearCarpeta = async (req, res) => {
    try {
        const { numHistoria, nombreNiño } = req.body;
        
        let paciente = await Paciente.findOne({ numHistoria });
        
        if (!paciente) {
            paciente = new Paciente({ 
                numHistoria, 
                "datosIdentificacion.nombreNiño": nombreNiño 
            });
            await paciente.save();
            return res.status(201).json({ mensaje: 'Carpeta creada', paciente });
        }
        
        res.status(200).json({ mensaje: 'Paciente encontrado', paciente });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al validar', error: error.message });
    }
};

// 2. GUARDADO ENTREVISTA COMPLETA (Para el formulario de 12 secciones)
gestionCtrl.guardarEntrevistaCompleta = async (req, res) => {
    try {
        const datos = req.body;
        const { numHistoria } = datos;

        if (!numHistoria) {
            return res.status(400).json({ mensaje: 'El número de historia es obligatorio' });
        }

        //  (upsert: true crea el registro si no existe)
        const pacienteActualizado = await Paciente.findOneAndUpdate(
            { numHistoria: numHistoria },
            { $set: datos },
            { new: true, upsert: true }
        );

        console.log(`✅ Historia ${numHistoria} guardada con éxito`);
        
        res.status(200).json({
            mensaje: '¡Formulario procesado con éxito!',
            data: pacienteActualizado
        });

    } catch (error) {
        console.error('❌ Error al guardar entrevista:', error);
        res.status(500).json({ 
            mensaje: 'Error interno al procesar la entrevista', 
            error: error.message 
        });
    }
};

module.exports = gestionCtrl;