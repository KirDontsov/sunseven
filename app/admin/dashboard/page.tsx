'use client';
import { useUserAuth } from '@/context';
import { COMMON_TITLE } from '@/shared';
import { CommonHeader } from '@/widgets';
import { redirect } from 'next/navigation';

export default function Page() {
  const value = useUserAuth();

  if (value?.role == 'user') {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col gap-4">
      <CommonHeader title={COMMON_TITLE} subTitle="Админ Панель" />
    </div>
  );
}
