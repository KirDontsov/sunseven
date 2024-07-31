'use client';
import { SimilarImagesGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate } from 'effector-react';
import { FC } from 'react';

export const SimilarImagesGateProvider: FC<CommonProps> = ({ children }) => {
  useGate(SimilarImagesGate);

  return <>{children}</>;
};
