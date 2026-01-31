const mongoose = require('mongoose');

const HistoriaClinicaSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
    fechaEntrevista: { type: Date, default: Date.now },
    
    // Agregamos este campo que faltaba para identificar el PDF/Word
    nombreFormulario: { type: String, default: "ENTREVISTA_MEDICO_EDUCATIVO" },

    secciones: {
        datosPersonales: Object,
        motivoConsulta: Object,
        familia: Object,
        datosSocioeconomicos: Object,
        antecedentes: Object,
        nacimiento: Object,
        alimentacion: Object,
        desarrolloMotor: Object,
        desarrolloLenguaje: Object,
        audicionVision: Object,
        habitosActividades: Object,
        accidentesEnfermedades: Object,
        escolaridad: Object,
        comunidad: Object,
        comportamientoGeneral: Object
    },
    
    metadatos: {
        llenadoPor: String,
        parentesco: String,
        historiaNumero: String
    }
});

module.exports = mongoose.model('Historia', HistoriaClinicaSchema);