import {
  VITE_PUBLIC_THEMOVIE_IMAGE_ORIGINAL,
  VITE_PUBLIC_THEMOVIE_IMAGE_THUMBNAIL,
} from '@/constants/env';
import { Credits, Genre } from '@/services/types';

export const generateImageOri = (urlImage: string) => {
  return `${VITE_PUBLIC_THEMOVIE_IMAGE_ORIGINAL}${urlImage}`;
};
export const generateImageMini = (urlImage: string) => {
  return `${VITE_PUBLIC_THEMOVIE_IMAGE_THUMBNAIL}${urlImage}`;
};

export function getYearFromDate(dateString: string): string {
  return dateString.split('-')[0];
}

type CountryCode = string;
interface CountryMap {
  [code: string]: string;
}

export function countryCodeToFullName(countryCode: CountryCode) {
  if (typeof countryCode !== 'string') {
    throw new TypeError('Country code must be a string');
  }

  try {
    if (countryCode.length === 2) {
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      return regionNames.of(countryCode.toUpperCase());
    }
    throw new Error('Invalid country code format');
  } catch (error) {
    console.error(error);
    const countryMap: CountryMap = {
      // North America
      US: 'United States',
      CA: 'Canada',
      MX: 'Mexico',

      // South America
      BR: 'Brazil',
      AR: 'Argentina',
      CO: 'Colombia',
      PE: 'Peru',
      CL: 'Chile',

      // Europe
      GB: 'United Kingdom',
      FR: 'France',
      DE: 'Germany',
      IT: 'Italy',
      ES: 'Spain',
      PT: 'Portugal',
      NL: 'Netherlands',
      BE: 'Belgium',
      IE: 'Ireland',
      SE: 'Sweden',
      NO: 'Norway',
      DK: 'Denmark',
      FI: 'Finland',
      CH: 'Switzerland',
      AT: 'Austria',
      GR: 'Greece',
      PL: 'Poland',
      RO: 'Romania',
      CZ: 'Czech Republic',
      HU: 'Hungary',

      // Asia
      CN: 'China',
      JP: 'Japan',
      KR: 'South Korea',
      IN: 'India',
      ID: 'Indonesia',
      PH: 'Philippines',
      MY: 'Malaysia',
      SG: 'Singapore',
      TH: 'Thailand',
      VN: 'Vietnam',
      AE: 'United Arab Emirates',
      SA: 'Saudi Arabia',
      IL: 'Israel',
      TR: 'Turkey',
      RU: 'Russia',

      // Oceania
      AU: 'Australia',
      NZ: 'New Zealand',

      // Africa
      ZA: 'South Africa',
      EG: 'Egypt',
      NG: 'Nigeria',
      KE: 'Kenya',
      MA: 'Morocco',
      GH: 'Ghana',
      ET: 'Ethiopia',
      TZ: 'Tanzania',
    };

    if (countryCode.length === 2) {
      const normalizedCode = countryCode.toUpperCase();
      return countryMap[normalizedCode] || countryCode;
    }

    return countryCode;
  }
}

export function getCastNames(credits: Credits): string {
  if (
    !credits.cast ||
    !Array.isArray(credits.cast) ||
    credits.cast.length === 0
  ) {
    return '';
  }

  const sortedCast = [...credits.cast].sort((a, b) => a.order - b.order);
  const limitedCast = sortedCast.slice(0, 5);

  return limitedCast.map((member) => member.name).join(', ');
}

export function getGenres(genres: Genre[]): string {
  const finalGenre = genres.slice(0, 3);

  return finalGenre.map((genre) => genre.name).join(', ');
}
