'use client';
import { Curve } from '@/features';
import { COMMON_TITLE, CommonNavProps } from '@/shared';
import { CommonHeader, Footer, Nav, Section } from '@/widgets';
import { FC } from 'react';

export const ContactsPage: FC<CommonNavProps> = ({ cities, categories }) => {
  return (
    <div>
      <Curve>
        <Nav cities={cities} categories={categories} />
        <Section>
          <CommonHeader title={`Контакты сайта каталога организаций ${COMMON_TITLE}`} />
          <div className="w-full flex flex-col items-center gap-4 min-h-[500px]">
            <div className="container min-h-[500px] w-full flex flex-col gap-4 px-8 py-10 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-eboni-800">
              <p>Набережные Челны, пр. Московский, 140А (52/03А) деловой центр Форт Диалог, этаж 2, офис 200</p>
              <p>
                {`Телефон для связи: `}
                <a href="tel:+79112395458">+7 (911) 239-54-58</a>
              </p>
              <p>
                {`Почта для запросов на сотрудничество: `}
                <a href="mailto:kir.dontsov@gmail.com">kir.dontsov@gmail.com</a>
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
