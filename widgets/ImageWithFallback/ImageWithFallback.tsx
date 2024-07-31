'use client';
import Image, { ImageProps } from 'next/image';
import { useLayoutEffect, useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc?: string;
}

export const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, fallbackSrc, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(() => src);

  useLayoutEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      alt={alt}
      {...rest}
      src={imgSrc}
      placeholder="blur"
      blurDataURL={`data:image/jpeg;base64,${fallbackSrc}`}
      onLoad={(result) => {
        if (result.currentTarget.width === 0) {
          // Broken image
          if (fallbackSrc) setImgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        if (fallbackSrc) setImgSrc(fallbackSrc);
      }}
    />
  );
};
