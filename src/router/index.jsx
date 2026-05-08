import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';
import Analytics from '../pages/Analytics';
import NotFound from '../pages/NotFound';

/**
 * Modern Router configuration using createBrowserRouter.
 * Optimized for clean URL management and scalable page additions.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
