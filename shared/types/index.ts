import { Category, City } from '@/api';
import type { ReactNode } from 'react';

export interface CommonProps {
  children?: ReactNode | ReactNode[];
}

export const enum ErrorTypes {
  Required = 'required',
  MaxLength = 'maxLength',
  MinLength = 'minLength',
  Pattern = 'pattern',
  Validate = 'validate',
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface FirmId {
  firmId: string;
}

export interface FirmUrl {
  firmUrl: string;
}

export interface CommonNavProps {
  cities: City[] | null;
  categories: Category[] | null;
}
