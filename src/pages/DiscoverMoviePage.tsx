import { useEffect, useState } from 'react';

import { useMovieData } from '@/services/hooks';
import { ParamsFetchProps } from './types';
import { useSearchParams } from 'react-router-dom';
import CatalogMovie from '@/components/view/CatalogMovie';
import { Loading } from '@/components/atom/Loading';
import IconX from '@/assets/icons/cross';
import SearchInput from '@/components/atom/Search';

function DiscoverMoviePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<ParamsFetchProps>({
    page: searchParams.get('page') ?? 1,
    sort_by: '',
    query: '',
  });

  useEffect(() => {
    searchParams.set('page', params.page?.toString() ?? '1');
    searchParams.set('sort_by', params.sort_by?.toString() ?? '');

    setSearchParams(searchParams);
  }, [params, searchParams, setSearchParams]);

  const data = useMovieData(params);
  const result = data.data?.results;

  return (
    <main className='justify-items-center min-h-screen md:px-8 px-2 max-w-[1200px] justify-self-center'>
      <nav className='text-dirty-white px-4 py-3 flex items-center justify-between border-b border-semi-light min-w-[950px] mb-4'>
        <div className='flex items-center space-x-8'>
          <a
            href='#'
            className='text-dirty-white hover:text-white transition-colors'
          >
            Now Playing
          </a>
          <a
            href='#'
            className='text-dirty-white hover:text-white transition-colors'
          >
            Popular
          </a>
          <a href='#' className='text-white font-medium transition-colors'>
            Top Rated
          </a>
          <a
            href='#'
            className='text-dirty-white hover:text-white transition-colors'
          >
            Upcoming
          </a>
          {(params.sort_by || params.query) && (
            <div
              onClick={() => setParams({ page: 1, sort_by: '', query: '' })}
              className='p-2 cursor-pointer flex gap-1 bg-black/40 hover:bg-black/80 rounded-xl'
            >
              <IconX className='size-4 text-danger' />
              <a className='text-xs text-light hover:text-white transition-colors'>
                Clear Filter & Search
              </a>
            </div>
          )}
        </div>
        <button className='cursor-pointer text-gray-300 hover:text-white focus:outline-none'>
          <SearchInput params={params} setParams={setParams} />
        </button>
      </nav>

      {/* Section for movie card */}
      {data.isLoading || data.isFetching ? (
        <Loading />
      ) : (
        <CatalogMovie
          setParams={setParams}
          params={params}
          result={result}
          data={data}
        />
      )}
    </main>
  );
}

export default DiscoverMoviePage;
