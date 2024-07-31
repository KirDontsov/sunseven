'use client';
import { Curve } from '@/features';
import { COMMON_DOMAIN, COMMON_TITLE, CommonNavProps } from '@/shared';
import { CommonHeader, Footer, Nav, Section } from '@/widgets';
import { FC } from 'react';

export const AboutPage: FC<CommonNavProps> = ({ cities, categories }) => {
  return (
    <div>
      <Curve>
        <Nav cities={cities} categories={categories} />
        <Section>
          <CommonHeader
            title={`${COMMON_TITLE} - Сервис, который помогает развиваться локальному бизнесу в России и СНГ`}
          />
          <div className="w-full flex flex-col items-center gap-4 min-h-[500px]">
            <div className="container min-h-[500px] w-full flex flex-col gap-4 px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-eboni-800">
              <h2 className="text-lg dark:text-negroni-400 text-negroni-400">Что мы делаем?</h2>
              <p>
                Мы помогаем бизнесу из разных сфер — от медицинских центров и банкетных залов до ремонта телефонов и
                шиномонтажа
              </p>
              <h2 className="text-lg dark:text-negroni-400 text-negroni-400">Миссия</h2>
              <p>
                Помочь бизнесу заниматься тем, для чего он создан: кормить, лечить, делать людей красивыми — а мы
                возьмем на себя остальные задачи
              </p>
              <h2 className="text-lg dark:text-negroni-400 text-negroni-400">Цифры и факты</h2>
              <p>{`Каждый месяц ${COMMON_DOMAIN} посещают 1 млн человек, мы активно расширяем партнерскую сеть`}</p>
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
