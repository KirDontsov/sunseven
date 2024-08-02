import { BACKEND_PORT, PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';

export interface Category {
  category_id: string;
  name: string;
  abbreviation: string;
  is_active: string;
}

export interface CategoriesQueryResult {
  status: string;
  data: {
    categories: Category[];
    categories_count: number;
  };
}

export interface CategoryQueryResult {
  status: string;
  data: {
    category: Category;
  };
}

export const categoryD = createDomain('category');
export const categoriesD = createDomain('categories');
export const CategoryGate = createGate<{ categoryAbbr: string }>('CategoryGate');
export const CategoriesGate = createGate('CategoriesGate');

export const $category = categoryD.createStore<Category | null>({
  category_id: '',
  name: '',
  abbreviation: '',
  is_active: 'false',
});
persist({ store: $category, key: 'category' });

export const $categoryAbbreviation = categoryD.createStore<string | null>(null);

export const setCategoryEvt = categoryD.createEvent<string>();

export const $categories = categoriesD.createStore<Category[]>([]);
persist({ store: $categories, key: 'categories' });
export const $categoriesCount = categoriesD.createStore<number | null>(null);

sample({
  clock: setCategoryEvt,
  source: $categories,
  fn: (s, c) => s.find((category) => category.category_id === c) || null,
  target: $category,
});

export const getCategoriesFx = categoriesD.createEffect({
  handler: async ({ page, limit }: PaginationOptions): Promise<{ categories: CategoriesQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/categories?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const categories = await res.json();

    return { categories };
  },
});

sample({
  clock: CategoriesGate.open,
  source: $categories,
  filter: (c) => !c?.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getCategoriesFx,
});

sample({
  clock: getCategoriesFx.doneData,
  fn: (c) => c.categories.data.categories || [],
  target: $categories,
});

sample({
  clock: getCategoriesFx.doneData,
  fn: (c) => c.categories.data.categories_count || null,
  target: $categoriesCount,
});

// === Category ===

export const getCategoryByAbbreviationFx = categoriesD.createEffect({
  handler: async ({ categoryAbbr }: { categoryAbbr: string }): Promise<{ category: CategoryQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/category_abbr/${categoryAbbr}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const category = await res.json();

    return { category };
  },
});

sample({
  clock: CategoryGate.open,
  target: getCategoryByAbbreviationFx,
});

sample({
  clock: getCategoryByAbbreviationFx.doneData,
  fn: (c) => c?.category?.data?.category,
  target: $category,
});
