'use client';
import { CommonHeader } from '@/widgets';
import { useUserAuth } from '@/context';
import { COMMON_TITLE } from '@/shared';

export default function Page() {
  useUserAuth('/admin/dashboard');

  return (
    <div className="flex flex-col gap-4">
      <CommonHeader title={COMMON_TITLE} subTitle="Личный кабинет" />
    </div>
  );
}
