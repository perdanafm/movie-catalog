/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import { Movie, MovieListResponse } from './types';
import { AxiosError } from 'axios';

export const useGetListDiscoverMovie = ({
  page = 1,
  sort_by,
  isSearchMode,
}: {
  page?: string | number;
  sort_by?: string;
  isSearchMode: boolean;
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
    enabled: !isSearchMode,
    keepPreviousData: true,
    onError: (error: AxiosError) => {
      console.error(
        error,
        'Sorry, we`re having trouble, please contact the administrator for this issue'
      );
    },
  });
};

export const useSearchMovie = ({
  query,
  isSearchMode,
}: {
  query: string;
  isSearchMode: boolean;
}) => {
  return useQuery({
    queryKey: ['discovery/list', query] as const,
    queryFn: async () => {
      const { data } = await api.get<MovieListResponse<Movie>>('search/movie', {
        params: { query },
      });
      return data;
    },
    keepPreviousData: true,
    enabled: isSearchMode,
    onError: (error: AxiosError) => {
      console.error(
        error,
        'Sorry, we`re having trouble, please contact the administrator for this issue'
      );
    },
  });
};

export const useMovieData = ({
  page = 1,
  sort_by,
  query,
}: {
  page?: string | number;
  sort_by?: string;
  query?: string;
}) => {
  const isSearchMode = !!query && query.trim() !== '';
  if (isSearchMode) {
    return useSearchMovie({ query: query || '', isSearchMode });
  }

  return useGetListDiscoverMovie({ page, sort_by, isSearchMode });
};
