'use client';
import { createContext } from 'use-context-selector';

import { DEFAULT_CONTEXT, AccessCheckerCtxProps } from './constants';

export const AccessCheckerCtx = createContext<AccessCheckerCtxProps>(DEFAULT_CONTEXT);
