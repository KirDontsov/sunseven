import { CommonProps } from '@/shared/types';
import { HeroSection } from '@/widgets';

export default function ArticleLayout({ children }: CommonProps) {
  return <HeroSection>{children}</HeroSection>;
}
