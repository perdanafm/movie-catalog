import { Loading } from '@/components/atom/Loading';
import DetailMovie from '@/components/view/DetailMovie';
import { useGetDetailMovie } from '@/services/hooks';
import { generateImageOri } from '@/utils/tools';
import { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const DetailMoviePage: FC = () => {
  const location = useLocation();

  const { data, isFetching, isLoading } = useGetDetailMovie({
    slugID: location.pathname.toString(),
  });
  const backdropClass: string = useMemo(() => {
    const img = generateImageOri(data?.backdrop_path.toString() ?? '');
    return data?.backdrop_path ? `bg-[url(${img})]` : 'bg-gray-950';
  }, [data?.backdrop_path]);
  console.log(backdropClass);
  return isFetching || isLoading ? (
    <Loading />
  ) : (
    <main
      className={`relative content-center md:px-24 sm:px-12 px-6 w-full h-screen ${backdropClass} bg-cover bg-center bg-no-repeat transition-all duration-500 vignette-overlay`}
    >
      {data && <DetailMovie data={data} />}
    </main>
  );
};

export default DetailMoviePage;
