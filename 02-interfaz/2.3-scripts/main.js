/* ==========================================================================
   CONFIGURACIÓN GLOBAL Y NAVEGACIÓN
   ========================================================================== */
let currentStep = 1;
const totalSteps = 12;

// Al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    generarNumeroHistoria();
    actualizarProgreso();
    configurarEfectosTarjetas();
});

// Función para avanzar entre secciones
function nextStep(step) {
    if (step <= totalSteps) {
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        currentStep = step;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
        actualizarProgreso();
        window.scrollTo(0, 0); // Volver arriba al cambiar de sección
    }
}

// Función para retroceder
function prevStep(step) {
    if (step >= 1) {
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        currentStep = step;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
        actualizarProgreso();
        window.scrollTo(0, 0);
    }
}

// Actualiza la barra de progreso visual
function actualizarProgreso() {
    const porcentaje = (currentStep / totalSteps) * 100;
    document.querySelector('.progress').style.width = `${porcentaje}%`;
}

/* ==========================================================================
   LÓGICA DE DATOS Y FORMULARIO
   ========================================================================== */

// Genera un número de historia correlativo a partir del 1100
function generarNumeroHistoria() {
    const inputHistoria = document.getElementById('numHistoria');
    if (inputHistoria) {
        // Recuperamos el último número usado de localStorage para que sea correlativo
        // Si no existe, empezamos en 1100
        let ultimoNumero = localStorage.getItem('ultimoNumHistoria');
        
        if (!ultimoNumero) {
            ultimoNumero = 1100;
        } else {
            ultimoNumero = parseInt(ultimoNumero) + 1;
        }

        const fecha = new Date();
        const año = fecha.getFullYear();
        
        // Formato final: HC-2026-1100
        inputHistoria.value = `HC-${año}-${ultimoNumero}`;

        // Guardamos el nuevo número para la siguiente entrevista
        localStorage.setItem('ultimoNumHistoria', ultimoNumero);
    }
}
// Efecto visual: Cambia el color de la tarjeta si tiene datos
function configurarEfectosTarjetas() {
    document.querySelectorAll('.familiar-card input, .familiar-card textarea, .familiar-card select').forEach(element => {
        element.addEventListener('blur', (e) => {
            const card = e.target.closest('.familiar-card');
            if (card) {
                const inputs = card.querySelectorAll('input, textarea, select');
                let tieneContenido = false;
                
                inputs.forEach(i => {
                    if (i.type === 'checkbox') {
                        if (i.checked) tieneContenido = true;1
                    } else if (i.value.trim() !== "") {
                        tieneContenido = true;
                    }
                });

                if (tieneContenido) {
                    card.classList.add('completed');
                } else {
                    card.classList.remove('completed');
                }
            }
        });
    });
}

/* ==========================================================================
   ENVÍO DE DATOS A MONGODB (BACKEND)
   ========================================================================== */

document.getElementById('medicalForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });

    console.log("Enviando datos recopilados de las 12 secciones...", data);

    try {
        const response = await fetch('http://localhost:3000/api/historias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('¡Entrevista registrada exitosamente!');
            // Opcional: Redirigir o limpiar el formulario
            // window.location.reload();
        } else {
            const error = await response.json();
            alert('Error al guardar: ' + error.message);
        }
    } catch (err) {
        console.error("Error de conexión:", err);
        alert('No se pudo conectar con el servidor.');
    }
});