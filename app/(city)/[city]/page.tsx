import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoriesPage } from './CategoriesPage';
import { getCategories, getCities, getCity } from '@/app/api';

export interface CityPageProps {
  params: {
    city: string;
  };
}

type CityIdProps = {
  params: { city: string };
};

export async function generateMetadata({ params }: CityIdProps): Promise<Metadata> {
  const cityId = params.city;

  const city = await getCity(cityId);
  const cityName = city?.name;

  return {
    title: `Лучшие компании города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы — ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    alternates: { canonical: `https://топвыбор.рф${city?.abbreviation}` },
    keywords: ['отзывы', ' рейтинг', ' рестораны', ' салоны красоты', ' автосервисы', ' медицина', ` ${cityName}`],
    openGraph: {
      title: `Лучшие компании города ${cityName} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы — ${COMMON_TITLE}`,
      description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
      url: `https://топвыбор.рф${city?.abbreviation}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
    other: {
      cityId: city?.city_id ?? '',
      city: cityName ?? '',
    },
  };
}

/** Список категорий внутри города */
export default async function Page({ params }: CityPageProps) {
  const cityId = params.city ?? '';

  const cities = await getCities();
  const categories = await getCategories(1, 10);
  const city = await getCity(cityId);

  if (!city) {
    notFound();
  }

  return <CategoriesPage cityId={cityId} cities={cities} categories={categories} />;
}
