import cn from 'classnames';
import { FC, Fragment } from 'react';

export type PaginationProps = {
  current: number;
  total: number;
  short?: boolean;
  onChange: (page: number) => void;
  dataTestId?: string;
};

const range = (start: number, stop: number) =>
  start <= stop
    ? Array(stop + 1 - start)
        .fill(0)
        .map((_, i) => start + i)
    : [];

const Dots: FC = () => (
  <div className="hidden px-4 py-2 mx-1 transition-colors duration-300 transform bg-eboni-400 rounded-md sm:inline text-white dark:bg-eboni-400 dark:text-white hover:bg-negroni-400 hover:text-eboni-600">
    ...
  </div>
);

export const Pagination: FC<PaginationProps> = ({
  current: currentPage,
  total: totalPages,
  short,
  onChange,
  dataTestId = 'Pagination',
}) => {
  const changePage = (page: number) => onChange(page);
  const handlePrevClick = () => currentPage !== 1 && changePage(currentPage - 1);
  const handleNextClick = () => currentPage !== totalPages && changePage(currentPage + 1);
  const handlePageButtonClick = (page: number | null) => page !== null && changePage(page);

  const renderPageButton = (page: number) => (
    <button
      key={`${page}`}
      onClick={() => handlePageButtonClick(page)}
      className={cn(
        'hidden px-4 py-2 text-sm text-white mx-1 transition-colors duration-300 transform rounded-md sm:inline dark:text-white hover:bg-negroni-400 hover:text-eboni-600 dark:hover:text-eboni-600',
        { 'bg-negroni-400 dark:bg-negroni-400 text-white dark:text-eboni-600': page === currentPage },
        { 'dark:bg-eboni-400 bg-eboni-400': page !== currentPage },
      )}
    >
      {page}
    </button>
  );
  const renderMiddleButtons = () => (
    <Fragment key="middle-buttons">
      {currentPage >= 5 && <Dots key="left-dots" />}
      {currentPage === 4 && renderPageButton(currentPage - 2)}

      {currentPage > totalPages - 1 && renderPageButton(currentPage - 4)}
      {currentPage > totalPages - 2 && renderPageButton(currentPage - 3)}
      {currentPage > totalPages - 3 && renderPageButton(currentPage - 2)}

      {currentPage >= 3 && renderPageButton(currentPage - 1)}
      {currentPage >= 2 && currentPage < totalPages && renderPageButton(currentPage)}
      {currentPage + 2 <= totalPages && renderPageButton(currentPage + 1)}
      {currentPage + 3 === totalPages && renderPageButton(currentPage + 2)}

      {currentPage + 2 < totalPages && currentPage < 4 && renderPageButton(currentPage + 2)}
      {currentPage + 3 < totalPages && currentPage < 3 && renderPageButton(currentPage + 3)}
      {currentPage + 4 < totalPages && currentPage < 2 && renderPageButton(currentPage + 4)}

      {currentPage + 4 <= totalPages && <Dots key="right-dots" />}
    </Fragment>
  );

  return (
    <div data-test-id={dataTestId} className="flex items-center">
      <button
        onClick={handlePrevClick}
        className="flex items-center justify-center px-2 py-2 text-sm text-white mx-1 transition-colors duration-300 transform rounded-md rtl:-scale-x-100 bg-eboni-400 dark:bg-eboni-400 dark:text-white hover:bg-negroni-400 hover:text-eboni-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {renderPageButton(1)}
      {totalPages > 7 ? totalPages > 2 && renderMiddleButtons() : range(2, totalPages - 1).map(renderPageButton)}
      {totalPages > 1 && renderPageButton(totalPages)}
      <button
        onClick={handleNextClick}
        className="flex items-center justify-center px-2 py-2 text-sm text-white mx-1 transition-colors duration-300 transform rounded-md rtl:-scale-x-100 bg-eboni-400 dark:bg-eboni-400 hover:bg-negroni-400 hover:text-eboni-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
