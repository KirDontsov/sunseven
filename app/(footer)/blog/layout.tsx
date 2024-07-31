import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';

export default function BlogLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
