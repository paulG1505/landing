import type { Metadata } from 'next';
import { Faq } from '@/features/faq';
import { FaqStructuredData } from '@/shared/components/seo/FaqStructuredData';
import { SITE_URL } from '@/shared/constants/site';
import { es } from '@/shared/lib/i18n/translations/es';

export const metadata: Metadata = {
  title: es.faq.page.title,
  description: es.faq.page.description,
  alternates: { canonical: `${SITE_URL}/preguntas` },
};

export default function FaqPage() {
  return (
    <>
      <FaqStructuredData />
      <Faq />
    </>
  );
}
