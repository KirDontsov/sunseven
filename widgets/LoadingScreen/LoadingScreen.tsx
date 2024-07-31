import { COMMON_TITLE } from '@/shared';

export const LoadingScreen = () => {
  return (
    <div className="bg-black w-full h-screen flex items-center justify-center font-semibold text-2xl lg:text-3xl xl:text-8xl 2xl:text-12xl leading-none tracking-tighter">
      {COMMON_TITLE.toUpperCase()}
    </div>
  );
};
