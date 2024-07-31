import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import { CommonProps } from '@/shared/types';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: `Оставить отзыв — ${COMMON_TITLE}`,
  description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
};

export default function FirmLayout({ children }: CommonProps) {
  return <>{children}</>;
}
