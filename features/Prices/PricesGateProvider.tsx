'use client';
import { $firm, PricesGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import { FC } from 'react';

export interface PricesGateProvider {
  firmUrl: string;
}

export const PricesGateProvider: FC<PricesGateProvider & CommonProps> = ({ children, firmUrl }) => {
  const { firm } = useUnit({
    firm: $firm,
  });

  useGate(PricesGate, { firmUrl: firmUrl ?? firm?.url });

  return <>{children}</>;
};
