# Landing Page Project

## 📋 Project Overview
Landing de AIworks (consultora de software con IA, Quito) construida con Next.js 16, React 19, TypeScript, Tailwind CSS 4 y Motion, siguiendo Screaming Architecture.

## 🏗️ Architecture: Screaming Architecture

This project follows **Screaming Architecture** - the folder structure screams what the application does, not what framework it uses.

### Directory Structure

```
frontend/
├── app/                          # Next.js App Router (infraestructura)
│   ├── layout.tsx               # Layout raíz: fuentes, script del <head> (js + noche del amanecer), footer, chat, destello
│   ├── page.tsx                 # Inicio: 5 pantallas (hero y el resto con next/dynamic)
│   ├── como-trabajamos/page.tsx # Las 3 fases + cinta de tecnologías
│   ├── preguntas/page.tsx       # FAQ + su FAQPage (el único del sitio)
│   ├── privacidad/page.tsx      # Política de privacidad (LOPDP); único lugar con el RUC
│   ├── demo/page.tsx            # /demo#<slug> (sin hash: galería)
│   ├── wa/page.tsx              # Redirección a WhatsApp con el mensaje genérico (`/wa`)
│   ├── wa/[channel]/page.tsx    # Redirecciones fijas a WhatsApp por canal (`/wa/ig`, `/wa/fb`, `/wa/volante`)
│   ├── globals.css              # Tokens v3, tonos por sección, clases del sistema, movimiento
│   ├── icon.svg / favicon.ico / apple-icon.png
│   ├── manifest.ts · sitemap.ts
│
├── features/                     # Bloques de negocio (EL NÚCLEO)
│   ├── hero/                    # Pantalla 1: titular, conversación de ejemplo y amanecer
│   │   ├── lib/                 # dawnPlan (cuándo corre, línea de tiempo, script del <head>), scramble (puros, con tests)
│   │   ├── hooks/               # useDawn
│   │   └── components/          # Hero, DawnNight (clon de noche aria-hidden + inert)
│   ├── pain-points/             # Pantalla 2: «Quiero dejar de…» (#servicios)
│   ├── demo/                    # Pantalla 3 «IA con orden» (#demo) y la página /demo
│   │   ├── data/                # sectorDemos.ts (solo slugs sector-*)
│   │   ├── lib/                 # homeDemo (guion de la home), demoView, demoPhase (puros, con tests)
│   │   └── components/          # HomeDemo, DemoAssistant, DemoGallery, DemoNotice…
│   ├── pricing/                 # Pantalla 4: precio (#precios)
│   ├── final-cta/               # Pantalla 5: «¿Qué le está costando más?» (#contacto)
│   ├── how-we-work/             # Página /como-trabajamos
│   ├── faq/                     # Página /preguntas (acordeón accesible)
│   └── legal/                   # Página de privacidad
│
├── shared/
│   ├── components/
│   │   ├── ui/                 # Container, Wordmark, WhatsAppLogo, WaRedirect, flash/ (ClickFlash, flashPlan, flashBus), chat/ (ChatLauncher, ChatPanel, Conversation, useConversation, launcherState, endedReply, chatOutcome)
│   │   ├── layout/             # SiteHeader (y HeaderOutsideHome), Footer, LanguageSelector
│   │   ├── providers/          # StoreRehydrate, MotionProvider, ScrollToAnchor
│   │   └── seo/                # StructuredData (Organization + Service), FaqStructuredData
│   ├── hooks/                   # useReveal, useIntersectionObserver, useMediaQuery, usePrefersReducedMotion, useTranslation
│   ├── lib/                     # i18n (es/en), anchorAliases.ts, whatsapp.ts, waChannels.ts, demoSlug.ts, publicUrl.ts, utils.ts
│   ├── store/                   # Zustand: idioma, UI
│   ├── types/ · constants/
│
└── public/                      # CNAME, og-image, íconos del manifest, robots.txt
```

## 🎯 Key Principles

### 1. **Feature-Based Organization**
- Each feature is self-contained in its own folder
- Features contain their own components, hooks, and types
- Easy to locate and modify business logic

### 2. **Screaming Intent**
- Folder names describe business capabilities, not technical layers
- `features/pricing/` tells you more than `components/PricingCard/`
- New developers immediately understand what the app does

### 3. **Dependency Rules**
- Features can use `shared/` code
- `shared/` code cannot depend on features
- Features should not depend on each other (use shared for that)

### 4. **Colocation**
- Keep related code close together
- Component, styles, tests, and types live near each other
- Reduces cognitive load when working on a feature

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router), export estático (`output: "export"`) a GitHub Pages
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + tokens propios en `app/globals.css`
- **Animación**: Motion (`motion/react`), cargado con `LazyMotion` + `domAnimation`
- **State Management**: Zustand
- **Linting**: ESLint
- **Package Manager**: npm

> `next.config.ts` desactiva `turbopackFileSystemCacheForDev`: la caché de Turbopack en disco
> sirvió dos veces un `globals.css` viejo en `next dev`. Si algo de CSS "no se aplica" en
> local, borra `.next/` y vuelve a arrancar antes de buscar el error en el código.

## 🤖 Skills de diseño

### Instalada y vigente

- **`frontend-design`** (oficial de Anthropic, desde `claude-plugins-official`), en
  `.claude/skills/frontend-design/`: dirección estética, tipografía y clichés a evitar.
- **UI/UX Pro Max** (`npm install -g ui-ux-pro-max-cli`, luego `uipro init --ai claude`).
  Su base de datos se consulta con
  `python3 "$(npm root -g)/ui-ux-pro-max-cli/assets/scripts/search.py" "<consulta>" --domain ux`
  (dominios: `ux`, `landing`, `typography`, `color`, `react`, `web`…; `--stack nextjs`).
  Úsala para pautas de UX, accesibilidad y movimiento. Sus recomendaciones de paleta y
  tipografía son genéricas: las decisiones de marca de abajo mandan.

### Sistema visual (v3, nov 2026)

Los tokens y su contraste calculado están comentados al inicio de `app/globals.css`.

- **Tipografía**: Bricolage Grotesque para titulares (`.display` con la escala
  `--d-xl/--d-l/--d-m/--h`), Geist para cuerpo y UI, Geist Mono para etiquetas (`.mono-label`).
  La palabra clave de cada titular se marca **solo con color**.
- **Color**: Papel (`--papel` #F7F6F3) y Noche (`--noche` #171513), con un único acento
  petróleo: `--marca` #0B6571 sobre Papel y `--marca-clara` #5CC3CC sobre Noche.
- **Tono por sección, sin selector de tema**: cada `<section>` lleva `data-tone="light|dark"`
  y las oscuras la clase `.tone-night`, que redefine `--c-texto`, `--c-media`, `--c-regla` y
  `--c-clave`. El destello lee `data-tone`. No hay modo oscuro ni preferencia guardada.
- **Contraste**: todo texto ≥ 4,5:1 sobre su tono. Si agregas un par nuevo, calcúlalo y
  anótalo junto al token.
- **Estructura**: la home son 5 pantallas (`.screen` + `.screen-wrap`), con el segundo renglón
  de los titulares corrido (`.indent-step`). Las páginas internas usan `.page-screen`.
- **Anclas**: `#servicios`, `#demo`, `#precios` y `#contacto`. Las viejas (`#procesos`,
  `#ejemplos`, `#porque`, `#demos`, `#proceso`, `#preguntas`) se resuelven en
  `shared/lib/anchorAliases.ts` y las aplica `ScrollToAnchor`. Si quitas o renombras un id,
  agrega su alias y actualiza `app/sitemap.ts`.
- **Afirmaciones**: cero cifras inventadas, cero sellos, cero superlativos. Todo ejemplo va
  rotulado como tal. `scripts/verify-landing.sh` lo comprueba sobre el build.

### Movimiento

- **Amanecer** (`features/hero`): la primera visita de la pestaña arranca en Noche, muestra la
  conversación y abre el día con un círculo de luz desde el `✓✓`, mientras «hecho solo.» se
  descifra. Corre una vez por sesión (`sessionStorage['aiworks-amanecer']`), no corre con hash,
  con scroll ni con movimiento reducido, y cualquier toque, tecla, rueda o scroll lo salta. El
  HTML servido es el día; el script del `<head>` (`dawnPendingScript`) pinta la noche antes de
  que cargue React y se quita solo a los 3 s si React no llega.
- **Destello** (`shared/components/ui/flash`): un solo nodo `.fx` responde a cada clic en un
  enlace o botón, con el tono de la sección; `triggerFlash` lo dispara desde código.
- **Entradas por palabra**: las pantallas 2 a 5 usan `useReveal` y marcan sus bloques con
  `.w`, `.w2`…`.w5` (`.w-flat` sin desenfoque). Entran una sola vez.
- El estado oculto de todo lo anterior vive bajo `html.js` y
  `prefers-reduced-motion: no-preference`, así el contenido se ve sin JS y quieto con
  movimiento reducido (el destello queda en un resplandor de 240 ms).
- **Motion** solo donde aporta algo que CSS no resuelve bien (la línea de fases de
  `/como-trabajamos`). Usa los componentes `m.*`, no `motion.*` (`LazyMotion` va en modo
  `strict`). `MotionConfig reducedMotion="user"` aplica el movimiento reducido a todo Motion.
- Solo `transform`, `opacity`, `filter` y `clip-path`. Desplazamientos de hover < 2 px, salvo las
  opciones de «Quiero dejar de…» (`.option-row`), que se corren 6 px como en la maqueta v3
  (decisión de Paul, 2026-11-27). Todo movimiento que dure más de 5 s debe poder pausarse (la
  cinta de tecnologías tiene su botón).

## Rutas /wa

- Son enlaces cortos a WhatsApp para Instagram, Facebook y volantes: abren el chat del negocio
  con un mensaje inicial que dice de dónde viene la persona.
- `/wa` usa el mensaje genérico; `/wa/ig`, `/wa/fb` y `/wa/volante` usan el de su canal.
- Los canales y sus mensajes viven en `WA_CHANNELS` (`shared/lib/waChannels.ts`). Para agregar uno,
  se agrega ahí y la ruta se genera sola.
- Un canal que no existe da 404 (`dynamicParams = false` en `app/wa/[channel]/page.tsx`).
- Las páginas llevan `noindex` y no están en `app/sitemap.ts`: no deben aparecer en buscadores.
- Las pruebas del enlace están en `shared/lib/waChannels.test.ts`.

## 📝 Development Guidelines

### Creating a New Feature

1. Create feature folder: `features/my-feature/`
2. Add components: `features/my-feature/components/`
3. Add hooks if needed: `features/my-feature/hooks/`
4. Define types: `features/my-feature/types.ts`
5. Export main component: `features/my-feature/index.ts`

### Example Feature Structure:
```
features/
└── hero/
    ├── components/
    │   ├── HeroTitle.tsx
    │   ├── HeroSubtitle.tsx
    │   └── HeroCTA.tsx
    ├── hooks/
    │   └── useHeroAnimation.ts
    ├── types.ts
    └── index.ts  (exports Hero component)
```

### Shared Components

Create reusable UI components in `shared/components/ui/`:
- Button, Input, Card, Modal, etc.
- These should be generic and feature-agnostic
- Use composition patterns for flexibility

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📦 Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `test` - Run unit tests (`node --test`, Node >= 24)

## Convenciones de código

- **Todo el código en inglés**: identificadores, nombres de archivos y carpetas, tipos, claves de
  i18n, clases CSS de componentes, comentarios. En español solo el texto visible (valores de
  i18n, `aria-label`, copy) y la documentación.
- **Comentarios mínimos**: el código se lee solo. Solo un "por qué" no obvio, en una línea.
  Nada de comentarios narrativos, banners ni referencias a diseños o decisiones fechadas.
- Se mantienen en español por contrato externo: rutas públicas y anclas (`/privacidad`,
  `#servicios`, `#ejemplos`…), campos JSON de la API (`sesion_id`, `mensaje`…), tokens de
  `globals.css` (`--papel`, `--tinta`, `--marca`…) y claves de `localStorage`.

- **Módulos puros testeados con `node --test`**: se importan con extensión `.ts` y rutas relativas, sin el alias `@/` (Node no lo resuelve); solo `import type` puede usar el alias.

## 🎨 Styling Conventions

- Utilidades de Tailwind para layout; tokens de `globals.css` para color y tipografía.
- Parte de las clases del sistema vive en `@layer components` y una utilidad la sobrescribe
  (`.indent-step` cede ante `m-0`: usa `my-0 mr-0`). Otras van fuera de capa y ganan a la
  utilidad (`.typing-dot` frente a `bg-*`: el color va en `style`).
- No hay `tailwind.config.ts`: Tailwind 4 se configura con `@theme` en `globals.css`.

## 🔄 State Management with Zustand

This project uses **Zustand** for global state management - a lightweight, scalable solution perfect for modern React applications.

### Why Zustand?
- Minimal boilerplate compared to Redux
- TypeScript-first with excellent type inference
- No providers needed - works directly with hooks
- Small bundle size (~1kb gzipped)
- Built-in devtools support

### Store Structure

Create stores in `shared/store/` for global state or within features for feature-specific state:

```
shared/
└── store/
    ├── useUIStore.ts         # UI state (modals, sidebar, etc.)
    ├── useUserStore.ts       # User data and auth
    └── useFormStore.ts       # Form state if needed

features/
└── contact/
    └── store/
        └── useContactStore.ts  # Contact form specific state
```

### Creating a Store

**Example: UI Store**
```typescript
// shared/store/useUIStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  isMenuOpen: boolean;
  isModalOpen: boolean;
  modalContent: string | null;
  toggleMenu: () => void;
  openModal: (content: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      isMenuOpen: false,
      isModalOpen: false,
      modalContent: null,
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      openModal: (content) => set({ isModalOpen: true, modalContent: content }),
      closeModal: () => set({ isModalOpen: false, modalContent: null }),
    }),
    { name: 'UIStore' }
  )
);
```

### Using Stores in Components

```typescript
// In any component
import { useUIStore } from '@/shared/store/useUIStore';

export function Header() {
  const { isMenuOpen, toggleMenu } = useUIStore();

  return (
    <button onClick={toggleMenu}>
      {isMenuOpen ? 'Close' : 'Open'} Menu
    </button>
  );
}
```

### Best Practices

1. **Keep stores focused**: One store per domain (UI, User, Form, etc.)
2. **Colocate feature stores**: Feature-specific state lives in the feature folder
3. **Use selectors for optimization**: `const isMenuOpen = useUIStore(state => state.isMenuOpen)`
4. **Actions in the store**: Keep all state mutations as store methods
5. **TypeScript everything**: Always type your store interfaces
6. **Use devtools in development**: Wrap stores with `devtools()` middleware

### Zustand + Server Components

With Next.js App Router, remember:
- Zustand works in **Client Components** only (use `'use client'` directive)
- For server-side data, use Server Components and pass props
- Use Zustand for client-side interactive state only

## 🧪 Testing Strategy (Future)

- Unit tests: Feature-specific logic and hooks
- Integration tests: Feature flows
- E2E tests: Critical user journeys

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html)
- [Vercel Skills](https://skills.sh)

## 🤝 Contributing

When adding new features:
1. Follow the feature-based structure
2. Keep features independent
3. Use shared components for reusable UI
4. Document complex logic
5. Use TypeScript strictly

## ⚠️ Important Instructions for AI Assistants

### Documentation Files
- **DO NOT** create summary documentation files (like OPTIMIZATIONS.md, SUMMARY.md, CHANGES.md, etc.) unless explicitly requested by the user
- Only create .md files when the user specifically asks for documentation
- Focus on code changes and verbal summaries instead of generating additional documentation files

---

**Last Updated**: 2026-09-28
**Version**: 2.0.0
