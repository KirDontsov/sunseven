import { Category, City, Firm, ImagesQueryResult } from '@/api';
import { DEFAULT_PHOTOS_ENDPOINT, DEFAULT_PHOTOS_EXT, HeroBackground } from '@/shared';

import { FC } from 'react';
import { SimilarCard } from './SimilarCard';

export interface SimilarFirmsProps {
  city: City | null;
  category: Category | null;
  firm: Firm | null;
  firms: Firm[] | null;
  similarFirmsImages: ImagesQueryResult[] | null;
}

export const SimilarFirms: FC<SimilarFirmsProps> = ({ firm, firms, city, category, similarFirmsImages }) => {
  return (
    <div className="flex gap-4 overflow-x-auto w-full py-8">
      {!!firms?.length &&
        firms
          .filter((x) => x?.firm_id !== firm?.firm_id)
          .map((firm) => {
            const src = similarFirmsImages?.find((item) => item?.data?.images[0]?.firm_id === firm?.firm_id)?.data
              ?.images[0]?.img_id;
            return (
              <SimilarCard
                key={firm?.firm_id}
                firmId={firm?.firm_id}
                src={
                  src
                    ? `${DEFAULT_PHOTOS_ENDPOINT}/${city?.abbreviation}/${category?.abbreviation}/${firm?.firm_id}/${src}.${DEFAULT_PHOTOS_EXT}`
                    : ''
                }
                fallbackSrc={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
                alt={`${category?.name?.slice(0, -1)} ${firm?.name ?? ''} - ${city?.name ?? ''}`}
                title={firm?.name ?? ''}
                url={firm?.url ?? ''}
                subTitle={category?.name.slice(0, -1) || ''}
                address={firm?.address}
              />
            );
          })}
    </div>
  );
};
