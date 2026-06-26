const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public')); // sirve index.html y style.css

const apps = [
  {
    nombre: "Qustodio",
    edadMin: 3,
    funciones: ["Restricción de pantalla", "Bloqueo de apps", "Informes de actividad"],
    ventajas: "Muy completa, interfaz amigable, buena reputación.",
    desventajas: "Versión gratuita limitada.",
    link: "https://www.qustodio.com"
  },
  {
    nombre: "FamiSafe",
    edadMin: 6,
    funciones: ["Geolocalización", "Historial de navegación", "Gestión de tiempo de pantalla"],
    ventajas: "Buena integración móvil, reportes claros.",
    desventajas: "Algunas funciones requieren suscripción.",
    link: "https://famisafe.wondershare.com"
  },
  {
    nombre: "Kaspersky Safe Kids",
    edadMin: 8,
    funciones: ["Filtrado de contenido web", "Control remoto", "Monitoreo de redes sociales"],
    ventajas: "Marca confiable, buen soporte multiplataforma.",
    desventajas: "Interfaz menos intuitiva.",
    link: "https://latam.kaspersky.com/safe-kids"
  }
];

const otrasApps = [
  { nombre: "Net Nanny", funciones: ["Filtrado de contenido web", "Restricción de pantalla"], link: "https://www.netnanny.com" },
  { nombre: "Kidslox", funciones: ["Bloqueo de apps", "Gestión de tiempo de pantalla"], link: "https://kidslox.com" },
  { nombre: "Circle Home Plus", funciones: ["Control remoto", "Informes de actividad"], link: "https://meetcircle.com" },
  { nombre: "Norton Family", funciones: ["Historial de navegación", "Supervisión de llamadas y mensajes"], link: "https://family.norton.com" },
  { nombre: "Bark", funciones: ["Monitoreo de redes sociales", "Informes de actividad"], link: "https://www.bark.us" }
];

// Ranking principal
app.post('/recomendar', (req, res) => {
  const { edad, seleccionadas } = req.body;
  const ranking = apps.map(app => {
    const coincidencias = app.funciones.filter(f => seleccionadas.includes(f)).length;
    return { ...app, coincidencias };
  }).filter(app => edad >= app.edadMin);
  res.json({ ranking });
});

// Otras recomendaciones
app.get('/otras', (req, res) => {
  res.json({ lista: otrasApps });
});

app.listen(8000, () => console.log("Servidor en http://localhost:8000"));
