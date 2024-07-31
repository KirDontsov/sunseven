import { Category, City, Firm } from '@/api';
import { FC } from 'react';
import { FirmCard } from '../FirmCard';

export interface FirmsListProps {
  firms: Firm[] | null;
  city: City | null;
  category: Category | null;
}

export const FirmsList: FC<FirmsListProps> = ({ firms, city, category }) => {
  return (
    <>
      {!!firms?.length &&
        firms?.map(({ firm_id, name, address, url, rating, reviews_count }) => {
          return (
            <FirmCard
              key={firm_id}
              firm_id={firm_id}
              city={city}
              category={category}
              url={url}
              name={name}
              address={address}
              rating={rating}
              reviews_count={reviews_count}
            />
          );
        })}
    </>
  );
};
