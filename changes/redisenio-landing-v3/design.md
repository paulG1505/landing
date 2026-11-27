# Design: redisenio-landing-v3

Decisión de arquitectura: `docs/adr/ADR-001-landing-v3-cinco-pantallas.md`.
Valores exactos: `Main.dc.html` (maqueta). Si este documento y la maqueta difieren en un valor visual,
manda la maqueta; si difieren en una regla, manda la tarjeta de Notion.

## 1. Mapa de componentes

```
app/layout.tsx          html.js (script mínimo) · fuentes · StructuredData (Org + Service)
                        <SiteHeader/> fuera de "/" · <main id="main"> · <Footer/> · <ChatLauncher/> · <ClickFlash/>
app/page.tsx            ScrollToAnchor · Hero · PainPoints · HomeDemo · Pricing · Closing
app/como-trabajamos/    HowWeWork (fases + TechnologyTicker), tono Papel
app/preguntas/          Faq + <FaqStructuredData/> (FAQPage)
app/demo, privacidad, wa/*   sin cambios de ruta

features/hero/          Hero.tsx · DawnNight.tsx (clon aria-hidden) · useDawn.ts · dawnPlan.ts(+test) · scramble.ts(+test)
features/pain-points/   PainPoints.tsx  (pantalla 2, id="servicios")
features/demo/          components/HomeDemo.tsx (pantalla 3, id="demo") · lib/homeDemo.ts(+test)
features/pricing/       Pricing.tsx (pantalla 4, id="precios")
features/final-cta/     Closing.tsx (pantalla 5, id="contacto")
shared/components/layout/  SiteHeader.tsx (reemplaza Header.tsx) · Footer.tsx (una fila)
shared/components/ui/flash/ ClickFlash.tsx · flashPlan.ts(+test) · flashBus.ts (triggerFlash para el amanecer)
shared/components/ui/Wordmark.tsx   «AI» en acento + «works»
shared/lib/anchorAliases.ts(+test)
```

Reglas del repo que se mantienen: código en inglés, texto visible en español; `m.*` y no
`motion.*`; módulos puros con `node --test` importados con extensión `.ts` y rutas relativas.

## 2. Tokens (en `app/globals.css`)

Se conservan los colores v2 (`--papel #F7F6F3`, `--arena #EEECE6`, `--tinta #1B1916`,
`--tinta-media #5C5850`, `--regla #DDD9D0`, `--marca #0B6571`, `--noche #171513`, `--hueso #EEE9E0`,
`--marca-clara #5CC3CC`, `--regla-noche` pasa a `#2E2A26` como en la maqueta). Se agregan los que usa
la maqueta y no existen:

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `--burbuja-cliente` | `#D5E8E9` | burbuja del cliente en Papel | tinta 13,8:1 |
| `--campo-noche` | `#221F1C` | input de la demo | hueso 13,6:1 |
| `--hueso-medio` | `#A8A196` (hoy `#A69E92`) | textos mono sobre Noche | 7,1:1 sobre Noche |
| `--hueso-suave` | `#B8B1A5` | «15 minutos, sin costo.» | 8,6:1 sobre Noche |

Otros pares de la maqueta, calculados con la fórmula WCAG 2.x: hueso sobre petróleo (burbuja del
cliente de noche) 5,6:1; Noche sobre petróleo claro (botones de noche) 8,8:1; tinta media sobre arena
6,0:1. Todos se anotan junto al token en `globals.css`.

Escala tipográfica v3 (7 tamaños, MARCA.md):

| Token | Escritorio | Fluido |
|---|---|---|
| `--d-xl` | 216 px / .82, `-0.05em` | `clamp(88px, min(15vw, 27svh), 224px)` |
| `--d-l` | 128 px / .88 | `clamp(52px, min(9vw, 14svh), 128px)` |
| `--d-m` | 88 px / .96 | `clamp(44px, 6.1vw, 88px)` |
| `--h` | 56 px / 1.02 | `clamp(30px, 3.9vw, 56px)` |
| `--lede` | 22 px / 1.4 | `clamp(17px, 1.5vw, 22px)` |
| `--body` | 16 px / 1.5 | fijo (burbujas 15 px) |
| `--mono` | 12 px, `.14em`, mayúsculas, 500 | fijo |

Excepción de la maqueta: la línea A del hero va a 64 px (34 px en móvil); se expresa como
`clamp(34px, 4.45vw, 64px)` y se anota como excepción en el comentario del token.

Display: Bricolage Grotesque 700, `font-variation-settings: 'wdth' 80, 'opsz' 96`,
`letter-spacing: -0.04em`. En `layout.tsx` la fuente pasa a `axes: ["opsz", "wdth"]` (misma familia,
sin dependencia nueva).

Curvas y tiempos: `--silk: cubic-bezier(.6,0,.2,1)`, `--swift: cubic-bezier(.7,0,.15,1)`,
`--out-expo: cubic-bezier(.16,1,.3,1)` (solo destello). Duraciones 0,2 s / 0,8 s / 1,1 s.

Tono por sección: atributo `data-tone="light|dark"` en cada `<section>` (lo lee el destello) y clase
`.tone-night` (fondo `--noche`, texto `--hueso`, acento `--marca-clara`, foco `#5CC3CC`).

## 3. Pantallas (valores de la maqueta)

| # | id | Tono | Contenido | Escritorio → móvil (≤ 900 px) |
|---|---|---|---|---|
| 1 | — (section `aria-label`) | Papel (Noche durante el amanecer) | header 88 px; h1 = línea A + línea B «hecho solo.» en `--marca`; lede 22 px; CTA `#assistant-cta` «Probar el asistente →» a `#demo` (56 px); botón mono «↻ Ver amanecer otra vez»; 2 burbujas + «Conversación de ejemplo» | padding 0 64 64, min-height 880 → 0 20 40, 844; B 216 px con sangría 168 → 117 px en dos líneas («solo.» con sangría 66) |
| 2 | `servicios` | Papel | «Quiero dejar de» 88 px; verbo elegido 56 px en `--marca` (sangría 168); «Hoy» / «Con AIworks»; lista de 5 opciones (56 px de alto, `aria-pressed`, `●` en la elegida); línea mono de 4 servicios; enlace «¿Otro proceso? Cuéntenoslo ↗» | rejilla 1.5fr/1fr gap 96 → una columna gap 48, sangría 24 |
| 3 | `demo` | Noche | H2 128 px en dos líneas; ver §5 | rejilla 420px/1fr → una columna |
| 4 | `precios` | Papel | H2 56 px; 3 precios en escalera (+56 px por paso) a 216 px tabulares; línea mono de condiciones; CTA «Quiero mi asistente →»; fila a medida | 3 columnas → apiladas con sangría 0/36/72; números 124 px |
| 5 | `contacto` | Noche | H2 128 px «¿Qué le está / costando más?»; CTA `#5CC3CC` 58 px; «15 minutos, sin costo.»; teléfono y correo en mono con `user-select: all` | padding 176 64 120 |

Pie (layout, tono Noche, una fila): Wordmark · `Cómo trabajamos` · `Preguntas` · `Privacidad` ·
`ES · EN` (el `LanguageSelector` actual) · `© 2026 AIworks`. Sin RUC.

Encabezado (`SiteHeader`): 88 px (64 en móvil); wordmark a `/`; `Demo` → `/#demo`, `Precios` →
`/#precios` (ocultos ≤ 900 px); `WhatsApp ↗` en `--marca` con `target="_blank"` y
`newTabNotice`. Variable `--header-h: 88px` (64 px en móvil) para que `/demo` calcule su alto.

Precios: el texto visible del número se arma desde la clave nueva `figure` (`'169'`, `'49'`, `'89'`; un test nuevo en `pricing.test.ts` exige que `figure` esté dentro de `amount`);
el monto completo de siempre (`amount`, el que fija `pricing.test.ts`) va en un `<span class="sr-only">`
del mismo bloque, así el lector de pantalla y el HTML servido dicen «USD 169 + IVA». La fila a medida
muestra «¿Algo a medida? **Se cotiza según su proceso.** Prototipo en 2 días hábiles.» para que
`verify-landing.sh` siga encontrando «Se cotiza según su proceso» en `index.html`.

## 4. Movimiento

**Entradas por palabra** (pantallas 2-5). `useReveal` (ya existe) marca la sección con
`data-visible`. El CSS, dentro de `html.js` y `@media (prefers-reduced-motion: no-preference)`:
`.w { opacity:0; transform: translateY(32px) scaleY(1.08); transform-origin: 50% 100%; filter: blur(12px) }`
→ visible en 0,8 s `--silk`; retrasos `.w2` .08 s, `.w3` .22 s, `.w4` .34 s, `.w5` .46 s. En
≤ 900 px el desplazamiento es 24 px y el blur 5 px. Listas, log y precios sin blur. Sin JS o con
movimiento reducido todo está visible.

**Destello** (`ClickFlash`, montado una vez en el layout). Un solo nodo `.fx` fijo con 3 `<i>`
(`core` 10 px / 220 ms, `bloom` 168 px / 560 ms, `ring` 120 px / 640 ms con 60 ms de retraso;
curva `--out-expo`); colores por tono como en la maqueta (`screen` en oscuro, `multiply` en claro).
Web Animations; antes de cada disparo `getAnimations({ subtree: true }).forEach(a => a.cancel())`.
`flashPlan.ts` decide, sin DOM:
- disparo: `pointerdown` con `pointerType` mouse/pen; `click` para táctil y teclado (`detail === 0`
  → origen en el centro del elemento);
- tono: `data-tone` del ancestro más cercano; si el control tiene `data-flash`, tono oscuro;
- tamaño: `1.6` con `data-flash`, `1.3` táctil, `1` el resto;
- exclusiones: `[disabled]`, `[aria-disabled="true"]`.
Movimiento reducido: solo `bloom` fijo a 120 px, opacidad 0 → .5 → 0 en 240 ms.
`forced-colors: active`: `.fx { display: none }`.

**Amanecer** (`useDawn` + `DawnNight`). El HTML servido es el estado final (día, «hecho solo.»
completo). En el cliente, `shouldPlayDawn({ reduced, hash, scrollY, seen })` de `dawnPlan.ts` decide:
no corre si hay movimiento reducido, si `location.hash` no está vacío, si `scrollY > 0` o si
`sessionStorage['aiworks-amanecer'] === '1'` (lectura en try/catch; si falla, no corre). Si corre,
escribe la clave al empezar. Línea de tiempo (`DAWN_TIMELINE`, ms): 700 cliente · 1400 escribiendo ·
2100 asistente · 2450 ticks en petróleo · 2600 círculo + destello `lg` tono oscuro · 2700 scramble de
1100 ms · 3800 fin. El círculo: `clip-path: circle(0 → R at X Y)` con
`R = hypot(max(x, W-x), max(y, H-y))`, 1,1 s `--silk` (0,95 s y sin anillo si
`navigator.hardwareConcurrency <= 4` o ancho ≤ 900 px, blur 5 px). Origen `--ox/--oy`: 79 %/74 %
escritorio, 80 %/86 % móvil. `pointerdown`, `wheel`, `keydown`, `touchstart` o `scroll` saltan al final
sin animación. `DawnNight` es un clon con `aria-hidden` e `inert`, sin ids (nunca lleva
`assistant-cta`). El botón «↻ Ver amanecer otra vez» repite la secuencia sin mirar la clave.
`scramble.ts`: `scrambleFrame(target, progress, rand)` con `power1.inOut`; espacios y puntos no mutan;
glifos `abcdefghijklmnopqrstuvwxyz0123456789#%&*+`. El contenedor lleva `aria-label` con la frase
final y los glifos van en `aria-hidden`.

## 5. Demo embebida (pantalla 3)

- Sectores desde `SECTOR_DEMOS` (slug, sector, `businessName`); se usa el `businessName` de ahí
  (la maqueta abrevia «Cooperativa Alto Yacu»; manda el dato del repo).
- Guion por sector en `t.homeDemo.sectors[sector]`: `question`, `answer`, `log` (4 filas
  `{ label, text, kind: 'entry' | 'ai' | 'human' }`). Horas fijas `10:02, 10:02, 10:02, 10:03`.
- Fases (`homeDemo.ts`, puro): `stageAt(elapsedMs)` → 0 pregunta · 500 escribiendo · 1400 respuesta +
  log 1-2 · 1850 log 3 · 2300 log 4. Al cambiar de sector se reinicia la fase y la conversación propia.
  Con movimiento reducido se muestra directo la fase final.
- Pregunta propia: `useConversation({ tenant: demoTenantId(slug), locale, whatsappFallback: false,
  isDemo: true, maxChars: DEMO_MAX_CHARS })`. Se pintan sus `messages` con el estilo de burbuja de la
  maqueta, el indicador de escribiendo mientras `sending`, y el texto de `ended` o el de error que
  ya devuelve el hook (límite, falla, descanso, expirada). No hay respuestas inventadas.
- Pie de la columna: «{businessName} · empresa de ejemplo · ver todas las demos» (enlace a `/demo`).
- `/demo` y `DemoAssistant` no cambian de lógica; solo `pt-[4.25rem]` y
  `h-[calc(100dvh-4.25rem)]` pasan a usar `var(--header-h)`.

## 6. Textos

Claves nuevas (misma forma en `es.ts` y `en.ts`): `header` (reescrita), `hero` (reescrita),
`painPoints`, `homeDemo`, `pricing` (se conservan `items[].amount`, `custom.amount`, `custom.message`,
`ctaMessage`, `note`; se agregan `items[].figure`, `items[].label`, `items[].line`, `terms`,
`custom.lead`), `cta` (reescrita como pantalla 5; conserva `description`), `footer` (reescrita),
`howWeWork.page` y `faq.page` (`title`, `description` para metadatos). Se borran `services`,
`processes`, `why`, `demos`, `log`, `floatingWhatsapp`.

Español: literal de la maqueta. Inglés de los titulares (el resto lo traduce Katty con las mismas
reglas: «you», titulares ≤ 7 palabras, cero cifras nuevas):

| Clave | ES | EN |
|---|---|---|
| `hero.lineA` | El trabajo que su equipo hace a mano, | The work your team does by hand, |
| `hero.lineB` | hecho solo. | done for you. |
| `hero.cta` | Probar el asistente | Try the assistant |
| `painPoints.heading` | Quiero dejar de | I want to stop |
| `homeDemo.heading` | IA con orden, / no IA a ciegas. | AI with order, / not AI in the dark. |
| `pricing.heading` | Asistente a precio fijo. / Lo demás, a medida. | Fixed-price assistant. / The rest, made to fit. |
| `cta.title` | ¿Qué le está / costando más? | What is costing / you the most? |

Línea B en inglés es más larga: su tamaño es `min(var(--d-xl), calc((100vw - 40px) / (var(--b-chars) * 0.55)))`
con `--b-chars` = largo de la parte más larga, fijado en línea por el componente, para que no
desborde a 320 px en ningún idioma.

`hero.lineB` se parte en `lineB1`/`lineB2` para el corte en dos líneas de móvil (`hecho` / `solo.`,
`done` / `for you.`).

## 7. Supuestos (no están en las decisiones; se tomó la opción recomendada)

1. El contenido de `Services`, `Processes`, `Why` y el carrusel no se muda a otra página: su idea
   queda en las pantallas 2 y 3, y los 4 nombres de servicio en la línea mono de la pantalla 2. La
   tarjeta solo nombra `/como-trabajamos` y `/preguntas`.
2. El CTA del hero lleva a `#demo` (como la maqueta) y ya no abre el chat; el chat se abre con el robot.
3. El encabezado no es fijo ni se oculta al bajar (la maqueta no lo hace; el informe sí lo proponía).
4. El fondo no interpola entre secciones (la maqueta usa fondos fijos; el informe lo proponía).
5. El mini-resplandor de 56 px en el `✓✓` de la demo (informe §2) no se implementa: la maqueta no lo
   tiene.
6. `sitemap.ts` lista `/`, `/#servicios`, `/#demo`, `/#precios`, `/#contacto`, `/como-trabajamos`,
   `/preguntas`, `/privacidad`, con `lastModified` igual a la fecha del merge.
