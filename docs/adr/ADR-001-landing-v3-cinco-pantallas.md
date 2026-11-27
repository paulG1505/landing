# ADR-001: Landing v3 en cinco pantallas, sin selector de tema y con anclas redirigidas

- **Status:** Proposed
- **Fecha:** 2026-11-27
- **Change:** `changes/redisenio-landing-v3/`

## Context

El rediseño v3 (aprobado por Paul el 2026-11-27) reduce la home de 8 bloques a 5 pantallas, quita el
modo oscuro con botón y muda «Cómo trabajamos» y «Preguntas» a páginas propias. Eso toca contratos
que hoy usan campañas, buscadores y navegadores de visitantes:

- Anclas `#servicios #procesos #proceso #porque #ejemplos #demos #precios #preguntas #contacto`
  (encabezado, pie, `sitemap.xml`, enlaces de campaña).
- `localStorage['aiworks-tema']`, que guarda `claro`/`oscuro` en los navegadores de quien ya visitó.
- El JSON-LD `FAQPage`, que hoy va en todas las páginas y debe coincidir con el texto visible.
- El RUC en el pie, que el PR #14 agregó porque Meta rechazó el nombre «AIworks» en WhatsApp al no
  ver la marca ligada a la empresa verificada.

Es un sitio estático (GitHub Pages): no hay redirecciones de servidor.

## Decision

1. Las anclas que desaparecen se resuelven en el navegador con un mapa puro
   (`shared/lib/anchorAliases.ts`) que usa `ScrollToAnchor`: `#procesos` y `#ejemplos` →
   `#servicios`; `#porque` y `#demos` → `#demo`; `#proceso` → `/como-trabajamos`; `#preguntas` →
   `/preguntas`. Quedan `#servicios #demo #precios #contacto #assistant-cta #main`.
2. El tema es fijo por sección (Papel o Noche). No se lee ni se borra `aiworks-tema`: el valor
   viejo queda sin efecto en el navegador de cada visitante.
3. `FAQPage` se emite solo en `/preguntas`; `Organization` y `Service` siguen en todas las páginas, y
   `Service` declara solo los nombres de servicio que la home muestra.
4. El RUC sale del pie y queda solo en `/privacidad` (decisión 9 de la tarjeta).
5. El amanecer guarda `sessionStorage['aiworks-amanecer']` y `/privacidad` lo menciona.

## Consequences

- **Positivas:** una idea por pantalla (~270 palabras en la home), cero enlaces rotos desde
  campañas viejas, `FAQPage` coherente con lo visible, menos CSS (sin el doble juego de tokens).
- **Negativas:**
  - Un enlace viejo a `#proceso` o `#preguntas` hace una navegación extra (de `/` a la página nueva):
    el visitante ve la home un instante antes de saltar.
  - Los buscadores dejan de ver el FAQ en la home; ese contenido pierde peso en `/` y lo gana en
    `/preguntas`.
  - Quien eligió modo oscuro vuelve a ver la web en claro sin aviso.
  - **Riesgo con Meta:** si la revisión del nombre visible de WhatsApp vuelve a pedir el RUC en el
    sitio, el revisor tendrá que llegar a `/privacidad`; si eso no basta, hay que reabrir la
    decisión 9 con Paul.
  - El mapa de alias es código que hay que mantener mientras existan enlaces viejos circulando.
