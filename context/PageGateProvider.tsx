'use client';
import { CategoriesGate, CitiesGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate } from 'effector-react';
import { FC } from 'react';

export const PageGateProvider: FC<CommonProps> = ({ children }) => {
  useGate(CitiesGate);
  useGate(CategoriesGate);

  return <>{children}</>;
};
