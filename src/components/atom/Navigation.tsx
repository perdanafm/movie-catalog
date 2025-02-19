import IconX from '@/assets/icons/cross';
import { FILTER_MOVIE } from '@/constants/filters';
import SearchInput from './Search';
import { ParamsFetchProps } from '@/pages/types';

interface INavigation {
  setParams: React.Dispatch<React.SetStateAction<ParamsFetchProps>>;
  params: ParamsFetchProps;
}

const Navigation = ({ setParams, params }: INavigation) => {
  return (
    <div>
      <h1 className='font-bold px-4 text-3xl mb-2'>Movie Catalogue</h1>

      <nav className='text-dirty-white px-4 flex items-center justify-between border-b border-semi-light lg:min-w-[950px] md:min-w-[850px] sm:min-w-[600px] w-[300px] mb-4'>
        <div className=' items-center space-x-8 md:flex hidden'>
          {FILTER_MOVIE.map((nav: { label: string; value: string }) => (
            <a
              key={nav.value}
              href=''
              onClick={() =>
                setParams((prev) => ({ ...prev, filter: nav.value }))
              }
              className={`${
                nav.value === params.filter ? 'font-semibold text-white' : ''
              } text-dirty-white hover:text-white transition-colors`}
            >
              {nav.label}
            </a>
          ))}

          {(params.filter || params.query) && (
            <div
              onClick={() => setParams({ page: 1, filter: '', query: '' })}
              className='p-2 cursor-pointer flex gap-1 bg-black/40 hover:bg-black/80 rounded-xl'
            >
              <IconX className='size-4 text-danger' />
              <a className='text-xs text-light hover:text-white transition-colors'>
                Clear Filter & Search
              </a>
            </div>
          )}
        </div>
        <div className='items-center relative md:hidden'>
          <select
            value={params.filter}
            onChange={(e) =>
              setParams((prev) => ({ ...prev, filter: e.target.value }))
            }
            className='appearance-none bg-black/40 text-dirty-white hover:text-white px-4 py-2 pr-8 rounded-xl 
                     cursor-pointer transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 
                     focus:ring-white/20'
          >
            <option value=''>Select Filter</option>
            {FILTER_MOVIE.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className='bg-gray-900 text-white py-2'
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
            <svg
              className='w-4 h-4 text-white/70'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>

        <div className='cursor-pointer text-gray-300 hover:text-white focus:outline-none'>
          <SearchInput params={params} setParams={setParams} />
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
