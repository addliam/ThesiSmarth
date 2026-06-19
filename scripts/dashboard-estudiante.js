const guardarEnLocalStorage = () => {
  localStorage.setItem("proyecto_tesis_estudiante", JSON.stringify(estudiante));
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

  const inicializarDatosUsuario = () => {
    document.getElementById("avatar-usuario").textContent = estudiante.nombre
      .split(" ")
      .map(n => n[0])
      .join("")
      .substring(0, 2);
    document.getElementById("nombre-usuario").textContent = estudiante.nombre;
    document.getElementById("carrera-usuario").textContent = `Estudiante - ${estudiante.carrera}`;
    document.getElementById("mensaje-bienvenida").textContent = `Bienvenido de nuevo, ${estudiante.nombre.split(" ")[0]}`;
  };

  const actualizarKpisSuperiores = () => {
    const tesisActivasLista = estudiante.tesis.filter(t => !t.finalizada);
    document.getElementById("tesis-activas").textContent = tesisActivasLista.length;
    
    const sumaProgreso = tesisActivasLista.reduce((acc, curr) => acc + curr.progreso, 0);
    const promedio = tesisActivasLista.length > 0 ? Math.round(sumaProgreso / tesisActivasLista.length) : 0;
    document.getElementById("progreso-promedio").textContent = `${promedio}%`;
    
    const totalAlertas = tesisActivasLista.reduce((acc, curr) => acc + curr.alertas, 0);
    document.getElementById("alertas-pendientes").textContent = totalAlertas;
    
    document.getElementById("dias-racha").textContent = estudiante.diasRacha;
  };

  const renderizarTesis = () => {
    const contenedorTesis = document.getElementById("contenedor-tesis");
    if (!contenedorTesis) return;
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

    tesisVisibles.forEach(tesis => {
      const claseEstado = tesis.estado.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "-");
      
      const alertaHTML = tesis.alertas > 0 
        ? `<button class="tesis-alerta-badge btn-alerta-interactiva" data-id="${tesis.id}" type="button"> 
            <img src="images/dashboard-estudiante/icon-exclamation-triangle.svg" alt="Alerta" class="tesis-alerta-icon">
            ${tesis.alertas}
           </button>` 
        : "<div></div>";

      let botonAccionPrincipalHTML = "";
      if (tesis.estado === "Borrador") {
        botonAccionPrincipalHTML = `<button class="btn-enviar-revision-dinamico" data-id="${tesis.id}" style="background-color: #059669; color: white; border: none; padding: 0.6rem 1rem; border-radius: 0.375rem; font-weight: 600; cursor: pointer;">Enviar a revisión</button>`;
      } else {
        botonAccionPrincipalHTML = `<button class="btn-continuar-tesis" data-id="${tesis.id}">Continuar</button>`;
      }

      contenedorTesis.innerHTML += `
        <article class="tesis-card">
          <div class="tesis-card-top">
            <h3>${tesis.titulo}</h3>
            ${alertaHTML}
          </div>
          <div id="detalles-alertas-${tesis.id}" class="alertas-desplegables-caja ocultar-bloque">
            <p><strong>Observaciones críticas del asesor:</strong></p>
            <ul>
              <li><img src="images/dashboard-estudiante/icon-exclamation-triangle.svg"> Incoherencia detectada en la estructura inicial.</li>
            </ul>
          </div>
          <div class="tesis-meta">
            <span class="meta-tiempo">
              <img src="images/dashboard-estudiante/icon-clock.svg" alt="Reloj" class="tesis-meta-icon">
              ${tesis.tiempo}
            </span>
            <span class="meta-estado ${claseEstado}" style="${tesis.estado === 'Borrador' ? 'background-color: #f3f4f6; color: #4b5563;' : ''}">${tesis.estado}</span>
          </div>
          <div class="tesis-progreso-info">
            <span>Etapa actual: <strong>${tesis.etapa}</strong></span>
            <span class="tesis-porcentaje-numero">${tesis.progreso}%</span>
          </div>
          <div class="barra-progreso-contenedor">
            <div class="barra-progreso-relleno" style="--ancho-progreso: ${tesis.progreso}%;"></div>
          </div>
          <div class="tesis-card-footer">
            <button class="btn-ver-progreso" data-id="${tesis.id}">Ver progreso</button>
            ${botonAccionPrincipalHTML}
          </div>
        </article>
      `;
    });

    document.querySelectorAll(".btn-alerta-interactiva").forEach(boton => {
      boton.addEventListener("click", (e) => {
        const idTesis = e.currentTarget.getAttribute("data-id");
        const panelAlertas = document.getElementById(`detalles-alertas-${idTesis}`);
        if (panelAlertas) panelAlertas.classList.toggle("ocultar-bloque");
      });
    });

    document.querySelectorAll(".btn-continuar-tesis").forEach(boton => {
      boton.addEventListener("click", (e) => {
        const idTesis = e.currentTarget.getAttribute("data-id");
        window.location.href = `gestionar-tesis.html?id=${idTesis}`;
      });
    });

    document.querySelectorAll(".btn-enviar-revision-dinamico").forEach(boton => {
      boton.addEventListener("click", (e) => {
        const idTesis = e.currentTarget.getAttribute("data-id");
        const tesisSeleccionada = estudiante.tesis.find(t => t.id == idTesis);
        
        if (tesisSeleccionada) {
          tesisSeleccionada.estado = "En revisión";
          tesisSeleccionada.etapa = "Propuesta Entregada";
          tesisSeleccionada.tiempo = "Enviado hace un momento";
          
          estudiante.actividad.unshift({
            texto: "Propuesta enviada",
            detalle: tesisSeleccionada.titulo.substring(0, 25) + "...",
            tiempo: "Hace un momento",
            tipo: "verde"
          });

          guardarEnLocalStorage();
          actualizarKpisSuperiores();
          renderizarTesis();
          renderizarActividades();
          alert("¡Tu propuesta ha sido enviada al asesor con éxito!");
        }
      });
    });
  };

  const renderizarActividades = () => { 
    const listaActividad = document.getElementById("lista-actividad"); 
    if (!listaActividad) return;
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
  };

  const renderizarHitos = () => {
    const listaHitos = document.getElementById("lista-hitos");
    if (!listaHitos) return;
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
          <button class="btn-eliminar-hito" data-index="${index}">&times;</button>
        </li>
      `;
    });

    document.querySelectorAll(".btn-eliminar-hito").forEach(boton => {
      boton.addEventListener("click", (e) => {
        const indexHito = e.target.getAttribute("data-index");
        const elementoHito = document.getElementById(`hito-elemento-${indexHito}`);
        if (elementoHito) {
          elementoHito.remove();
        }
      });
    });
  };