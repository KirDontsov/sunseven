'use client';
import {
  $reviewsCount,
  $reviewsPage,
  Category,
  City,
  Firm,
  ImageType,
  ImagesQueryResult,
  OaiDescription,
  OaiReview,
  PriceCategory,
  PriceItem,
  Review,
  setReviewsPageEvt,
} from '@/api';
import { useMediaQuery } from '@/hooks';
import { DEFAULT_PHOTOS_ENDPOINT, DEFAULT_PHOTOS_EXT, FETCH_LIMIT, HeroBackground, transliterate } from '@/shared';
import {
  Accordion,
  Anchors,
  AnimatedText,
  Button,
  Footer,
  ImageWithFallback,
  Pagination,
  Rating,
  SectionHeader,
} from '@/widgets';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

import styles from './oaiReviewStyles.module.scss';

const DynamicMap = dynamic(() => import('../../features/FirmsMap/FirmMap'));
const DynamicGallery = dynamic(() => import('../../features/Images'));
const DynamicSimilarFirms = dynamic(() => import('../../features/SimilarFirms'));
const DynamicReviewsList = dynamic(() => import('../../features/Reviews/ReviewsList'));
const DynamicPrices = dynamic(() => import('../../features/Prices'));

export interface FirmIdProps {
  city: City | null;
  category: Category | null;
  firm: Firm | null;
  firms: Firm[] | null;
  images: ImageType[] | null;
  reviews: Review[] | null;
  oai_description: OaiDescription | null;
  oai_reviews: OaiReview[] | null;
  prices: { prices_items: PriceItem[] | null; prices_categories: PriceCategory[] | null };
  similarFirmsImages: ImagesQueryResult[] | null;
}

export const FirmId: FC<FirmIdProps> = ({
  city,
  category,
  firm,
  firms,
  images,
  reviews,
  oai_description,
  oai_reviews,
  prices,
  similarFirmsImages,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { reviewsCount, setPage, page } = useUnit({
    page: $reviewsPage,
    setPage: setReviewsPageEvt,
    reviewsCount: $reviewsCount,
  });

  const handleAddReview = useCallback(() => {
    router.push(
      `/${city?.abbreviation}/${category?.abbreviation}/${firm?.url ?? transliterate(firm?.name ?? '')}/add_review`,
    );
  }, [router, city, category, firm]);

  const handleChangePage = useCallback(
    (e: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('reviewsPage', `${e}`);
      router.push(pathname + '?' + params.toString());
      setPage(e);
    },
    [setPage, router, searchParams, pathname],
  );

  const tablet = useMediaQuery('(max-width: 768px)');

  return (
    <div className="h-screen w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-8">
        <header>
          <div className="w-full bg-center bg-cover h-[calc(100svh)] relative">
            <ImageWithFallback
              className="w-full h-[38rem] absolute z-[-1]"
              src={`${DEFAULT_PHOTOS_ENDPOINT}/${city?.abbreviation}/${category?.abbreviation}/${firm?.firm_id}/${images?.[0]?.img_id}.${DEFAULT_PHOTOS_EXT}`}
              fallbackSrc={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
              fill
              alt={`${category?.name?.slice(0, -1)} ${firm?.name ?? ''} - ${city?.name ?? ''}`}
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL={`data:image/jpeg;base64,${HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}`}
              priority
            />
            <div className="flex items-center justify-center w-full h-full bg-eboni-900/30 z-[0]">
              <div className="text-center p-8">
                {category?.name && firm?.name && (
                  <AnimatedText
                    el="h1"
                    text={[`${category?.name?.slice(0, -1)} ${firm?.name ?? ''}`.toUpperCase()]}
                    className="font-semibold text-white text-2xl lg:text-3xl xl:text-8xl 2xl:text-12xl leading-none tracking-tighter"
                    once
                  />
                )}

                {firm?.default_phone && (
                  <Button onClick={() => {}}>
                    <a href={`tel:${firm?.default_phone}`}>Позвонить</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="w-full flex flex-col items-center gap-4 min-h-[500px] mt-[-120px] z-[1] text-sm xl:text-base">
          <div className="container w-full flex flex-col gap-8 items-center px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-eboni-800">
            <div className="w-full flex gap-8">
              <div className={cn('w-full flex flex-col gap-4')}>
                <Anchors />
                <div
                  className={cn('w-full flex', {
                    'gap-8 flex-col-reverse': tablet,
                  })}
                >
                  <div
                    className={cn('flex flex-col gap-4', {
                      'w-full': tablet,
                      'w-2/3': !tablet,
                    })}
                  >
                    <SectionHeader
                      id="contacts"
                      title={`Контакты ${category?.name?.slice(0, -1).toLowerCase()}а ${firm?.name ?? ''}`}
                    />
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-2 text-gray-500">
                        <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Адрес:
                      </div>
                      <p>{firm?.address}</p>
                    </div>
                  </div>

                  <div
                    className={cn('flex h-fit', {
                      'w-full': tablet,
                      'w-1/3 justify-end': !tablet,
                    })}
                  >
                    {Number(firm?.reviews_count) > 0 && (
                      <div className="flex items-center h-[60px]">
                        <div className="flex h-fit">
                          <Rating rating={firm?.rating} />
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span>{firm?.rating}</span> /
                          <span>{`${firm?.reviews_count} ${Number(firm?.reviews_count) === 1 ? 'отзыв' : (Number(firm?.reviews_count) ?? 0) <= 4 ? 'отзывa' : 'отзывов'}`}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {firm?.default_phone && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                      </svg>
                      Телефон:
                    </div>
                    <a href={`tel:${firm?.default_phone}`} className="dark:text-negroni-400 text-negroni-400">
                      {firm?.default_phone}
                    </a>
                  </div>
                )}

                {['Заказать онлайн', 'WhatsApp', '', null].indexOf(firm?.site ?? '') === -1 && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      Сайт:
                    </div>
                    <p>{firm?.site.indexOf('Показать телефон') !== -1 ? '' : firm?.site}</p>
                  </div>
                )}

                {!!firm?.coords && <DynamicMap firm={firm} />}

                {(firm?.description || oai_description?.oai_description_value) && (
                  <>
                    <SectionHeader
                      id="description"
                      title={`Описание ${category?.name?.slice(0, -1).toLowerCase()}а ${firm?.name ?? ''}`}
                    />
                    <div className={`${styles.myCustomStyle} list-disc`}>
                      {!oai_description?.oai_description_value || oai_description?.oai_description_value === ''
                        ? firm?.description
                        : oai_description?.oai_description_value
                            ?.replaceAll('*', '')
                            ?.replaceAll('#', '')
                            ?.replaceAll(',,,', ', доб. ')}
                    </div>
                  </>
                )}
                <DynamicPrices prices={prices} />
                <div className="flex flex-col gap-4 my-4">
                  <SectionHeader
                    id="faq"
                    title={`Часто задаваемые вопросы о ${category?.name?.slice(0, -1).toLowerCase()}е ${firm?.name ?? ''}`}
                  />
                  <Accordion firm={firm} category={category} />
                </div>
                <DynamicGallery firm={firm} city={city} category={category} images={images} tablet={tablet} />
              </div>
            </div>
          </div>
          {oai_reviews?.length ? (
            <>
              <div className="container my-4 px-8 xl:px-0">
                <SectionHeader
                  gold
                  {...(oai_reviews.length ? { id: 'reviews' } : {})}
                  title={`Краткое содержание и анализ отзывов о ${category?.name?.slice(0, -1).toLowerCase()}е ${firm?.name ?? ''}`}
                  subTitle={`Выводы сделаны нейросетью на основе реальных отзывов пользователей о ${category?.name?.slice(0, -1).toLowerCase()}е ${firm?.name ?? ''}`}
                />
              </div>
              <div className="container w-full p-8 bg-white rounded-lg shadow-md dark:bg-eboni-800">
                <div className={`${styles.myCustomStyle} list-disc`}>{oai_reviews?.[0]?.text ?? ''}</div>
              </div>
            </>
          ) : (
            <></>
          )}
          {reviewsCount ? (
            <>
              <div className="container flex flex-col items-center justify-between my-4 px-8 xl:px-0 lg:flex-row">
                <SectionHeader
                  {...(reviewsCount && !oai_reviews?.length ? { id: 'reviews' } : {})}
                  title={`Отзывы пользователей о ${category?.name?.slice(0, -1).toLowerCase()}е ${firm?.name ?? ''}`}
                />
                <Button onClick={handleAddReview}>Написать отзыв</Button>
              </div>
              <DynamicReviewsList reviews={reviews} />
            </>
          ) : (
            <div className="container flex flex-col items-center justify-between my-4 px-8 xl:px-0 lg:flex-row">
              <SectionHeader
                title="Нет отзывов"
                subTitle={`Напишите отзыв первым о ${category?.name?.slice(0, -1).toLowerCase()}е ${firm?.name ?? ''}`}
              />
              <Button onClick={handleAddReview}>Написать отзыв</Button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-4 pt-4 w-full mb-auto">
          {(reviewsCount ?? 1) > 11 && (
            <Pagination
              current={Number(searchParams.get('reviewsPage')) || page}
              onChange={handleChangePage}
              total={Math.ceil(((reviewsCount ?? 0) - 1) / FETCH_LIMIT)}
            />
          )}
          <div className="container flex flex-col items-center justify-between my-4 px-8 xl:px-0 lg:flex-row">
            <SectionHeader title={`Похожие ${category?.name ?? ''}:`} />
          </div>
          <div className="w-full px-8">
            <DynamicSimilarFirms
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
    </div>
  );
};
