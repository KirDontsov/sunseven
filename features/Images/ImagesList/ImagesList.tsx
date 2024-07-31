import { $category, $city, $firm, $imagesLoading, Category, City, Firm, ImageType } from '@/api';
import { DEFAULT_PHOTOS_ENDPOINT, DEFAULT_PHOTOS_EXT, HeroBackground } from '@/shared';
import { ImageWithFallback } from '@/widgets';
import { useUnit } from 'effector-react';
import { FC } from 'react';

export interface ImagesListProps {
  images: ImageType[] | null;
  firm: Firm | null;
  city: City | null;
  category: Category | null;
}

export const ImagesList: FC<ImagesListProps> = ({ firm, city, category, images }) => {
  const list = images?.map((img) => {
    return (
      <div key={img?.img_id} className="aspect-video relative">
        <ImageWithFallback
          key={img?.img_id}
          src={`${DEFAULT_PHOTOS_ENDPOINT}/${city?.abbreviation}/${category?.abbreviation}/${firm?.firm_id}/${img?.img_id}.${DEFAULT_PHOTOS_EXT}`}
          fallbackSrc={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
          fill
          alt={`${category?.name?.slice(0, -1)} ${firm?.name ?? ''} - ${city?.name}`}
          style={{ objectFit: 'cover' }}
        />
      </div>
    );
  });

  if (!images?.length) {
    return (
      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center w-full"
      >
        <div className="flex items-center justify-center w-full h-[405px] bg-eboni-300 rounded dark:bg-eboni-700">
          <svg
            className="w-10 h-10 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
    );
  }

  return list;
};
