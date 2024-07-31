import React, { ComponentType, PureComponent, ReactNode } from 'react';

import { ErrorBoundaryComponent, ErrorBoundaryWithSenty } from './ErrorBoundary';

// export default ErrorBoundary;

export const ErrorBoundary = process.env.PRODUCTION ? ErrorBoundaryWithSenty : ErrorBoundaryComponent;
