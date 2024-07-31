'use client';
import { Category, City, Firm, ImagesQueryResult } from '@/api';
import { SimilarFirms } from '@/features';
import { useMediaQuery } from '@/hooks';
import { HeroBackground } from '@/shared';
import { Anchors, Button, Footer, ImageWithFallback, SectionHeader } from '@/widgets';
import cn from 'classnames';
import { FC } from 'react';

export interface FirmLoadingProps {
  city: City | null;
  category: Category | null;
  firm: Firm | null;
  firms: Firm[] | null;
  similarFirmsImages: ImagesQueryResult[] | null;
}

export const FirmLoading: FC<FirmLoadingProps> = ({ city, category, firm, firms, similarFirmsImages }) => {
  const tablet = useMediaQuery('(max-width: 768px)');

  return (
    <div className="w-full flex flex-col gap-8">
      <header>
        <div className="w-full bg-center bg-cover h-[38rem] relative">
          <ImageWithFallback
            className="w-full h-[38rem] absolute z-[-1]"
            src={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
            fallbackSrc={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
            fill
            alt={`${category?.name?.slice(0, -1)} ${firm?.name ?? ''} - ${city?.name}`}
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={`data:image/jpeg;base64,${HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}`}
            priority={true}
          />
          <div className="flex items-center justify-center w-full h-full bg-eboni-900/40">
            <div className="text-center">
              <div className="h-16 bg-eboni-200 rounded-full dark:bg-eboni-700 w-[300px] mb-4 animate-pulse"></div>
              <Button onClick={() => {}}>Позвонить</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full flex flex-col items-center gap-4 min-h-[500px] mt-[-120px] z-[1]">
        <div className="container w-full flex flex-col gap-8 items-center px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-eboni-800 min-h-[1000px]">
          <div
            className={cn('w-full flex gap-8', {
              'flex-col': tablet,
            })}
          >
            <div
              className={cn('flex flex-col gap-4 w-1/2', {
                'w-full': tablet,
              })}
            >
              <div
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center w-full"
              >
                <div className="flex items-center justify-center w-full h-[405px] bg-eboni-300 rounded dark:bg-eboni-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className={cn('w-1/2 flex flex-col gap-4', {
                'w-full': tablet,
              })}
            >
              <Anchors />

              <div className="w-full animate-pulse">
                <div className="h-4 bg-eboni-200 rounded-full dark:bg-eboni-700 w-48 mb-4"></div>
                <div className="h-3 bg-eboni-200 rounded-full dark:bg-eboni-700 max-w-[480px] mb-2.5"></div>
                <div className="h-3 bg-eboni-200 rounded-full dark:bg-eboni-700 mb-2.5"></div>
                <div className="h-3 bg-eboni-200 rounded-full dark:bg-eboni-700 max-w-[440px] mb-2.5"></div>
                <div className="h-3 bg-eboni-200 rounded-full dark:bg-eboni-700 max-w-[460px] mb-2.5"></div>
                <div className="h-3 bg-eboni-200 rounded-full dark:bg-eboni-700 max-w-[360px]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-8 px-8">
          <SectionHeader title={`Похожие ${category?.name}:`} />
        </div>
        <div className="w-full px-8">
          <SimilarFirms
            city={city}
            category={category}
            firm={firm}
            firms={firms}
            similarFirmsImages={similarFirmsImages}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};
