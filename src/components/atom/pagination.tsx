import { ParamsFetchProps } from '@/pages/types';
import { ReactElement } from 'react';

type PaginationProps = {
  onChange: React.Dispatch<React.SetStateAction<ParamsFetchProps>>;
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages, onChange }: PaginationProps) => {
  const Numbering = () => {
    const windowSize = 5;
    if (totalPages <= 1) {
      return [1];
    }

    const pagination: ReactElement[] = [];
    const halfWindow = Math.floor(windowSize / 2);
    let start = currentPage - halfWindow;
    let end = currentPage + halfWindow;

    if (start < 1) {
      start = 1;
      end = Math.min(windowSize, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - windowSize + 1);
    }

    for (let i = start; i <= end; i++) {
      if (i === currentPage)
        pagination.push(
          <li>
            <a
              onClick={() => onChange((prev) => ({ ...prev, page: i }))}
              className='rounded-full px-4 py-2 bg-white text-gray-600'
            >
              {i}
            </a>
          </li>
        );
      else
        pagination.push(
          <li>
            <a
              onClick={() => onChange((prev) => ({ ...prev, page: i }))}
              className='rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out'
            >
              {i}
            </a>
          </li>
        );
    }
    return pagination;
  };

  return (
    <div className='flex justify-center mt-4'>
      <nav className='bg-gray-200 rounded-full px-4 py-2'>
        <ul className='flex text-gray-600 gap-4 font-medium py-2'>
          {Numbering()}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
