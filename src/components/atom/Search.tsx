import IconSearch from '@/assets/icons/search';
import { ParamsFetchProps } from '@/pages/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const SearchInput = ({
  params,
  setParams,
}: {
  params: ParamsFetchProps;
  setParams: Dispatch<SetStateAction<ParamsFetchProps>>;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState(params.query);

  useEffect(() => {
    setSearchText(params.query);
    if (!params.query) setIsExpanded(false);
  }, [setSearchText, params.query]);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (searchText === '') {
      setIsExpanded(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    if (isExpanded) {
      e.preventDefault();
      setParams({ page: 1, sort_by: '', query: searchText });
    }
  };
  return (
    <div className='relative'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className={`border-b border-semi-light h-10 focus:px-2 focus:pr-10 text-sm focus:outline-none transition-all duration-300 ease-in-out ${
            isExpanded ? 'w-64' : 'w-0'
          }`}
          placeholder='Search Movie Title...'
          value={searchText}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </form>
      <div className='absolute right-0 top-0 mt-3 mr-4'>
        <button
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleSubmit}
          className='cursor-pointer'
        >
          <IconSearch className='size-6' />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
