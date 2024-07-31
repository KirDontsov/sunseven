'use client';
import { FC } from 'react';
import { CommonProps } from '@/shared/types';
import { useGate } from 'effector-react';
import { CitiesGate } from '@/api';

export const CitiesGateProvider: FC<CommonProps> = ({ children }) => {
  useGate(CitiesGate);
  return <>{children}</>;
};
