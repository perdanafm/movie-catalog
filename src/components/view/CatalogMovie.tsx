import IconEyeDetail from '@/assets/icons/eye';
import { ParamsFetchProps } from '@/pages/types';
import { Movie, MovieListResponse } from '@/services/types';
import { UseQueryResult } from '@tanstack/react-query';
import IconStar from '@/assets/icons/stars';
import { generateImageMini, getYearFromDate } from '@/utils/tools';

import { AxiosError } from 'axios';
import Image from '../atom/image';
import Pagination from '../atom/pagination';

interface ICatalogMovie {
  result: Movie[] | undefined;
  data: UseQueryResult<MovieListResponse<Movie>, AxiosError<unknown, unknown>>;
  params: ParamsFetchProps;
  setParams: React.Dispatch<React.SetStateAction<ParamsFetchProps>>;
}

const CatalogMovie = ({ result, data, params, setParams }: ICatalogMovie) => {
  return (
    <main className=''>
      <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1  gap-2 xl:gap-4'>
        {result?.map((item: Movie) => {
          return (
            <div key={item.id} className='bg-white/50 rounded-lg'>
              <div className='relative group'>
                <div className='absolute cursor-pointer inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 place-content-center'>
                  <IconEyeDetail className='size-8 ml-auto mr-auto cursor-pointer z-100 group-active:size-10 transition-all duration-300' />
                </div>
                <Image
                  lowResSrc={generateImageMini(item.poster_path)}
                  highResSrc={generateImageMini(item.poster_path)}
                  alt={item.title}
                />
                <div className='absolute uppercase bottom-4 left-4 text-white px-2 py-1 rounded-md'>
                  <p className='font-medium text-xl' id='title'>
                    {item.title}{' '}
                    <span className='font-normal'>
                      ({getYearFromDate(item.release_date)})
                    </span>
                  </p>
                  <p
                    className='font-medium text-md flex items-center gap-1'
                    id='rating'
                  >
                    {item.vote_average.toFixed(1)}{' '}
                    <IconStar className='size-4' />
                  </p>
                  <p className='normal-case text-sm hidden group-hover:line-clamp-3 '>
                    {item.overview}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        onChange={setParams}
        currentPage={Number(params.page)}
        totalPages={Number(data.data?.total_pages)}
      />
    </main>
  );
};

export default CatalogMovie;
