import { storage } from '@/shared';
import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import persist from 'effector-localstorage';

export interface StorageData {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export const PageGate = createGate<StorageData>('PageGate');
export const LoadingGate = createGate<boolean>('LoadingGate');

export const setStoreEvt = createEvent<StorageData>();
export const $userAuth = createStore<StorageData | null>(null);

export const setLoadingEvt = createEvent<boolean>();
export const $loading = createStore<boolean>(true);

// При логине добавляю токен в сторейдж и стейт
sample({
  clock: setStoreEvt,
  fn: (v) => v,
  target: $userAuth,
});

// При открытии каждой страницы надо либо слать запрос на бэк либо лезть в сторейдж
sample({
  clock: PageGate.open,
  fn: (v) => {
    if (typeof window !== 'undefined') {
      const x = storage.getItem('user-auth');
      if (x && x !== null) {
        return JSON.parse(x);
      } else {
        return v;
      }
    }
  },
  target: $userAuth,
});

// TODO: добавить загрузку
sample({
  clock: PageGate.open,
  source: $userAuth,
  fn: (s, v) => {
    return false;
  },
  target: $loading,
});

persist({
  store: $userAuth,
  key: 'user-auth',
});
