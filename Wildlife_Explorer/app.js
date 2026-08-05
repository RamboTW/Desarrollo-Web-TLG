"use strict";

const slides = document.querySelectorAll(".slide");
const thumbnails = document.querySelectorAll(".thumbnail");

const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const progressBar = document.getElementById("progressBar");

const subscribeModal =
    document.getElementById("subscribeModal");

const closeModalButton =
    document.getElementById("closeModal");

const subscribeForm =
    document.getElementById("subscribeForm");

const subscribeMessage =
    document.getElementById("subscribeMessage");

const contactForm =
    document.getElementById("contactForm");

const contactMessageResult =
    document.getElementById("contactMessageResult");

const carousel =
    document.querySelector(".carousel");

const AUTO_TIME = 7000;

let currentIndex = 0;
let automaticSlider;

/**
 * Muestra una diapositiva determinada.
 */
function showSlide(index) {
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentIndex;

        slide.classList.toggle("active", isActive);
        slide.setAttribute(
            "aria-hidden",
            String(!isActive)
        );
    });

    thumbnails.forEach((thumbnail, thumbnailIndex) => {
        const isActive = thumbnailIndex === currentIndex;

        thumbnail.classList.toggle("active", isActive);
        thumbnail.setAttribute(
            "aria-pressed",
            String(isActive)
        );
    });

    restartProgressBar();
}

/**
 * Avanza a la siguiente diapositiva.
 */
function nextSlide() {
    showSlide(currentIndex + 1);
}

/**
 * Regresa a la diapositiva anterior.
 */
function previousSlide() {
    showSlide(currentIndex - 1);
}

/**
 * Reinicia la barra de progreso.
 */
function restartProgressBar() {
    progressBar.style.animation = "none";

    void progressBar.offsetWidth;

    progressBar.style.animation =
        `progressAnimation ${AUTO_TIME}ms linear forwards`;
}

/**
 * Inicia nuevamente el cambio automático.
 */
function restartAutomaticSlider() {
    clearInterval(automaticSlider);

    automaticSlider = setInterval(() => {
        nextSlide();
    }, AUTO_TIME);
}

/**
 * Cambia la diapositiva y reinicia el tiempo automático.
 */
function changeSlide(index) {
    showSlide(index);
    restartAutomaticSlider();
}

// Flecha siguiente
nextButton.addEventListener("click", () => {
    changeSlide(currentIndex + 1);
});

// Flecha anterior
previousButton.addEventListener("click", () => {
    changeSlide(currentIndex - 1);
});

// Miniaturas
thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        const selectedIndex =
            Number(thumbnail.dataset.index);

        changeSlide(selectedIndex);
    });
});

// Pausa cuando el mouse está sobre el carrusel
carousel.addEventListener("mouseenter", () => {
    clearInterval(automaticSlider);
    progressBar.style.animationPlayState = "paused";
});

// Continúa cuando el mouse sale del carrusel
carousel.addEventListener("mouseleave", () => {
    restartAutomaticSlider();
    restartProgressBar();
});

// Botones SEE MORE
document
    .querySelectorAll(".see-more-btn")
    .forEach((button) => {
        button.addEventListener("click", () => {
            document
                .getElementById("info")
                .scrollIntoView({
                    behavior: "smooth"
                });
        });
    });

/**
 * Abre la ventana de suscripción.
 */
function openSubscribeModal() {
    subscribeModal.classList.add("active");
    subscribeModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
    subscribeMessage.textContent = "";

    setTimeout(() => {
        document
            .getElementById("subscribeEmail")
            .focus();
    }, 100);
}

/**
 * Cierra la ventana de suscripción.
 */
function closeSubscribeModal() {
    subscribeModal.classList.remove("active");
    subscribeModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";
}

// Botones SUBSCRIBE
document
    .querySelectorAll(".subscribe-btn")
    .forEach((button) => {
        button.addEventListener(
            "click",
            openSubscribeModal
        );
    });

// Botón de cerrar
closeModalButton.addEventListener(
    "click",
    closeSubscribeModal
);

// Cerrar haciendo clic fuera
subscribeModal.addEventListener(
    "click",
    (event) => {
        if (event.target === subscribeModal) {
            closeSubscribeModal();
        }
    }
);

// Cerrar con Escape
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        subscribeModal.classList.contains("active")
    ) {
        closeSubscribeModal();
    }

    if (event.key === "ArrowRight") {
        changeSlide(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        changeSlide(currentIndex - 1);
    }
});

// Formulario de suscripción
subscribeForm.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();

        const email =
            document.getElementById(
                "subscribeEmail"
            ).value.trim();

        contactMessageResult.textContent =
        `Gracias, ${name}. Tu mensaje fue registrado correctamente.`;

        subscribeForm.reset();

        setTimeout(() => {
            closeSubscribeModal();
        }, 1800);
    }
);

// Formulario de contacto
contactForm.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();

        const name =
            document.getElementById(
                "contactName"
            ).value.trim();

        contactMessageResult.textContent =
            `Thank you, ${name}. Your message was registered.`;

        contactForm.reset();
    }
);

// Pausa cuando la pestaña no está visible
document.addEventListener(
    "visibilitychange",
    () => {
        if (document.hidden) {
            clearInterval(automaticSlider);
        } else {
            restartAutomaticSlider();
            restartProgressBar();
        }
    }
);

// Inicio del carrusel
showSlide(0);
restartAutomaticSlider();