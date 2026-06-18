/* ════════════════════════════════════════════════════
   gestionar-tesis.js
   Responsable: Liam Yostin Quiñones Carhuaz
   ════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Helpers ──────────────────────────────────────── */

  function autoResize(ta) {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  function fadeOut(el, ms = 200) {
    el.style.transition = `opacity ${ms}ms`;
    el.style.opacity = '0';
    setTimeout(() => el.remove(), ms);
  }

  /* ── Auto-resize inicial en todos los textareas ──── */
  document.querySelectorAll('textarea').forEach(ta => {
    ta.style.overflow = 'hidden';
    autoResize(ta);
    ta.addEventListener('input', () => autoResize(ta));
  });

  /* ── Navegación por pasos ────────────────────────── */
  const stepNavItems = document.querySelectorAll('[data-step-nav]');
  const stepContents = document.querySelectorAll('.step-content');
  const stepConnectors = document.querySelectorAll('.step-connector');
  let currentStep = 2;

  function navigateToStep(n) {
    if (n < 1 || n > 6) return;
    currentStep = n;

    // Actualiza indicadores visuales del steps-bar
    stepNavItems.forEach(item => {
      const s = parseInt(item.dataset.stepNav);
      const circle = item.querySelector('.step-circle');

      item.classList.remove('done', 'active');
      circle.classList.remove('done', 'active');

      if (s < n) {
        item.classList.add('done');
        circle.classList.add('done');
        circle.innerHTML = '<i class="fa-solid fa-check"></i>';
      } else if (s === n) {
        item.classList.add('active');
        circle.classList.add('active');
        circle.textContent = s;
      } else {
        circle.textContent = s;
      }
    });

    // Actualiza conectores
    stepConnectors.forEach((conn, idx) => {
      conn.classList.toggle('done', idx + 1 < n);
    });

    // Muestra el contenido del paso activo
    stepContents.forEach(content => {
      content.classList.toggle('active', parseInt(content.dataset.step) === n);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Click en step nav items
  stepNavItems.forEach(item => {
    item.addEventListener('click', () => navigateToStep(parseInt(item.dataset.stepNav)));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') navigateToStep(parseInt(item.dataset.stepNav));
    });
  });

  /* ── Botones Anterior / Siguiente (delegación) ───── */
  document.addEventListener('click', e => {
    if (e.target.closest('.btn-anterior')) {
      navigateToStep(currentStep - 1);
      return;
    }

    const siguiente = e.target.closest('.btn-siguiente');
    if (siguiente && !siguiente.disabled) {
      // Validación en paso 2: objetivos pendientes
      if (currentStep === 2) {
        const pendientes = document.querySelectorAll('.step-content.active .objetivo-num.pendiente').length;
        if (pendientes > 0) {
          alert(`Tienes ${pendientes} objetivo(s) pendiente(s). Complétalos antes de continuar.`);
          return;
        }
      }
      navigateToStep(currentStep + 1);
    }
  });

  /* ── Cerrar / ignorar sugerencias (delegación) ───── */
  document.addEventListener('click', e => {
    // Cerrar toda la card de sugerencias
    const closeBtn = e.target.closest('.btn-close-sugerencias');
    if (closeBtn) {
      const card = closeBtn.closest('.card-sidebar');
      if (card) fadeOut(card, 200);
      return;
    }

    // Ignorar / aplicar un item individual
    const actionBtn = e.target.closest('.btn-ignorar, .btn-aplicar');
    if (actionBtn) {
      const item = actionBtn.closest('.sugerencia-item');
      if (item) fadeOut(item, 200);
    }
  });

  /* ── Lógica reutilizable para listas dinámicas ───── */

  function makeItemHTML(num, placeholder) {
    return `
      <div class="objetivo-num pendiente">${num}</div>
      <div class="objetivo-content">
        <div class="objetivo-box pendiente-box">
          <textarea class="objetivo-input" rows="2" placeholder="${placeholder}"></textarea>
        </div>
        <div class="status-tag naranja">
          <i class="fa-solid fa-circle-exclamation"></i>
          Completa este campo para continuar
        </div>
      </div>`;
  }

  function attachDynamicItem(item, container) {
    const ta = item.querySelector('textarea');
    ta.style.overflow = 'hidden';
    autoResize(ta);
    ta.addEventListener('input', () => {
      autoResize(ta);
      onItemInput(item, ta);
    });
    container.appendChild(item);
    requestAnimationFrame(() => { item.style.opacity = '1'; });
    ta.focus();
  }

  function onItemInput(item, ta) {
    const num = item.querySelector('.objetivo-num');
    const box = item.querySelector('.objetivo-box');
    const tag = item.querySelector('.status-tag');
    const filled = ta.value.trim().length > 0;

    if (filled) {
      num.classList.remove('pendiente');
      box.classList.remove('pendiente-box');
      tag.classList.replace('naranja', 'verde');
      tag.innerHTML = '<i class="fa-solid fa-circle-check"></i> Objetivo registrado';
    } else {
      num.classList.add('pendiente');
      box.classList.add('pendiente-box');
      tag.classList.replace('verde', 'naranja');
      tag.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Completa este campo para continuar';
    }
  }

  function addDynamicItem(containerId, addBtnId, placeholder) {
    const container = document.getElementById(containerId);
    const addBtn    = document.getElementById(addBtnId);
    if (!container || !addBtn) return;

    let count = addBtn.closest('.panel-left').querySelectorAll('.objetivo-item').length;

    addBtn.addEventListener('click', () => {
      count++;
      const item = document.createElement('div');
      item.className = 'objetivo-item';
      item.style.opacity = '0';
      item.style.transition = 'opacity 0.2s';
      item.innerHTML = makeItemHTML(count, placeholder + ' ' + count + '…');
      attachDynamicItem(item, container);
    });

    // Adjuntar listeners a los ítems que ya existen en el HTML
    addBtn.closest('.panel-left').querySelectorAll('.objetivo-item').forEach(item => {
      const ta = item.querySelector('.objetivo-input');
      if (!ta) return;
      ta.addEventListener('input', () => onItemInput(item, ta));
    });
  }

  // Paso 1 — Preguntas secundarias
  addDynamicItem('preguntasExtra', 'addPreguntaBtn', 'Escribe la pregunta secundaria');

  // Paso 2 — Objetivos específicos (con progreso)
  (function () {
    const container = document.getElementById('objetivosExtra');
    const addBtn    = document.getElementById('addObjetivoBtn');
    if (!container || !addBtn) return;

    let count = 3;

    function updateProgreso() {
      const panelLeft = addBtn.closest('.panel-left');
      const total  = panelLeft.querySelectorAll('.objetivo-item').length;
      const filled = [...panelLeft.querySelectorAll('.objetivo-item')].filter(item => {
        const ta = item.querySelector('.objetivo-input');
        return ta && ta.value.trim().length > 0;
      }).length;

      const pct = total > 0 ? Math.round((filled / total) * 100) : 0;

      const countEl = document.getElementById('progresoCount');
      const pctEl   = document.getElementById('progresoPct');
      const barEl   = document.getElementById('progresoBar');

      if (countEl) countEl.textContent = filled;
      if (pctEl)   pctEl.textContent   = pct + '%';
      if (barEl) {
        barEl.style.width = pct + '%';
        barEl.classList.toggle('full', pct === 100);
      }
    }

    function onObjetivoInput(item, ta) {
      const num  = item.querySelector('.objetivo-num');
      const box  = item.querySelector('.objetivo-box');
      const tag  = item.querySelector('.status-tag');
      const filled = ta.value.trim().length > 0;

      if (filled) {
        num.classList.remove('pendiente');
        box.classList.remove('pendiente-box');
        tag.classList.replace('naranja', 'verde');
        tag.innerHTML = '<i class="fa-solid fa-circle-check"></i> Objetivo registrado';
      } else {
        num.classList.add('pendiente');
        box.classList.add('pendiente-box');
        tag.classList.replace('verde', 'naranja');
        tag.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Completa este objetivo para continuar';
      }
      updateProgreso();
    }

    // Listeners en ítems existentes (HTML)
    addBtn.closest('.panel-left').querySelectorAll('.objetivo-item').forEach(item => {
      const ta = item.querySelector('.objetivo-input');
      if (!ta) return;
      ta.addEventListener('input', () => onObjetivoInput(item, ta));
    });

    addBtn.addEventListener('click', () => {
      count++;
      const item = document.createElement('div');
      item.className   = 'objetivo-item';
      item.dataset.index = count;
      item.style.opacity = '0';
      item.style.transition = 'opacity 0.2s';
      item.innerHTML = makeItemHTML(count, 'Escribe el objetivo específico ' + count);
      const ta = item.querySelector('textarea');
      ta.style.overflow = 'hidden';
      autoResize(ta);
      ta.addEventListener('input', () => {
        autoResize(ta);
        onObjetivoInput(item, ta);
      });
      container.appendChild(item);
      requestAnimationFrame(() => { item.style.opacity = '1'; });
      ta.focus();
      updateProgreso();
    });
  }());

  // Paso 3 — Hipótesis específicas
  addDynamicItem('hipotesisExtra', 'addHipotesisBtn', 'Escribe la hipótesis específica');

  // Paso 4 — Antecedentes y Bases teóricas
  (function () {
    let antCount  = 1;
    let baseCount = 1;

    const antExtra  = document.getElementById('antecedentesExtra');
    const baseExtra = document.getElementById('basesExtra');
    const antBtn    = document.getElementById('addAntecedenteBtn');
    const baseBtn   = document.getElementById('addBaseBtn');

    if (antBtn && antExtra) {
      antBtn.addEventListener('click', () => {
        antCount++;
        const bloque = document.createElement('div');
        bloque.className = 'bloque-item';
        bloque.style.opacity = '0';
        bloque.style.transition = 'opacity 0.2s';
        bloque.innerHTML = `
          <div class="bloque-header">
            <span class="bloque-num">Antecedente ${antCount}</span>
          </div>
          <div class="campo-grupo">
            <div class="campo-label">Título del estudio</div>
            <input class="campo-input" type="text" placeholder="Título del estudio...">
          </div>
          <div class="campo-grupo">
            <div class="campo-label">Autor / Año / País</div>
            <input class="campo-input" type="text" placeholder="Autor / Año / País">
          </div>
          <div class="campo-grupo">
            <div class="campo-label">Conclusión relevante</div>
            <textarea class="campo-input" rows="2" placeholder="Conclusión relevante para esta tesis..." style="resize:none"></textarea>
          </div>`;
        antExtra.appendChild(bloque);
        requestAnimationFrame(() => { bloque.style.opacity = '1'; });
        bloque.querySelector('input').focus();
      });
    }

    if (baseBtn && baseExtra) {
      baseBtn.addEventListener('click', () => {
        baseCount++;
        const bloque = document.createElement('div');
        bloque.className = 'bloque-item';
        bloque.style.opacity = '0';
        bloque.style.transition = 'opacity 0.2s';
        bloque.innerHTML = `
          <div class="bloque-header">
            <span class="bloque-num">Base teórica ${baseCount}</span>
          </div>
          <div class="campo-grupo">
            <div class="campo-label">Teoría o concepto</div>
            <input class="campo-input" type="text" placeholder="Nombre de la teoría o concepto...">
          </div>
          <div class="campo-grupo">
            <div class="campo-label">Autor principal</div>
            <input class="campo-input" type="text" placeholder="Autor (año)">
          </div>
          <div class="campo-grupo">
            <div class="campo-label">Definición aplicada a esta investigación</div>
            <textarea class="campo-input" rows="2" placeholder="Definición aplicada..." style="resize:none"></textarea>
          </div>`;
        baseExtra.appendChild(bloque);
        requestAnimationFrame(() => { bloque.style.opacity = '1'; });
        bloque.querySelector('input').focus();
      });
    }
  }());

  /* ── Mobile menu ─────────────────────────────────── */
  const menuBtn        = document.getElementById('menuBtn');
  const mobileMenu     = document.getElementById('mobileMenu');
  const closeMobileBtn = document.getElementById('closeMobileMenu');

  function openMobileMenu() {
    mobileMenu.style.display = 'block';
    requestAnimationFrame(() => mobileMenu.classList.add('open'));
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.addEventListener('transitionend', () => {
      mobileMenu.style.display = 'none';
    }, { once: true });
  }

  menuBtn?.addEventListener('click', openMobileMenu);
  closeMobileBtn?.addEventListener('click', closeMobileMenu);
  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  /* ── Botón Guardar (feedback visual) ─────────────── */
  const btnGuardar = document.querySelector('.btn-guardar');
  btnGuardar?.addEventListener('click', () => {
    const original = btnGuardar.innerHTML;
    btnGuardar.innerHTML = '<i class="fa-solid fa-check"></i> Guardado';
    btnGuardar.disabled  = true;
    setTimeout(() => {
      btnGuardar.innerHTML = original;
      btnGuardar.disabled  = false;
    }, 2000);
  });

}());
