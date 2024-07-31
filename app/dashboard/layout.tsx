'use client';
import { CenteredContainer, HeroSection, Nav } from '@/widgets';
import { AuthPageGateProvider } from '@/context';
import { CommonProps } from '@/shared/types';
import { EffectorNext } from '@effector/next';

export default function DashboardLayout({ children }: CommonProps) {
  return (
    <EffectorNext>
      <AuthPageGateProvider>
        <HeroSection>
          <Nav />
          <CenteredContainer h="screen">{children}</CenteredContainer>
        </HeroSection>
      </AuthPageGateProvider>
    </EffectorNext>
  );
}
