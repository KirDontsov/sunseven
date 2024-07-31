import { BACKEND_PORT, createThrottleUnit } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { Firm } from '..';

export interface SearchValue {
  input: string | null;
}

export interface SearchQueryResult {
  status: string;
  data: {
    firms: Firm[];
  };
}

export const DEFAULT_VALUE = { input: null };

export const SearchGate = createGate<number>('search');
export const searchD = createDomain('search');

export const $searchTerm = searchD.createStore<SearchValue>(DEFAULT_VALUE);
export const $search = searchD.createStore<SearchValue>(DEFAULT_VALUE);
export const $searchVariants = searchD.createStore<Firm[] | null>(null);
export const $searchVariantsExpanded = searchD.createStore<boolean>(false);

export const getSearchVariantsEvt = searchD.createEvent<SearchValue>();
export const toggleSearchVariantsEvt = searchD.createEvent<boolean>();

export const getSearchVariantsFx = searchD.createEffect({
  handler: async ({ input }: SearchValue): Promise<{ firms: SearchQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/firms_search?input=${input}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const firms = await res.json();

    return { firms };
  },
});

sample({
  clock: getSearchVariantsEvt,
  target: $searchTerm,
});

sample({
  source: $searchTerm,
  filter: (s) => !!s?.input && s?.input?.length >= 3,
  fn: (s) => s,
  target: $search,
});

createThrottleUnit({
  source: $search,
  timeout: 300,
  target: getSearchVariantsFx,
});

sample({
  clock: getSearchVariantsFx.doneData,
  fn: (c) => c?.firms?.data?.firms || [],
  target: $searchVariants,
});

sample({
  source: { searchVariants: $searchVariants },
  filter: ({ searchVariants }) => !!searchVariants?.length,
  fn: () => true,
  target: toggleSearchVariantsEvt,
});

sample({
  clock: toggleSearchVariantsEvt,
  target: $searchVariantsExpanded,
});
