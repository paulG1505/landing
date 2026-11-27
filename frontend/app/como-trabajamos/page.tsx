import type { Metadata } from 'next';
import { HowWeWork } from '@/features/how-we-work';
import { SITE_URL } from '@/shared/constants/site';
import { es } from '@/shared/lib/i18n/translations/es';

export const metadata: Metadata = {
  title: es.howWeWork.page.title,
  description: es.howWeWork.page.description,
  alternates: { canonical: `${SITE_URL}/como-trabajamos` },
};

export default function HowWeWorkPage() {
  return <HowWeWork />;
}
