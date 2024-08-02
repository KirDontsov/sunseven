import { Category, City, Firm, OaiReview } from '@/api';
import { FC } from 'react';
import { FirmCard } from '../FirmCard';

export interface FirmsListProps {
  firms: Firm[] | null;
  city: City | null;
  category: Category | null;
  oai_reviews: OaiReview[] | null;
}

export const FirmsList: FC<FirmsListProps> = ({ firms, city, category, oai_reviews }) => {
  return (
    <>
      {!!firms?.length &&
        firms?.map(({ firm_id, name, address, url, rating, reviews_count }) => {
          const currentFirmOaiReview = oai_reviews?.find((x) => x?.firm_id === firm_id)?.text || null;

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
              oai_review={currentFirmOaiReview}
            />
          );
        })}
    </>
  );
};
