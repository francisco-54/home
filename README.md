# GCAB Company — Landing Page

React 18 + Vite · CSS puro (sin Tailwind) · Font Awesome 6 · Unsplash + Pexels video

## Estructura del proyecto

```
gcab-landing/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              ← punto de entrada React
    ├── App.jsx               ← root: ensambla todos los componentes
    ├── assets/
    │   └── media.js          ← URLs de imágenes (Unsplash) y video (Pexels)
    ├── data/
    │   ├── insumos.js
    │   ├── solutions.js
    │   ├── steps.js
    │   ├── certs.js          ← también exporta ETAPAS
    │   └── posts.js
    ├── hooks/
    │   ├── useReveal.js      ← IntersectionObserver scroll reveal
    │   └── useCounter.js     ← contador animado con easing
    ├── styles/
    │   └── global.css        ← todo el CSS del proyecto (sin Tailwind)
    └── components/
        ├── shared/
        │   ├── ExternalDeps.jsx  ← inyecta Font Awesome + Google Fonts
        │   ├── GlobalStyles.jsx  ← stub (CSS ya importado en ExternalDeps)
        │   ├── Capsule.jsx       ← SVG decorativo de cápsula
        │   └── Particles.jsx     ← fondo de partículas flotantes
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Stats.jsx
        ├── WhyGCAB.jsx
        ├── Insumos.jsx
        ├── Soluciones.jsx
        ├── VideoShowreel.jsx
        ├── Proceso.jsx
        ├── Certificaciones.jsx
        ├── Marcas.jsx
        ├── Contacto.jsx
        ├── Blog.jsx
        ├── Footer.jsx
        └── Chat.jsx
```

## Instalación y uso

```bash
# 1. Entrar al directorio
cd gcab-landing

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo (abre en http://localhost:5173)
npm run dev

# 4. Build de producción
npm run build

# 5. Preview del build
npm run preview
```

## Requisitos

- Node.js 18+
- npm 9+

## Personalización rápida

| Qué cambiar         | Dónde                          |
|---------------------|--------------------------------|
| Imágenes y video    | `src/assets/media.js`          |
| Colores principales | `src/styles/global.css` → `:root` |
| Insumos             | `src/data/insumos.js`          |
| Servicios           | `src/data/solutions.js`        |
| Pasos del proceso   | `src/data/steps.js`            |
| Certificaciones     | `src/data/certs.js`            |
| Artículos del blog  | `src/data/posts.js`            |
| Teléfonos / email   | `src/components/Contacto.jsx`  |
| Redes sociales      | `src/components/Footer.jsx`    |

## Dependencias de producción

- **react** + **react-dom** — UI
- **Font Awesome 6** — iconos (CDN, cargado en runtime)
- **Syne + Plus Jakarta Sans** — tipografías (Google Fonts CDN)
- **Unsplash** — imágenes libres de derechos
- **Pexels** — video libre de derechos
