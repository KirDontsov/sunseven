import { getSearchVariantsEvt } from '@/api';
import { FormInput } from '@/widgets';
import { useUnit } from 'effector-react';
import { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export interface SearchValue {
  input: string | null;
}

export const SearchInput = () => {
  const { getSearchVariants } = useUnit({
    getSearchVariants: getSearchVariantsEvt,
  });

  const form = useForm<SearchValue>({
    defaultValues: { input: '' },
    mode: 'onChange',
  });

  const { reset, watch, setError, formState, control } = form;
  const { isDirty, isValid, errors } = formState;

  const handleReset = useCallback(() => {
    reset({
      input: '',
    });
  }, [reset]);

  useEffect(handleReset, [handleReset]);

  const watchedSearchValue = watch('input');

  useEffect(() => {
    if (!!watchedSearchValue && watchedSearchValue?.length >= 3) {
      getSearchVariants({ input: watchedSearchValue ?? '' });
    }
  }, [watchedSearchValue, getSearchVariants]);

  return (
    <FormProvider {...form}>
      <FormInput name="input" type="text" placeholder="Поиск по названию или адресу" className="w-full md:w-[500px]" />
    </FormProvider>
  );
};
