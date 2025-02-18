import { useEffect, useState } from 'react';

import { Loading } from '@/components/atom/loading';
import { useGetListDiscoverMovie } from '@/services/hooks';
import { ParamsFetchProps } from './types';
import { useSearchParams } from 'react-router-dom';
import CatalogMovie from '@/components/view/CatalogMovie';
import IconStar from '@/assets/icons/stars';

function DiscoverMoviePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<ParamsFetchProps>({
    page: searchParams.get('page') ?? 1,
    sort_by: '',
  });

  useEffect(() => {
    searchParams.set('page', params.page?.toString() ?? '1');
    setSearchParams(searchParams);
  }, [params, searchParams, setSearchParams]);

  const data = useGetListDiscoverMovie(params);
  const result = data.data?.results;

  return (
    <main className='justify-items-center min-h-screen content-center md:px-8 px-2'>
      {/* Section for movie card */}
      {data.isLoading || data.isFetching ? (
        <Loading />
      ) : (
        <main className=''>
          <nav className='bg-[#1b1d31] text-gray-300 px-4 py-3 flex items-center justify-between'>
            <div className='hidden md:flex items-center space-x-8'>
              <a
                href='#'
                className='text-gray-300 hover:text-white transition-colors'
              >
                Now Playing
              </a>
              <a
                href='#'
                className='text-gray-300 hover:text-white transition-colors'
              >
                Popular
              </a>
              <a href='#' className='text-white font-medium transition-colors'>
                Top Rated
              </a>
              <a
                href='#'
                className='text-gray-300 hover:text-white transition-colors'
              >
                Upcoming
              </a>
              <a
                href='#'
                className='text-gray-300 hover:text-white transition-colors'
              >
                Clear Filter
              </a>
            </div>
            <button className='text-gray-300 hover:text-white focus:outline-none'>
              <IconStar className='size-2' />
            </button>
          </nav>
          <CatalogMovie
            setParams={setParams}
            params={params}
            result={result}
            data={data}
          />
        </main>
      )}
    </main>
  );
}

export default DiscoverMoviePage;
