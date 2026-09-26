// ===================== ANIMACIÓN DE APARICIÓN AL DESLIZAR =====================
document.addEventListener("DOMContentLoaded", function () {
  var elementosAnimados = document.querySelectorAll(".animar-aparicion");

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("es-visible");
        observador.unobserve(entrada.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  elementosAnimados.forEach(function (elemento) {
    observador.observe(elemento);
  });
});


// ===================== HEADER TRANSPARENTE CON DIFUMINACIÓN =====================
(function () {
  var encabezado = document.getElementById("encabezado");
  if (!encabezado) return;

  function actualizarEncabezado() {
    if (window.scrollY > 10) {
      encabezado.classList.add("encabezado--scroll");
    } else {
      encabezado.classList.remove("encabezado--scroll");
    }
  }

  window.addEventListener("scroll", actualizarEncabezado);
  actualizarEncabezado();
})();


// ===================== CARRUSEL DE OFERTAS =====================
(function () {
  var pista = document.getElementById("carruselPista");
  if (!pista) return;

  var slides = pista.querySelectorAll(".carrusel-ofertas__slide");
  var indicadoresContenedor = document.getElementById("carruselIndicadores");
  var flechaAnterior = document.getElementById("flechaAnterior");
  var flechaSiguiente = document.getElementById("flechaSiguiente");
  var contenedor = document.getElementById("carruselOfertas");

  var indiceActual = 0;
  var intervalo;
  var duracionAutoplay = 6000; // 6 segundos entre cada cambio

  // Crea un punto indicador por cada slide
  slides.forEach(function (_, indice) {
    var punto = document.createElement("button");
    punto.className = "carrusel-ofertas__punto";
    punto.setAttribute("aria-label", "Ir a la diapositiva " + (indice + 1));
    punto.addEventListener("click", function () {
      irADiapositiva(indice);
      reiniciarAutoplay();
    });
    indicadoresContenedor.appendChild(punto);
  });

  var puntos = indicadoresContenedor.querySelectorAll(".carrusel-ofertas__punto");

  function actualizarIndicadores() {
    puntos.forEach(function (punto, indice) {
      punto.classList.toggle("carrusel-ofertas__punto--activo", indice === indiceActual);
    });
  }

  function irADiapositiva(indice) {
    indiceActual = (indice + slides.length) % slides.length;
    pista.style.transform = "translateX(-" + (indiceActual * 100) + "%)";
    actualizarIndicadores();
  }

  function siguiente() {
    irADiapositiva(indiceActual + 1);
  }

  function anterior() {
    irADiapositiva(indiceActual - 1);
  }

  function iniciarAutoplay() {
    intervalo = setInterval(siguiente, duracionAutoplay);
  }

  function reiniciarAutoplay() {
    clearInterval(intervalo);
    iniciarAutoplay();
  }

  flechaSiguiente.addEventListener("click", function () {
    siguiente();
    reiniciarAutoplay();
  });

  flechaAnterior.addEventListener("click", function () {
    anterior();
    reiniciarAutoplay();
  });

  // Pausa el autoplay cuando el mouse está encima del carrusel
  contenedor.addEventListener("mouseenter", function () {
    clearInterval(intervalo);
  });
  contenedor.addEventListener("mouseleave", function () {
    iniciarAutoplay();
  });

  actualizarIndicadores();
  iniciarAutoplay();
})();
