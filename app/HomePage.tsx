'use client';
import { AuthPageGateProvider, PageGateProvider } from '@/context';
import { Curve } from '@/features';
import { COMMON_TITLE, CommonNavProps } from '@/shared';
import { CenteredContainer, Footer, HeroSection, Nav, ThemeProvider } from '@/widgets';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC } from 'react';

export const HomePage: FC<CommonNavProps> = ({ cities, categories }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prod = process.env.PRODUCTION;

  // useLayoutEffect(() => {
  //   if (prod) {
  //     const url = `${pathname}?${searchParams}`;
  //     // @ts-ignore
  //     ym(97095336, 'hit', url);
  //   }
  // }, [pathname, searchParams, prod]);

  return (
    <ThemeProvider>
      <AuthPageGateProvider>
        <PageGateProvider>
          <Curve>
            <HeroSection>
              <Nav cities={cities} categories={categories} />
              <CenteredContainer h="screen">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                  <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight leading-none text-2xl lg:text-3xl xl:text-8xl dark:text-white">
                      {COMMON_TITLE.toUpperCase()}
                    </h1>
                    <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl dark:text-gray">
                      10 миллионов реальных отзывов проанализированных нейросетью
                    </p>
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center px-5 py-3 mr-3 font-medium text-center dark:text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                    >
                      Войти
                      <svg
                        className="w-5 h-5 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center px-5 py-3 font-medium text-center text-gray border border-zinc-300 rounded-lg hover:bg-eboni-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-zinc-700 dark:hover:bg-eboni-700 dark:focus:ring-gray-800"
                    >
                      Зарегестрироваться
                    </Link>
                  </div>
                  <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                      alt="mockup"
                      width="1920"
                      height="900"
                      priority={true}
                    />
                  </div>
                </div>
              </CenteredContainer>
              <Footer />
            </HeroSection>
          </Curve>
        </PageGateProvider>
      </AuthPageGateProvider>
    </ThemeProvider>
  );
};
