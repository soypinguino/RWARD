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
  var duracionAutoplay = 12000; // 12 segundos entre cada cambio

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

// ===================== CARRUSEL DE TARJETAS =====================
(function () {
  var viewport = document.querySelector(".tarjetas-carrusel__viewport");
  var anterior = document.getElementById("tarjetasAnterior");
  var siguiente = document.getElementById("tarjetasSiguiente");
  if (!viewport) return;

  function desplazar(direccion) {
    var tarjeta = viewport.querySelector(".tarjeta-producto");
    var ancho = tarjeta ? tarjeta.offsetWidth + 22 : 220; // 22 = espacio entre tarjetas
    viewport.scrollBy({ left: direccion * ancho * 2, behavior: "smooth" });
  }

  siguiente.addEventListener("click", function () { desplazar(1); });
  anterior.addEventListener("click", function () { desplazar(-1); });
})();

// ===================== SELECCIÓN DE PAQUETE Y TOTAL =====================
(function () {
  var grid = document.getElementById("recargaGrid");
  var totalTexto = document.getElementById("totalRecarga");
  var btnComprar = document.getElementById("btnComprar");
  if (!grid) return;

  var items = grid.querySelectorAll(".recarga-item");
  var seleccionado = null;

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      items.forEach(function (i) { i.classList.remove("recarga-item--activo"); });
      item.classList.add("recarga-item--activo");

      seleccionado = item;
      var precio = parseFloat(item.getAttribute("data-precio"));
      totalTexto.textContent = "USD " + precio.toFixed(2);
    });
  });

  btnComprar.addEventListener("click", function () {
    if (!seleccionado) {
      alert("Selecciona un paquete antes de continuar.");
      return;
    }
    var idJugador = document.getElementById("idJugador").value.trim();
    if (!idJugador) {
      alert("Ingresa tu ID de jugador.");
      return;
    }
    alert("Compra de \"" + seleccionado.getAttribute("data-nombre") + "\" por " + totalTexto.textContent);
  });
})();

// ===================== BOTÓN DE FAVORITOS =====================
(function () {
  var btnFavorito = document.getElementById("btnFavorito");
  if (!btnFavorito) return;

  btnFavorito.addEventListener("click", function () {
    var icono = btnFavorito.querySelector("i");
    var esFavorito = btnFavorito.classList.toggle("activo");

    if (esFavorito) {
      icono.classList.remove("fa-regular");
      icono.classList.add("fa-solid");
    } else {
      icono.classList.remove("fa-solid");
      icono.classList.add("fa-regular");
    }
  });
})();