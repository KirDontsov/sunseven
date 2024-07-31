import { BACKEND_PORT, FirmId, FirmUrl, PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { $firm } from '..';

export const PricesGate = createGate<FirmUrl>('PricesGate');
export const pricesD = createDomain('reviews');

export interface PriceItem {
  price_item_id: string;
  firm_id: string;
  price_category_id?: string;
  name?: string;
  value?: string;
}

export interface PriceCategory {
  price_category_id: string;
  firm_id: string;
  name?: string;
  value?: string;
}
export interface PricesQueryResult {
  status: string;
  data: {
    prices_categories: PriceCategory[];
    prices_items: PriceItem[];
    prices_count: number;
  };
}

export const $pricesItems = pricesD.createStore<PriceItem[]>([]);
export const $pricesCategories = pricesD.createStore<PriceCategory[]>([]);
export const $pricesPage = pricesD.createStore<number>(1);
export const $pricesCount = pricesD.createStore<number | null>(null);
export const fetchPricesEvt = pricesD.createEvent<FirmUrl>();
export const setPricesPageEvt = pricesD.createEvent<number>();

export const getPricesByUrlFx = pricesD.createEffect({
  handler: async ({ firmUrl, page, limit }: PaginationOptions & FirmUrl): Promise<{ prices: PricesQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/prices_by_url/${firmUrl}?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const prices = await res.json();

    return { prices };
  },
});

sample({
  clock: PricesGate.open,
  source: $pricesItems,
  filter: (s) => !s?.length,
  fn: (_, c) => ({ firmUrl: c?.firmUrl, page: 1, limit: 10 }),
  target: getPricesByUrlFx,
});

sample({
  clock: PricesGate.close,
  source: $pricesItems,
  fn: (_, c) => [],
  target: $pricesItems,
});

sample({
  clock: getPricesByUrlFx.doneData,
  fn: (c) => c.prices.data.prices_items || [],
  target: $pricesItems,
});

sample({
  clock: getPricesByUrlFx.doneData,
  fn: (c) => c.prices.data.prices_categories || [],
  target: $pricesCategories,
});

sample({
  clock: getPricesByUrlFx.doneData,
  fn: (c) => c.prices.data.prices_count || null,
  target: $pricesCount,
});

sample({
  clock: setPricesPageEvt,
  target: $pricesPage,
});

// Pagination
sample({
  clock: setPricesPageEvt,
  source: $firm,
  filter: (firm) => firm !== null,
  fn: (firm, page) => ({ firmUrl: firm?.url ?? '', page, limit: 10 }),
  target: getPricesByUrlFx,
});

sample({
  source: $firm,
  fn: (c) => ({ firmUrl: c?.url || '' }),
  target: fetchPricesEvt,
});
