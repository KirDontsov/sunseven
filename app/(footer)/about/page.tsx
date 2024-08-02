import { COMMON_DOMAIN, COMMON_HOST, COMMON_TITLE } from '@/shared';
import { Metadata } from 'next';
import { AboutPage } from './AboutPage';
import { getCategories, getCities } from '@/app/api';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `О нас ${COMMON_TITLE} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    alternates: { canonical: `${COMMON_HOST}/about` },
    keywords: ['отзывы', ' рейтинг', ' рестораны', ' салоны красоты', ' автосервисы', ' медицина'],
    openGraph: {
      title: `О нас ${COMMON_TITLE} - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы`,
      description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
      url: `${COMMON_HOST}/about`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

export default async function Page() {
  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return <AboutPage cities={cities} categories={categories} />;
}
