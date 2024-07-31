import { CommonProps } from '@/shared';
import { FC, MouseEvent, useCallback } from 'react';

export interface ButtonProps {
  id?: string;
  onClick?: (v: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button: FC<CommonProps & ButtonProps> = ({ id, onClick, className = '', children }) => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
    },
    [onClick],
  );

  return (
    <button
      {...(id ? { id: `${id}` } : {})}
      onClick={handleClick}
      className={`w-full px-5 py-2 xl:py-4 mt-4 font-medium capitalize transition-colors duration-300 transform bg-eboni-400 rounded-md lg:w-auto text-white hover:text-eboni-600 hover:bg-negroni-400 focus:outline-none focus:bg-negroni-400 whitespace-nowrap text-sm xl:text-base ${className}`}
    >
      {children}
    </button>
  );
};
