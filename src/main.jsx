import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Layout from './layouts/Layout.jsx';
import Home from './pages/Home.jsx';
import UserDashboard from './pages/dashboard/UserDashboard.jsx';
import AdminDashboard from './pages/dashboard/AdminDashboard.jsx';
import Destinations from './pages/Destinations.jsx';
import './index.css';

const queryClient = new QueryClient();

document.body.setAttribute('dir', 'rtl');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'user', element: <UserDashboard /> },
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'destinations', element: <Destinations /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
