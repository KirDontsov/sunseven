import { Review } from '@/api';
import { FC } from 'react';
import { ReviewCard } from '../ReviewCard';

export interface ReviewsListProps {
  reviews: Review[] | null;
}

export const ReviewsList: FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <>
      {!!reviews?.length &&
        reviews?.map(({ review_id, author, text, date, rating }) => {
          return (
            <ReviewCard key={review_id} review_id={review_id} date={date} author={author} text={text} rating={rating} />
          );
        })}
    </>
  );
};
