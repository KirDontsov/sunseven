import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';

export default function CityLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
