import { ErrorBoundary } from '@/features/ErrorBoundary';
import { EffectorNext } from '@effector/next';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import '../configs/dayjs.config';

function App({ Component, pageProps }: AppProps<{ values: Record<string, unknown> }>) {
  const { values } = pageProps;

  return (
    <ErrorBoundary>
      <EffectorNext values={values}>
        <AnimatePresence mode="wait">
          <Component />
        </AnimatePresence>
      </EffectorNext>
    </ErrorBoundary>
  );
}

export default App;
