'use client';
import { FirmGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate } from 'effector-react';
import { FC } from 'react';

export interface FirmIdGateProviderProps {
  firmUrl: string;
}

export const FirmIdGateProvider: FC<FirmIdGateProviderProps & CommonProps> = ({ children, firmUrl }) => {
  useGate(FirmGate, { firmUrl });
  return <>{children}</>;
};
