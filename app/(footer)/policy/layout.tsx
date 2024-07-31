import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';

export default function PolicyLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
