# 🐺 Husky Dog Animation | HTML & CSS

Una animación de un perro **husky** creada con **HTML y CSS**, que utiliza formas, transiciones y movimientos para darle vida al personaje. El proyecto presenta al husky sobre un fondo azul, con animaciones de la cabeza, las orejas, los ojos, la boca, la lengua, el cuerpo y la cola.

## 🌐 Demo en vivo

Puedes ver el proyecto funcionando aquí:

👉 **[Ver animación en Netlify](https://delightful-gecko-002d74.netlify.app/)**

## ✨ Características

- 🐶 Husky construido con elementos HTML y estilos CSS, sin imágenes del personaje.
- 🎞️ Animaciones continuas mediante `@keyframes` y transformaciones CSS.
- 👀 Movimiento de ojos, orejas, cabeza y expresiones faciales.
- 🐕 Movimiento de la cola y ligeros desplazamientos del cuerpo.
- 🎨 Efecto visual adicional con filtros SVG (`feTurbulence` y `feDisplacementMap`).
- 📱 Tamaño adaptable a la ventana gracias a unidades `vmin`. En pantallas de hasta 400 px se desactiva el efecto SVG animado del contenedor.
- 🚀 No necesita JavaScript, frameworks ni procesos de compilación.

## 🛠️ Tecnologías utilizadas

- **HTML5:** estructura del personaje y definición de filtros SVG.
- **CSS3:** diseño, colores, posicionamiento y animaciones.
- **SVG:** filtros para el efecto de movimiento visual.
- **Netlify:** publicación del sitio web estático.

> El HTML también carga una hoja de normalización de estilos desde un CDN de CodePen Assets.

## 📁 Estructura del proyecto

```text
husky-dog-animation/
├── index.html     # Estructura HTML del husky y filtros SVG
├── style.css      # Diseño visual y animaciones
└── README.md      # Documentación del proyecto
```

## 🚀 Cómo ejecutar el proyecto

1. Descarga o clona el repositorio.
2. Abre la carpeta del proyecto en **Visual Studio Code** o en tu editor favorito.
3. Abre el archivo `index.html` en tu navegador. También puedes utilizar la extensión **Live Server** de VS Code.
4. ¡Disfruta de la animación! No es necesario instalar dependencias.

## 🎨 Personalización

Puedes modificar `style.css` para cambiar la apariencia del proyecto:

- **Color del fondo:** busca `background-color: #4F8EDB` en las reglas de `html, body`.
- **Colores del husky:** modifica las propiedades `background` y `background-color` de sus diferentes partes.
- **Velocidad de la animación:** ajusta la duración de `12s` en las animaciones principales.
- **Tamaño del personaje:** modifica `height: 60vmin` y `width: 84vmin` en `.husky`.