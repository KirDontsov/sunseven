'use client';
import { $firm, OaiReviewsGate, ReviewsGate, ReviewsPageGate } from '@/api';
import { CommonProps } from '@/shared';
import { useGate, useUnit } from 'effector-react';
import { FC } from 'react';

export interface ReviewsGateProviderProps {
  firmUrl: string;
  reviewsPage: number;
}

export const ReviewsGateProvider: FC<ReviewsGateProviderProps & CommonProps> = ({ children, firmUrl, reviewsPage }) => {
  const { firm } = useUnit({
    firm: $firm,
  });

  useGate(ReviewsGate, { firmUrl: firmUrl ?? firm?.url });
  useGate(ReviewsPageGate, reviewsPage);
  useGate(OaiReviewsGate, { firmUrl: firmUrl ?? firm?.url });

  return <>{children}</>;
};
