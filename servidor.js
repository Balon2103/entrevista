const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();

// --- MIDDLEWARES ---

app.use(cors());

//  límite de tamaño
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- ARCHIVOS ESTÁTICOS ---

// carpeta donde ESTAN  HTML, CSS y JS (index.html, estilo.css, main.js)

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

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    console.log("✅ Conexión exitosa a MongoDB Atlas: db_historias_clinicas"),
  )
  .catch((error) => {
    console.error("❌ Error crítico de conexión:");
    console.error(error.message);
  });

// --- RUTAS API ---
const rutasGestion = require("./1.3-rutas/gestion.rutas.js");
app.use("/api", rutasGestion);

// Ruta para servir el index.html principal si entras a la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "02-interfaz", "index.html"));
});

// --- LANZAMIENTO ---

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(
    `📝 Listo para recibir datos en: http://localhost:${PORT}/api/historias`,
  );
});
