'use client';
import type { CommonProps } from '@/shared/types';
import { FC, useRef } from 'react';

export const ThemeProvider: FC<CommonProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  // if (
  //   localStorage.getItem('color-theme') === 'dark' ||
  //   (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  // ) {
  //   containerRef.current?.classList.add('dark');
  // } else {
  //   containerRef.current?.classList.remove('dark');
  // }
  // containerRef.current?.classList.remove('dark');
  return <div ref={containerRef}>{children}</div>;
};
