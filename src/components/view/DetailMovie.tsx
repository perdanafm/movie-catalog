import ArrowCircleLeft from '@/assets/icons/back-icon';
import Clock from '@/assets/icons/clock';
import HDIcon from '@/assets/icons/hd-icon';
import Speaker from '@/assets/icons/speaker';
import Surround51 from '@/assets/icons/surround';
import { DetailMovieType } from '@/services/types';
import {
  countryCodeToFullName,
  getCastNames,
  getGenres,
  getYearFromDate,
} from '@/utils/tools';
import { useNavigate } from 'react-router-dom';

interface IDetailMovie {
  data: DetailMovieType;
}

const DetailMovie = ({ data }: IDetailMovie) => {
  const navigate = useNavigate();

  return (
    <main className='relative z-2 text-white'>
      <button
        type='submit'
        onClick={() => navigate(-1)}
        className='cursor-pointer hover:scale-110 transition-all duration-500 ease-in-out'
      >
        <ArrowCircleLeft className='size-12' />
      </button>
      <div className='flex flex-col gap-5'>
        <h1 className='text-4xl font-extrabold'>{data.title}</h1>
        <div className=''>
          <p className='uppercase font-bold'>
            {data.production_companies[0].name}{' '}
            <span className='font-normal'>
              {countryCodeToFullName(
                data.production_companies[0].origin_country
              )}
            </span>
            ,
            <span className='font-normal'>
              {getYearFromDate(data.release_date)}
            </span>
          </p>
          <div className='opacity-50 flex gap-2 items-center'>
            <span>{getGenres(data.genres)}</span>
            <HDIcon />
            <Surround51 />
            <Clock /> <span>{data.runtime}</span>
            <Speaker />
            <span>{data.spoken_languages[0].english_name}</span>
          </div>
        </div>
        <div className=''>
          <p>{data.overview}</p>
        </div>
        <div className=''>
          <span>Casts: </span> <span>{getCastNames(data.credits)}</span>
        </div>
      </div>
    </main>
  );
};

export default DetailMovie;
