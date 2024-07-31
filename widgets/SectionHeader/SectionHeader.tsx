import cn from 'classnames';
import type { FC } from 'react';

export interface SectionHeaderProps {
  title: string;
  subTitle?: string;
  id?: string;
  gold?: boolean;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, subTitle, id = '', gold = false }) => {
  return (
    <div className="flex flex-col gap-2 scroll-mt-14 xl:scroll-mt-[122px] w-full" id={id}>
      <h2
        className={cn('text-lg lg:text-2xl font-[500]', {
          'text-negroni-400': gold,
          'text-eboni-400 dark:text-white': !gold,
        })}
      >
        {title}
      </h2>
      {subTitle && <p className="text-sm lg:text-lg text-zinc-400">{subTitle}</p>}
    </div>
  );
};
