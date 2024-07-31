import { BACKEND_PORT, FirmId, FirmUrl, PaginationOptions } from '@/shared';
import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import { $firm } from '..';

export const ReviewsGate = createGate<FirmUrl>('ReviewsGate');
export const ReviewsPageGate = createGate<number>('ReviewsPageGate');
export const reviewsD = createDomain('reviews');

export interface ReviewOptions {
  firmId: string;
}

export interface Review {
  review_id: string;
  firm_id: string;
  two_gis_firm_id?: string;
  author?: string;
  date?: string;
  rating?: string;
  text?: string;
}

export interface AddReview {
  firm_id: string;
  author?: string;
  rating?: string;
  text?: string;
}
export interface ReviewsQueryResult {
  status: string;
  data: {
    reviews: Review[];
    reviews_count: number;
  };
}

export const $reviews = reviewsD.createStore<Review[]>([]);
export const $reviewsPage = reviewsD.createStore<number>(1);
export const $reviewsCount = reviewsD.createStore<number | null>(null);
export const fetchReviewsEvt = reviewsD.createEvent<FirmUrl>();
export const setReviewsPageEvt = reviewsD.createEvent<number>();
export const addReviewEvt = reviewsD.createEvent<AddReview>();

export const getReviewsByUrlFx = reviewsD.createEffect({
  handler: async ({ firmUrl, page, limit }: PaginationOptions & FirmUrl): Promise<{ reviews: ReviewsQueryResult }> => {
    const res = await fetch(`${BACKEND_PORT}/api/reviews_by_url/${firmUrl}?page=${page}&limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const reviews = await res.json();

    return { reviews };
  },
});

sample({
  // @ts-ignore
  clock: ReviewsGate.open,
  source: [$reviews, $reviewsPage],
  // @ts-ignore
  filter: ([s], c) => !s?.length && !!c?.firmUrl,
  fn: ([_, reviewsPage], c) => {
    return { firmUrl: c?.firmUrl, page: reviewsPage || 1, limit: 10 };
  },
  target: getReviewsByUrlFx,
});

sample({
  clock: getReviewsByUrlFx.doneData,
  fn: (c) => c.reviews.data.reviews || [],
  target: $reviews,
});

sample({
  clock: getReviewsByUrlFx.doneData,
  fn: (c) => c.reviews.data.reviews_count || null,
  target: $reviewsCount,
});

sample({
  clock: ReviewsGate.close,
  source: $reviews,
  fn: (_, c) => [],
  target: $reviews,
});

// Pagination
sample({
  clock: setReviewsPageEvt,
  source: $firm,
  filter: (firm) => firm !== null,
  fn: (firm, page) => ({ firmUrl: firm?.url ?? '', page, limit: 10 }),
  target: getReviewsByUrlFx,
});

sample({
  clock: setReviewsPageEvt,
  target: $reviewsPage,
});

sample({
  clock: ReviewsPageGate.open,
  target: $reviewsPage,
});

sample({
  source: $firm,
  fn: (c) => ({ firmUrl: c?.url || '' }),
  target: fetchReviewsEvt,
});

export const addReviewFx = reviewsD.createEffect({
  handler: async (variables: AddReview): Promise<{ reviews: ReviewsQueryResult }> => {
    const { firm_id } = variables;
    const res = await fetch(`${BACKEND_PORT}/api/review/${firm_id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(variables),
    });
    const reviews = await res.json();

    return { reviews };
  },
});

sample({
  clock: addReviewEvt,
  target: addReviewFx,
});
