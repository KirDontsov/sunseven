'use client';
import { $firmsCount, $firmsPage, Category, City, Firm, OaiReview, setFirmsPageEvt } from '@/api';
import {
  CategoriesGateProvider,
  CategoryIdGateProvider,
  CitiesGateProvider,
  CityIdGateProvider,
  FirmsGateProvider,
  FirmsList,
} from '@/features';
import { CommonNavProps, FETCH_LIMIT } from '@/shared';
import { Footer, Nav, Pagination, Section, SectionHeader } from '@/widgets';
import { useUnit } from 'effector-react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';

const DynamicMap = dynamic(() => import('../../../../../features/FirmsMap/FirmsMap'));

export interface FirmsPageProps {
  categoryAbbr: string;
  cityAbbr: string;
  category: Category | null;
  city: City | null;
  firms: Firm[] | null;
  firmsForMap: Firm[] | null;
  oai_reviews: OaiReview[] | null;
}

export const FirmsPage: FC<FirmsPageProps & CommonNavProps> = ({
  cities,
  categories,
  cityAbbr,
  categoryAbbr,
  category,
  firms,
  firmsForMap,
  city,
  oai_reviews,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { firmsCount, setPage, page } = useUnit({
    page: $firmsPage,
    setPage: setFirmsPageEvt,
    firmsCount: $firmsCount,
  });

  const handleChangePage = useCallback(
    (e: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('firmsPage', `${e}`);
      router.push(pathname + '?' + params.toString());
      setPage(e);
    },
    [setPage, router, searchParams, pathname],
  );

  return (
    <CitiesGateProvider>
      <CityIdGateProvider cityId={cityAbbr}>
        <CategoriesGateProvider>
          <CategoryIdGateProvider categoryAbbr={categoryAbbr ?? ''}>
            <FirmsGateProvider cityAbbr={cityAbbr} categoryAbbr={categoryAbbr}>
              <Nav cities={cities} categories={categories} />
              <Section pt={0}>
                <div className="flex xl:flex-row w-full flex-col-reverse md:px-4 xl:px-0">
                  <div className="flex flex-col gap-2 bg-white dark:bg-eboni-900 xl:h-[100svh] xl:overflow-auto pt-[96px] relative w-full 2xl:w-[21%] xl:w-[41%] h-fit overflow-x-hidden">
                    <div className="p-8">
                      <SectionHeader
                        title={`${categories?.find((cat) => cat?.abbreviation === categoryAbbr)?.name?.slice(0, -1)}ы города ${cities?.find((city) => city?.abbreviation === cityAbbr)?.name}`}
                        subTitle="Раздел отсортирован по рейтингу"
                      />
                    </div>
                    {firms?.length ? (
                      <FirmsList firms={firms} city={city} category={category} oai_reviews={oai_reviews} />
                    ) : (
                      <SectionHeader title="Что-то пошло не так" subTitle="Нет компаний в данном разделе" />
                    )}
                    <div className="py-4 w-full mb-auto sticky bottom-0 bg-white dark:bg-eboni-900">
                      <div className="flex flex-col items-center overflow-x-auto w-full">
                        {!!firms?.length && (
                          <Pagination
                            current={Number(searchParams.get('firmsPage')) || page}
                            onChange={handleChangePage}
                            total={Math.ceil((firmsCount ?? 0) / FETCH_LIMIT)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col 2xl:w-[79%] xl:w-[59%] md:w-full w-full px-4 md:px-0">
                    <DynamicMap firmsForMap={firmsForMap} city={city} category={category} />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 pt-4 w-full mb-auto">
                  <Footer />
                </div>
              </Section>
            </FirmsGateProvider>
          </CategoryIdGateProvider>
        </CategoriesGateProvider>
      </CityIdGateProvider>
    </CitiesGateProvider>
  );
};
