import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DiscoverMoviePage from '../../pages/DiscoverMoviePage';
import { useMovieData } from '../../services/hooks';

jest.mock('@/services/hooks', () => ({
  useGetDetailMovie: jest.fn(),
}));

jest.mock('@/utils/tools', () => ({
  generateImageOri: jest.fn(),
  generateImageMini: jest.fn(),
  getYearFromDate: jest.fn(),
}));

jest.mock('../../services/hooks', () => ({
  useMovieData: jest.fn().mockReturnValue({
    data: [],
    isLoading: false,
    error: null,
  }),
}));

describe('DiscoverMoviePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (useMovieData as jest.Mock).mockReturnValue({
      isLoading: true,
      isFetching: true,
    });
    render(
      <MemoryRouter>
        <DiscoverMoviePage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders movie catalog when data is available', async () => {
    (useMovieData as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: {
        results: [
          {
            adult: false,
            backdrop_path: '/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
            genre_ids: [18, 80],
            id: 278,
            original_language: 'en',
            original_title: 'The Shawshank Redemption',
            overview:
              'Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
            popularity: 102.946,
            poster_path: '/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
            release_date: '1994-09-23',
            title: 'The Shawshank Redemption',
            video: false,
            vote_average: 8.708,
            vote_count: 27745,
          },
        ],
      },
    });

    render(
      <MemoryRouter>
        <DiscoverMoviePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('movie-title')).toBeInTheDocument();
    });
  });
});
