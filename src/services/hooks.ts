import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import { Movie, MovieListResponse } from './types';
import { AxiosError } from 'axios';

export const useGetListDiscoverMovie = ({
  page = 1,
  sort_by,
}: {
  page?: string | number;
  sort_by?: string;
}) => {
  return useQuery({
    queryKey: ['discovery/list', page] as const,
    queryFn: async () => {
      const { data } = await api.get<MovieListResponse<Movie>>(
        'discover/movie',
        {
          params: { sort_by: sort_by, page: page },
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
