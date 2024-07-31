/** eslint-disable react-hooks/exhaustive-deps */
'use client';
import { api_auth } from '@/api';
import { ErrorTypes } from '@/shared/types';
import { FormInput } from '@/widgets';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const MAX_VALUE = 50;
export const EMAIL_INPUT_REG_EXP = /^\S+@\S+\.\S+$/;
export const TEXT_INPUT_REG_EXP = /^[Ёёа-яА-Яa-zA-Z0-9 –“«».,/\-()№"']*$/;

export const enum RegisterFields {
  Name = 'name',
  Email = 'email',
  Password = 'password',
  PasswordConfirm = 'passwordConfirm',
}

export const DEFAULT_LOGIN_FORM_VALUES = {
  [RegisterFields.Name]: '',
  [RegisterFields.Email]: '',
  [RegisterFields.Password]: '',
  [RegisterFields.PasswordConfirm]: '',
};

export interface LoginValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<LoginValues>({
    defaultValues: DEFAULT_LOGIN_FORM_VALUES,
    mode: 'onBlur',
  });

  const { reset, getValues, setError, formState } = form;
  const { isDirty, isValid, errors } = formState;

  const handleReset = useCallback(() => {
    reset({
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    });
  }, [reset]);

  useEffect(handleReset, [handleReset]);

  const handleSubmit = useCallback(async () => {
    const values = getValues();
    const res = await api_auth(values);
    if (res?.status === 'success') {
      toast(`Пользователь ${res?.data?.email} зарегестрирован`, {
        hideProgressBar: true,
        autoClose: 3000,
        type: 'success',
        position: 'top-right',
      });
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues, router]);

  return (
    <FormProvider {...form}>
      <form className="w-36 flex flex-col gap-4" action="#">
        <FormInput
          id={RegisterFields.Name}
          name={RegisterFields.Name}
          type={RegisterFields.Name}
          dataTestId="LoginForm.Name"
          label="Имя"
          placeholder="Иван"
          maxLength={MAX_VALUE + 1}
          rules={{
            [ErrorTypes.Required]: 'Обязательное поле',
            [ErrorTypes.MaxLength]: {
              value: MAX_VALUE,
              message: `Максимум ${MAX_VALUE} символов`,
            },
            [ErrorTypes.Pattern]: {
              value: TEXT_INPUT_REG_EXP,
              message: 'Введены некорректные символы',
            },
          }}
        />

        <FormInput
          id={RegisterFields.Email}
          name={RegisterFields.Email}
          type={RegisterFields.Email}
          dataTestId="LoginForm.Email"
          label="Email"
          placeholder="user@email.xyz"
          maxLength={MAX_VALUE + 1}
          rules={{
            [ErrorTypes.Required]: 'Обязательное поле',
            [ErrorTypes.MaxLength]: {
              value: MAX_VALUE,
              message: `Максимум ${MAX_VALUE} символов`,
            },
            [ErrorTypes.Pattern]: {
              value: EMAIL_INPUT_REG_EXP,
              message: 'Введены некорректные символы',
            },
          }}
        />
        <div>
          <FormInput
            id={RegisterFields.Password}
            name={RegisterFields.Password}
            type={RegisterFields.Password}
            dataTestId="LoginForm.Password"
            label="Пароль"
            placeholder="*********"
            maxLength={MAX_VALUE + 1}
            rules={{
              [ErrorTypes.Required]: 'Обязательное поле',
              [ErrorTypes.MaxLength]: {
                value: MAX_VALUE,
                message: `Максимум ${MAX_VALUE} символов`,
              },
              [ErrorTypes.Pattern]: {
                value: TEXT_INPUT_REG_EXP,
                message: 'Введены некорректные символы',
              },
            }}
          />
          <FormInput
            id={RegisterFields.PasswordConfirm}
            name={RegisterFields.PasswordConfirm}
            type={RegisterFields.PasswordConfirm}
            dataTestId="LoginForm.PasswordConfirm"
            label="Подтвердите Пароль"
            placeholder="*********"
            maxLength={MAX_VALUE + 1}
            rules={{
              [ErrorTypes.Required]: 'Обязательное поле',
              [ErrorTypes.MaxLength]: {
                value: MAX_VALUE,
                message: `Максимум ${MAX_VALUE} символов`,
              },
              [ErrorTypes.Pattern]: {
                value: TEXT_INPUT_REG_EXP,
                message: 'Введены некорректные символы',
              },
            }}
          />
          <div className="flex gap-2 items-center mt-2 ext-sm">
            <span>Уже есть аккаунт?</span>
            <Link
              href="/login"
              type="button"
              className="flex items-center rounded px-2 text-sm text-negroni-600 transition-colors duration-300 hover:text-negroni-400 focus:outline-none dark:text-negroni-400 dark:hover:text-negroni-400"
            >
              Войти
            </Link>
          </div>
        </div>

        <div className="mt-4 w-full">
          <button
            type="button"
            disabled={!isDirty || !isValid}
            onClick={handleSubmit}
            className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-negroni-600 rounded-md sm:mt-0 sm:mx-2 hover:bg-negroni-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          >
            Зарегестрироваться
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
