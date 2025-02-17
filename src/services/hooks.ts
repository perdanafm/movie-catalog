import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import { Movie, MovieListResponse } from './types';
import { AxiosError } from 'axios';

export const useGetListDiscoverMovie = () => {
  return useQuery({
    queryKey: ['discovery/list'] as const,
    queryFn: async () => {
      const { data } = await api.get<MovieListResponse<Movie>>(
        'discover/movie',
        {
          params: { page: 1 },
        }
      );
      return data;
    },
    keepPreviousData: true,
    onError: (error: AxiosError) => {
      console.error(error, 'Gagal mendapatkan data PIC Telesales');
    },
  });
};
