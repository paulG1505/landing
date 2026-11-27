import dynamic from 'next/dynamic';
import { Hero } from '@/features/hero/components/Hero';
import { ScrollToAnchor } from '@/shared/components/providers/ScrollToAnchor';

const PainPoints = dynamic(
  () => import('@/features/pain-points/components/PainPoints').then((mod) => ({ default: mod.PainPoints })),
  { loading: () => null }
);

const Processes = dynamic(
  () => import('@/features/processes/components/Processes').then((mod) => ({ default: mod.Processes })),
  { loading: () => null }
);

const HowWeWork = dynamic(
  () => import('@/features/how-we-work/components/HowWeWork').then((mod) => ({ default: mod.HowWeWork })),
  { loading: () => null }
);

const Why = dynamic(
  () => import('@/features/why/components/Why').then((mod) => ({ default: mod.Why })),
  { loading: () => null }
);

const DemosSection = dynamic(
  () => import('@/features/demo/components/DemosSection').then((mod) => ({ default: mod.DemosSection })),
  { loading: () => null }
);

const Pricing = dynamic(
  () => import('@/features/pricing/components/Pricing').then((mod) => ({ default: mod.Pricing })),
  { loading: () => null }
);

const Faq = dynamic(
  () => import('@/features/faq/components/Faq').then((mod) => ({ default: mod.Faq })),
  { loading: () => null }
);

const HomeDemo = dynamic(
  () => import('@/features/demo/components/HomeDemo').then((mod) => ({ default: mod.HomeDemo })),
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
      <Processes />
      <HowWeWork />
      <Why />
      <DemosSection />
      <Pricing />
      <Faq />
      <Closing />
    </>
  );
}
