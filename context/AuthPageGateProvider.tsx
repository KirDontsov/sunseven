'use client';
import { CommonProps, storage } from '@/shared';
import { PageGate } from '.';
import { useGate } from 'effector-react';
import { FC } from 'react';

export const AuthPageGateProvider: FC<CommonProps> = ({ children }) => {
  let x: string | null | undefined;
  if (typeof window !== 'undefined') {
    x = storage ? storage.getItem('user-auth') : null;
  }

  useGate(PageGate, JSON.parse(x || '{}'));

  return <>{children}</>;
};
