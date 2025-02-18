import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DiscoverMoviePage from '@/pages/DiscoverMoviePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DetailMoviePage from '@/pages/DetailMoviePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DiscoverMoviePage />,
  },
  {
    path: '/:slug',
    element: <DetailMoviePage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
