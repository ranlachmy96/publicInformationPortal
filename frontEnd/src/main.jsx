import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'; // Import useNavigate
import SignIn from './LogIn/SignIn.jsx';
import DashBoard from './components/DashBoard';
import './index.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: <DashBoard />,
  },
  {
    path: '/:catchAll',
    element: <h1>404</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
