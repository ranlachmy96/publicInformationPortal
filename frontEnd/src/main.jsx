/***************************************************************
 * Import Dependencies
 * - Importing React for creating components
 * - Importing styled-components for styling
 * - Importing ReactDOM from react-dom/client
 * - Importing createBrowserRouter, RouterProvider, and useNavigate from react-router-dom for routing
 * - Importing SignIn, SignUp, and DashBoard components
 * - Importing CSS files for styling
 ***************************************************************/
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
/***************************************************************
 * Define Routes
 * - Define routes for different paths in the application
 * - Route '/' renders the SignIn component
 * - Route '/signUp' renders the SignUp component
 * - Route '/dashboard' renders the DashBoard component
 * - Route '/:catchAll' serves as a catch-all route for 404 errors, rendering a custom image
 ***************************************************************/
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

/***************************************************************
 * Render Application
 * - Use ReactDOM.createRoot to render the application
 * - Wrap the root component in a React.StrictMode for additional checks and warnings
 * - Provide the router to the application using RouterProvider
 ***************************************************************/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
