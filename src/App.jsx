import { RouterProvider } from 'react-router-dom';
import { router } from './router';

/**
 * App component serving as the entry point for the RouterProvider.
 */
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;