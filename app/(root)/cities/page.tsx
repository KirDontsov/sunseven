'use client';
import { $cities } from '@/api';
import { useList } from 'effector-react';
import Link from 'next/link';

export default function Page() {
  return useList($cities, ({ city_id, name, abbreviation }) => (
    <Link href={`/city/${abbreviation}`} key={city_id} className="flex gap-4">
      <div>{city_id}</div>
      <div>{name}</div>
    </Link>
  ));
}
