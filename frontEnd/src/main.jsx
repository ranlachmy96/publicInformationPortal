import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'; // Import useNavigate
import SignIn from './LogIn/SignIn.jsx';
import SignUp from './LogIn/SignUp.jsx';
import DashBoard from './components/DashBoard';
import './index.css';
import './App.css';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: fixed;
  top: 0;
  left: 0;
`;

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: <DashBoard />,
  },
  {
    path: '/:catchAll',
    element: <StyledImage src="./404.jpg" alt="404 error page" />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
