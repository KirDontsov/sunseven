/* eslint-disable @next/next/next-script-for-ga */
import type { CommonProps } from '@/shared/types';
import { CookiesProvider } from 'next-client-cookies/server';
// import { Inter } from 'next/font/google';
import { Metadata } from 'next/types';
import { ToastContainer } from 'react-toastify';

import { COMMON_DOMAIN, COMMON_TITLE } from '@/shared';
import Script from 'next/script';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

// const inter = Inter({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: `Каталог организаций: отзывы, фото, рейтинг — ${COMMON_TITLE}`,
  description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
  metadataBase: new URL('https://топвыбор.рф'),
  applicationName: `Каталог организаций: отзывы, фото, рейтинг — ${COMMON_TITLE}`,
  icons: [
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'shortcut icon', url: '/favicon.svg', sizes: '57x57' },
    { rel: 'shortcut icon', url: '/favicon.svg', sizes: '72x72' },
    { rel: 'shortcut icon', url: '/favicon.svg', sizes: '114x114' },
    { rel: 'shortcut icon', url: '/favicon.svg', sizes: '144x144' },
    { rel: 'apple-touch-icon', url: '/favicon.svg', sizes: '57x57' },
    { rel: 'apple-touch-icon', url: '/favicon.svg', sizes: '72x72' },
    { rel: 'apple-touch-icon', url: '/favicon.svg', sizes: '114x114' },
    { rel: 'apple-touch-icon', url: '/favicon.svg', sizes: '144x144' },
  ],
  alternates: { canonical: 'https://топвыбор.рф' },
  keywords: ['отзывы', ' рестораны', ' салоны красоты', ' автосервисы', ' медицина', ' Москва', ' Санкт-петербург'],
  openGraph: {
    title: `Каталог организаций: отзывы, фото, рейтинг — ${COMMON_TITLE}`,
    description: `Выбор лучших услуг: рестораны, салоны красоты, медицина и многое другое на ${COMMON_DOMAIN}. Фотографии, отзывы, акции, скидки, фильтры для поиска.`,
    url: 'https://топвыбор.рф',
    siteName: `${COMMON_DOMAIN}`,
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({ children }: CommonProps) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body>
        <CookiesProvider>{children}</CookiesProvider>
        <ToastContainer />
        {process.env.PRODUCTION && (
          <>
            <Script id="metrika-counter" strategy="afterInteractive">
              {`

                 (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                 m[i].l=1*new Date();
                 for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                 k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                 (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                 ym(97980318, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true
                 });
              `}
            </Script>
            <Script id="webmaster-waiter" strategy="beforeInteractive">
              {`window.YandexRotorSettings = {
                  WaiterEnabled: true,
                  FailOnTimeout: false,
                  NoJsRedirectsToMain: true,
                  IsLoaded: function() {
                      return document.body.querySelectorAll('div').length > 10;
                  },
              }`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
