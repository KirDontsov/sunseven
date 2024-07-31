import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';

export default function AboutLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
