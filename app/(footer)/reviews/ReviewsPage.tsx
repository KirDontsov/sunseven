'use client';
import { Curve } from '@/features';
import { COMMON_TITLE, CommonNavProps } from '@/shared';
import { CommonHeader, Footer, Nav, Section } from '@/widgets';
import { FC } from 'react';

export const ReviewsPage: FC<CommonNavProps> = ({ cities, categories }) => {
  return (
    <div>
      <Curve>
        <Nav cities={cities} categories={categories} />
        <Section>
          <CommonHeader title={`${COMMON_TITLE} отзывы клиентов`} />
          <div className="w-full flex flex-col items-center gap-4">
            <div className="container h-fit w-full flex flex-col gap-4 px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-eboni-800">
              <h2 className="text-lg dark:text-negroni-400 text-negroni-400">{`Тысячи бизнесменов уже пользуются ${COMMON_TITLE}ом`}</h2>
              <p>
                Каждый месяц мы отгружаем тысячи звонков в компании наших клиентов, анализируем их, собираем обратную
                связь и даем рекомендации, которые улучшают бизнес.
              </p>
              <h2 className="text-lg dark:text-negroni-400 text-negroni-400">Мы экспериментируем и не боимся трудностей</h2>
              <p>
                Мы разрабатываем новые инструменты, которые помогают бизнесу. Мы уважаем предпринимателей и точно знаем,
                какой продукт упростит их жизнь
              </p>
            </div>
          </div>
          <div className="flex w-full">
            <Footer />
          </div>
        </Section>
      </Curve>
    </div>
  );
};
