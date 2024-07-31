import { $cities } from '@/api';
import { useList } from 'effector-react';
import Link from 'next/link';

export const Cities = () => {
  return useList($cities, ({ city_id, name, abbreviation }) => (
    <Link href={`/${abbreviation}`} key={city_id} className="flex gap-4">
      <div>{name}</div>
    </Link>
  ));
};
