'use client';
import { Category, City } from '@/api';
import { $loading, useUserAuth } from '@/context';
import { CityDropdown, SearchInput, SearchVariants } from '@/features';
import { useMediaQuery } from '@/hooks';
import { COMMON_TITLE } from '@/shared';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { FC, useCallback, useState } from 'react';
import styles from './nav.module.scss';

export interface NavProps {
  cities?: City[] | null;
  categories?: Category[] | null;
}

export const Nav: FC<NavProps> = ({ cities = [], categories = [] }) => {
  const value = useUserAuth();

  const { loading } = useUnit({
    loading: $loading,
  });

  const tablet = useMediaQuery('(max-width: 768px)');

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen((prevState) => !prevState), []);

  return (
    <div className="w-full overflow-hidden">
      <nav
        className={cn(`w-full absolute z-30 mx-auto left-1/2 translate-x-[-50%] ${styles.nav}`, {
          'dark:bg-[rgba(0,0,0,0.3)] bg-[rgba(255,255,255,0.3)]': !open,
          'dark:bg-eboni-700 bg-white': open,
        })}
      >
        <div
          className={cn('px-6 py-2 xl:py-4 mx-auto pointer-events-none', {
            'flex justify-between items-center': !tablet,
          })}
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-2 md:gap-8 items-center justify-center">
              <Link
                className="pointer-events-auto text-sm xl:text-2xl text-eboni-400 dark:text-white text-nowrap"
                href="/"
              >
                {COMMON_TITLE.toLocaleUpperCase()}
              </Link>
              <div className="pointer-events-auto mr-2">
                <SearchInput />
              </div>
            </div>

            {tablet && (
              <div className="flex lg:hidden">
                <button
                  onClick={handleOpen}
                  type="button"
                  className="hover:text-negroni-400 focus:outline-none focus:text-negroni-400 pointer-events-auto"
                  aria-label="toggle menu"
                >
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

          {!tablet && !open && (
            <div className="mt-0 p-0 top-0 relative bg-transparent w-auto opacity-100 translate-x-0 flex items-center">
              <div className="flex flex-row mx-6 items-center pointer-events-auto">
                <CityDropdown cities={cities} />

                {/* <Link
               className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-negroni-400 dark:hover:text-negroni-400 md:mx-4 md:my-0"
               href="#"
             >
               Добавить организацию
             </Link> */}
                {!value && !loading && (
                  <Link
                    className="my-2 transition-colors duration-300 transform hover:text-negroni-400 md:mx-4 md:my-0"
                    href="/login"
                  >
                    Вход
                  </Link>
                )}

                {/* <Link
               className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-negroni-400 dark:hover:text-negroni-400 md:mx-4 md:my-0"
               href="/dashboard"
             >
               Dashboard
             </Link> */}
              </div>
            </div>
          )}

          {tablet && open && (
            <div className="absolute inset-x-0 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-eboni-700">
              <div className="flex flex-col items-center pointer-events-auto">
                <CityDropdown cities={cities} />
                {/* <Link
               className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-negroni-400 dark:hover:text-negroni-400 md:mx-4 md:my-0"
               href="#"
             >
               Добавить организацию
             </Link> */}
                {!value && !loading && (
                  <Link
                    className="my-2 transition-colors duration-300 transform hover:text-negroni-400 md:mx-4 md:my-0"
                    href="/login"
                  >
                    Вход
                  </Link>
                )}

                {/* <Link
               className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-negroni-400 dark:hover:text-negroni-400 md:mx-4 md:my-0"
               href="/dashboard"
             >
               Dashboard
             </Link> */}
              </div>
            </div>
          )}
        </div>
      </nav>
      <SearchVariants cities={cities} categories={categories} />
    </div>
  );
};
