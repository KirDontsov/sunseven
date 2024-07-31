import {
  $categories,
  $cities,
  $firmsPage,
  $searchVariants,
  $searchVariantsExpanded,
  Category,
  City,
  toggleSearchVariantsEvt,
} from '@/api';
import { useOnClickOutside } from '@/hooks';
import { Button } from '@/widgets';
import { useUnit } from 'effector-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, MouseEvent, useCallback, useRef } from 'react';

export interface SearchVariantsProps {
  cities?: City[] | null;
  categories?: Category[] | null;
}

export const SearchVariants: FC<SearchVariantsProps> = ({ cities, categories }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const { firmsPage, searchVariants, searchVariantsExpanded, toggleSearchVariants } = useUnit({
    firmsPage: $firmsPage,
    searchVariants: $searchVariants,
    searchVariantsExpanded: $searchVariantsExpanded,
    toggleSearchVariants: toggleSearchVariantsEvt,
  });

  const handleClick = useCallback(
    ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
      const variantFirm = searchVariants?.find((item) => item?.url === currentTarget?.id);

      const city = cities?.find((item) => item?.city_id === variantFirm?.city_id);
      const category = categories?.find((item) => item?.category_id === variantFirm?.category_id);

      router.push(
        `/${city?.abbreviation}/${category?.abbreviation}/${currentTarget?.id}?firmsPage=${Number(searchParams.get('firmsPage')) || firmsPage}`,
      );
      toggleSearchVariants(false);
    },
    [cities, categories, searchVariants, firmsPage, searchParams, router, toggleSearchVariants],
  );

  const handleClickOutside = useCallback(() => {
    toggleSearchVariants(false);
  }, [toggleSearchVariants]);

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <>
      {!!searchVariants?.length && searchVariantsExpanded && (
        <div
          ref={dropdownRef}
          className="flex flex-col bg-white dark:bg-eboni-900 relative w-full h-fit top-[74px] px-8 items-center justify-center overflow-hidden"
        >
          <div className="flex flex-wrap gap-x-4 overflow-auto relative w-full max-h-[100svh] pt-4 pb-[96px]">
            {searchVariants?.map((variant) => (
              <Button id={variant?.url} key={variant?.firm_id} onClick={handleClick}>
                {`${categories?.find((item) => item?.category_id === variant?.category_id)?.name?.slice(0, -1)} - ${variant?.name} - ${cities?.find((item) => item?.city_id === variant?.city_id)?.name}`}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
