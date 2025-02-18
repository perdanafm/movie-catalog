import { FC, useEffect, useState } from 'react';

import { useMovieData } from '@/services/hooks';
import { ParamsFetchProps } from './types';
import { useSearchParams } from 'react-router-dom';
import CatalogMovie from '@/components/view/CatalogMovie';
import { Loading } from '@/components/atom/Loading';
import Navigation from '@/components/atom/Navigation';

const DiscoverMoviePage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<ParamsFetchProps>({
    page: searchParams.get('page') ?? 1,
    filter: searchParams.get('filter') ?? '',
    query: '',
  });

  useEffect(() => {
    searchParams.set('page', params.page?.toString() ?? '1');

    if (params.filter)
      searchParams.set('filter', params.filter?.toString() ?? '');
    else searchParams.delete('filter');

    setSearchParams(searchParams);
  }, [params, searchParams, setSearchParams]);

  const data = useMovieData(params);
  const result = data.data?.results;

  return (
    <main className='justify-items-center min-h-screen py-6 md:px-8 px-2 max-w-[1200px] justify-self-center'>
      <Navigation setParams={setParams} params={params} />
      {/* Section for movie card */}
      <div className='min-h-screen'>
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
      </div>
    </main>
  );
};

export default DiscoverMoviePage;
