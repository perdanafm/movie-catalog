import { useState } from 'react';

interface ImageProps {
  lowResSrc: string;
  highResSrc: string;
  alt?: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  lowResSrc,
  highResSrc,
  alt = '',
  className = '',
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={loaded ? highResSrc : lowResSrc}
      alt={alt}
      className={`rounded-lg w-[230px] h-[345px] object-cover transition-all duration-500 ease-in-out ${
        loaded ? 'blur-0' : 'blur-lg'
      } ${className}`}
      onLoad={() => setLoaded(true)}
    />
  );
};

export default Image;
