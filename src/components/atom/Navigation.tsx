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

      <nav className='text-dirty-white px-4 flex items-center justify-between border-b border-semi-light min-w-[950px] mb-4'>
        <div className='flex items-center space-x-8'>
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
        <div className='cursor-pointer text-gray-300 hover:text-white focus:outline-none'>
          <SearchInput params={params} setParams={setParams} />
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
