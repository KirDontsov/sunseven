'use client';
import { api_login } from '@/api';
import { setStoreEvt } from '@/context';
import { parseJwt } from '@/shared';
import { ErrorTypes } from '@/shared/types';
import { FormInput } from '@/widgets';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const MAX_VALUE = 50;
export const EMAIL_INPUT_REG_EXP = /^\S+@\S+\.\S+$/;
export const TEXT_INPUT_REG_EXP = /^[Ёёа-яА-Яa-zA-Z0-9 –“«».,/\-()№"']*$/;

export const enum LoginFields {
  Email = 'email',
  Password = 'password',
}

export const DEFAULT_LOGIN_FORM_VALUES = {
  [LoginFields.Email]: '',
  [LoginFields.Password]: '',
};

export interface LoginValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const setUserData = useUnit(setStoreEvt);

  const form = useForm<LoginValues>({
    defaultValues: DEFAULT_LOGIN_FORM_VALUES,
    mode: 'onBlur',
  });

  const { reset, getValues, setError, formState } = form;
  const { isDirty, isValid, errors } = formState;

  const handleReset = useCallback(() => {
    reset({
      email: '',
      password: '',
    });
  }, [reset]);

  useEffect(handleReset, [handleReset]);

  const handleCancel = useCallback(() => {
    router.push('/', { scroll: false });
  }, [router]);

  const handleSubmit = useCallback(async () => {
    const values = getValues();
    const res = await api_login(values);
    if (res?.status !== 'success') {
      toast(`ЧТо-то пошло не так`, {
        hideProgressBar: true,
        autoClose: 3000,
        type: 'error',
        position: 'top-right',
      });
    }
    const decoded = parseJwt(res?.token);

    setUserData(decoded);
    // storage.setItem('user-data', JSON.stringify(decoded));
    router.push('/dashboard');
  }, [getValues, router, setUserData]);

  return (
    <FormProvider {...form}>
      <form className="w-36 flex flex-col gap-4" action="#">
        <FormInput
          id={LoginFields.Email}
          name={LoginFields.Email}
          type={LoginFields.Email}
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
            id={LoginFields.Password}
            name={LoginFields.Password}
            type={LoginFields.Password}
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

          <button
            type="button"
            className="mt-2 flex items-center rounded py-1.5 px-2 text-sm text-negroni-600 transition-colors duration-300 hover:text-negroni-400 focus:outline-none dark:text-negroni-400 dark:hover:text-negroni-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>

            <span className="mx-2">Забыли пароль?</span>
          </button>
        </div>

        <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transhtmlForm border border-zinc-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-zinc-700 dark:hover:bg-eboni-800 hover:bg-eboni-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
          >
            Отмена
          </button>

          <button
            type="button"
            disabled={!isDirty || !isValid}
            onClick={handleSubmit}
            className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-negroni-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-negroni-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          >
            Войти
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
