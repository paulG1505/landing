import dynamic from 'next/dynamic';
import { Hero } from '@/features/hero/components/Hero';
import { ScrollToAnchor } from '@/shared/components/providers/ScrollToAnchor';

const PainPoints = dynamic(
  () => import('@/features/pain-points/components/PainPoints').then((mod) => ({ default: mod.PainPoints })),
  { loading: () => null }
);

const HomeDemo = dynamic(
  () => import('@/features/demo/components/HomeDemo').then((mod) => ({ default: mod.HomeDemo })),
  { loading: () => null }
);

const Pricing = dynamic(
  () => import('@/features/pricing/components/Pricing').then((mod) => ({ default: mod.Pricing })),
  { loading: () => null }
);

const Closing = dynamic(
  () => import('@/features/final-cta/components/Closing').then((mod) => ({ default: mod.Closing })),
  { loading: () => null }
);

export default function Home() {
  return (
    <>
      <ScrollToAnchor />
      <Hero />
      <PainPoints />
      <HomeDemo />
      <Pricing />
      <Closing />
    </>
  );
}
