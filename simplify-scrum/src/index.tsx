import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import './index.css';
import LoginScreen from './components/Login/LoginScreen';
import App from './App';
import SignInScreen from './components/Login/SignInScreen';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserProvider } from './Context/UserContext';
import MainDashboard from './components/Dashboard/MainDashboard';

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorBoundary/>,
    children: [
      {
        path: "",
        element: <LoginScreen/>
      },
      {
        path: "signin/",
        element: <SignInScreen/>
      },
      {
        path: "main/",
        element: <MainDashboard/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
      <UserProvider>
        <RouterProvider router={router}/>
      </UserProvider>
  </React.StrictMode>
);

