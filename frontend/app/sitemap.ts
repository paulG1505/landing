import { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/constants/site';

export const dynamic = 'force-static';

// Anchors must match the section ids the home renders; update lastModified to the PR date.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-11-27');

  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/#servicios`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/#demo`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/#precios`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/#contacto`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/como-trabajamos`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/preguntas`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacidad`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
