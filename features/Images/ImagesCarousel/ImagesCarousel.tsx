import { Category, City, Firm, ImageType } from '@/api';
import { DEFAULT_PHOTOS_ENDPOINT, DEFAULT_PHOTOS_EXT, HeroBackground } from '@/shared';
import { ImageWithFallback } from '@/widgets';
import { motion, useMotionValue } from 'framer-motion';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

export interface ImagesCarouselProps {
  images: ImageType[] | null;
  firm: Firm | null;
  city: City | null;
  category: Category | null;
  tablet: boolean;
}

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 3;
const DRAG_BUFFER = 1;

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const ImagesCarousel: FC<ImagesCarouselProps> = ({ firm, city, category, images, tablet }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((prevState) => {
          if (prevState === (images?.length ?? 0) - 1) {
            return 0;
          }
          return prevState + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX, images?.length]);

  const onDragEnd = useCallback(() => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex <= (images?.length ?? 0) - 1) {
      setImgIndex((prevState) => {
        if (prevState === (images?.length ?? 0) - 1) {
          return 0;
        }
        return prevState + 1;
      });
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((prevState) => prevState - 1);
    }
  }, [dragX, images?.length, imgIndex]);

  const galleryRef = useRef<HTMLDivElement | null>(null);

  const handleFullScreen = useCallback(() => {
    if (!document?.fullscreenElement) {
      galleryRef?.current?.requestFullscreen();
      setIsFullScreen(true);
    } else if (document?.exitFullscreen) {
      document?.exitFullscreen();
      setIsFullScreen(false);
    }
  }, []);

  return (
    <div ref={galleryRef} className="relative overflow-hidden py-8">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} firm={firm} city={city} category={category} images={images} />
      </motion.div>

      {!tablet && <Expand handleFullScreen={handleFullScreen} isFullScreen={isFullScreen} />}
      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} images={images} />
    </div>
  );
};

export interface ImagesProps {
  imgIndex: number;
  images: ImageType[] | null;
  firm: Firm | null;
  city: City | null;
  category: Category | null;
}

const Images: FC<ImagesProps> = ({ imgIndex, firm, city, category, images }) => {
  return (
    <>
      {images?.map((img, idx) => {
        return (
          <motion.div
            key={idx}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video w-full shrink-0 rounded-xl object-cover overflow-hidden"
          >
            <ImageWithFallback
              className="w-full h-[38rem] absolute z-[-1] pointer-events-none"
              src={`${DEFAULT_PHOTOS_ENDPOINT}/${city?.abbreviation}/${category?.abbreviation}/${firm?.firm_id}/${img?.img_id}.${DEFAULT_PHOTOS_EXT}`}
              fallbackSrc={HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}
              fill
              alt={`${category?.name?.slice(0, -1)} ${firm?.name ?? ''} - ${city?.name ?? ''}`}
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL={`data:image/jpeg;base64,${HeroBackground[(firm?.category_id ?? '') as keyof typeof HeroBackground]}`}
              priority={true}
            />
          </motion.div>
        );
      })}
    </>
  );
};

export interface DotsProps {
  imgIndex: number;
  setImgIndex: (v: number) => void;
  images: ImageType[] | null;
}

const Dots: FC<DotsProps> = ({ imgIndex, setImgIndex, images }) => {
  return (
    <div className="mt-4 flex w-full flex-wrap justify-center gap-2 px-2">
      {images?.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? 'bg-negroni-400' : 'bg-negroni-700'
            }`}
          />
        );
      })}
    </div>
  );
};

export interface ExpandProps {
  handleFullScreen: () => void;
  isFullScreen: boolean;
}

export const Expand: FC<ExpandProps> = ({ handleFullScreen, isFullScreen }) => (
  <div
    className={`flex justify-center items-center absolute cursor-pointer bottom-[20px] ${isFullScreen ? 'right-[20px]' : 'right-[40px]'}`}
    onClick={handleFullScreen}
  >
    {!isFullScreen ? (
      <svg
        className="w-6 h-6 text-negroni-400 hover:text-negroni-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"
        />
      </svg>
    ) : (
      <svg
        className="w-6 h-6 text-negroni-400 hover:text-negroni-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 8h4V4m12 4h-4V4M4 16h4v4m12-4h-4v4"
        />
      </svg>
    )}
  </div>
);
