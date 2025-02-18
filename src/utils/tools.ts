import {
  VITE_PUBLIC_THEMOVIE_IMAGE_ORIGINAL,
  VITE_PUBLIC_THEMOVIE_IMAGE_THUMBNAIL,
} from '@/constants/env';

export const generateImageOri = (urlImage: string) => {
  return `${VITE_PUBLIC_THEMOVIE_IMAGE_ORIGINAL}${urlImage}`;
};
export const generateImageMini = (urlImage: string) => {
  return `${VITE_PUBLIC_THEMOVIE_IMAGE_THUMBNAIL}${urlImage}`;
};

export function getYearFromDate(dateString: string): string {
  return dateString.split('-')[0];
}
