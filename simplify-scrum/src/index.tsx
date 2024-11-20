import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/styles/StyleIndex.scss'
import { UserProvider } from './context/UserContext';
import { Login, InfoCenter, Settings, Meetings, Backlog, Refinement, Planning, Retrospective, Start } from "./pages/PagesIndex"
import { LoadingProvider } from './context/LoadingContext';
import { AlertProvider } from './context/AlertContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Administration } from './pages/Administration';
import { ModalProvider } from './context/ModalContext';


function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  // Uncaught ReferenceError: path is not defined
  return <div>Path not defined</div>;
}

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; 
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
    errorElement: <ErrorBoundary/>,
  }, 
  {
    path: "/main",
    element: <App />,
    errorElement: <ErrorBoundary/>,
    children: [
          {
            path: "",
            element: <InfoCenter/>
          },
          {
            path: "settings/",
            element: <Settings/>
          },
          {
            path: "meetings/",
            element: <Meetings />
          },
          {
            path: "backlog/",
            element: <Backlog />
          },
          {
            path: "refinement/",
            element: <Refinement />
          },
          {
            path: "planning/",
            element: <Planning />
          }, 
          {
            path: "retrospective/",
            element: <Retrospective />
          }, 
          {
            path: "admin/",
            element: <Administration />
          },
          {
            path: "start/",
            element: <Start />
          }
        ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <AlertProvider>
        <ModalProvider>
          <LoadingProvider>
            <UserProvider>
              <RouterProvider router={router}/>
            </UserProvider>
          </LoadingProvider>
        </ModalProvider>
      </AlertProvider>
    </DndProvider>
  </React.StrictMode>
);

