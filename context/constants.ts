import { User } from '@/api';
import noop from 'lodash/noop';

export interface CookieUserData {
  id: string;
  role: string;
}

export interface AccessCheckerCtxProps {
  state: {
    /** Пермишены и фичи загружаются */
    loading: boolean;
    /** Достаточно пермишенов для показа страницы, если нет, то показываем 403 */
    user: User | null;
    userRoleAndId: CookieUserData | null;
  };
  handlers: {
    setUser: (user: User) => void;
    setUserRoleAndId: (data: CookieUserData | null) => void;
  };
}

export const DEFAULT_CONTEXT: AccessCheckerCtxProps = {
  state: {
    loading: true,
    user: null,
    userRoleAndId: null,
  },
  handlers: {
    setUser: noop,
    setUserRoleAndId: noop,
  },
};
