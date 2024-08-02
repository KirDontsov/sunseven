import {
  CategoriesQueryResult,
  Category,
  CategoryQueryResult,
  CitiesQueryResult,
  City,
  Firm,
  FirmQueryResult,
  ImagesQueryResult,
  OaiDescriptionQueryResult,
  OaiReview,
  OaiReviewsQueryResult,
  Page,
  PageItem,
  PageQueryResult,
  PricesQueryResult,
  ReviewsQueryResult,
} from '@/api';
import { BACKEND_PORT } from '@/shared';

/** SSR */
export async function getPages(): Promise<PageItem[] | null> {
  const firms = await fetch(`${BACKEND_PORT}/api/pages`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return firms?.data?.pages || null;
}

export async function getCategories(page: number, limit: number): Promise<Category[] | null> {
  const categories: CategoriesQueryResult = await fetch(`${BACKEND_PORT}/api/categories?page=${page}&limit=${limit}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return categories?.data?.categories?.filter((x) => x?.is_active === 'true') || null;
}

export async function getCities(): Promise<City[] | null> {
  const cities: CitiesQueryResult = await fetch(`${BACKEND_PORT}/api/cities?page=${1}&limit=${10}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return cities?.data?.cities?.filter((x) => x?.is_active === 'true') || null;
}

export async function getCity(cityId: string): Promise<City | null> {
  const cities: City[] | null = await getCities();

  const city = cities?.find((city) => city?.abbreviation === cityId);

  return city || null;
}

export async function getCategory(categoryId: string): Promise<Category | null> {
  if (!categoryId) {
    return null;
  }
  const category: CategoryQueryResult = await fetch(`${BACKEND_PORT}/api/category_abbr/${categoryId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return category?.data?.category || null;
}

export async function getFirms(
  cityId: string,
  categoryId: string,
  page: string,
  limit: number,
): Promise<Firm[] | null> {
  const firms = await fetch(
    `${BACKEND_PORT}/api/firms_by_abbr?city_id=${cityId}&category_id=${categoryId}&page=${page}&limit=${limit}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  )
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return firms?.data?.firms || null;
}

export async function getFirmsForMap(cityId: string, categoryId: string): Promise<Firm[] | null> {
  const firms = await fetch(`${BACKEND_PORT}/api/firms_by_abbr_for_map?city_id=${cityId}&category_id=${categoryId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return firms?.data?.firms || null;
}

export async function getFirm(firmId: string): Promise<Firm | null> {
  const firm: FirmQueryResult = await fetch(`${BACKEND_PORT}/api/firm_by_url/${firmId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error getFirm');
    });

  return firm?.data?.firm || null;
}

export async function getImages(firmUrl: string) {
  const images: ImagesQueryResult = await fetch(`${BACKEND_PORT}/api/images_by_url/${firmUrl}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error getImages');
    });

  return images?.data?.images || null;
}

export async function getReviews(firmUrl: string, page: string, limit: number) {
  const reviews: ReviewsQueryResult = await fetch(
    `${BACKEND_PORT}/api/reviews_by_url/${firmUrl}?page=${page}&limit=${limit}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  )
    .then((res) => res.json())
    .catch(() => {
      console.warn('error getReviews');
    });

  return reviews?.data?.reviews || null;
}

export async function getOaiReviews(firmUrl: string) {
  const oai_reviews: OaiReviewsQueryResult = await fetch(`${BACKEND_PORT}/api/oai_reviews_by_url/${firmUrl}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error getReviews');
    });

  return oai_reviews?.data?.oai_reviews || null;
}

export async function getOaiDescription(firmUrl: string) {
  const oai_description: OaiDescriptionQueryResult = await fetch(
    `${BACKEND_PORT}/api/oai_description_by_url/${firmUrl}`,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    },
  )
    .then((res) => res.json())
    .catch(() => {
      console.warn('error getReviews');
    });

  return oai_description?.data?.oai_description || null;
}

export async function getPrices(firmUrl: string) {
  const oai_reviews: PricesQueryResult = await fetch(`${BACKEND_PORT}/api/prices_by_url/${firmUrl}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error getReviews');
    });

  return (
    {
      prices_items: oai_reviews?.data?.prices_items || null,
      prices_categories: oai_reviews?.data?.prices_categories || null,
    } || null
  );
}

export async function getSimilarFirmsImages(firmUrls: string[]): Promise<ImagesQueryResult[]> {
  const requests: Promise<ImagesQueryResult>[] = [];

  firmUrls.forEach((url: string) => {
    requests.push(
      fetch(`${BACKEND_PORT}/api/images_by_url/${url}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      })
        .then((res) => res.json())
        .catch(() => {
          console.warn('error getSimilarFirmsImages');
        }),
    );
  });

  const similarImages = await Promise.all(requests);

  return similarImages || null;
}

export async function getPageByUrl(pageUrl: string): Promise<Page | null> {
  const firm: PageQueryResult = await fetch(`${BACKEND_PORT}/api/page_by_url/${pageUrl}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error getFirm');
    });

  return firm?.data || null;
}

export async function getOaiReviewsForFirms(firms: Firm[] | null): Promise<OaiReview[] | null> {
  if (!firms?.length) {
    return null;
  }

  const requests: Promise<OaiReviewsQueryResult>[] = [];

  firms.forEach(({ url }: Firm) => {
    requests.push(
      fetch(`${BACKEND_PORT}/api/oai_reviews_by_url/${url}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      })
        .then((res) => res.json())
        .catch(() => {
          console.warn('error getOaiReviewsForFirms');
        }),
    );
  });

  const oai_reviews = await Promise.all(requests);

  return oai_reviews.map((x) => x?.data?.oai_reviews).flat() || null;
}
