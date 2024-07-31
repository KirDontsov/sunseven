'use client';
import { Nav } from '@/widgets';
import { Types } from '@/features';

export default function Page({
  params,
}: {
  params: {
    cityId: string;
    categoryId: string;
  };
}) {
  const { cityId, categoryId } = params;

  return (
    <>
      <Nav />
      <div className="h-[100vh] w-full flex flex-col items-center overflow-auto gap-4">
        <Types cityId={cityId} categoryId={categoryId} />
      </div>
    </>
  );
}
