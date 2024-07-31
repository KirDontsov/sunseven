'use client';
import { RegisterForm } from '@/features';
import { COMMON_TITLE } from '@/shared';
import { CommonHeader } from '@/widgets';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <CommonHeader title={COMMON_TITLE} subTitle="Зарегистрируйтесь, чтобы начать" />
      <RegisterForm />
    </div>
  );
}
