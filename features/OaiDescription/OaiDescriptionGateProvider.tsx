'use client';
import { $firm, OaiDescriptionGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import { FC } from 'react';

export interface OaiDescriptionGateProviderProps {
  firmUrl: string;
}

export const OaiDescriptionGateProvider: FC<OaiDescriptionGateProviderProps & CommonProps> = ({
  children,
  firmUrl,
}) => {
  const { firm } = useUnit({
    firm: $firm,
  });

  useGate(OaiDescriptionGate, { firmUrl: firmUrl ?? firm?.url });

  return <>{children}</>;
};
