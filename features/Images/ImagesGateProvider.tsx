'use client';
import { $firm, ImagesGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import { FC } from 'react';

export interface ImagesGateProviderProps {
  firmUrl: string;
}

export const ImagesGateProvider: FC<ImagesGateProviderProps & CommonProps> = ({ children, firmUrl }) => {
  const { firm } = useUnit({
    firm: $firm,
  });

  useGate(ImagesGate, { firmUrl: firmUrl ?? firm?.url });

  return <>{children}</>;
};
