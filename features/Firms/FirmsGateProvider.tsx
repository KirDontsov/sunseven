'use client';
import { FirmsGate, FirmsPageGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate } from 'effector-react';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

export interface FirmsGateProps {
  cityAbbr: string;
  categoryAbbr: string;
}

export const FirmsGateProvider: FC<FirmsGateProps & CommonProps> = ({ children, cityAbbr, categoryAbbr }) => {
  const searchParams = useSearchParams();
  useGate(FirmsPageGate, Number(searchParams?.get('firmsPage')) || 1);
  useGate(FirmsGate, { cityAbbr, categoryAbbr });
  return <>{children}</>;
};
