import { setCategoryEvt } from '@/api';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { FC, useCallback } from 'react';

export interface CategoryCardProps {
  categoryId: string;
  name: string;
  abbreviation: string;
  cityId: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ categoryId, abbreviation, name, cityId }) => {
  const setCategory = useUnit(setCategoryEvt);

  const handleChangeCategory = useCallback(() => {
    setCategory(categoryId);
  }, [setCategory, categoryId]);

  return (
    <Link
      key={categoryId}
      onClick={handleChangeCategory}
      href={`/${cityId}/${abbreviation}`}
      className="flex flex-col w-full md:max-w-sm p-6 bg-white rounded-lg shadow hover:shadow-md dark:bg-eboni-800 hover:scale-[1.03] duration-300"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">{name}</h5>
      <p className="font-normal">Лучшие {name} в городе</p>
    </Link>
  );
};
