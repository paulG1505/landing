# Spec Delta

> El repo no tiene `specs/landing-motion/spec.md` vigente: todo es `ADDED`.

## ADDED Requirements

### Requirement: Estado final sin JS
The served HTML of the hero shall already be the final day state, with «hecho solo.» complete and both chat bubbles visible.

#### Scenario: Sin JavaScript
- **WHEN** se abre `/` con JavaScript desactivado
- **THEN** se ven el titular completo, el lede, el CTA y las dos burbujas, sin capa de noche

### Requirement: Amanecer una vez por sesión
When the home loads at the top, without a hash, without reduced motion and without `sessionStorage['aiworks-amanecer']`, the hero shall play the dawn sequence once and set that key.

#### Scenario: Primera visita de la sesión
- **WHEN** se abre `/` en una pestaña nueva
- **THEN** la pantalla arranca en Noche, aparecen cliente, escribiendo y asistente, el `✓✓` pasa a petróleo, sale el círculo de luz desde el `✓✓` y «hecho solo.» se descifra; al terminar no queda capa de noche

#### Scenario: Segunda carga en la misma pestaña
- **WHEN** se recarga `/`
- **THEN** la página aparece directo en el estado final

#### Scenario: Llegada con ancla o con scroll
- **WHEN** se abre `/#precios`, o la página se restaura con `scrollY > 0`
- **THEN** el amanecer no corre

### Requirement: Saltar el amanecer
While the dawn sequence is playing, the hero shall jump to the final state on `pointerdown`, `touchstart`, `wheel`, `keydown` or `scroll`.

#### Scenario: Toque durante la noche
- **WHEN** el visitante toca la pantalla en el segundo 1 del amanecer
- **THEN** la página pasa al estado final sin animación

### Requirement: Repetir el amanecer
When the visitor activates «↻ Ver amanecer otra vez», the hero shall replay the dawn sequence regardless of the session key.

#### Scenario: Repetir
- **WHEN** se pulsa «↻ Ver amanecer otra vez»
- **THEN** la secuencia corre de nuevo desde Noche

### Requirement: Amanecer accesible
The night layer shall be `aria-hidden`, `inert` and free of element ids.

#### Scenario: Lector de pantalla
- **WHEN** un lector de pantalla recorre el hero durante el amanecer
- **THEN** lee una sola vez el titular «El trabajo que su equipo hace a mano, hecho solo.» y nunca los glifos del descifrado

### Requirement: Destello al hacer clic
When a pointer or keyboard activates any link or button outside `[disabled]` and `[aria-disabled="true"]`, the site shall show one flash of core, bloom and ring at the activation point, tinted by the `data-tone` under it, that leaves no trace after 700 ms.

#### Scenario: Clic en fondo claro
- **WHEN** se hace clic en «Precios» del encabezado
- **THEN** aparece el destello en tono claro (resplandor cian con `multiply`, núcleo blanco) y a los 700 ms no queda nada visible

#### Scenario: Clic en fondo Noche
- **WHEN** se hace clic en un sector de la demo
- **THEN** aparece el destello en tono oscuro (resplandor con `screen`, núcleo hueso)

#### Scenario: Botón relleno
- **WHEN** se hace clic en «Quiero mi asistente»
- **THEN** el destello usa tono oscuro y tamaño 1,6

#### Scenario: Teclado
- **WHEN** se activa un enlace con Enter
- **THEN** el destello sale del centro del enlace

#### Scenario: Clics rápidos
- **WHEN** se hacen 5 clics en 1 segundo
- **THEN** solo existe un nodo `.fx` en el DOM y cada clic cancela el destello anterior

### Requirement: Entradas por palabra
When a home section other than the hero enters the viewport for the first time, its marked words and blocks shall rise into place with blur in 0.8 s and the maqueta delays.

#### Scenario: Bajar a la pantalla 3
- **WHEN** `#demo` entra en pantalla
- **THEN** «IA con orden,» y «no IA a ciegas.» suben con desenfoque, y la columna de la demo y el log entran después

#### Scenario: Volver a subir
- **WHEN** la sección sale y vuelve a entrar
- **THEN** no se repite la entrada

### Requirement: Movimiento reducido
Where the visitor prefers reduced motion, the site shall skip the dawn and the word entrances and limit the click flash to a 240 ms fade.

#### Scenario: Reducir movimiento activado
- **WHEN** se activa «Reducir movimiento» en el sistema y se recorre la home
- **THEN** todo aparece quieto y completo desde el inicio, y un clic muestra solo un resplandor fijo que se funde

### Requirement: Colores forzados
Where `forced-colors: active` applies, the site shall not render the click flash.

#### Scenario: Alto contraste de Windows
- **WHEN** se navega con colores forzados
- **THEN** `.fx` tiene `display: none`
