import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  /** Флаг наличия ошибок */
  hasError: boolean;
}
