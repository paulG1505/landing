# Tasks: redisenio-landing-v3

Orden de la tarjeta: tokens y letras → 5 pantallas con su texto (es y en) → `/como-trabajamos` y
`/preguntas` → quitar el modo oscuro y ajustar `/privacidad` → destello → entradas por línea → demo
embebida → amanecer → verificación y documentación.

Referencias: `proposal.md`, `design.md` (valores y mapa de archivos), `specs/*/spec.md` (lo que se
prueba), `docs/adr/ADR-001-landing-v3-cinco-pantallas.md`. Valores visuales: `Main.dc.html`.

## Antes de empezar

Desde `frontend/`, anota cómo está todo **antes** de tocar nada:

| Comando | Resultado esperado hoy |
|---|---|
| `npm test` | 87 pruebas, todas pasan (verificado el 2026-11-27) |
| `npm run lint` | sin errores (no lo he verificado) |
| `npx tsc --noEmit` | anota la salida; si hay errores, ya estaban (no lo he verificado) |
| `npm run build && bash ../scripts/verify-landing.sh` | todo PASS (no lo he verificado) |

Si `npm test` no da 87 verdes, para y avísale a Paul.

## Reglas para todas las tareas

- Rama `feat/redisenio-landing-v3`. Sin commits del agente: al cerrar cada grupo, `/pg-implement`
  propone el mensaje y tú commiteas.
- Código en inglés; texto visible en español en `es.ts` y en inglés en `en.ts`, con la misma forma.
- Sin dependencias nuevas: `package.json` y `package-lock.json` no cambian.
- No tocar: `ChatLauncher.tsx`, `ChatPanel.tsx`, `LauncherCloud.tsx`, `launcherState.ts`,
  `.github/workflows`, `public/CNAME`, `app/wa/`, `waChannels.ts`.
- Toda animación nueva en CSS va dentro de `@media (prefers-reduced-motion: no-preference)` y su
  estado oculto bajo `html.js`.
- Cada tarea termina con `npm test` y `npm run lint` en verde, además de su prueba propia.

---

## 1. Tokens y escala de letras

- [x] **1.1 Tokens v3 en `globals.css`**
  - **Archivo:** `frontend/app/globals.css`.
  - **Consume:** nada. **Produce:** `--burbuja-cliente`, `--campo-noche`, `--hueso-medio` (`#A8A196`),
    `--hueso-suave`, `--regla-noche` (`#2E2A26`), `--d-xl`, `--d-l`, `--d-m`, `--h`, `--lede`,
    `--line-a`, `--silk`, `--swift`, `--out-expo`, `--header-h` (88 px; 64 px en `max-width: 900px`),
    y la clase `.tone-night` (fondo `--noche`, texto `--hueso`, enlaces y foco `--marca-clara`).
  - **Pasos:** agrega los valores de `design.md` §2 con su contraste en un comentario de una línea.
    No borres todavía los bloques `html[data-theme="dark"]` (eso es la tarea 4.1).
  - **Prueba:** `npm run build` → termina sin error; `grep -c -- '--d-xl' out/_next/static/chunks/*.css`
    → al menos 1.
  - **Terminado cuando:** el build pasa, los 4 tokens nuevos de color llevan su contraste anotado y
    la web actual se ve igual que antes en `npm run dev`.

- [x] **1.2 Letra display v3 y clases del sistema**
  - **Archivos:** `frontend/app/layout.tsx`, `frontend/app/globals.css`.
  - **Consume:** 1.1. **Produce:** fuente con `axes: ["opsz", "wdth"]`; clases en `@layer components`:
    `.display` (Bricolage 700, `'wdth' 80, 'opsz' 96`, `-0.04em`), `.display-xl` (`--d-xl`, `.82`,
    `-0.05em`), `.display-l`, `.display-m`, `.heading-h`, `.lede`, `.mono-label` (Geist Mono 500,
    12 px, `.14em`, mayúsculas), `.text-link` (subrayado de 1 px que crece de 0 a 100 % en 0,3 s
    `--silk`), `.press` (`scale(.97)` en hover, 0,2 s).
  - **Prueba:** en `npm run dev`, un elemento de prueba temporal con `.display-xl` muestra en DevTools
    › Computed `font-variation-settings: "wdth" 80, "opsz" 96`; bórralo después.
  - **Terminado cuando:** las clases existen, el build pasa y no queda ningún elemento de prueba.

- [x] **1.3 Wordmark**
  - **Archivo nuevo:** `frontend/shared/components/ui/Wordmark.tsx`.
  - **Consume:** 1.2. **Produce:** `<Wordmark size?>`: «AI» en `--marca` (o `--marca-clara` dentro de
    `.tone-night`, por herencia de variable) + «works»; Bricolage 700, `-0.02em`, 24 px (22 px en el pie).
  - **Prueba:** `npm run lint` y `npx tsc --noEmit` sin errores nuevos.
  - **Terminado cuando:** el componente compila; se usa en 2.2.

## 2. Las cinco pantallas con su texto (es y en)

- [x] **2.1 Test de forma de los idiomas**
  - **Archivo nuevo:** `frontend/shared/lib/i18n/translations/shape.test.ts`.
  - **Consume:** nada. **Produce:** el test «es and en have the same shape» que compara la forma de
    `es` y `en` completos (misma función `shape` que `pricing.test.ts`).
  - **Prueba:** `npm test` → 88 pruebas, todas pasan.
  - **Terminado cuando:** el test existe y pasa con los textos de hoy.

- [x] **2.2 Encabezado nuevo (`SiteHeader`) y relleno de las páginas**
  - **Archivos:** nuevo `frontend/shared/components/layout/SiteHeader.tsx`; `app/layout.tsx`;
    `es.ts` y `en.ts` (`header`: `homeLabel`, `navLabel`, `nav.demo`, `nav.pricing`, `whatsapp`,
    `whatsappMessage`); `features/demo/components/DemoAssistant.tsx` (`pt-[4.25rem]` y
    `h-[calc(100dvh-4.25rem)]` → `var(--header-h)`); `features/legal/components/PrivacyPolicy.tsx`
    (`pt-32 lg:pt-44` → `pt-16 lg:pt-24`); `globals.css` (`scroll-margin-top: 72px` → `0`).
    Borrar: `Header.tsx`, `ScrollProgressBar.tsx`, `mobileMenuMotion.ts`, `mobileMenuMotion.test.ts`.
  - **Consume:** 1.3. **Produce:** `<SiteHeader tone="light|dark">` en flujo (sin `fixed`), 88/64 px:
    Wordmark a `/`, `Demo` → `/#demo` y `Precios` → `/#precios` (ocultos ≤ 900 px), `WhatsApp ↗` con
    `whatsappTextLink(t.header.whatsappMessage)`, `target="_blank"`, `rel="noopener noreferrer"` y
    `aria-label` con `newTabNotice(locale)`. Cada enlace ≥ 44 px de alto.
  - **Pasos:** el layout monta `<SiteHeader />` en todas las rutas (la home lo moverá en 2.3).
    `ThemeToggle` y `LanguageSelector` salen del encabezado.
  - **Prueba:** `npm test` → 86 (88 de 2.1 menos los 2 de `mobileMenuMotion.test.ts`). En `npm run dev`
    con `node ../scripts/mock-chat-api.mjs`: `/demo#sector-salud` y `/demo#tienda-ejemplo-k3m9x2` llenan
    la pantalla bajo el encabezado sin hueco ni corte a 390 y 1440 px; `/demo#nohay-k3m9x2` muestra el
    aviso de no disponible; `/privacidad` arranca bajo el encabezado.
  - **Terminado cuando:** a 390 px se ven solo `AIworks` y `WhatsApp ↗`; a 1440 px también `Demo` y
    `Precios`; el enlace de WhatsApp abre el chat con el mensaje escrito.

- [x] **2.3 Pantalla 1: hero en su estado final**
  - **Archivos:** `features/hero/components/Hero.tsx` (reescrito); borrar
    `features/hero/components/OperationsLog.tsx`; `app/layout.tsx` (no monta `SiteHeader` cuando
    `pathname === '/'`; el layout se queda server component, así que el condicional va en un
    `HeaderOutsideHome` cliente dentro de `shared/components/layout/SiteHeader.tsx`); `es.ts`/`en.ts`
    (`hero`: `label`, `lineA`, `lineB`, `lineB1`, `lineB2`, `lede`, `cta`, `replay`, `sampleLabel`,
    `chat.client`, `chat.assistant`, `chat.time`).
  - **Consume:** 2.2. **Produce:** `<section data-tone="light" aria-label={t.hero.label}>` con
    `SiteHeader` dentro, `h1.display` = línea A (`--line-a`) + línea B (`.display-xl`, `--marca`,
    sangría 168 px; en ≤ 900 px dos líneas con «solo.» a 66 px y `--b-chars` según `design.md` §6), lede,
    `<a id="assistant-cta" data-flash href="#demo" class="press">` «Probar el asistente →» (56 px), y
    las dos burbujas (`--burbuja-cliente` y `--arena`, radio 18 px con esquina de 4 px) + «Conversación
    de ejemplo». Sin el botón «Ver amanecer otra vez» todavía (llega en 8.4).
  - **Prueba:** `npm run build && grep -o 'id="assistant-cta"' out/index.html | wc -l` → `1`.
    En dev: arriba del todo el robot no se ve; al bajar hasta que el CTA sale, aparece.
  - **Terminado cuando:** el hero se ve como la maqueta a 1440 y 390 px en español y en inglés (pulsa
    EN en el pie actual), sin desborde horizontal a 320 px en los dos idiomas.

- [x] **2.4 Pantalla 2: «Quiero dejar de…»**
  - **Archivos:** nuevo `features/pain-points/components/PainPoints.tsx` y
    `features/pain-points/index.ts`; `es.ts`/`en.ts` (`painPoints`: `heading`, `todayLabel`,
    `withLabel`, `options` × 5 con `verb`, `today`, `withAi` — textos de `AW_OPTS` de la maqueta —,
    `serviceNames` × 4, `other.label`, `other.message`).
  - **Consume:** 1.2. **Produce:** `<section id="servicios" data-tone="light">` con la rejilla de la
    maqueta; 5 `<button aria-pressed>` (56 px, `●` en la elegida, `translateX(6px)` en hover); el verbo
    elegido se re-monta con `key` para que corra `.swap` (`awPop` 0,55 s, solo sin movimiento reducido);
    línea mono `serviceNames.join(' · ')`; enlace «¿Otro proceso? Cuéntenoslo ↗» con
    `whatsappTextLink(t.painPoints.other.message)`.
  - **Prueba:** en dev, pulsar cada opción cambia verbo, «Hoy» y «Con AIworks», y solo esa queda con
    `aria-pressed="true"`. Tab + Enter también la elige.
  - **Terminado cuando:** las 5 opciones funcionan con ratón y teclado en ES y EN.

- [x] **2.5 Pantalla 3: estructura de «IA con orden»**
  - **Archivos:** nuevo `features/demo/components/HomeDemo.tsx`; `es.ts`/`en.ts` (`homeDemo`:
    `headingA`, `headingB`, `pickLabel`, `logTitle`, `askLabel`, `placeholder` con `{name}`, `send`,
    `exampleNote` con `{name}`, `allDemos`, `trust`, `trackRecord`, `logTimes` × 4).
  - **Consume:** 1.1, 1.2. **Produce:** `<section id="demo" data-tone="dark" class="tone-night">` con
    el H2 de dos líneas (`.display-l`, la segunda en `--marca-clara` con sangría), la columna izquierda
    con el nombre de `SECTOR_DEMOS` de salud y el enlace «ver todas las demos» a `/demo`, y la columna
    derecha con «Lo que queda anotado», un `<ol>` vacío de alto mínimo 236 px y la línea de confianza.
    Sectores, guion y pregunta propia llegan en el grupo 7.
  - **Prueba:** en dev, la sección se ve en Noche con los textos en ES y EN; «ver todas las demos» abre
    `/demo`.
  - **Terminado cuando:** la estructura coincide con la maqueta a 1440 y 390 px.

- [x] **2.6 Pantalla 4: precio**
  - **Archivos:** `features/pricing/components/Pricing.tsx` (reescrito; borrar `PricingRow.tsx` si deja
    de usarse); `es.ts`/`en.ts` (`pricing`: agregar `heading.before`, `heading.highlight`,
    `items[].figure`, `items[].label`, `items[].line`, `terms`, `custom.lead`; conservar `amount`,
    `custom.amount`, `custom.message`, `custom.cta`, `ctaMessage`, `cta`, `note`);
    `shared/lib/i18n/translations/pricing.test.ts` (agregar, sin quitar nada).
  - **Consume:** 1.2. **Produce:** `<section id="precios" data-tone="light">`: H2 `.heading-h`; 3
    bloques en escalera (+56 px por paso, el tercero con filete y número en `--marca`), cada uno con
    `mono-label` (`label`), «USD» en mono sobre el número `.display-xl` tabular (`figure`, con
    `aria-hidden`), `<span class="sr-only">{amount}</span>` y `line`; `terms` en mono; botón
    `data-flash` «Quiero mi asistente →» con `ctaMessage`; fila «{custom.lead} **{custom.amount}.**
    Prototipo en 2 días hábiles.» + «Hablemos de su proceso ↗» con `custom.message`.
  - **Test nuevo en `pricing.test.ts`:** «price figure is the number in the amount»: para cada idioma
    e ítem, `item.amount.includes(item.figure)` y `figure` es solo dígitos.
  - **Prueba:** `npm test` → todas pasan (incluido el nuevo). `npm run build && bash
    ../scripts/verify-landing.sh` → pasan los 3 chequeos de «Requirement: public pricing».
  - **Terminado cuando:** a 390 px los números a 124 px no desbordan y el lector de pantalla
    (VoiceOver, ⌘F5) lee «USD 169 + IVA», no «USD 169» suelto ni «169».

- [x] **2.7 Pantalla 5: «¿Qué le está costando más?»**
  - **Archivos:** nuevo `features/final-cta/components/Closing.tsx` (borrar `FinalCta.tsx`);
    `features/final-cta/index.ts`; `es.ts`/`en.ts` (`cta`: `titleA`, `titleB`, `highlight`,
    `description` = «15 minutos, sin costo.», `whatsapp`, `whatsappMessage`).
  - **Consume:** 1.1, 1.2. **Produce:** `<section id="contacto" data-tone="dark" class="tone-night">` con
    el H2 `.display-l` en dos líneas («más?» en `--marca-clara`), el botón `data-flash` `#5CC3CC` de
    58 px «Hablar por WhatsApp ↗», la descripción en `--hueso-suave`, y `CONTACT_INFO.phone` y
    `CONTACT_INFO.email` en mono 15 px con `user-select: all`.
  - **Prueba:** `npm run build && grep -c 'contacto@aiworks.lat' out/index.html` → ≥ 1;
    `npm test` (el test de precios lee `t.cta.description`) → verde.
  - **Terminado cuando:** el botón abre WhatsApp con el mensaje de agendar la llamada de 15 minutos.

- [x] **2.8 Pie de una fila sin RUC (decisión 9)**
  - **Archivos:** `shared/components/layout/Footer.tsx` (reescrito); `es.ts`/`en.ts` (`footer`:
    `navLabel`, `howWeWork`, `faq`, `privacy`, `copyright` = «© 2026 AIworks» / «© 2026 AIworks»).
  - **Consume:** 1.3. **Produce:** `<footer data-tone="dark" class="tone-night">` con borde superior
    `--regla-noche`: Wordmark 22 px · `nav aria-label` con «Cómo trabajamos» (`/como-trabajamos`),
    «Preguntas» (`/preguntas`), «Privacidad» (`/privacidad`) y `LanguageSelector` · `© 2026 AIworks` en
    mono. Enlaces ≥ 44 px de alto en móvil.
  - **Prueba:** `npm run build && grep -c '1727406223001' out/index.html` → `0` y
    `grep -c '1727406223001' out/privacidad.html` → ≥ 1.
  - **Terminado cuando:** el pie cabe en una fila a 1440 px y se apila sin desbordar a 320 px; ES · EN
    cambia el idioma de toda la página.

- [x] **2.9 Componer la home y retirar lo viejo**
  - **Archivos:** `app/page.tsx`; `shared/components/seo/StructuredData.tsx` (el `OfferCatalog` usa
    `es.painPoints.serviceNames` como nombres, sin descripción, más el asistente de USD 169);
    `es.ts`/`en.ts` (borrar `services`, `processes`, `why`, `demos`, `log`, `floatingWhatsapp`).
    Borrar `features/services/`, `features/processes/`, `features/why/`,
    `features/demo/components/DemosSection.tsx`.
  - **Consume:** 2.3 a 2.8. **Produce:** home = `ScrollToAnchor`, `Hero`, `PainPoints`, `HomeDemo`,
    `Pricing`, `Closing` (las cuatro últimas con `next/dynamic` como hoy).
  - **Prueba:** `npm run build` →
    `grep -oE 'id="(servicios|demo|precios|contacto|procesos|proceso|porque|ejemplos|demos|preguntas)"' out/index.html`
    → exactamente `servicios`, `demo`, `precios`, `contacto`, en ese orden. `npx tsc --noEmit` sin
    errores nuevos. `grep -rn "t\.services\|t\.why\|t\.processes\|t\.demos" features shared app` → nada.
  - **Terminado cuando:** la home tiene 5 pantallas + pie, y `npm test`, lint y build están verdes.

- [x] **2.10 Anclas viejas redirigidas**
  - **Archivos:** nuevo `shared/lib/anchorAliases.ts` y `shared/lib/anchorAliases.test.ts`;
    `shared/components/providers/ScrollToAnchor.tsx`.
  - **Consume:** 2.9. **Produce:** `resolveAnchor(hash): { kind: 'none' } | { kind: 'section', id } |
    { kind: 'page', path }` con el mapa de `ADR-001` (decisión 1). `ScrollToAnchor` lo usa al cargar y
    en `hashchange`: `section` → `history.replaceState` a `#<id>` y desplaza; `page` →
    `location.replace(path)`.
  - **Test:** los 6 alias, un ancla vigente (`#precios` → `section precios`), vacío → `none`, una
    desconocida → `section` con el mismo id (el desplazamiento la ignora si no existe), y que
    `#__proto__` no devuelve un alias (usar `Object.hasOwn`).
  - **Prueba:** `npm test` verde. En dev: `/#porque` termina en `/#demo`; `/#proceso` en
    `/como-trabajamos` (404 hasta 3.1: pruébalo de nuevo al cerrar el grupo 3); `/#preguntas` en
    `/preguntas`.
  - **Terminado cuando:** los escenarios de «Anclas viejas redirigidas» de
    `specs/landing-home/spec.md` pasan a mano (los de página, después de 3.2).

## 3. Páginas nuevas

- [x] **3.1 `/como-trabajamos`**
  - **Archivos:** nuevo `app/como-trabajamos/page.tsx`; `features/how-we-work/components/HowWeWork.tsx`
    (titular con `.display-m`, sin `SectionHeading` numerado, sin `id="proceso"`); `es.ts`/`en.ts`
    (`howWeWork.page.title`, `howWeWork.page.description`).
  - **Consume:** 1.2, 2.2. **Produce:** página con `metadata` (`title`, `description`, canonical
    `/como-trabajamos`), las 3 fases y `TechnologyTicker` con su botón de pausa.
  - **Prueba:** `npm run build && ls out/como-trabajamos.html` → existe. En dev, la cinta se pausa con
    su botón y las fases muestran «Usted recibe».
  - **Terminado cuando:** el texto es el mismo de hoy (solo cambia el estilo) y la página carga desde el
    pie.

- [x] **3.2 `/preguntas` con su `FAQPage`**
  - **Archivos:** nuevo `app/preguntas/page.tsx`; nuevo
    `shared/components/seo/FaqStructuredData.tsx` (el bloque `faq` que hoy está en
    `StructuredData.tsx`); `StructuredData.tsx` (quitar `FAQPage`); `features/faq/components/Faq.tsx`
    (titular `.display-m`, sin numeración, sin `id="preguntas"`); `es.ts`/`en.ts`
    (`faq.page.title`, `faq.page.description`).
  - **Consume:** 2.2. **Produce:** página con el acordeón (primera pregunta abierta, como hoy) y el
    único `FAQPage` del sitio.
  - **Prueba:** `npm run build && grep -c '"FAQPage"' out/preguntas.html` → `1` y
    `grep -c 'FAQPage' out/index.html` → `0`.
  - **Terminado cuando:** las preguntas visibles coinciden palabra por palabra con `es.faq.items`, y el
    acordeón abre y cierra con teclado.

- [x] **3.3 Sitemap**
  - **Archivo:** `app/sitemap.ts`.
  - **Consume:** 2.10, 3.1, 3.2. **Produce:** las 8 URL de `design.md` §7.6, `lastModified` con la fecha
    del día en que abres el PR.
  - **Prueba:** `npm run build && grep -o '<loc>[^<]*</loc>' out/sitemap.xml` → las 8 URL, ninguna con
    `#procesos`, `#proceso`, `#porque` ni `#preguntas`.
  - **Terminado cuando:** el sitemap coincide con las anclas y páginas que existen.

## 4. Quitar el modo oscuro y ajustar `/privacidad`

- [ ] **4.1 Sin selector de tema (decisión 4)**
  - **Archivos:** `app/layout.tsx` (el script del `<head>` queda en
    `document.documentElement.classList.add('js')`; sin `suppressHydrationWarning` si ya no hace
    falta); `app/globals.css` (borrar `html[data-theme="dark"]` y el bloque
    `@media (prefers-color-scheme: dark)` con `html:not([data-theme])`). Borrar
    `shared/lib/theme.ts` y `shared/components/layout/ThemeToggle.tsx`.
  - **Consume:** 2.2. **Produce:** tono fijo por sección.
  - **Prueba:** `grep -rn "data-theme\|ThemeToggle\|THEME_INIT\|aiworks-tema" app features shared` →
    nada. En Chrome con DevTools › Rendering › «prefers-color-scheme: dark», la web se ve igual.
  - **Terminado cuando:** con `localStorage['aiworks-tema']='oscuro'` la web se ve en Papel y Noche, y
    build, test y lint están verdes.

- [ ] **4.2 Texto de privacidad**
  - **Archivos:** `es.ts`/`en.ts` (`legal.privacy.updated` y el párrafo que hoy dice «idioma y modo
    claro u oscuro»); `shared/lib/i18n/translations/privacy.test.ts` (agregar, sin quitar).
  - **Consume:** 4.1. **Produce:** párrafo nuevo: el navegador guarda el idioma y, mientras la pestaña
    esté abierta, el identificador de sesión del chat y si ya vio la animación de inicio; nada sirve
    para identificarle. Fecha «Última actualización» del día del cambio. El RUC sigue en «Quién es
    responsable».
  - **Test nuevo:** «privacy no longer mentions a theme preference»: `es` no contiene `modo claro u
    oscuro` y `en` no contiene `light or dark`; ambos contienen `1727406223001`.
  - **Prueba:** `npm test` verde, con los 3 tests de privacidad de siempre.
  - **Terminado cuando:** `/privacidad` en ES y EN cumple el escenario «Texto de privacidad».

## 5. Destello al hacer clic

- [ ] **5.1 Reglas del destello (puro)**
  - **Archivos nuevos:** `shared/components/ui/flash/flashPlan.ts` y `flashPlan.test.ts`.
  - **Consume:** nada. **Produce:** `planFlash(input): FlashPlan | null` con `input = { event:
    'pointerdown' | 'click', pointerType, detail, clientX, clientY, targetRect, tone, hasFlashAttr,
    disabled }` → `{ x, y, tone, size }` según `design.md` §4; y `FLASH_TIMING`
    (`core 220`, `bloom 560`, `ring 640` con `delay 60`).
  - **Test:** ratón en `pointerdown` → plan en el punto; táctil en `pointerdown` → `null`; táctil en
    `click` → tamaño 1,3; teclado (`detail 0`) → centro del rect; `hasFlashAttr` → tono `dark` y 1,6;
    `disabled` → `null`; ratón en `click` → `null` (ya disparó en `pointerdown`).
  - **Prueba:** `npm test` verde.
  - **Terminado cuando:** los 7 casos pasan.

- [ ] **5.2 `ClickFlash` en toda la web**
  - **Archivos:** nuevos `shared/components/ui/flash/ClickFlash.tsx` y `flashBus.ts`;
    `app/globals.css` (estilos `.fx` de la maqueta, variante reducida `fxFade` 240 ms y
    `forced-colors`); `app/layout.tsx` (monta `<ClickFlash />`).
  - **Consume:** 5.1. **Produce:** un solo nodo `.fx` `aria-hidden` con `core`, `bloom` y `ring`;
    escucha `pointerdown` y `click` en `document` (captura) sobre `a, button`; cancela lo pendiente
    antes de cada disparo; `triggerFlash(x, y, { tone, size })` exportado para el amanecer (8.4).
  - **Prueba:** en dev: clic en «Precios» (claro), en un botón de la pantalla 3 (oscuro) y en «Quiero
    mi asistente» (grande, oscuro); 5 clics rápidos → `document.querySelectorAll('.fx').length` en la
    consola da `1`. Con «Reducir movimiento» → solo un resplandor fijo que se funde.
  - **Terminado cuando:** pasan los escenarios de «Destello al hacer clic» y no queda rastro a los
    700 ms; el robot y su panel no cambian.

## 6. Entradas por línea

- [ ] **6.1 Entradas por palabra en las pantallas 2 a 5**
  - **Archivos:** `app/globals.css` (reglas `.w`, `.w2`…`.w5` de `design.md` §4 bajo `html.js` y
    `no-preference`, ocultas mientras `[data-reveal]` no tenga `data-visible`); `PainPoints.tsx`,
    `HomeDemo.tsx`, `Pricing.tsx`, `Closing.tsx` (cada sección usa `useReveal` y marca sus bloques con
    las clases de la maqueta).
  - **Consume:** 2.4 a 2.7. **Produce:** entradas de 0,8 s `--silk`, una sola vez por sección; en
    ≤ 900 px 24 px y blur 5 px; precios, listas y log sin blur.
  - **Prueba:** en dev, bajar despacio: cada pantalla entra una vez; volver a subir no la repite. Con
    JavaScript desactivado (DevTools › ⌘⇧P › «Disable JavaScript») todo se ve. Con «Reducir
    movimiento» todo aparece quieto.
  - **Terminado cuando:** pasan los escenarios de «Entradas por palabra» y «Movimiento reducido».

## 7. Demo embebida

- [ ] **7.1 Guion de la demo (puro + textos)**
  - **Archivos:** nuevos `features/demo/lib/homeDemo.ts` y `homeDemo.test.ts`; `es.ts`/`en.ts`
    (`homeDemo.sectors.{comercio,salud,finanzas,logistica}`: `question`, `answer`, `log` × 4 con
    `label`, `text`, `kind` — textos de `AW_DEMOS` de la maqueta).
  - **Consume:** 2.5. **Produce:** `SCRIPT_STEPS_MS = [500, 1400, 1850, 2300]`, `stageAt(ms)` (0 a 4),
    `visibleLogRows(stage)` (1, 1, 2, 3, 4) y `LOG_KIND_TONE` (`entry` → `--hueso-medio`, `ai` →
    `--marca-clara`, `human` → `--hueso`).
  - **Test:** `stageAt(0)` 0, `stageAt(499)` 0, `stageAt(500)` 1, `stageAt(2300)` 4, `stageAt(9999)`
    4; `visibleLogRows` para 0 a 4; cada sector tiene 4 filas en `es` y `en` (importa `es.ts`/`en.ts`).
  - **Prueba:** `npm test` verde.
  - **Terminado cuando:** los 4 guiones existen en ES y EN con la misma forma.

- [ ] **7.2 Elegir negocio y ver la conversación de ejemplo**
  - **Archivo:** `features/demo/components/HomeDemo.tsx`.
  - **Consume:** 7.1, 5.2. **Produce:** grupo `role="group" aria-label={pickLabel}` con 4 botones mono
    `aria-pressed` (salud elegido al inicio), y la reproducción del guion con `stageAt` (un
    `setTimeout` por paso, limpiados al cambiar de sector o desmontar); con movimiento reducido, etapa 4
    directa. Las burbujas usan `awPop` 0,5 s `--swift`; el `✓✓` va en `--marca`.
  - **Prueba:** en dev, cada sector cambia pregunta, respuesta, log y la nota «{nombre} · empresa de
    ejemplo»; cambiar rápido de sector no deja filas de otro sector.
  - **Terminado cuando:** pasan «Elegir un negocio de ejemplo» y «Conversación de ejemplo rotulada».

- [ ] **7.3 «Ahora pregúntele usted» contra la API**
  - **Archivo:** `features/demo/components/HomeDemo.tsx`.
  - **Consume:** 7.2. **Produce:** `<form>` con `<label for>` «Ahora pregúntele usted», `<input
    maxLength={DEMO_MAX_CHARS}>` (52 px, `--campo-noche`, placeholder con el nombre) y botón `data-flash`
    `aria-label={send}`; `useConversation({ tenant: demoTenantId(slug), locale, whatsappFallback: false,
    isDemo: true, maxChars: DEMO_MAX_CHARS })`; muestra sus `messages`, los puntos mientras `sending` y
    `ended.text` cuando exista; no envía si `text.trim()` está vacío; el `key` del bloque es el slug,
    así cambiar de sector empieza vacío.
  - **Prueba:** con `node ../scripts/mock-chat-api.mjs` y `npm run dev`: una pregunta normal → respuesta
    del simulador; `limite` → texto de límite; `falla` → texto de error con reintento; `lento` → a los
    20 s, el texto de tiempo agotado; vacío → en la pestaña Network no sale ninguna petición.
  - **Terminado cuando:** pasan los escenarios de «Pregunta propia contra la API» y «Límite de
    caracteres de demo», y `/demo#sector-salud` sigue funcionando igual.

## 8. Amanecer

- [ ] **8.1 Descifrado de «hecho solo.» (puro)**
  - **Archivos nuevos:** `features/hero/lib/scramble.ts` y `scramble.test.ts`.
  - **Consume:** nada. **Produce:** `scrambleFrame(target, progress, rand)` y `SCRAMBLE_GLYPHS`.
  - **Test:** `progress 0` → mismo largo, espacios y puntos en su sitio; `progress 1` → igual a
    `target`; con `rand = () => 0` la parte sin resolver es `a`; la parte resuelta crece de forma
    monótona entre 0 y 1.
  - **Prueba:** `npm test` verde.
  - **Terminado cuando:** los 4 casos pasan.

- [ ] **8.2 Cuándo corre el amanecer (puro)**
  - **Archivos nuevos:** `features/hero/lib/dawnPlan.ts` y `dawnPlan.test.ts`.
  - **Consume:** nada. **Produce:** `DAWN_STORAGE_KEY = 'aiworks-amanecer'`, `DAWN_TIMELINE` (ms de
    `design.md` §4), `shouldPlayDawn({ reduced, hash, scrollY, seen })`, `readSeen(storage)` y
    `markSeen(storage)` (con try/catch: si el storage falla, `readSeen` devuelve `true`),
    `dawnRadius(x, y, w, h)` y `dawnProfile({ cores, width })` → `{ circleMs: 1100|950, ring: bool,
    blurPx: 12|5 }`.
  - **Test:** cada condición que impide el amanecer por separado; todas en falso → corre; storage que
    lanza → no corre; `dawnRadius(0,0,3,4)` = 5; perfil modesto con `cores 4` o `width 390`.
  - **Prueba:** `npm test` verde.
  - **Terminado cuando:** los casos pasan.

- [ ] **8.3 Noche, conversación y salto**
  - **Archivos:** nuevos `features/hero/components/DawnNight.tsx` y `features/hero/hooks/useDawn.ts`;
    `Hero.tsx`.
  - **Consume:** 2.3, 8.2. **Produce:** `useDawn()` → `{ playing, stage, skip, replay }`; si
    `shouldPlayDawn` da sí, `markSeen`, monta `DawnNight` (clon `aria-hidden` e `inert`, sin ids, tono
    Noche, con header, línea A con entrada por palabra y las burbujas que aparecen en 700 / 1400 / 2100
    y los ticks en petróleo en 2450) y deja la capa del día con `clip-path: circle(0 at var(--ox)
    var(--oy))`. `pointerdown`, `touchstart`, `wheel`, `keydown` y `scroll` llaman `skip()`: quita la
    noche y el `clip-path` sin animar.
  - **Prueba:** en dev, en pestaña nueva, la noche y la conversación corren; un toque en el segundo 1
    salta al día; recargar no lo repite; `/#precios` no lo muestra. VoiceOver lee el titular una vez.
  - **Terminado cuando:** pasan «Amanecer una vez por sesión» (salvo el círculo y el descifrado),
    «Saltar el amanecer» y «Amanecer accesible».

- [ ] **8.4 El círculo de luz, el descifrado y «Ver amanecer otra vez»**
  - **Archivos:** `useDawn.ts`, `Hero.tsx`, `app/globals.css` (anillo `.dawn-ring`, borde 2 px
    `#5CC3CC`), `es.ts`/`en.ts` (`hero.replay` ya existe desde 2.3).
  - **Consume:** 8.1, 8.3, 5.2. **Produce:** en 2600 ms, `triggerFlash` en el origen (`dark`, 1,6),
    `clip-path` del día animado con Web Animations de 0 a `dawnRadius` en `dawnProfile().circleMs`
    `--silk`, anillo que crece con el mismo radio y se apaga en el último 30 % (sin anillo en perfil
    modesto); en 2700 ms el descifrado de la línea B cada 45 ms durante 1100 ms; en 3800 ms se quita la
    noche y `clip-path: none`. Botón mono «↻ Ver amanecer otra vez» (44 px) que llama `replay()`.
  - **Prueba:** en dev a 1440 y 390 px, la luz sale del `✓✓` y cubre toda la pantalla; el anillo cae
    en el borde del círculo; «hecho solo.» termina legible; «Ver amanecer otra vez» lo repite. En tu
    celular (`npm run dev -- -H 0.0.0.0`) no se traba; si se traba, anota en el PR qué equipo y sigue.
  - **Terminado cuando:** pasan todos los escenarios de amanecer de `specs/landing-motion/spec.md`,
    también con «Reducir movimiento» (no corre) y con JavaScript desactivado (estado final).

## 9. Verificación y documentación

- [x] **9.0 `e2e-landing.sh` sin depender de Google Chrome** (agregada el 2026-11-27: Chrome no está
  instalado en la Mac de Katty; aprobada por Katty)
  - **Archivo:** `scripts/e2e-landing.sh`.
  - **Consume:** nada. **Produce:** el script usa Chrome si existe en
    `/Applications/Google Chrome.app` (igual que hoy) y, si no, `agent-browser` (CLI global con su
    propio Chromium; no entra en `package.json`). Con `agent-browser`: sesión aislada `e2e-landing`,
    `set viewport` por ancho (320, 360, 390, 414, 768, 1024, 1440), `open` de `index.html`, `eval` de
    la misma medición de desborde, misma tabla PASS/FAIL, y capturas `--full` en `.e2e/` con los
    mismos nombres (`mobile-500`, `tablet-768`, `desktop-1440`). Si no hay ninguno de los dos, sale
    con código 2 y lo dice.
  - **Prueba:** sobre el build actual → 7 filas medidas y 3 capturas en `.e2e/`; con una copia
    temporal de `out/` que tenga un elemento de 2000 px de ancho → `FAIL` en los 7 anchos.
  - **Terminado cuando:** las dos pruebas dan lo esperado y la ruta con Chrome no cambió.

- [ ] **9.1 `verify-landing.sh` al día**
  - **Archivo:** `scripts/verify-landing.sh`.
  - **Consume:** todo lo anterior. **Produce:** en «Spanish by default», `Built for the work your team`
    pasa a `The work your team does by hand` (la frase de `en.hero.lineA`); chequeos nuevos:
    `absent_in_html "1727406223001"` (pie sin RUC), `absent "aiworks-tema"` (sin tema guardado) y un
    bloque que exige `"FAQPage"` en `out/preguntas.html`. No se borra ni se afloja ningún chequeo de
    precios, privacidad o cifras inventadas.
  - **Prueba:** `cd frontend && npm run build && cd .. && bash scripts/verify-landing.sh` → `0 fail`.
  - **Terminado cuando:** todo en PASS y el cambio de la frase va explicado en la descripción del PR.

- [ ] **9.2 Documentación**
  - **Archivos:** `frontend/CLAUDE.md` (árbol de carpetas, sistema visual v3, movimiento: amanecer,
    destello, entradas por palabra; sin tema; anclas y alias), `CLAUDE.md` raíz (en «Chat de la web»,
    que la home tiene la demo embebida en `#demo`; en «Reglas», que `/privacidad` ya cuenta la clave del
    amanecer).
  - **Consume:** todo lo anterior. **Produce:** guías que describen el código que quedó.
  - **Prueba:** `grep -n "ThemeToggle\|OperationsLog\|ScrollProgressBar\|data-theme" frontend/CLAUDE.md
    CLAUDE.md` → nada.
  - **Terminado cuando:** las dos guías no nombran nada que ya no exista.

- [ ] **9.3 Smoke test completo (paso 5 de la tarjeta)**
  - **Archivos:** ninguno (si algo falla, se corrige en la tarea a la que pertenece).
  - **Pasos:**
    1. `cd frontend && npm ci && npm test && npm run lint && npm run build` → todo verde, y
       `ls out/demo.html out/privacidad.html out/wa.html out/wa/ig.html out/wa/fb.html out/wa/volante.html`
       → existen los 6.
    2. Desde la raíz: `bash scripts/verify-landing.sh` → `0 fail`; `bash scripts/e2e-landing.sh` →
       `ok` de 320 a 1440 px y capturas en `.e2e/`.
    3. A mano con `npm run dev` + `node scripts/mock-chat-api.mjs`: el amanecer corre una vez y se
       salta al tocar · el destello en fondo claro y en Noche · «Quiero dejar de…» cambia el texto · la
       demo responde con el simulador · el robot abre su chat · los enlaces de WhatsApp abren con el
       mensaje escrito · ES/EN cambia todo · `/como-trabajamos`, `/preguntas`, `/demo` y `/privacidad`
       cargan · `/#porque`, `/#proceso` y `/#preguntas` llegan a su destino.
    4. «Reducir movimiento» activado: repetir el paso 3; todo quieto y completo.
    5. En el celular, misma red: el amanecer no se traba.
  - **Terminado cuando:** todo lo anterior marcado, con capturas a 390 y 1440 px para el PR.
