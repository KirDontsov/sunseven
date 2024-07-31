import type { CommonProps } from '@/shared/types';
import type { FC } from 'react';
import cn from 'classnames';

export interface CenteredContainerProps extends CommonProps {
  h?: string;
  w?: string;
  items?: string;
}

export const CenteredContainer: FC<CenteredContainerProps> = ({
  children,
  h = 'screen',
  w = 'full',
  items = 'center',
}) => {
  return (
    <div
      className={cn('centered-container flex justify-center', {
        [`h-${h}`]: true,
        [`w-${w}`]: true,
        [`items-${items}`]: true,
      })}
    >
      {children}
    </div>
  );
};
