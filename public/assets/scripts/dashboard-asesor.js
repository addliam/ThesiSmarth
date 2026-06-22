// ==========================================================================
// ─── Dashboard Asesor ─────────────────────────────────────────────────────
// Responsable: Luis Angel Bardales Fernandez
// Propiedad exclusiva. No editar fuera de esta rama.
// ==========================================================================

// 1. NUESTRA BASE DE DATOS CENTRALIZADA (La Fuente Única de Verdad)
const baseDatosEstudiantes = [
  { 
    id: 1, 
    nombre: "Juan Pérez", 
    iniciales: "JP", 
    temaTesis: "Impacto de la IA en la Educación", 
    tiempo: "Hace 2 horas", 
    estado: "En revisión", 
    progreso: 65, 
    colorFondo: "avatar-violeta",
    tareaPendiente: "Objetivos específicos",
    reunion: { dia: "25", mes: "ABR", tema: "Revisión de marco teórico", hora: "10:00 AM - 11:00 AM", destacada: true }
  },
  { 
    id: 2, 
    nombre: "Carlos Ramírez", 
    iniciales: "CR", 
    temaTesis: "Efectividad de Metodologías Ágiles", 
    tiempo: "Hace 3 horas", 
    estado: "Aprobado", 
    progreso: 80, 
    colorFondo: "avatar-verde",
    tareaPendiente: "Marco teórico",
    reunion: null 
  },
  { 
    id: 3, 
    nombre: "María González", 
    iniciales: "MG", 
    temaTesis: "Análisis de Factores de Deserción", 
    tiempo: "Hace 1 día", 
    estado: "En progreso", 
    progreso: 45, 
    colorFondo: "avatar-violeta",
    tareaPendiente: "",
    reunion: { dia: "28", mes: "ABR", tema: "Aprobación de capítulos", hora: "3:00 PM - 4:00 PM", destacada: false }
  }
];


// 2. MOTORES DE RENDERIZADO Funciones que fabrican el HTML


// A. Construcción de Tarjetas Principales de Alumnos
function cargarEstudiantes(listaA_Dibujar) {
  const contenedor = document.getElementById("contenedor-estudiantes");
  let contenidoHtml = "";

  if (listaA_Dibujar.length === 0) {
    contenedor.innerHTML = "<p style='color: var(--gris); text-align: center; padding: 20px;'>No se encontraron estudiantes con ese nombre.</p>";
    return; 
  }

  for (let i = 0; i < listaA_Dibujar.length; i++) {
    const estudiante = listaA_Dibujar[i];
    
    contenidoHtml += `
      <div class="tarjeta-estudiante">
        <div class="info-principal-estudiante">
          <div class="perfil-basico">
            <div class="avatar-iniciales ${estudiante.colorFondo}">${estudiante.iniciales}</div>
            <div class="detalles-estudiante">
              <h3 class="nombre-estudiante">${estudiante.nombre}</h3>
              <p class="tema-tesis">${estudiante.temaTesis}</p>
              <div class="metadatos-estudiante">
                <p class="tiempo-actualizacion">${estudiante.tiempo}</p>
                <div class="badge-estado badge-revision">${estudiante.estado}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="barra-progreso-contenedor">
          <div class="etiquetas-progreso">
            <p class="texto-progreso">Progreso general</p>
            <p class="porcentaje-progreso">${estudiante.progreso}%</p>
          </div>
          <div class="barra-fondo">
            <div class="barra-llena relleno-morado" style="width: ${estudiante.progreso}%;"></div>
          </div>
        </div>
        
        <div class="acciones-estudiante">
          <button id="btn-revisar-${estudiante.id}" class="btn-primario">Revisar tesis</button>
        </div>
      </div>
    `;
  }
  contenedor.innerHTML = contenidoHtml;
}

// B. recorrer y fabricar la Lista lateral de Revisiones Pendientes
function cargarRevisionesLaterales() {
  const contenedorRevisiones = document.getElementById("contenedor-revisiones");
  let contenidoHtmlLateral = "";

  for (let i = 0; i < baseDatosEstudiantes.length; i++) {
    const estudiante = baseDatosEstudiantes[i];

    if (estudiante.tareaPendiente !== "") {
      contenidoHtmlLateral += `
        <div class="item-revision">
          <div class="info-revision">
            <h4 class="nombre-revision">${estudiante.nombre}</h4>
            <p class="tarea-revision">${estudiante.tareaPendiente}</p>
            <p class="tiempo-actualizacion">${estudiante.tiempo}</p>
          </div>
          <button id="btn-revisar-lista-${estudiante.id}" class="btn-enlace">Revisar &rarr;</button>
        </div>
      `;
    }
  }
  contenedorRevisiones.innerHTML = contenidoHtmlLateral;
}

// C. Recorrer y fabricar la agenda de reuniones próximas
function cargarReuniones() {
  const contenedor = document.getElementById("contenedor-reuniones");
  let htmlReuniones = "";

  for (let i = 0; i < baseDatosEstudiantes.length; i++) {
    const estudiante = baseDatosEstudiantes[i];

    if (estudiante.reunion !== null) {
      let claseDestacada = "";
      if (estudiante.reunion.destacada === true) {
        claseDestacada = "reunion-destacada";
      }

      htmlReuniones += `
        <div class="item-reunion ${claseDestacada}">
          <div class="fecha-reunion">
            <p class="dia-reunion">${estudiante.reunion.dia}</p>
            <p class="mes-reunion">${estudiante.reunion.mes}</p>
          </div>
          <div class="info-reunion">
            <h4 class="nombre-revision">${estudiante.nombre}</h4>
            <p class="tema-reunion">${estudiante.reunion.tema}</p>
            <p class="hora-reunion">${estudiante.reunion.hora}</p>
          </div>
        </div>
      `;
    }
  }
  contenedor.innerHTML = htmlReuniones;
}


// 3.Logica analitica y sistemas de control 


// Motor de Filtrado en Tiempo Real para la Barra de Búsqueda
function ejecutarFiltro() {
  const inputBusqueda = document.getElementById("input-buscar-estudiante");
  const textoEscrito = inputBusqueda.value.toLowerCase(); 
  const estudiantesFiltrados = [];

  for (let i = 0; i < baseDatosEstudiantes.length; i++) {
    const estudiante = baseDatosEstudiantes[i];
    const nombreEnMinusculas = estudiante.nombre.toLowerCase();

    if (nombreEnMinusculas.includes(textoEscrito)) {
      // ESTA ES LA LÍNEA CORREGIDA. Destruimos el "studentsFiltrados ="
      estudiantesFiltrados.push(estudiante); 
    }
  }
  cargarEstudiantes(estudiantesFiltrados);
}

// Censo e Inyección Matemática para los Indicadores KPI Superiores
function actualizarEstadisticas() {
  let totalActivos = baseDatosEstudiantes.length; 
  let contadorPendientes = 0;
  let contadorAprobadas = 0;

  for (let i = 0; i < baseDatosEstudiantes.length; i++) {
    const estudiante = baseDatosEstudiantes[i];

    if (estudiante.estado === "En revisión") {
      contadorPendientes++;
    } else if (estudiante.estado === "Aprobado") {
      contadorAprobadas++;
    }
  }

  document.getElementById("kpi-activos").textContent = totalActivos;
  document.getElementById("kpi-pendientes").textContent = contadorPendientes;
  document.getElementById("kpi-aprobadas").textContent = contadorAprobadas;
}

// 4. centinelas de activacion

const botonFiltrar = document.getElementById("btn-filtrar");
const cajaBusqueda = document.getElementById("input-buscar-estudiante");

botonFiltrar.addEventListener("click", ejecutarFiltro);
cajaBusqueda.addEventListener("keyup", ejecutarFiltro);

// 5. ARRANQUE MAESTRO SINCRONIZADO (Invocación simultánea de funciones)
function iniciarDashboard() {
  cargarEstudiantes(baseDatosEstudiantes);
  actualizarEstadisticas();
  cargarRevisionesLaterales();
  cargarReuniones();
}

// Ejecución fulminante del sistema
iniciarDashboard();