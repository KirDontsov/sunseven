import { $firmsPage, Category, City, setFirmEvt } from '@/api';
import { transliterate } from '@/shared';
import { Rating } from '@/widgets';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, MouseEvent, useCallback, useState } from 'react';

import styles from '../oaiReviewStyles.module.scss';

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
  oai_review: string | null;
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
  oai_review,
}) => {
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const { page, setFirm } = useUnit({
    page: $firmsPage,
    setFirm: setFirmEvt,
  });

  const handleClick = useCallback(() => {
    setFirm({ firmUrl: url });
  }, [setFirm, url]);

  const handleToggle = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prevState) => !prevState);
  }, []);

  return (
    <Link
      key={firm_id}
      href={`/${city?.abbreviation}/${category?.abbreviation}/${url || transliterate(name ?? '')}?firmsPage=${Number(searchParams.get('firmsPage')) || page}`}
      onClick={handleClick}
      className="w-full px-8 py-4 bg-white rounded-lg shadow hover:shadow-md dark:bg-eboni-800 cursor-pointer hover:scale-[1.005] duration-300"
    >
      <div className="flex flex-col gap-2">
        <div
          className="text-lg md:text-xl flex flex-col gap-2 xl:flex-row justify-between xl:items-center font-bold text-gray dark:text-white"
          tabIndex={0}
        >
          <span className="max-w-[314.34px] break-words">{name}</span>
          <Rating rating={rating} />
        </div>
        {Number(reviews_count) > 0 && !!rating && (
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            <span>Рейтинг: {rating}</span> /{' '}
            <span>{`${reviews_count} ${Number(reviews_count) === 1 ? 'отзыв' : (Number(reviews_count) ?? 0) <= 4 ? 'отзывa' : 'отзывов'}`}</span>
          </p>
        )}

        <p className="mt-2 text-gray-600 dark:text-gray-300">{address}</p>
        {!!oai_review && (
          <p
            className={cn(`mt-2 text-gray-600 dark:text-gray-300 h-12 overflow-hidden ${styles.myCustomStyle}`, {
              'h-auto overflow-visible': open,
              'h-12 overflow-hidden': !open,
            })}
          >
            {oai_review}
          </p>
        )}
      </div>
      {!!oai_review && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-negroni-400 hover:text-negroni-500 hover:underline" tabIndex={0} onClick={handleToggle}>
            {!open ? 'Читать полностью' : 'Скрыть'}
          </div>
        </div>
      )}
    </Link>
  );
};
