import { CenteredContainer, HeroSection } from '@/widgets';
import { CommonProps } from '@/shared/types';
import { EffectorNext } from '@effector/next';

export default function RegisterLayout({ children }: CommonProps) {
  return (
    <EffectorNext>
      <HeroSection>
        <CenteredContainer h="screen">{children}</CenteredContainer>
      </HeroSection>
    </EffectorNext>
  );
}
