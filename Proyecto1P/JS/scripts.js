// Espera a que todo el contenido HTML de la página se cargue antes de ejecutar el script.
// Esto evita errores al intentar acceder a elementos que aún no existen en el DOM.
document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // REFERENCIAS A ELEMENTOS HTML
  // ============================
  // Se obtienen los elementos principales de la página para manipularlos posteriormente.
  const body = document.body;
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const themeBtn = document.getElementById("themeBtn");
  const savedTheme = localStorage.getItem("theme");

  // ==================================
  // RECUPERACIÓN DEL TEMA GUARDADO
  // ==================================
  // Si el usuario había seleccionado previamente el modo oscuro,
  // se recupera desde localStorage y se aplica automáticamente.
  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (themeBtn) themeBtn.textContent = "☀️";
  }

  // ==================================
  // MENÚ DE NAVEGACIÓN RESPONSIVO
  // ==================================
  // Permite abrir y cerrar el menú hamburguesa en dispositivos móviles.
  if (navToggle && navMenu) {

    // Evento que abre o cierra el menú.
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");

      // Actualiza el atributo aria-expanded para accesibilidad.
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cuando se hace clic en un enlace del menú,
    // este se cierra automáticamente.
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ==================================
  // CAMBIO ENTRE MODO CLARO Y OSCURO
  // ==================================
  // Permite alternar el tema visual de la página
  // y guardar la preferencia del usuario.
  if (themeBtn) {

    themeBtn.addEventListener("click", () => {

      // Agrega o elimina la clase "dark".
      body.classList.toggle("dark");

      // Verifica si el modo oscuro está activo.
      const darkMode = body.classList.contains("dark");

      // Cambia el ícono del botón.
      themeBtn.textContent = darkMode ? "☀️" : "🌙";

      // Guarda la preferencia en el navegador.
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    });
  }

  // ==================================
  // VARIABLES DEL SLIDESHOW/CARRUSEL
  // ==================================
  // Obtiene todas las imágenes, botones y puntos indicadores.
  const slides = Array.from(document.querySelectorAll(".slideshow__img"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  // Índice de la imagen actualmente visible.
  let current = 0;

  // Variable para almacenar el intervalo automático.
  let intervalId = null;

  // ==================================
  // FUNCIÓN PARA MOSTRAR UNA DIAPOSITIVA
  // ==================================
  // Recibe la posición de la imagen a mostrar.
  function showSlide(index) {

    // Si no existen imágenes, termina la función.
    if (!slides.length) return;

    // Permite navegación circular.
    current = (index + slides.length) % slides.length;

    // Activa únicamente la diapositiva actual.
    slides.forEach((slide, i) =>
      slide.classList.toggle("active", i === current)
    );

    // Activa únicamente el indicador actual.
    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === current)
    );
  }

  // ==================================
  // FUNCIÓN PARA AVANZAR DIAPOSITIVA
  // ==================================
  function nextSlide() {
    showSlide(current + 1);
  }

  // ==================================
  // CONFIGURACIÓN DEL CARRUSEL
  // ==================================
  if (prevBtn && nextBtn && slides.length) {

    // Botón anterior.
    prevBtn.addEventListener("click", () => {
      showSlide(current - 1);
      restartAutoplay();
    });

    // Botón siguiente.
    nextBtn.addEventListener("click", () => {
      showSlide(current + 1);
      restartAutoplay();
    });

    // Permite seleccionar una diapositiva
    // haciendo clic sobre un punto indicador.
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.slide);
        showSlide(idx);
        restartAutoplay();
      });
    });

    // ==================================
    // INICIO DE REPRODUCCIÓN AUTOMÁTICA
    // ==================================
    function startAutoplay() {

      // Cambia de imagen cada 5 segundos.
      intervalId = setInterval(nextSlide, 5000);
    }

    // Reinicia el temporizador automático
    // cuando el usuario interactúa.
    function restartAutoplay() {
      clearInterval(intervalId);
      startAutoplay();
    }

    // Inicializa el carrusel.
    showSlide(0);
    startAutoplay();
  }

  // ==================================
  // ACORDEÓN (FAQ O CONTENIDO DESPLEGABLE)
  // ==================================
  // Permite abrir y cerrar elementos tipo acordeón.
  document.querySelectorAll(".accordion__trigger").forEach(trigger => {

    trigger.addEventListener("click", () => {

      // Obtiene el elemento padre del acordeón.
      const item = trigger.parentElement;

      // Verifica si ya está abierto.
      const isOpen = item.classList.contains("open");

      // Cierra todos los elementos abiertos.
      document.querySelectorAll(".accordion__item")
        .forEach(el => el.classList.remove("open"));

      // Si estaba cerrado, lo abre.
      if (!isOpen)
        item.classList.add("open");
    });
  });

  // ==================================
  // VALIDACIÓN DEL FORMULARIO
  // ==================================
  const form = document.getElementById("contactForm");

  if (form) {

    // Obtiene los campos del formulario.
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const courseInput = document.getElementById("course");
    const messageInput = document.getElementById("message");

    // Elementos donde se mostrarán errores.
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const courseError = document.getElementById("courseError");
    const messageError = document.getElementById("messageError");

    // Elemento para mostrar mensaje exitoso.
    const formSuccess = document.getElementById("formSuccess");

    // Expresión regular utilizada para validar correos electrónicos.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ==================================
    // EVENTO DE ENVÍO DEL FORMULARIO
    // ==================================
    form.addEventListener("submit", (e) => {

      // Evita el envío tradicional del formulario.
      e.preventDefault();

      let valid = true;

      // Obtiene y limpia los valores ingresados.
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const course = courseInput.value.trim();
      const message = messageInput.value.trim();

      // Limpia mensajes anteriores.
      nameError.textContent = "";
      emailError.textContent = "";
      courseError.textContent = "";
      messageError.textContent = "";
      formSuccess.textContent = "";

      // ======================
      // VALIDACIÓN DEL NOMBRE
      // ======================
      if (name.length < 3) {
        nameError.textContent =
          "Ingresa un nombre válido de al menos 3 caracteres.";
        valid = false;
      }

      // ======================
      // VALIDACIÓN DEL EMAIL
      // ======================
      if (!emailRegex.test(email)) {
        emailError.textContent =
          "Ingresa un correo electrónico válido.";
        valid = false;
      }

      // ======================
      // VALIDACIÓN DEL CURSO
      // ======================
      if (!course) {
        courseError.textContent =
          "Selecciona un curso de interés.";
        valid = false;
      }

      // ======================
      // VALIDACIÓN DEL MENSAJE
      // ======================
      if (message.length < 10) {
        messageError.textContent =
          "El mensaje debe tener al menos 10 caracteres.";
        valid = false;
      }

      // ==================================
      // SI TODO ES CORRECTO
      // ==================================
      if (valid) {

        // Muestra mensaje de éxito.
        formSuccess.textContent =
          "¡Mensaje enviado correctamente! Pronto nos pondremos en contacto.";

        // Limpia todos los campos del formulario.
        form.reset();
      }
    });
  }
});