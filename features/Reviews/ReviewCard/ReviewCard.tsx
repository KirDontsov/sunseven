import { ImageWithFallback, Rating } from '@/widgets';
import { FC } from 'react';
import avatar from '../../../public/images/avatar_placeholder.png';
export interface ReviewCardProps {
  review_id: string;
  date?: string;
  author?: string;
  text?: string;
  rating?: string;
}

export const ReviewCard: FC<ReviewCardProps> = ({ review_id, date, author, text, rating }) => {
  return (
    <div key={review_id} className="container w-full p-8 bg-white dark:bg-eboni-800 rounded-lg shadow-md">
      <div className="flex items-center w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <ImageWithFallback
          className="hidden object-cover w-10 h-10 mr-4 rounded-full sm:block bg-negroni-400"
          src={avatar}
          alt="avatar"
        />
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="font-bold text-eboni-600 dark:text-white" tabIndex={0} role="link">
              {author}
            </span>
            <span tabIndex={0} role="link">
              {date?.replace(', отредактирован', '')}
            </span>
          </div>
          <Rating rating={rating} />
        </div>
      </div>

      <div className="my-2">
        <p className="mt-2">{text}</p>
      </div>
    </div>
  );
};
