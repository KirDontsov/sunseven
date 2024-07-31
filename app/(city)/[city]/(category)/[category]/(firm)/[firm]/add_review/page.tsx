import { getCategories, getCities, getFirm } from '@/app/api';
import { notFound } from 'next/navigation';
import { AddReviewPage } from './AddReviewPage';

type Props = {
  params: { city: string; category: string; firm: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: Props) {
  const firmUrl = params.firm ?? '';
  const firm = await getFirm(firmUrl);
  if (!firm) {
    notFound();
  }

  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return <AddReviewPage cities={cities} categories={categories} params={params} />;
}
