import { Firm, ImageType } from '@/api';
import { COMMON_DOMAIN } from '@/shared';
import { Metadata } from 'next';
import { ArticlePage } from './ArticlePage';
import { getCategories, getCities, getFirm, getImages, getPageByUrl } from '@/app/api';

export interface ArticlePageProps {
  params: {
    article: string;
  };
}

export interface CategoryPageProps {
  params: { cityId: string; categoryId: string };
  searchParams: { [key: string]: string | undefined };
}

export type ArticleMetaProps = {
  params: { article: string };
};

export async function generateMetadata({ params }: ArticleMetaProps): Promise<Metadata> {
  const pageUrl = params.article ?? '';

  const page = await getPageByUrl(pageUrl);

  const title = page?.sections?.[0]?.title ?? '';
  const description = page?.sections?.[0]?.subtitle ?? '';
  const url = page?.page?.url ?? '';

  return {
    title: `${title}`,
    description: `${description}`,
    alternates: { canonical: `https://топвыбор.рф/blog/${url}` },
    keywords: ['отзывы', ' рейтинг'],
    openGraph: {
      title: `${title}`,
      description: `${description}`,
      url: `https://топвыбор.рф/blog/${url}`,
      siteName: `${COMMON_DOMAIN}`,
      locale: 'ru_RU',
      type: 'website',
    },
  };
}

/** Страница статьи */
export default async function Page({ params }: ArticlePageProps) {
  const pageUrl = params.article ?? '';

  const page = await getPageByUrl(pageUrl);

  const map = new Map<string, ImageType[]>();
  const firms: Firm[] | null = [];

  const x = await Promise.all(
    // @ts-ignore
    (page?.sections ?? [])?.map(async (section) => {
      const images = await getImages(section?.url ?? '');
      const firm = await getFirm(section?.url ?? '');

      if (firm) {
        firms.push(firm);
      }

      if (images?.length) {
        map.set(section?.page_block_section_id ?? '', images);
      }

      return map;
    }),
  );

  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return <ArticlePage page={page} cities={cities} categories={categories} firms={firms} images={map} />;
}
