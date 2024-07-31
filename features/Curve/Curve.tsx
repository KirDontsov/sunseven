import { COMMON_TITLE, CommonProps } from '@/shared';
import { Variants, motion } from 'framer-motion';
import React, { FC, useLayoutEffect, useState } from 'react';
import { curve, text, translate } from './anim';
import styles from './curve.module.scss';

export interface WindowDimensions {
  width: number | null;
  height: number | null;
}

const anim = (variants: Variants) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  };
};

const SVG = ({ height, width }: { height: number; width: number }) => {
  const initialPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

  return (
    <motion.svg className={styles.slide} {...anim(translate)}>
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};

export const Curve: FC<CommonProps> = ({ children }) => {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: null,
    height: null,
  });

  useLayoutEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`${styles.curve} page`}>
      <div style={{ opacity: dimensions.width == null ? 1 : 0 }} className={styles.background} />
      <motion.p
        className={`${styles.route} font-semibold text-2xl lg:text-3xl xl:text-8xl 2xl:text-12xl leading-none tracking-tighter w-full`}
        {...anim(text)}
      >
        {COMMON_TITLE.toUpperCase()}
      </motion.p>
      {dimensions.width != null && (
        // @ts-ignore
        <SVG {...dimensions} />
      )}
      {children}
    </div>
  );
};
