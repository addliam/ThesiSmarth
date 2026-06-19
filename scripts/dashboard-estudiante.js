// ─── Dashboard Estudiante ────────────────────────────────────────────────────────────────
// Responsable: Rosa Esther Diaz Luque
// Propiedad exclusiva. No editar fuera de esta rama.
const estudiante = {
  nombre: "Juan Pérez",
  carrera: "Ingeniería de Sistemas",
  tesisActivas: 2,
  diasRacha: 12,
  tesis: [
    {
      id:1,
      titulo: "Impacto de la IA en la Educación Superior",
      estado: "En progreso",
      etapa: "Metodología",
      progreso: 65,
      alertas: 2,
      tiempo: "Hace 2 horas",
      finalizada:false
    },
    {
      id:2,
      titulo: "Análisis de Factores de Deserción Estudiantil",
      estado: "En revisión",
      etapa: "Marco Teórico",
      progreso: 35,
      alertas: 0,
      tiempo: "Hace 3 días",
      finalizada:false
    },
    {
      id:3,
      titulo: "Optimización de Algoritmos en Redes WAN",
      estado: "Sustentado",
      etapa: "Finalizado",
      progreso: 100,
      alertas: 0,
      tiempo: "Hace 1 mes",
      finalizada: true
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
  const modal = document.getElementById("modal-setup-tesis");
  const panelVacio = document.getElementById("panel-bienvenida-vacio");
  const bloqueContenido = document.getElementById("bloque-dashboard-contenido");
  
  const btnAnterior = document.getElementById("btn-wizard-anterior");
  const btnSiguiente = document.getElementById("btn-wizard-siguiente");
  const btnGuardar = document.getElementById("btn-wizard-guardar");

  let pasoActual = 1;
  const totalPasos = 6;

  const inicializarDatosUsuario=() => {
    document.getElementById("avatar-usuario").textContent = estudiante.nombre
    .split(" ")
    .map(n => n[0])
    .join("")
    .substring(0,2);

    document.getElementById("nombre-usuario").textContent = estudiante.nombre;
    document.getElementById("carrera-usuario").textContent = `Estudiante - ${estudiante.carrera}`;
    document.getElementById("mensaje-bienvenida").textContent = `Bienvenido de nuevo, ${estudiante.nombre.split(" ")[0]}`;
  };

  const actualizarKpisSuperiores= ()=> {
    const tesisActivasLista= estudiante.tesis.filter(t=>!t.finalizada);
    document.getElementById("tesis-activas").textContent=tesisActivasLista.length;
    const sumaProgreso=tesisActivasLista.reduce((acc,curr)=> acc+curr.progreso,0);
    const promedio=tesisActivasLista.length>0 ? Math.round(sumaProgreso/tesisActivasLista.length):0;
    document.getElementById("progreso-promedio").textContent = `${promedio}%`;

    const totalAlertas = tesisActivasLista.reduce((acc, curr) => acc + curr.alertas, 0);
    document.getElementById("alertas-pendientes").textContent = totalAlertas;
    
    document.getElementById("dias-racha").textContent = estudiante.diasRacha;
  };

  const renderizarTesis=()=>{
    const contenedorTesis = document.getElementById("contenedor-tesis");
    contenedorTesis.innerHTML = "";

    const tesisVisibles = estudiante.tesis.filter(t => !t.finalizada);
    if (tesisVisibles.length === 0) {
      if (panelVacio) panelVacio.className = "panel-bienvenida-vacio";
      if (bloqueContenido) bloqueContenido.style.display = "none";
      return;
    } else {
      if (panelVacio) panelVacio.className = "panel-vacio-oculto";
      if (bloqueContenido) bloqueContenido.style.display = "block";
    }

    tesisVisibles.forEach(tesis=>{
      const claseEstado = tesis.estado.toLowerCase().replace(" ", "-");
        const alertaHTML = tesis.alertas > 0 
          ? `<button class="tesis-alerta-badge btn-alerta-interactiva" data-id="${tesis.id}" type="button"> 
              <img src="images/dashboard-estudiante/icon-exclamation-triangle.svg" alt="Alerta" class="tesis-alerta-icon">
              ${tesis.alertas}
            </button>` 
          : "<div></div>";

      contenedorTesis.innerHTML += `
        <article class="tesis-card">
          <div class="tesis-card-top">
            <h3>${tesis.titulo}</h3>
            ${alertaHTML}
          </div>
          
          <div id="detalles-alertas-${tesis.id}" class="alertas-desplegables-caja ocultar-bloque">
            <p><strong>Observaciones críticas del asesor:</strong></p>
            <ul>
              <li> <img src="images/dashboard-estudiante/icon-exclamation-triangle.svg"> Incoherencia detectada entre el título y el objetivo general.</li>
              <li> <img src="images/dashboard-estudiante/icon-exclamation-triangle.svg"> Redacción ambigua en el planteamiento del problema técnico.</li>
            </ul>
          </div>

          <div class="tesis-meta">
            <span class="meta-tiempo">
              <img src="images/dashboard-estudiante/icon-clock.svg" alt="Reloj" class="tesis-meta-icon">
              ${tesis.tiempo}
            </span>
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

    document.querySelectorAll(".btn-alerta-interactiva").forEach(boton => {
      boton.addEventListener("click", (e) => {
        const idTesis = e.currentTarget.getAttribute("data-id");
        const panelAlertas = document.getElementById(`detalles-alertas-${idTesis}`);
        if (panelAlertas) {
          panelAlertas.classList.toggle("ocultar-bloque");
        } 
      });
    });

    document.querySelectorAll(".btn-continuar-tesis").forEach(boton => {
      boton.addEventListener("click", (e) => {
        const idTesis = e.target.getAttribute("data-id");
        window.location.href = `gestionar-tesis.html?id=${idTesis}`;
      });
    });
  };

  const renderizarActividades = () => { 
    const listaActividad = document.getElementById("lista-actividad"); 
    listaActividad.innerHTML = ""; estudiante.actividad.forEach(act => {
      listaActividad.innerHTML += ` <li class="actividad-item item-${act.tipo}"> 
       <span class="actividad-titulo">${act.texto}</span> 
       <span class="actividad-detalle">${act.detalle}</span> 
       <span class="actividad-tiempo">${act.tiempo}</span> 
       </li> 
      `; 
    }); 
  };

  const renderizarHitos = () => {
    const listaHitos = document.getElementById("lista-hitos");
    listaHitos.innerHTML = "";
    
    estudiante.hitos.forEach((hito, index) => {
      listaHitos.innerHTML += `
        <li class="hito-item" id="hito-elemento-${index}">
          <div class="hito-fecha-caja">
            <span class="hito-numero">${hito.dia}</span>
            <span class="hito-mes">${hito.mes}</span>
          </div>
          <div class="hito-textos">
            <span class="hito-titulo">${hito.titulo}</span>
            <span class="hito-subtexto">${hito.detalle}</span>
          </div>
          <!-- BOTÓN INTERACTIVO ELIMINAR (X) -->
          <button class="btn-eliminar-hito" data-index="${index}">&times;</button>
        </li>
      `;
    });

    document.querySelectorAll(".btn-eliminar-hito").forEach(boton => {
      boton.addEventListener("click", (e) => {
        const indexHito = e.target.getAttribute("data-index");
        const elementoHito = document.getElementById(`hito-elemento-${indexHito}`);
        if (elementoHito) {
          elementoHito.style.opacity = "0";
          elementoHito.style.transform = "translateX(20px)";
          elementoHito.style.transition = "all 0.3s ease";
          setTimeout(() => {
            elementoHito.remove(); 
          }, 300);
        }
      });
    });
  };

  const abrirAsistenteWizard = () => {
    pasoActual = 1;
    actualizarVistaWizard();
    if (modal) modal.classList.add("activo");
  };

  const cerrarAsistenteWizard = () => {
    if (modal) modal.classList.remove("activo");
    document.getElementById("form-setup-tesis").reset();
  };

  const actualizarVistaWizard = () => {
    for (let i = 1; i <= totalPasos; i++) {
      const bloque = document.querySelector(`[data-bloque="${i}"]`);
      const dot = document.querySelector(`[data-paso="${i}"]`);
      
      if (bloque) bloque.classList.add("ocultar-bloque");
      if (dot) {
        if (i <= pasoActual) {
          dot.classList.add("activo");
        } else {
          dot.classList.remove("activo");
        }
      }
    }

    const bloqueActivo = document.querySelector(`[data-bloque="${pasoActual}"]`);
    if (bloqueActivo) bloqueActivo.classList.remove("ocultar-bloque");

    // Control inteligente de la botonera inferior (Atrás, Siguiente, Registrar)
    if (pasoActual === 1) {
      if (btnAnterior) btnAnterior.classList.add("ocultar-btn");
      if (btnSiguiente) btnSiguiente.classList.remove("ocultar-btn");
      if (btnGuardar) btnGuardar.classList.add("ocultar-btn");
    } else if (pasoActual === totalPasos) {
      if (btnAnterior) btnAnterior.classList.remove("ocultar-btn");
      if (btnSiguiente) btnSiguiente.classList.add("ocultar-btn");
      if (btnGuardar) btnGuardar.classList.remove("ocultar-btn");
    } else {
      if (btnAnterior) btnAnterior.classList.remove("ocultar-btn");
      if (btnSiguiente) btnSiguiente.classList.remove("ocultar-btn");
      if (btnGuardar) btnGuardar.classList.add("ocultar-btn");
    }
  };

  const validarCamposPasoActual = () => {
    if (pasoActual === 1) {
      const titulo = document.getElementById("input-titulo-tesis").value.trim();
      return titulo !== "";
    }
    return true; 
  };

  const procesarGuardarTesis = () => {
    if (!validarCamposPasoActual()) return;

    const tituloTexto = document.getElementById("input-titulo-tesis").value.trim();
    const metodologiaSeleccionada = document.getElementById("select-metodologia").value;

    cerrarAsistenteWizard();
    
    window.location.href = `gestionar-tesis.html?accion=nueva&titulo=${encodeURIComponent(tituloTexto)}&etapa=Introduccion&metodologia=${encodeURIComponent(metodologiaSeleccionada)}`;
  };

  const btnNuevaTesis = document.getElementById("btn-nueva-tesis");
  if (btnNuevaTesis) btnNuevaTesis.addEventListener("click", abrirAsistenteWizard);

  const btnCrearPrimera = document.getElementById("btn-crear-primera");
  if (btnCrearPrimera) btnCrearPrimera.addEventListener("click", abrirAsistenteWizard);

  const btnCerrarWizard = document.getElementById("btn-cerrar-wizard");
  if (btnCerrarWizard) btnCerrarWizard.addEventListener("click", cerrarAsistenteWizard);
  
  if (btnSiguiente) {
    btnSiguiente.addEventListener("click", (e) => {
      e.preventDefault()
      if (validarCamposPasoActual()) {
        if (pasoActual < totalPasos) {
          pasoActual++;
          actualizarVistaWizard();
        }
      } else {
        alert("Por favor, ingrese el título de la investigación antes de avanzar.");
      }
    });
  }
  
  if (btnAnterior) {
    btnAnterior.addEventListener("click", () => {
      if (pasoActual > 1) {
        pasoActual--;
        actualizarVistaWizard();
      }
    });
  }

  if (btnGuardar) btnGuardar.addEventListener("click", procesarGuardarTesis);

  inicializarDatosUsuario();
  actualizarKpisSuperiores();
  renderizarTesis();
  renderizarActividades();
  renderizarHitos();
});

const btnRecursos = document.getElementById("btn-recursos");
  if (btnRecursos) {
    btnRecursos.addEventListener("click", (e) => {
      e.preventDefault(); 
      
      const contenedorRecursos = document.querySelector(".recursos-card");
      if (contenedorRecursos) {
        contenedorRecursos.innerHTML = `
          <h3>Materiales Oficiales</h3>
          <p>Selecciona el recurso metodológico que deseas descargar en tu equipo:</p>
          
          <div class="recursos-descargas-lista">
            <a href="images/dashboard-estudiante/plantilla-estructura-tesis.png" download class="btn-descarga-recurso">
              Estructura de Tesis (Docx)
            </a>
            
            <a href="images/dashboard-estudiante/manual-normas-apa7.png" target="_blank" class="btn-descarga-recurso btn-recurso-blanco">
              Guía de Citación APA 7 (PDF)
            </a>
          </div>
        `;
      }
    });
  }
  