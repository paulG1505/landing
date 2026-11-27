# Spec Delta

> El repo no tiene `specs/landing-home/spec.md` vigente: todo es `ADDED`.

## ADDED Requirements

### Requirement: Cinco pantallas en la home
The home page shall render, in this order, the sections hero, `#servicios`, `#demo`, `#precios` and `#contacto`, and no other top-level section.

#### Scenario: Orden de la home
- **WHEN** se abre `/` en el build estático
- **THEN** `index.html` contiene las secciones hero, `id="servicios"`, `id="demo"`, `id="precios"` e `id="contacto"` en ese orden, y no contiene `id="procesos"`, `id="proceso"`, `id="porque"`, `id="ejemplos"`, `id="demos"` ni `id="preguntas"`

### Requirement: Tono fijo por sección
Each home section shall declare `data-tone` as `light` for hero, `#servicios` and `#precios`, and `dark` for `#demo` and `#contacto`.

#### Scenario: Tonos alternos
- **WHEN** se inspecciona el HTML de `/`
- **THEN** hero, `#servicios` y `#precios` llevan `data-tone="light"` y `#demo` y `#contacto` llevan `data-tone="dark"`

### Requirement: Sin selector de tema
The site shall not render a theme toggle nor set `data-theme` on `<html>`.

#### Scenario: Navegador con preferencia oscura guardada
- **WHEN** un visitante con `localStorage['aiworks-tema'] = 'oscuro'` o con el sistema en modo oscuro abre cualquier página
- **THEN** la página se ve con las secciones Papel y Noche de siempre y no existe ningún botón de tema

### Requirement: Encabezado mínimo
The site header shall contain only the wordmark linking to `/`, the links `Demo` and `Precios`, and a WhatsApp link that opens in a new tab.

#### Scenario: Escritorio
- **WHEN** se ve cualquier página a 1440 px
- **THEN** el encabezado muestra `AIworks`, `Demo` (a `/#demo`), `Precios` (a `/#precios`) y `WhatsApp ↗` con `target="_blank"` y un `aria-label` que avisa de la pestaña nueva

#### Scenario: Móvil
- **WHEN** se ve cualquier página a 390 px
- **THEN** el encabezado muestra solo `AIworks` y `WhatsApp ↗`, sin botón de menú

### Requirement: Pie de una fila sin RUC
The footer shall show the wordmark, links to `/como-trabajamos`, `/preguntas` and `/privacidad`, the language selector and `© 2026 AIworks`, without the RUC.

#### Scenario: Pie en la home
- **WHEN** se busca `1727406223001` en el pie de cualquier página
- **THEN** no aparece, y sí aparece en el texto de `/privacidad`

#### Scenario: Enlaces del pie
- **WHEN** se hace clic en «Cómo trabajamos», «Preguntas» o «Privacidad» del pie
- **THEN** se abre `/como-trabajamos`, `/preguntas` o `/privacidad`, respectivamente

### Requirement: Página Cómo trabajamos
The route `/como-trabajamos` shall render the three phases and the technology ticker with the same text the home showed before this change.

#### Scenario: Contenido mudado
- **WHEN** se abre `/como-trabajamos`
- **THEN** se ven las 3 fases con su «Usted recibe» y la cinta de tecnologías con su botón de pausa, y los textos salen de `t.howWeWork`

### Requirement: Página Preguntas
The route `/preguntas` shall render the FAQ accordion and the only `FAQPage` JSON-LD of the site, built word for word from `es.faq.items`.

#### Scenario: FAQ y datos estructurados
- **WHEN** se abre `/preguntas` en el build
- **THEN** el acordeón muestra las mismas preguntas que `es.faq.items` y `out/preguntas.html` contiene un JSON-LD `"@type":"FAQPage"`

#### Scenario: La home ya no declara FAQ
- **WHEN** se busca `FAQPage` en `out/index.html`
- **THEN** no aparece

### Requirement: Anclas viejas redirigidas
When the page loads or the hash changes to a retired anchor, the site shall go to its replacement: `#procesos` and `#ejemplos` to `#servicios`, `#porque` and `#demos` to `#demo`, `#proceso` to `/como-trabajamos`, and `#preguntas` to `/preguntas`.

#### Scenario: Ancla que cambia de sección
- **WHEN** se abre `/#porque`
- **THEN** la página se desplaza a `#demo` y la URL queda en `/#demo`

#### Scenario: Ancla que cambia de página
- **WHEN** se abre `/#preguntas`
- **THEN** el navegador termina en `/preguntas`

#### Scenario: Ancla desconocida
- **WHEN** se abre `/#cualquier-cosa`
- **THEN** la página no se mueve ni redirige

### Requirement: Rutas conservadas
The build shall keep the routes `/demo`, `/privacidad`, `/wa`, `/wa/ig`, `/wa/fb` and `/wa/volante` with their current behavior.

#### Scenario: Rutas en el build
- **WHEN** se corre `npm run build`
- **THEN** existen `out/demo.html`, `out/privacidad.html`, `out/wa.html` y `out/wa/{ig,fb,volante}.html`, y `waChannels.test.ts` y `demoSlug.test.ts` pasan sin cambios

### Requirement: Botón que gobierna el robot
The hero call to action shall carry `id="assistant-cta"` and be the only element with that id.

#### Scenario: Robot oculto con el CTA en pantalla
- **WHEN** se abre `/` arriba del todo
- **THEN** el `ChatLauncher` está oculto, y aparece al bajar hasta que «Probar el asistente» sale de pantalla

### Requirement: Precios exactos en la pantalla 4
The pricing section shall render the amounts of `t.pricing.items[].amount` and the text of `t.pricing.custom.amount` in the served HTML.

#### Scenario: Montos en el HTML
- **WHEN** se corre `bash scripts/verify-landing.sh`
- **THEN** pasan «founder setup price USD 169 is present», «pricing section is rendered in the HTML» y «custom system row is rendered without a figure»

### Requirement: Textos bilingües
Every visible string added by this change shall exist in `es.ts` and `en.ts` with the same shape.

#### Scenario: Cambio de idioma
- **WHEN** se pulsa `EN` en el pie
- **THEN** cambian los textos de las 5 pantallas, el encabezado, el pie, `/como-trabajamos` y `/preguntas`, y `<html lang>` pasa a `en`

#### Scenario: Misma forma
- **WHEN** se corre `npm test`
- **THEN** pasa el test que compara la forma de `es` y `en` completos

### Requirement: Privacidad sin preferencia de tema
The privacy policy shall describe the language preference and the intro flag as browser-stored data, without mentioning a light or dark mode preference.

#### Scenario: Texto de privacidad
- **WHEN** se abre `/privacidad` en español o inglés
- **THEN** no se menciona «modo claro u oscuro» ni «light or dark», sí se mencionan el idioma y la animación de inicio, y la fecha de «Última actualización» es la del cambio
