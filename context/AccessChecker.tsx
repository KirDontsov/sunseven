'use client';
import { CommonProps } from '@/shared';
import { $userAuth, setStoreEvt } from '.';
import { useUnit } from 'effector-react';
import { redirect } from 'next/navigation';
import { FC } from 'react';

export const AccessChecker: FC<CommonProps> = ({ children }) => {
  const { value } = useUnit({
    value: $userAuth,
    setValue: setStoreEvt,
  });

  // TODO: 403
  if (value?.role == 'admin') {
    redirect('/admin/dashboard');
  }
  // TODO: 403
  else if (value?.role == 'user') {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
  return <>{children}</>;
};
