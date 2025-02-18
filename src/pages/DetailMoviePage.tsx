import DetailMovie from '@/components/view/DetailMovie';
import { useGetDetailMovie } from '@/services/hooks';
import { generateImageOri } from '@/utils/tools';
import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DetailMoviePage: FC = () => {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [bgImage, setBgImage] = useState('');

  const { data } = useGetDetailMovie({
    slugID: location.pathname.toString(),
  });
  const backdropClass: string = useMemo(() => {
    const img = generateImageOri(data?.backdrop_path.toString() ?? '');
    return img;
  }, [data?.backdrop_path]);

  useEffect(() => {
    const img = new Image();
    img.src = backdropClass;
    img.onload = () => {
      setBgImage(backdropClass);
      setLoaded(true);
    };
  }, [backdropClass]);
  return (
    <main
      className={`relative content-center md:px-24 sm:px-12 px-6 w-full h-screen transition-all duration-500 vignette-overlay`}
    >
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500'
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: loaded ? 'none' : 'blur(20px)',
          transition: 'filter 0.5s ease-in-out',
        }}
      />

      {data && <DetailMovie data={data} />}
    </main>
  );
};

export default DetailMoviePage;
