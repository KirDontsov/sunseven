'use client';
import { COMMON_TITLE } from '@/shared';

import { AnimatedText, BreadCrumbs } from '..';
import { FOOTER_LINKS } from './constants';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-eboni-900 w-full">
      <div className="container flex flex-col pt-12 p-8 mx-auto">
        <BreadCrumbs />
      </div>

      <div className="container px-6 py-12 mx-auto">
        <div className="text-center">
          <AnimatedText
            el="h3"
            text={[`Помогаем людям выбрать лучшие места`.toUpperCase()]}
            className="font-semibold text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
            once
          />

          <p className="max-w-md mx-auto mt-2 text-sm xl:text-base">На основе анализа реальных отзывов</p>
        </div>
        <div className="container grid grid-cols-2 gap-6 mt-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {Array.from(FOOTER_LINKS).map(([key, value]: [a: string, b: { title: string; href: string }[]]) => {
            return (
              <div key={key}>
                <h4 className="text-sm xl:text-base font-medium">{key}</h4>

                <div className="flex flex-col items-start mt-4 space-y-4">
                  {value.map(({ title, href }) => (
                    <a
                      key={title}
                      href={href}
                      rel="nofollow"
                      className="text-eboni-400 dark:text-white transition-colors duration-200 dark:hover:text-negroni-400 hover:underline hover:text-negroni-400 text-sm xl:text-base"
                    >
                      {title}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <hr className="my-6 border-zinc-200 md:my-10 dark:border-zinc-500" />

        <div className="container flex items-center justify-between sm:flex-row">
          <a href="#" rel="nofollow" className="text-sm xl:text-2xl">
            {COMMON_TITLE.toUpperCase()}
          </a>

          <p className="text-sm xl:text-base sm:mt-0">{`© Все права защищены 2023-${new Date().getFullYear()}`}</p>
        </div>
      </div>
    </footer>
  );
};
