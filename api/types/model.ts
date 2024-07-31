import { BACKEND_PORT, PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { persist } from 'effector-storage/local';

export interface Type {
  type_id: string;
  name: string;
  abbreviation: string;
}

export interface TypesQueryResult {
  status: string;
  data: {
    types: Type[];
    types_count: number;
  };
}

export const typeD = createDomain('typeD');
export const typesD = createDomain('typesD');
export const TypeGate = createGate<{ typeId: string }>('TypeGate');
export const TypesGate = createGate('TypesGate');

export const $typeAbbreviation = typeD.createStore<string | null>(null);

export const $type = typeD.createStore<Type | null>({
  type_id: 'Выберите город',
  name: 'Выберите город',
  abbreviation: 'Выберите город',
});

persist({ store: $type, key: 'type' });
export const setTypeEvt = typeD.createEvent<string>();

export const $types = typesD.createStore<Type[]>([]);
export const $typesCount = typesD.createStore<number | null>(null);

sample({
  clock: setTypeEvt,
  source: $types,
  fn: (s, c) => s.find((type) => type.type_id === c) || null,
  target: $type,
});

export const getTypesFx = typesD.createEffect({
  handler: async ({ page, limit }: PaginationOptions): Promise<{ types: TypesQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/types?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const types = await res.json();

    return { types };
  },
});

sample({
  clock: TypesGate.open,
  // source: $types,
  // filter: (c) => !c?.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getTypesFx,
});

sample({
  clock: getTypesFx.doneData,
  fn: (c) => c.types.data.types || [],
  target: $types,
});

sample({
  clock: getTypesFx.doneData,
  fn: (c) => c.types.data.types_count || null,
  target: $typesCount,
});

// === TYPE ===

sample({
  clock: TypeGate.open,
  source: $types,
  filter: (s) => !s.length,
  fn: () => ({ page: 1, limit: 10 }),
  target: getTypesFx,
});

sample({
  clock: TypeGate.open,
  fn: (c) => c?.typeId,
  target: $typeAbbreviation,
});

sample({
  source: [$typeAbbreviation, $types],
  // @ts-ignore
  fn: ([s, c]) => c?.find((type) => type?.abbreviation === s) || null,
  target: $type,
});

// sample({
//   clock: TypeGate.close,
//   fn: () => null,
//   target: $type,
// });
