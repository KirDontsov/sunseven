import { City } from '@/api';
import { FC } from 'react';
import { CitiesCard } from '../CitiesCard';

export interface CitiesListListProps {
  cities: City[] | null;
}
export const CitiesList: FC<CitiesListListProps> = ({ cities }) => {
  return (
    <>
      {!!cities?.length &&
        cities?.map(({ city_id, name, abbreviation }) => {
          return <CitiesCard key={city_id} cityId={city_id} name={name} abbreviation={abbreviation} />;
        })}
    </>
  );
};
