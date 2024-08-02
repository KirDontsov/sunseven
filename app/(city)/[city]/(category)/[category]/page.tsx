import {
	getCategories,
	getCategory,
	getCities,
	getCity,
	getFirms,
	getFirmsForMap,
	getOaiReviewsForFirms,
} from '@/app/api';
import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';
import { FirmsPage } from './FirmsPage';

export interface CategoryPageProps {
  params: { city: string; category: string };
  searchParams: { [key: string]: string | undefined };
}

export type CategoryMetaProps = {
  params: { city: string; category: string };
};

export async function generateMetadata({ params }: CategoryMetaProps): Promise<Metadata> {
  const cityId = params.city ?? '';
  const categoryId = params.category ?? '';

  const city = await getCity(cityId);
  const category = await getCategory(categoryId);

  const cityName = city?.name;
  const categoryName = category?.name;

  return {
    title: `Лучшие ${categoryName} города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы - ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    alternates: { canonical: `https://топвыбор.рф/${params.city}/${category?.abbreviation}` },
    keywords: [`${categoryName}`, ` ${cityName}`, ' отзывы', ' рейтинг'],
    openGraph: {
      title: `Лучшие ${categoryName} города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы - ${COMMON_TITLE}`,
      description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
      url: `https://топвыбор.рф/${params.city}/${category?.abbreviation}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Список фирм внутри категории */
export default async function Page({ params, searchParams }: CategoryPageProps) {
  const categoryAbbr = params?.category ?? '';
  const cityAbbr = params?.city ?? '';
  const firmsPage = searchParams?.firmsPage ?? '1';

  const category = await getCategory(categoryAbbr);
  if (!category) {
    notFound();
  }
  const firms = await getFirms(cityAbbr, categoryAbbr, firmsPage, 10);
  const firmsForMap = await getFirmsForMap(cityAbbr, categoryAbbr);
  const cities = await getCities();
  const city = await getCity(cityAbbr);
  const categories = await getCategories(1, 10);
  const oai_reviews = await getOaiReviewsForFirms(firms);

  return (
    <FirmsPage
      cityAbbr={cityAbbr}
      categoryAbbr={categoryAbbr}
      city={city}
      category={category}
      firms={firms}
      firmsForMap={firmsForMap}
      cities={cities}
      categories={categories}
      oai_reviews={oai_reviews}
    />
  );
}
