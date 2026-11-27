# Proposal: redisenio-landing-v3

## Why

La home actual tiene 8 bloques, un encabezado con 7 enlaces y unas 1.570 palabras: se ve plana y
con mucho texto. Paul aprobó el 2026-11-27 un diseño nuevo, minimalista, con un momento que
sorprende (el «amanecer») y un destello al hacer clic. Maqueta:
https://claude.ai/artifact/CFGGzJ96GvCZe5XDrfaD6U (código en iCloud ›
`1 - Para Katty/redisenio-landing/maqueta/Main.dc.html`). MARCA.md ya está en v3.

Fuentes, en este orden: decisiones de la tarjeta de Notion «Rediseño de la landing v3» →
maqueta → MARCA.md v3 → informes (`4-arte-y-movimiento.md` §1, §2, §4, §5;
`2-auditoria-web-actual.md` §3 y §6).

## What Changes

1. **Home en 5 pantallas** (decisión 1): (1) «hecho solo» con el amanecer, (2) «Quiero dejar de…»,
   (3) «IA con orden» con la demo embebida, (4) precio, (5) «¿Qué le está costando más?» con el pie.
   Fondos fijos Papel / Noche / Papel / Noche / Noche.
2. **Dos páginas nuevas** (decisión 2): `/como-trabajamos` (las 3 fases y la cinta de tecnologías de
   hoy) y `/preguntas` (el FAQ de hoy con su JSON-LD `FAQPage`). Se enlazan desde el pie.
3. **Español e inglés** (decisión 3): todo texto nuevo en `es.ts` y `en.ts` con la misma forma.
4. **Sin modo oscuro con botón** (decisión 4): se borra `ThemeToggle`, `shared/lib/theme.ts` y los
   bloques `html[data-theme="dark"]`. `/privacidad` deja de decir que se guarda la preferencia de tema.
5. **Amanecer** (decisión 5): una vez por sesión; se salta con toque, scroll, rueda o tecla, con
   `#ancla` en la URL o si la página no arranca arriba. Con «reducir movimiento» no corre.
6. **Destello al hacer clic** (decisión 6) en toda la web: núcleo, resplandor y anillo; 0,7 s; sin
   rastro. Con «reducir movimiento», solo un fundido de 240 ms.
7. **Demo embebida** (decisión 7): en la pantalla 3 el visitante elige comercio, salud, finanzas o
   logística, ve la conversación de ejemplo y escribe su propia pregunta, que responde la API real
   del tenant `demo-sector-<x>` con `useConversation`. `/demo` sigue igual.
8. **`ChatLauncher` sin cambios** (decisión 8). El `id="assistant-cta"` pasa al botón «Probar el
   asistente →» del hero, así el robot sigue oculto mientras ese botón está en pantalla.
9. **El pie no lleva RUC** (decisión 9); se queda en `/privacidad`.
10. **Sin librerías nuevas** (decisión 10): `motion` ya instalada, CSS y Web Animations.
11. **Anclas viejas redirigidas**: `#procesos`, `#ejemplos` → `#servicios`; `#porque`, `#demos` →
    `#demo`; `#proceso` → `/como-trabajamos`; `#preguntas` → `/preguntas`.
12. **Encabezado nuevo**: wordmark + `Demo` + `Precios` + `WhatsApp ↗`; en móvil solo wordmark y
    `WhatsApp ↗`; sin menú, sin selector de idioma (pasa al pie) y sin barra de progreso. En la home
    va dentro del hero, en flujo, sin `position: fixed`.

Se retiran de la home y de los textos (su idea queda resumida en las pantallas 2 y 3):
`Services`, `Processes`, `Why` + `ExamplesCarousel`, `DemosSection`, `OperationsLog`,
`ScrollProgressBar`, el menú móvil y las claves i18n `services`, `processes`, `why`, `demos`, `log`
y `floatingWhatsapp`.

## Capabilities

- `landing-home`: nueva — estructura de 5 pantallas, encabezado, pie sin RUC, páginas
  `/como-trabajamos` y `/preguntas`, anclas redirigidas, tono fijo sin selector de tema, precios.
- `landing-motion`: nueva — amanecer, destello del clic, entradas por palabra y movimiento reducido.
- `landing-demo-embebida`: nueva — demo de sector en la pantalla 3 con pregunta propia contra la API.

(El repo no tiene `specs/` vigentes: los tres deltas son `ADDED`.)

## Impact

- **Código**: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/sitemap.ts`, nuevas
  `app/como-trabajamos/page.tsx` y `app/preguntas/page.tsx`; features `hero`, `pricing`,
  `final-cta`, `how-we-work`, `faq`, `demo`; nueva feature `pain-points`; `shared/components/layout`
  (`Header`, `Footer`), nuevo `shared/components/ui/flash/`, `ScrollToAnchor`, `StructuredData`,
  `es.ts`, `en.ts`. `/demo` solo ajusta su relleno superior al encabezado en flujo.
- **Borrado**: `features/services`, `features/processes`, `features/why`,
  `features/hero/components/OperationsLog.tsx`, `features/demo/components/DemosSection.tsx`,
  `ThemeToggle.tsx`, `ScrollProgressBar.tsx`, `mobileMenuMotion.ts` y su test, `shared/lib/theme.ts`.
- **Pruebas**: `npm test` sigue verde (87 hoy; se quita el test del menú móvil y se suman los nuevos
  de módulos puros). `pricing.test.ts` y `privacy.test.ts` no se debilitan.
  `scripts/verify-landing.sh` cambia solo la frase de inglés del hero; precios, privacidad y cifras
  inventadas quedan intactos. `scripts/e2e-landing.sh` sin desbordes de 320 a 1440 px.
- **Contratos públicos**: anclas (ver punto 11), clave `localStorage['aiworks-tema']` que deja de
  leerse, nueva clave `sessionStorage['aiworks-amanecer']`, JSON-LD `FAQPage` que se muda a
  `/preguntas`. Decisión registrada en `docs/adr/ADR-001-landing-v3-cinco-pantallas.md`.
- **Fuera de alcance**: el repo `asistente`, `.github/workflows`, `frontend/public/CNAME`,
  `package.json` (sin dependencias nuevas), el rediseño del `ChatLauncher` y de su panel, el contenido
  y el aspecto de `/demo`, una URL propia para inglés, analítica de cualquier tipo, `MARCA.md`
  (ya está en v3).
