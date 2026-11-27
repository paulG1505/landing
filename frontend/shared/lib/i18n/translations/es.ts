export const es = {
  header: {
    homeLabel: "AIworks, ir al inicio",
    navLabel: "Principal",
    whatsapp: "WhatsApp",
    whatsappMessage: "Hola, quiero saber más del asistente.",
    nav: {
      demo: "Demo",
      pricing: "Precios",
    },
  },
  hero: {
    label: "Inicio",
    lineA: "El trabajo que su equipo hace a mano,",
    lineB: "hecho solo.",
    lineB1: "hecho",
    lineB2: "solo.",
    lede: "Un asistente de WhatsApp que responde a sus clientes y anota cada decisión.",
    cta: "Probar el asistente",
    replay: "Ver amanecer otra vez",
    sampleLabel: "Conversación de ejemplo",
    chat: {
      client: "Hola, ¿hacen entregas hoy en Cumbayá?",
      assistant: "Sí, hasta las 18:00. ¿Le reservo el pedido?",
      time: "21:47",
    },
  },
  painPoints: {
    heading: "Quiero dejar de",
    todayLabel: "Hoy",
    withLabel: "Con AIworks",
    pickLabel: "Elija lo que quiere dejar de hacer",
    options: [
      { verb: "contestar tarde por WhatsApp", today: "Los mensajes de la noche se contestan al día siguiente.", withAi: "Se responden al llegar y pasan a ventas con prioridad." },
      { verb: "conciliar el banco a mano", today: "Una persona cruza el extracto línea por línea.", withAi: "El sistema cruza todo; usted revisa solo lo que no cuadra." },
      { verb: "digitar facturas en PDF", today: "Cada factura se digita de nuevo. Los errores salen al cierre.", withAi: "Se leen al llegar; una persona revisa solo lo dudoso." },
      { verb: "perseguir facturas vencidas", today: "Alguien escribe a cada cliente, uno por uno, cuando puede.", withAi: "El sistema recuerda el pago; una persona atiende las respuestas." },
      { verb: "adivinar el inventario real", today: "La hoja de cálculo y el sistema dicen cosas distintas.", withAi: "Se concilian a diario; usted ve solo las diferencias." },
    ],
    serviceNames: ["Automatización", "Asistentes con IA", "Lectura de documentos", "Integración"],
    other: { label: "¿Otro proceso? Cuéntenoslo", message: "Hola, quiero contarles un proceso." },
  },
  homeDemo: {
    headingA: "IA con orden,",
    headingB: "no IA a ciegas.",
    pickLabel: "Elija un negocio de ejemplo",
    logTitle: "Lo que queda anotado",
    askLabel: "Ahora pregúntele usted",
    placeholder: "Escriba como si fuera cliente de {name}",
    send: "Enviar pregunta",
    exampleNote: "{name} · empresa de ejemplo",
    allDemos: "ver todas las demos",
    trust: "Una persona revisa lo sensible.",
    trackRecord: "La marca es nueva; la experiencia, no: más de 7 años resolviendo procesos.",
    logTimes: ["10:02", "10:02", "10:02", "10:03"],
  },
  howWeWork: {
    eyebrow: "Cómo trabajamos",
    title: { before: "Tres fases.", highlight: "Sin sorpresas." },
    phaseLabel: "Fase",
    subtitle:
      "Tres fases, cada una con algo concreto que usted recibe al final. Si la primera no encuentra nada que valga la pena automatizar, se lo decimos y ahí queda.",
    deliverableLabel: "Usted recibe",
    phases: [
      {
        number: "01",
        title: "Descubrimiento",
        description:
          "Miramos el proceso donde está, con la gente que lo hace hoy. Medimos cuánto tiempo toma y dónde se rompe.",
        deliverable: "Un documento con el proceso tal como está, qué parte se puede automatizar y qué no conviene tocar.",
      },
      {
        number: "02",
        title: "Arquitectura y ejecución",
        description:
          "Diseñamos la solución y la construimos en entregas cortas, de modo que usted la vea funcionando antes de que esté terminada.",
        deliverable: "El sistema funcionando sobre sus datos reales, con las reglas de revisión humana ya definidas.",
      },
      {
        number: "03",
        title: "Puesta en producción",
        description:
          "Lo conectamos a lo que ya usa, capacitamos a quien lo va a operar y dejamos el registro de auditoría andando.",
        deliverable: "El sistema en producción, la documentación para operarlo y el registro de cada decisión que toma.",
      },
    ],
    stackLabel: "Tecnologías con las que trabajamos",
    pause: "Pausar",
    resume: "Reanudar",
  },
  pricing: {
    heading: { before: "Asistente a precio fijo.", highlight: "Lo demás, a medida." },
    items: [
      {
        label: "Instalación · pago único",
        figure: "169",
        amount: "USD 169 + IVA",
        line: "Precio de fundador, primeras 10 empresas. Luego USD 600. Lista en 15 días hábiles.",
      },
      {
        label: "Plan Básico · al mes",
        figure: "49",
        amount: "USD 49 + IVA al mes",
        line: "Solo WhatsApp. 250 conversaciones.",
      },
      {
        label: "Plan Crecimiento · al mes",
        figure: "89",
        amount: "USD 89 + IVA al mes",
        line: "WhatsApp, 750 conversaciones, más el chat de su web.",
      },
    ],
    terms: "+ IVA · Mensajes de Meta incluidos · Permanencia de 3 meses · Si se pasa, solo lo que cobre Meta",
    custom: {
      lead: "¿Algo a medida?",
      amount: "Se cotiza según su proceso",
      detail: "Prototipo en 2 días hábiles.",
      cta: "Hablemos de su proceso",
      message: "Hola, quiero ver un prototipo de un sistema a medida para mi proceso.",
    },
    note: "Permanencia de 3 meses. Si se pasa de las conversaciones del plan, el asistente no se corta: solo se cobra lo que Meta cobre por encima, a su valor y sin recargo nuestro.",
    cta: "Quiero mi asistente",
    ctaMessage: "Hola, quiero el asistente de WhatsApp para mi negocio.",
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: { before: "Lo que suelen", highlight: "preguntarnos." },
    items: [
      {
        question: "¿Cuánto cuesta?",
        answer:
          "El asistente de WhatsApp tiene precio fijo: instalación de fundador de USD 169 + IVA y planes desde USD 49 + IVA al mes (vea Precios). Un sistema a su medida depende de su proceso: en 2 días hábiles le mostramos un prototipo funcionando y le damos el alcance, el precio y el plazo cerrados. La llamada de 15 minutos no tiene costo.",
      },
      {
        question: "¿Cuánto demora?",
        answer:
          "El asistente de WhatsApp queda funcionando en 15 días hábiles. En un sistema a su medida, en 2 días hábiles le mostramos un prototipo funcionando con su propio proceso y el sistema completo suele tomar unos 45 días.",
      },
      {
        question: "¿Qué pasa si la IA se equivoca?",
        answer:
          "Por eso no decide sola en lo que importa. Los pasos sensibles pasan por una persona antes de ejecutarse, y cada decisión queda registrada con su hora, así se puede ver qué hizo el sistema y corregirlo.",
      },
      {
        question: "¿Qué pasa con los datos de mi empresa?",
        answer:
          "Se quedan donde usted decida, y acordamos confidencialidad al iniciar el proyecto. Trabajamos bajo la Ley Orgánica de Protección de Datos Personales del Ecuador, y en el diagnóstico no necesitamos datos reales para decirle si el proceso se puede automatizar.",
      },
    ],
  },
  cta: {
    titleA: "¿Qué le está",
    titleB: "costando",
    highlight: "más?",
    description: "15 minutos, sin costo.",
    whatsapp: "Hablar por WhatsApp",
    whatsappMessage: "Hola, quiero agendar la llamada de 15 minutos.",
  },
  footer: {
    navLabel: "Pie",
    howWeWork: "Cómo trabajamos",
    faq: "Preguntas",
    privacy: "Privacidad",
    copyright: "© 2026 AIworks",
  },
  legal: {
    back: "Volver al inicio",
    privacy: {
      title: "Política de privacidad",
      updated: "Última actualización: 25 de noviembre de 2026",
      intro:
        "Esta política explica qué datos personales recibe AIworks a través de este sitio, para qué los usa y cómo puede ejercer sus derechos según la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP).",
      sections: [
        {
          title: "Quién es responsable",
          paragraphs: [
            "AIworks (RUC 1727406223001), consultora de software con sede en Quito, Ecuador, es responsable del tratamiento de los datos descritos aquí. Puede escribirnos a {email}.",
          ],
        },
        {
          title: "Qué datos recibimos",
          paragraphs: [
            "Este sitio tiene un asistente de chat. Si usted lo usa, guardamos la conversación durante 30 días para mejorar las respuestas y después la borramos. No guardamos su dirección IP en claro: solo una huella que cambia cada día y que sirve para limitar abusos.",
            "Si usted pide una llamada, la empresa y el cargo que indique pasan a nuestro registro comercial. Su número de teléfono solo nos llega si usted nos escribe por WhatsApp. Por correo recibimos lo que decida enviarnos: su dirección y el contenido de su mensaje.",
            "El sitio no usa cookies de seguimiento ni herramientas de analítica. Su navegador guarda dos preferencias locales —idioma y modo claro u oscuro— y, mientras la pestaña esté abierta, un identificador de la sesión del chat. Nada de eso sirve para identificarle.",
          ],
        },
        {
          title: "Citas en las demostraciones",
          paragraphs: [
            "Algunas demostraciones de este sitio permiten reservar, cambiar y cancelar una cita de prueba. En ellas el asistente le pide solo su nombre y un teléfono de contacto; no le pide síntomas, cédula ni datos médicos, y le sugerimos usar datos inventados.",
            "Esos datos, junto con el servicio, la fecha y la hora, se guardan en un calendario de AIworks en Google (Google LLC, en Estados Unidos) y en nuestro servidor, y se borran todas las noches. Una demostración no genera ninguna cita real ni se comunica a ninguna clínica.",
          ],
        },
        {
          title: "Para qué los usamos",
          paragraphs: [
            "Para responder su consulta, preparar un diagnóstico o una propuesta, y dar seguimiento a la conversación que usted inició. La base legal es su consentimiento al contactarnos y, si llegamos a trabajar juntos, la ejecución del contrato.",
            "No vendemos ni cedemos sus datos a terceros. No los usamos para enviarle publicidad que no haya pedido.",
          ],
        },
        {
          title: "Dónde se guardan y por cuánto tiempo",
          paragraphs: [
            "Los mensajes quedan en los servicios que usted eligió para escribirnos (WhatsApp de Meta o nuestro proveedor de correo), que pueden procesar datos fuera del Ecuador. Los mensajes del chat los procesa nuestro proveedor de inteligencia artificial (Anthropic, en Estados Unidos) y el registro comercial vive en Notion; ninguno usa sus datos para otros fines. Conservamos la conversación mientras dure la relación comercial o hasta que usted pida su eliminación.",
          ],
        },
        {
          title: "Sus derechos",
          paragraphs: [
            "Puede pedir en cualquier momento acceder a sus datos, corregirlos, eliminarlos, oponerse a su tratamiento o recibirlos en un formato portable. Escríbanos a {email} y le responderemos en un plazo máximo de 15 días.",
            "Si considera que no atendimos su solicitud, puede acudir a la Superintendencia de Protección de Datos Personales del Ecuador.",
          ],
        },
        {
          title: "Cambios a esta política",
          paragraphs: [
            "Si esta política cambia, publicaremos la nueva versión en esta misma página con su fecha de actualización.",
          ],
        },
      ],
    },
  },
} as const;
