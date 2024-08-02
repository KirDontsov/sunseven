import { setCityEvt } from '@/api';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { FC, useCallback } from 'react';

export interface CitiesCardProps {
  name: string;
  abbreviation: string;
  cityId: string;
}

export const CitiesCard: FC<CitiesCardProps> = ({ abbreviation, name, cityId }) => {
  const setCity = useUnit(setCityEvt);

  const handleChangeCity = useCallback(() => {
    setCity(cityId);
  }, [setCity, cityId]);

  return (
    <Link
      key={cityId}
      onClick={handleChangeCity}
      href={`/${abbreviation}`}
      className="flex flex-col w-full md:max-w-sm p-6 bg-white rounded-lg shadow hover:shadow-md dark:bg-eboni-800 hover:scale-[1.03] duration-300"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">{name}</h5>
      <p className="font-normal">Лучшие заведения в городе {name}</p>
    </Link>
  );
};
