'use client';
import {
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
} from '@/api';
import {
  CategoriesGateProvider,
  CategoryIdGateProvider,
  CitiesGateProvider,
  CityIdGateProvider,
  FirmId,
  FirmIdGateProvider,
  FirmsGateProvider,
  ImagesGateProvider,
  OaiDescriptionGateProvider,
  PricesGateProvider,
  ReviewsGateProvider,
  SimilarImagesGateProvider,
} from '@/features';
import { CommonNavProps } from '@/shared';
import { Nav, Section } from '@/widgets';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

// TODO: заменить во всех провайдерах firmId на firmUrl

export interface FirmIdPageProps {
  cityId: string;
  categoryAbbr: string;
  firmUrl: string;
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

export const FirmIdPage: FC<FirmIdPageProps & CommonNavProps> = ({
  cityId,
  categoryAbbr,
  firmUrl,
  cities,
  city,
  categories,
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
  const searchParams = useSearchParams();

  return (
    <CitiesGateProvider>
      <CityIdGateProvider cityId={cityId}>
        <CategoriesGateProvider>
          <CategoryIdGateProvider categoryAbbr={categoryAbbr ?? ''}>
            <FirmsGateProvider cityAbbr={cityId} categoryAbbr={categoryAbbr ?? ''}>
              <FirmIdGateProvider firmUrl={firmUrl}>
                <ImagesGateProvider firmUrl={firmUrl}>
                  <PricesGateProvider firmUrl={firmUrl}>
                    <ReviewsGateProvider firmUrl={firmUrl} reviewsPage={Number(searchParams.get('reviewsPage')) || 1}>
                      <OaiDescriptionGateProvider firmUrl={firmUrl}>
                        <SimilarImagesGateProvider key={firmUrl}>
                          <Nav cities={cities} categories={categories} />
                          <Section pt={0}>
                            <FirmId
                              city={city}
                              category={category}
                              firm={firm}
                              firms={firms}
                              images={images}
                              reviews={reviews}
                              oai_reviews={oai_reviews}
                              oai_description={oai_description}
                              prices={prices}
                              similarFirmsImages={similarFirmsImages}
                            />
                          </Section>
                        </SimilarImagesGateProvider>
                      </OaiDescriptionGateProvider>
                    </ReviewsGateProvider>
                  </PricesGateProvider>
                </ImagesGateProvider>
              </FirmIdGateProvider>
            </FirmsGateProvider>
          </CategoryIdGateProvider>
        </CategoriesGateProvider>
      </CityIdGateProvider>
    </CitiesGateProvider>
  );
};
