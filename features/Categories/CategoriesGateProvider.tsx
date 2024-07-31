import { CategoriesGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate } from 'effector-react';
import { FC } from 'react';

export const CategoriesGateProvider: FC<CommonProps> = ({ children }) => {
  useGate(CategoriesGate);
  return <>{children}</>;
};
