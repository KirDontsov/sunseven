import { $firmsPage, Category, City, setFirmEvt } from '@/api';
import { transliterate } from '@/shared';
import { Rating } from '@/widgets';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

export interface FirmsCardProps {
  firm_id: string;
  url: string;
  category_id?: string;
  name?: string;
  address?: string;
  descriptioin?: string;
  rating?: string;
  reviews_count?: string;
  city: City | null;
  category: Category | null;
}

export const FirmCard: FC<FirmsCardProps> = ({
  firm_id,
  url,
  name,
  address,
  rating,
  reviews_count,
  city,
  category,
}) => {
  const searchParams = useSearchParams();
  const { page, setFirm } = useUnit({
    page: $firmsPage,
    setFirm: setFirmEvt,
  });

  const handleClick = useCallback(() => {
    setFirm({ firmUrl: url });
  }, [setFirm, url]);

  return (
    <Link
      key={firm_id}
      href={`/${city?.abbreviation}/${category?.abbreviation}/${url || transliterate(name ?? '')}?firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
      onClick={handleClick}
      className="w-full px-8 py-4 bg-white rounded-lg shadow hover:shadow-md dark:bg-eboni-800 cursor-pointer hover:scale-[1.03] duration-300"
    >
      <div className="flex flex-col gap-2">
        <div
          className="text-lg md:text-xl flex flex-col gap-2 xl:flex-row justify-between xl:items-center font-bold text-gray dark:text-white"
          tabIndex={0}
        >
          {name}
          <Rating rating={rating} />
        </div>
        {Number(reviews_count) > 0 && !!rating && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            <span>Рейтинг: {rating}</span> /{' '}
            <span>{`${reviews_count} ${Number(reviews_count) === 1 ? 'отзыв' : (Number(reviews_count) ?? 0) <= 4 ? 'отзывa' : 'отзывов'}`}</span>
          </p>
        )}

        <p className="mt-2 text-gray-600 dark:text-gray-300">{address}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-negroni-400 hover:text-negroni-500 hover:underline" tabIndex={0}>
          Подробнее
        </div>
      </div>
    </Link>
  );
};
