import { FC } from 'react';
import { CategoriesGate, CityGate } from '@/api';
import { useGate } from 'effector-react';
import { CommonProps } from '@/shared';

export interface CityIdGateProviderProps {
  cityId: string;
}

export const CityIdGateProvider: FC<CityIdGateProviderProps & CommonProps> = ({ children, cityId }) => {
  useGate(CityGate, { cityId });
  useGate(CategoriesGate, { cityId });
  return <>{children}</>;
};
