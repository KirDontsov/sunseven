import { HomePage } from './HomePage';
import { getCategories, getCities } from '@/app/api';

export default async function Page() {
  const cities = await getCities();
  const categories = await getCategories(1, 10);

  return <HomePage cities={cities} categories={categories} />;
}
