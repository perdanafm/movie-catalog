/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import { MovieType, MovieListResponse, DetailMovieType } from './types';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const useGetListDiscoverMovie = ({
  page = 1,
  isSearchMode,
}: {
  page?: string | number;
  isSearchMode: boolean;
}) => {
  return useQuery({
    queryKey: ['discovery/list', page] as const,
    queryFn: async () => {
      const { data } = await api.get<MovieListResponse<MovieType>>(
        'discover/movie',
        {
          params: { page: page },
        }
      );
      return data;
    },
    enabled: !isSearchMode,
    keepPreviousData: true,
    onError: (error: AxiosError) => {
      toast.error(
        'Sorry, we`re having trouble, please contact the administrator for this issue'
      );

      console.error(error.message);
    },
  });
};

export const usetGetNowPlayingMovie = ({
  page = 1,
  isSearchMode,
}: {
  page?: string | number;
  isSearchMode: boolean;
}) => {
  return useQuery({
    queryKey: ['discovery/list', page] as const,
    queryFn: async () => {
      const { data } = await api.get<MovieListResponse<MovieType>>(
        'movie/now_playing',
        {
          params: { page: page },
        }
      );
      return data;
    },
    enabled: !isSearchMode,
    keepPreviousData: true,
    onError: (error: AxiosError) => {
      toast.error(
        'Sorry, we`re having trouble, please contact the administrator for this issue'
      );

      console.error(error.message);
    },
  });
};

export const useGetPopularMovie = ({
  page = 1,
  isSearchMode,
}: {
  page?: string | number;
  isSearchMode: boolean;
}) => {
  return useQuery({
    queryKey: ['discovery/list', page] as const,
    queryFn: async () => {
      const { data } = await api.get<MovieListResponse<MovieType>>(
        'movie/popular',
        {
          params: { page: page },
        }
      );
      return data;
    },
    enabled: !isSearchMode,
    keepPreviousData: true,
    onError: (error: AxiosError) => {
      toast.error(
        'Sorry, we`re having trouble, please contact the administrator for this issue'
      );

      console.error(error.message);
    },
  });
};

export const useGetTopRatedMovie = ({
  page = 1,
  isSearchMode,
}: {
  page?: string | number;
  isSearchMode: boolean;
}) => {
  return useQuery({
    queryKey: ['discovery/list', page] as const,
    queryFn: async () => {
      const { data } = await api.get<MovieListResponse<MovieType>>(
        'movie/top_rated',
        {
          params: { page: page },
        }
      );
      return data;
    },
    enabled: !isSearchMode,
    keepPreviousData: true,
    onError: (error: AxiosError) => {
      toast.error(
        'Sorry, we`re having trouble, please contact the administrator for this issue'
      );

      console.error(error.message);
    },
  });
};

export const useGetUpcomingMovie = ({
  page = 1,
  isSearchMode,
}: {
  page?: string | number;
  isSearchMode: boolean;
}) => {
  return useQuery({
    queryKey: ['discovery/list', page] as const,
    queryFn: async () => {
      const { data } = await api.get<MovieListResponse<MovieType>>(
        'movie/upcoming',
        {
          params: { page: page },
        }
      );
      return data;
    },
    enabled: !isSearchMode,
    keepPreviousData: true,
    onError: (error: AxiosError) => {
      toast.error(
        'Sorry, we`re having trouble, please contact the administrator for this issue'
      );

      console.error(error.message);
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
      const { data } = await api.get<MovieListResponse<MovieType>>(
        'search/movie',
        {
          params: { query },
        }
      );
      return data;
    },
    keepPreviousData: true,
    enabled: isSearchMode,
    onError: (error: AxiosError) => {
      toast.error(
        'Sorry, we`re having trouble, please contact the administrator for this issue'
      );
      console.error(error.message);
    },
  });
};

export const useGetDetailMovie = ({ slugID }: { slugID: string }) => {
  return useQuery({
    queryKey: ['movie/detail', slugID] as const,
    queryFn: async () => {
      const { data } = await api.get<DetailMovieType>(`movie${slugID}`, {
        params: {
          append_to_response: 'credits',
        },
      });
      return data;
    },
    keepPreviousData: true,
    onError: (error: AxiosError) => {
      toast.error(
        'Sorry, we`re having trouble, please contact the administrator for this issue'
      );
      console.error(error.message);
    },
  });
};

export const useMovieData = ({
  page = 1,
  filter,
  query,
}: {
  page?: string | number;
  filter?: string;
  query?: string;
}) => {
  const isSearchMode = !!query && query.trim() !== '';
  if (isSearchMode) {
    return useSearchMovie({ query: query || '', isSearchMode });
  }
  switch (filter) {
    case 'now_playing':
      return usetGetNowPlayingMovie({ page: page, isSearchMode });
    case 'popular':
      return useGetPopularMovie({ page: page, isSearchMode });
    case 'top_rated':
      return useGetTopRatedMovie({ page: page, isSearchMode });
    case 'upcoming':
      return useGetUpcomingMovie({ page: page, isSearchMode });
    default:
      return useGetListDiscoverMovie({ page, isSearchMode });
  }
};
