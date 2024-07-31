'use client';
import { useOnClickOutside } from '@/hooks';
import { FC, MouseEvent, useRef } from 'react';

export interface FormDropdownOption {
  id: string;
  name: string;
  abbreviation: string;
}

export interface FormDropdownProps {
  options: FormDropdownOption[];
  value: FormDropdownOption;
  placeholder: string;
  onSelect: (e: MouseEvent<HTMLButtonElement>) => void;
  toggleOpen: (v: boolean) => void;
  open: boolean;
}

export const FormDropdown: FC<FormDropdownProps> = ({ options, value, placeholder, open, toggleOpen, onSelect }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    toggleOpen(false);
  };

  const handleOpen = () => toggleOpen(true);

  useOnClickOutside(dropdownRef, handleClickOutside);

  return (
    <div ref={dropdownRef} className="relative inline-block ">
      <button
        key={value?.name}
        onClick={handleOpen}
        className="relative z-10 p-4 flex items-center text-sm xl:text-base bg-white border border-transparent rounded-md focus:border-negroni-400 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-negroni-400 focus:ring dark:text-white dark:bg-eboni-800 focus:outline-none"
      >
        <span suppressHydrationWarning className="mx-1">
          {!!value?.name && value?.name !== '' ? value?.name : placeholder}
        </span>

        <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-eboni-800">
          {options?.map(({ id, name, abbreviation }) => (
            <span
              suppressHydrationWarning
              id={id}
              key={id}
              data-route={abbreviation}
              role="button"
              onClick={onSelect}
              className="block px-4 py-3 text-sm xl:text-base capitalize transition-colors duration-300 transform hover:bg-negroni-400 hover:text-eboni-600 cursor-pointer"
            >
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
