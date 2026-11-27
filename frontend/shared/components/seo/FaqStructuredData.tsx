import { es } from '@/shared/lib/i18n/translations/es';

// Plain script so the JSON-LD is in the static HTML; FAQPage belongs only on the page that shows the questions.
export function FaqStructuredData() {
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: es.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <script
      id="ld-preguntas"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, '\\u003c') }}
    />
  );
}
