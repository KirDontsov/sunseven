'use client';
import { $category, $city, $firm } from '@/api';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect, useState } from 'react';
import { FOOTER_LINKS } from '../Footer/constants';

/**
 * Takes an URL String and removes query params and hash params
 *
 * @param url - The URL string
 * @returns The transformed URL string
 *
 */
const getPathFromUrl = (url: string): string => {
  return url.split(/[?#]/)[0];
};

/**
 * Takes a breadcrumb title (from url path) and replaces
 * special chars to more readable chars
 *
 * @param title - The breadcrumb title
 * @returns The transformed title or the result of the custom transformLabel function
 *
 */
const convertBreadcrumb = (
  title: string,
  toUpperCase: boolean | undefined,
  replaceCharacterList: Array<CharacterMap> | undefined,
): ReactNode => {
  let transformedTitle = getPathFromUrl(title);

  if (replaceCharacterList) {
    for (let i = 0; i < replaceCharacterList.length; i++) {
      transformedTitle = transformedTitle.replaceAll(replaceCharacterList[i].from, replaceCharacterList[i].to);
    }
  }

  // decode for utf-8 characters and return ascii.
  return toUpperCase ? decodeURI(transformedTitle).toUpperCase() : decodeURI(transformedTitle);
};

export interface Breadcrumb {
  /** Breadcrumb title. Example: 'blog-entries' */
  breadcrumb: string;

  /** The URL which the breadcrumb points to. Example: 'blog/blog-entries' */
  href: string;
}

export interface CharacterMap {
  /** The source character or character pattern that should be replaced (e.g. 'ae') */
  from: string;

  /** The replacement into which the character should be replaced. */
  to: string;
}

export interface BreadcrumbsProps {
  /** The title for the very first breadcrumb pointing to the root directory. Example: '/' Default: 'HOME' */
  rootLabel?: string | null;

  /** Boolean indicator whether the root label should be omitted. Example: true Default: false */
  omitRootLabel?: boolean;

  /** Boolean indicator if the labels should be displayed as uppercase. Example: true Default: false */
  labelsToUppercase?: boolean | undefined;

  /** Array containing a list of specific characters that should be replaced in the label. This can be useful to convert special characters such as vowels. Example: [{ from: 'ae', to: 'ä' }, { from: '-', to: ' '}] Default: [{ from: '-', to: ' ' }] */
  replaceCharacterList?: Array<CharacterMap> | undefined;

  /** Array containing all the indexes of the path that should be omitted and not be rendered as labels. If we have a path like '/home/category/1' then you might want to pass '[2]' here, which omits the breadcrumb label '1'. Indexes start with 0. Example: [2] Default: undefined */
  omitIndexList?: Array<number> | undefined;

  /** Classes to be used for the inactive breadcrumb list item */
  inactiveItemClassName?: string;

  /** Classes to be used for the active breadcrumb list item */
  activeItemClassName?: string;
}

export const BreadCrumbs: FC<BreadcrumbsProps> = ({
  rootLabel = '',
  omitRootLabel = false,
  labelsToUppercase = false,
  replaceCharacterList = [
    { from: '-', to: ' ' },
    { from: '_', to: ' ' },
  ],
  omitIndexList = undefined,
  inactiveItemClassName = '',
  activeItemClassName = '',
}) => {
  const router = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(null);

  const { firm, city, category } = useUnit({
    firm: $firm,
    city: $city,
    category: $category,
  });

  useEffect(() => {
    if (router) {
      const linkPath = router.split('/');
      linkPath.shift();

      const transformPath = (path: string, index: number) => {
        if (path === city?.abbreviation) {
          return city?.name ?? path;
        }
        if (path === category?.abbreviation) {
          return category?.name ?? path;
        }
        // TODO: подумать как передать признак фирмы
        if (index === 2) {
          return firm?.name ?? path;
        }

        const items = Array.from(FOOTER_LINKS.values()).flat();

        if (items.some((x) => x?.href.indexOf(path) !== -1)) {
          return items.find((x) => x?.href.indexOf(path) !== -1)?.title;
        }

        return path;
      };

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: transformPath(path, i),
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router, city, category, firm]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {!omitRootLabel && (
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm xl:text-base font-medium text-eboni-400 dark:text-white hover:text-negroni-400"
            >
              <svg
                className="w-5 h-10 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              {convertBreadcrumb(rootLabel || '', labelsToUppercase, replaceCharacterList)}
            </Link>
          </li>
        )}
        {breadcrumbs.length >= 1 &&
          breadcrumbs.map((breadcrumb, i) => {
            if (
              !breadcrumb ||
              breadcrumb.breadcrumb.length === 0 ||
              (omitIndexList && omitIndexList.find((value) => value === i))
            ) {
              return;
            }
            return (
              <li
                key={breadcrumb.href}
                className={i === breadcrumbs.length - 1 ? activeItemClassName : inactiveItemClassName}
              >
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-eboni-400 dark:text-white mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    href={breadcrumb.href}
                    className="ms-1 text-sm xl:text-base font-medium text-eboni-400 dark:text-white hover:text-negroni-400 md:ms-2"
                  >
                    {convertBreadcrumb(breadcrumb.breadcrumb, labelsToUppercase, replaceCharacterList)}
                  </Link>
                </div>
              </li>
            );
          })}
      </ol>
    </nav>
  );
};
