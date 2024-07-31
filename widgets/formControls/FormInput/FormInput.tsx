'use client';
import cn from 'classnames';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

export type ValidationRules = UseControllerProps['rules'];

export interface FormControlProps {
  id?: string;
  /** Название поля */
  name: string;
  /** Тип поля */
  type: string;
  /** Правила валидации поля */
  rules?: ValidationRules;
  /** testId */
  dataTestId?: string;
  /** placeholder */
  placeholder?: string;
  /** placeholder */
  className?: string;
}

export interface FormInputProps extends FormControlProps {
  /** Label */
  label?: string;
  /** Макс. длина */
  maxLength?: number;
}

export const FormInput: FC<FormInputProps> = ({ rules, type, name, placeholder, maxLength, label, className = '' }) => {
  const [showError, setShowError] = useState(true);

  const {
    field: { onChange, value, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    rules,
  });

  const handleChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      setShowError(false);
      onChange(maxLength ? currentTarget.value.slice(0, maxLength) : currentTarget.value);
    },
    [onChange, maxLength],
  );

  const internalOnBlur = useCallback(() => {
    onBlur();
    setShowError(true);
  }, [onBlur]);

  const handleBlur = useCallback(() => {
    internalOnBlur();
  }, [internalOnBlur]);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="text-sm xl:text-base">
          {label}
        </label>
      )}

      <label
        className={cn('block', {
          'mt-3': label,
        })}
        htmlFor={name}
      >
        <input
          ref={ref}
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className="block w-full px-4 py-2 xl:py-4 text-sm xl:text-base placeholder:text-sm placeholder:xl:text-base focus:text-sm focus:xl:text-base bg-white border border-zinc-200 rounded-md focus:border-negroni-400 focus:outline-none focus:ring focus:ring-negroni-400 focus:ring-opacity-40 dark:border-eboni-600 dark:bg-eboni-900 dark:focus:border-negroni-400"
        />
      </label>
      {error && showError && <span className="text-red-500 text-xs pt-1 block">{error?.message}</span>}
    </div>
  );
};
