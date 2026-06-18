// ─── Dashboard Estudiante ────────────────────────────────────────────────────────────────
// Responsable: Rosa Esther Diaz Luque
// Propiedad exclusiva. No editar fuera de esta rama.
const estudiante = {
  nombre: "Juan Pérez",
  carrera: "Ingeniería de Sistemas",
  tesisActivas: 2,
  progresoPromedio: 65,
  alertasPendientes: 2,
  diasRacha: 12,

  tesis: [
    {
      titulo: "Impacto de la IA en la Educación Superior",
      estado: "En progreso",
      etapa: "Metodología",
      progreso: 65,
      alertas: 2,
      tiempo: "Hace 2 horas"
    },
    {
      titulo: "Análisis de Factores de Deserción Estudiantil",
      estado: "En revisión",
      etapa: "Marco Teórico",
      progreso: 35,
      alertas: 0,
      tiempo: "Hace 3 días"
    }
  ],

  actividad: [
    { texto: "Validación completada", detalle: "Objetivos específicos", tiempo: "Hace 2 horas", tipo: "verde" },
    { texto: "Comentario del asesor", detalle: "Problema de investigación", tiempo: "Hace 5 horas", tipo: "azul" },
    { texto: "Alerta de coherencia", detalle: "Hipótesis", tiempo: "Hace 1 día", tipo: "naranja" }
  ],

  hitos: [
    { dia: "25", mes: "ABR", titulo: "Revisión con asesor", detalle: "Marco teórico" },
    { dia: "30", mes: "ABR", titulo: "Entrega de metodología", detalle: "Capítulo 3" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("avatar-usuario").textContent =
    estudiante.nombre
      .split(" ")
      .map(nombre => nombre[0])
      .join("")
      .substring(0, 2);

  document.getElementById("nombre-usuario").textContent = estudiante.nombre;

  document.getElementById("carrera-usuario").textContent = `Estudiante - ${estudiante.carrera}`;

  document.getElementById("mensaje-bienvenida").textContent = `Bienvenido de nuevo, ${estudiante.nombre.split(" ")[0]}`;

  document.getElementById("tesis-activas").textContent = estudiante.tesisActivas;

  document.getElementById("progreso-promedio").textContent = `${estudiante.progresoPromedio}%`;

  document.getElementById("alertas-pendientes").textContent = estudiante.alertasPendientes;

  document.getElementById("dias-racha").textContent = estudiante.diasRacha;

  const contenedorTesis =
    document.getElementById("contenedor-tesis");
    contenedorTesis.innerHTML = "";

  estudiante.tesis.forEach(tesis => {
    const claseEstado = tesis.estado.toLowerCase().replace(" ", "-");
    const alertaHTML = tesis.alertas > 0 
      ? `<div class="tesis-alerta-badge"> 
      <img src="images/dashboard-estudiante/icon-exclamation-triangle.svg" alt="Alerta" class="tesis-alerta-icon">
      ${tesis.alertas}</div>` 
      : "<div></div>";

    contenedorTesis.innerHTML += `
      <article class="tesis-card">
        <div class="tesis-card-top">
          <h3>${tesis.titulo}</h3>
          ${alertaHTML}
        </div>
        
        <div class="tesis-meta">
          <span class="meta-tiempo">
          <img src="images/dashboard-estudiante/icon-clock.svg" alt="Reloj" class="tesis-meta-icon">
          ${tesis.tiempo}</span>
          <span class="meta-estado ${claseEstado}">${tesis.estado}</span>
        </div>

        <div class="tesis-progreso-info">
          <span>Etapa actual: <strong>${tesis.etapa}</strong></span>
          <span class="tesis-porcentaje-numero">${tesis.progreso}%</span>
        </div>

        <div class="barra-progreso-contenedor">
          <div class="barra-progreso-relleno" style="--ancho-progreso: ${tesis.progreso}%;"></div>
        </div>

        <div class="tesis-card-footer">
          <button class="btn-ver-progreso">Ver progreso</button>
          <button class="btn-continuar-tesis">Continuar</button>
        </div>
      </article>
    `;
  });

  const listaActividad = document.getElementById("lista-actividad");
  listaActividad.innerHTML = "";

  estudiante.actividad.forEach(act => {
    listaActividad.innerHTML += `
      <li class="actividad-item item-${act.tipo}">
        <span class="actividad-titulo">${act.texto}</span>
        <span class="actividad-detalle">${act.detalle}</span>
        <span class="actividad-tiempo">${act.tiempo}</span>
      </li>
    `;
  });

  const listaHitos = document.getElementById("lista-hitos");
  listaHitos.innerHTML = "";

  estudiante.hitos.forEach(hito => {
    listaHitos.innerHTML += `
      <li class="hito-item">
        <div class="hito-fecha-caja">
          <span class="hito-numero">${hito.dia}</span>
          <span class="hito-mes">${hito.mes}</span>
        </div>
        <div class="hito-textos">
          <span class="hito-titulo">${hito.titulo}</span>
          <span class="hito-subtexto">${hito.detalle}</span>
        </div>
      </li>
    `;
  });
});