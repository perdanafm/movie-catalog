import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DiscoverMoviePage from '../../pages/DiscoverMoviePage';
import { useMovieData } from '../../services/hooks';
import userEvent from '@testing-library/user-event';

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
      data: { results: [{ id: 1, title: 'Movie Title' }] },
    });

    render(
      <MemoryRouter>
        <DiscoverMoviePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Movie Title')).toBeInTheDocument();
    });
  });

  it('updates query params when navigation changes', async () => {
    (useMovieData as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: { results: [] },
    });

    render(
      <MemoryRouter>
        <DiscoverMoviePage />
      </MemoryRouter>
    );

    const filterButton = screen.getByRole('button', { name: /Filter/i }); // Adjust based on actual UI
    await userEvent.click(filterButton);

    await waitFor(() => {
      expect(window.location.search).toContain('filter='); // Adjust based on actual filter value
    });
  });
});
