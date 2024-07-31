'use client';
import { CategoriesGateProvider, CategoriesList, CitiesGateProvider, CityIdGateProvider, Curve } from '@/features';
import { CommonNavProps } from '@/shared';
import { CommonHeader, Footer, Nav, Section } from '@/widgets';
import { FC } from 'react';

export interface CategoriesPageProps {
  cityId: string;
}

/** Список категорий внутри города */
export const CategoriesPage: FC<CategoriesPageProps & CommonNavProps> = ({ cityId, cities, categories }) => {
  return (
    <CitiesGateProvider>
      <CityIdGateProvider cityId={cityId}>
        <CategoriesGateProvider>
          <Curve>
            <Nav cities={cities} categories={categories} />
            <Section>
              <CommonHeader title="Категории" subTitle="раздел" />
              <div className="container flex flex-col gap-4 items-center mb-auto">
                <CategoriesList cityId={cityId} categories={categories} />
              </div>
              <div className="flex w-full">
                <Footer />
              </div>
            </Section>
          </Curve>
        </CategoriesGateProvider>
      </CityIdGateProvider>
    </CitiesGateProvider>
  );
};
