import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from '../views/pages/dashboard/Dashboard';
import Layout from '../views/layouts/Layout';
import Teammate from '../views/pages/teammate/Teammate';

function Router() {
  const router = createBrowserRouter([
    { path: '/', element: <Dashboard /> },
    { path: '/teammates/:email', element: <Teammate /> },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
