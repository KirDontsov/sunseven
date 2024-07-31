'use client';
import cn from 'classnames';
import { useEffect, useState } from 'react';

const ANCHORS = [
  {
    id: 'contacts',
    title: 'Контакты',
  },
  {
    id: 'description',
    title: 'Описание',
  },
  {
    id: 'prices',
    title: 'Цены',
  },
  {
    id: 'faq',
    title: 'FAQ',
  },
  {
    id: 'reviews',
    title: 'Отзывы',
  },
];

export const Anchors = () => {
  const getHash = () =>
    typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.replace('#', '')) : undefined;

  const [hash, setHash] = useState(getHash());

  useEffect(() => {
    const handleHashChange = () => {
      setHash(getHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="text-sm xl:text-base font-medium text-center border-b text-eboni-400 border-eboni-200 dark:text-white">
      <ul className="flex flex-wrap -mb-px">
        {ANCHORS.map(({ id, title }, index) => (
          <li key={id} className="me-2">
            <a
              href={`#${id}`}
              className={cn('inline-block p-4 border-b border-transparent rounded-t-lg hover:text-negroni-400', {
                'text-negroni-400 border-negroni-400 active': hash === id || (hash === '' && index === 0),
              })}
              aria-current="page"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
