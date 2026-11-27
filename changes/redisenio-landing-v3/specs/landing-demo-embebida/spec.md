# Spec Delta

> El repo no tiene `specs/landing-demo-embebida/spec.md` vigente: todo es `ADDED`.

## ADDED Requirements

### Requirement: Elegir un negocio de ejemplo
The `#demo` section shall offer the four sector demos of `SECTOR_DEMOS` as toggle buttons with `aria-pressed`, with `salud` selected on first render.

#### Scenario: Cambiar de sector
- **WHEN** se pulsa «Finanzas»
- **THEN** el botón queda con `aria-pressed="true"`, los demás con `"false"`, y la conversación de ejemplo y el log pasan a los de Cooperativa de Ahorro y Crédito Alto Yacu

### Requirement: Conversación de ejemplo rotulada
When a sector is selected, the section shall play that sector's scripted question, typing indicator, answer and four log rows from `t.homeDemo.sectors`, labelled as an example company.

#### Scenario: Guion de salud
- **WHEN** se elige «Salud»
- **THEN** aparece la pregunta, luego los puntos de escribiendo, luego la respuesta, y el log «Lo que queda anotado» se llena fila por fila hasta 4; debajo se lee «Clínica Santa Aurelia · empresa de ejemplo»

#### Scenario: Movimiento reducido
- **WHEN** el visitante prefiere movimiento reducido y elige un sector
- **THEN** la pregunta, la respuesta y las 4 filas aparecen de una vez

### Requirement: Pregunta propia contra la API
When the visitor submits a non-empty question in «Ahora pregúntele usted», the section shall send it with `useConversation` to tenant `demo-sector-<sector>` and show only the reply the API returns.

#### Scenario: Respuesta del simulador
- **WHEN** con `node scripts/mock-chat-api.mjs` corriendo se escribe «¿Tienen turno el sábado?» y se envía
- **THEN** aparece la burbuja del visitante, luego escribiendo, luego la respuesta del simulador

#### Scenario: Límite o falla
- **WHEN** se envía `limite` o `falla`
- **THEN** se muestra el texto de límite o de error que ya usa el chat, sin respuesta inventada

#### Scenario: Campo vacío
- **WHEN** se envía el campo vacío o solo con espacios
- **THEN** no se hace ninguna llamada a la API

#### Scenario: Cambiar de sector después de preguntar
- **WHEN** se pregunta en «Salud» y luego se elige «Logística»
- **THEN** la conversación propia se vacía y la próxima pregunta va a `demo-sector-logistica`

### Requirement: Límite de caracteres de demo
The question field shall accept at most `DEMO_MAX_CHARS` characters.

#### Scenario: Texto largo
- **WHEN** se pegan 600 caracteres
- **THEN** el campo conserva 400

### Requirement: Enlace a todas las demos
The `#demo` section shall link to `/demo` with the text «ver todas las demos».

#### Scenario: Ir a la galería
- **WHEN** se pulsa «ver todas las demos»
- **THEN** se abre `/demo` con la galería de 4 sectores de siempre

### Requirement: /demo sin cambios de comportamiento
The `/demo` route shall keep its gallery, sector and prospect views, and its conversation panel shall fill the viewport below the in-flow header.

#### Scenario: Demo de prospecto
- **WHEN** se abre `/demo#tienda-ejemplo-k3m9x2` con el simulador
- **THEN** se ve la demo de «Tienda Ejemplo» como hoy y el panel del chat no queda tapado ni deja hueco bajo el encabezado

#### Scenario: Demo inexistente
- **WHEN** se abre `/demo#nohay-k3m9x2`
- **THEN** se ve el aviso de demo no disponible como hoy
