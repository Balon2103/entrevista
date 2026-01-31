const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
    // SECCIÓN I Y II: DATOS DE IDENTIFICACIÓN
    numHistoria: { type: String, required: true, unique: true },
    fechaEntrevista: { type: Date, default: Date.now },
    datosIdentificacion: {
        nombreNiño: String,
        fechaNacimiento: Date,
        edadAnos: Number,
        edadMeses: Number,
        lugarNacimiento: String,
        sexo: String,
        direccion: String,
        telefono: String,
        escolaridad: String,
        institucion: String
    },

    // SECCIÓN III: GRUPO FAMILIAR
    datosFamiliares: {
        madre: { nombre: String, edad: Number, profesion: String, salud: String },
        padre: { nombre: String, edad: Number, profesion: String, salud: String },
        hermanos: [String], // Array para lista de hermanos
        otros: String
    },

    // SECCIÓN IV Y XI: SOCIOECONÓMICOS Y COMUNIDAD
    socioeconomicos: {
        tipoVivienda: String,
        propiedadCasa: String,
        serviciosBasicos: String,
        casaCompartida: String,
        distribucionHabitaciones: String,
        comunidadAgrado: String,
        seguridadConvivencia: String
    },

    // SECCIÓN V Y VI: ANTECEDENTES Y NACIMIENTO
    antecedentesPrenatales: {
        embarazoPlaneado: String,
        ninoDeseado: String,
        intentoAborto: String,
        complicacionesEmbarazo: [String], // Array de los checkboxes marcados
        habitosEmbarazo: [String]
    },
    nacimiento: {
        tipoParto: String,
        semanasGestacion: Number,
        pesoNacer: String,
        tallaNacer: String,
        respiroNormal: String,
        complicacionesNeonatales: [String],
        incubadora: String
    },

    // SECCIÓN VII: ALIMENTACIÓN
    alimentacion: {
        lactanciaExclusiva: String,
        formulaInicio: String,
        esSelectivo: String,
        preferencias: String,
        intolerancias: String
    },

    // SECCIÓN VIII: DESARROLLO EVOLUTIVO (EL CORAZÓN DEL FORMULARIO)
    desarrollo: {
        motor: {
            controlCefalico: String,
            gateo: String,
            caminoSolo: String,
            movimientosPersistentes: String
        },
        lenguaje: {
            balbuceo: String,
            primerasPalabras: String,
            comprendenOrdenes: String,
            reconoceNombra: String,
            frasesRaras: String,
            contactoVisual: String
        },
        sensorial: {
            audicion: String,
            vision: String,
            interesGiro: String
        }
    },

    // SECCIÓN IX: SALUD
    salud: {
        accidentes: String,
        operaciones: String,
        enfermedadesPresentadas: [String],
        inquietudesPadres: String
    },

    // SECCIÓN X: ESCOLARIDAD
    escolaridad: {
        actitudEscuela: String,
        rendimientoLectoEscritura: String,
        dificultadesMaterias: String,
        evaluacionCOAR: [String]
    },

    // SECCIÓN XII: COMPORTAMIENTO
    comportamiento: {
        agresividad: String,
        autolesion: String,
        comentariosFinales: String
    }
}, { strict: false }); // 'strict: false' permite guardar campos que no hayamos definido aquí específicamente

module.exports = mongoose.model('Paciente', PacienteSchema);