'use client';
import { City, setCityEvt } from '@/api';
import { FormDropdown } from '@/widgets';
import { useUnit } from 'effector-react';
import { usePathname, useRouter } from 'next/navigation';
import { FC, MouseEvent, useCallback, useState } from 'react';

export interface CityDropdownProps {
  cities: City[] | null;
}

export const CityDropdown: FC<CityDropdownProps> = ({ cities }) => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const router = useRouter();

  const { setValue } = useUnit({
    setValue: setCityEvt,
  });

  const selectedCity = cities?.find((x) => x?.abbreviation === path?.split('/')[1]);

  const options =
    cities?.map((city) => ({
      id: city.city_id ?? '',
      name: city.name ?? '',
      abbreviation: city.abbreviation ?? '',
    })) ?? [];

  const value = {
    id: selectedCity?.city_id ?? '',
    name: selectedCity?.name ?? '',
    abbreviation: selectedCity?.abbreviation ?? '',
  };

  const handleSelect = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setValue(!!e?.currentTarget?.id && e?.currentTarget?.id !== '' ? e?.currentTarget?.id : 'Выберите город');
      setOpen(false);

      const targetCity = e.currentTarget.getAttribute('data-route');
      router.push(`/${targetCity}`);
    },
    [setValue, router],
  );

  const handleOpen = useCallback((v: boolean) => setOpen(v), []);

  return (
    <FormDropdown
      placeholder="Выберите город"
      options={options}
      value={value}
      onSelect={handleSelect}
      open={open}
      toggleOpen={handleOpen}
    />
  );
};
