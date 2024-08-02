import { CategoriesQueryResult, Category, CategoryQueryResult, CitiesQueryResult, City, Firm } from '@/api';
import { BACKEND_PORT } from '@/shared';

/** SSR */
export async function getCities(): Promise<City[] | null> {
  const cities: CitiesQueryResult = await fetch(`${BACKEND_PORT}/api/cities?page=${1}&limit=${10}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  return cities?.data?.cities || null;
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

  return categories?.data?.categories || null;
}

export async function getCity(cityId: string): Promise<City | null> {
  const cities: CitiesQueryResult = await fetch(`${BACKEND_PORT}/api/cities?page=${1}&limit=${10}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
    .then((res) => res.json())
    .catch(() => {
      console.warn('error');
    });

  const city = cities?.data?.cities?.find((city) => city?.abbreviation === cityId);

  return city || null;
}

export async function getCategory(categoryId: string): Promise<Category | null> {
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
