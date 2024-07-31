import { getCategories, getCities, getPages } from '@/app/api';
import { COMMON_DOMAIN, COMMON_HOST, COMMON_TITLE } from '@/shared';
import { Metadata } from 'next';
import { BlogPage } from './BlogPage';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Блог - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы — ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    alternates: { canonical: `${COMMON_HOST}/blog` },
    keywords: ['отзывы', ' рейтинг', ' рестораны', ' салоны красоты', ' автосервисы', ' медицина'],
    openGraph: {
      title: `Блог - рейтинг кафе, баров, фастфудов, цены, фото, телефоны, адреса, отзывы — ${COMMON_TITLE}`,
      description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
      url: `${COMMON_HOST}/blog`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Список категорий внутри города */
export default async function Page() {
  const pages = await getPages();
  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return <BlogPage pages={pages} cities={cities} categories={categories} />;
}
