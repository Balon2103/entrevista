const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const app = express();

// --- MIDDLEWARES ---

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

// Middleware para loguear todas las peticiones entrantes
app.use((req, res, next) => {
  console.log(`➡️ Petición recibida: ${req.method} ${req.originalUrl}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Límite de tamaño de requests
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- RUTAS API ---
const rutasGestion = require("./1.3-rutas/gestion.rutas.js");
app.use("/api", rutasGestion);

// Ruta de prueba para generar enlace único
app.post("/api/generar-entrevista", (req, res) => {
  console.log("📌 POST /api/generar-entrevista recibido");
  try {
    const uniqueId = uuidv4();
    const url = `https://entrevista.fupagua.org/${uniqueId}`;
    console.log("🔗 Link generado:", url);
    res.json({ url });
  } catch (error) {
    console.error("❌ Error generando enlace de entrevista:", error);
    res.status(500).json({
      mensaje: "Error interno al generar enlace",
      error: error.message,
    });
  }
});

// --- Ruta raíz ---
app.get("/", (req, res) => {
  console.log("📌 GET / recibido, enviando index.html");
  res.sendFile(path.join(__dirname, "02-interfaz", "index.html"));
});

// --- ARCHIVOS ESTÁTICOS ---
app.use(express.static(path.join(__dirname, "02-interfaz/2.1-paginas")));
app.use(
  "/estilos",
  express.static(path.join(__dirname, "02-interfaz/2.2-estilos")),
);
app.use(
  "/scripts",
  express.static(path.join(__dirname, "02-interfaz/2.3-scripts")),
);
app.use(express.static(path.join(__dirname, "public")));

// --- CONEXIÓN A BASE DE DATOS ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    console.log("✅ Conexión exitosa a MongoDB Atlas: db_historias_clinicas"),
  )
  .catch((error) => {
    console.error("❌ Error crítico de conexión a MongoDB:");
    console.error(error.message);
  });

// --- LANZAMIENTO ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(
    `📝 Listo para recibir datos en: http://localhost:${PORT}/api/historias`,
  );
});
