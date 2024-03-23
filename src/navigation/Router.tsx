import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from '../views/pages/dashboard/Dashboard';
import Layout from '../views/layouts/Layout';

function Router() {
  const router = createBrowserRouter([{ path: '/', element: <Dashboard /> }]);
  return <RouterProvider router={router} />;
}

export default Router;
