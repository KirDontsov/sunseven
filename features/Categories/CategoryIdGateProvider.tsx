import { CategoryGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate } from 'effector-react';
import { FC } from 'react';

export interface CategoryIdGateProviderProps {
  categoryAbbr: string;
}

export const CategoryIdGateProvider: FC<CategoryIdGateProviderProps & CommonProps> = ({ children, categoryAbbr }) => {
  useGate(CategoryGate, { categoryAbbr });
  return <>{children}</>;
};
