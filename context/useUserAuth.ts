import { useUnit } from 'effector-react';
import { $userAuth } from '.';
import { redirect } from 'next/navigation';

export function useUserAuth(redirectTo?: string) {
  const { value } = useUnit({
    value: $userAuth,
  });

  if (redirectTo && value?.role == 'admin') {
    redirect(redirectTo);
  }

  return value;
}
