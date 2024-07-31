'use client';
import { LoginForm } from '@/features';
import { CommonHeader } from '@/widgets';

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <CommonHeader title="Войдите в свой аккаунт" subTitle="Введите email и пароль" />
      <LoginForm />
    </div>
  );
}
