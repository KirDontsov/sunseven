import { HeroSection } from '@/widgets';
import { CommonProps } from '@/shared/types';

export default function CitiesLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
