document.addEventListener("DOMContentLoaded", () => {
  
  const btnHeroDemo = document.getElementById("btn-hero-demo");
  const btnFooterDemo = document.getElementById("btn-footer-demo");
  const btnCerrarDemo = document.getElementById("btn-cerrar-demo");
  const panelMenuDemo = document.getElementById("panel-menu-demo");

  const mostrarMenuDemo = (evento) => {
    evento.preventDefault(); 
    panelMenuDemo.classList.add("open");
  };

  const ocultarMenuDemo = () => {
    panelMenuDemo.classList.remove("open");
  };

  if (btnHeroDemo) {
    btnHeroDemo.addEventListener("click", mostrarMenuDemo);
  }

  if (btnFooterDemo) {
    btnFooterDemo.addEventListener("click", mostrarMenuDemo);
  }

  if (btnCerrarDemo) {
    btnCerrarDemo.addEventListener("click", ocultarMenuDemo);
  }
});