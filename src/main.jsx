import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import App from './App.jsx';
import ArticleItem from './pages/ArticleItem.jsx';
import Layout from './pages/Layout.jsx';
import './index.css';
import Login from './pages/Login.jsx';
import Protected from './pages/Protected.jsx';
import PrivateRoute from './utilites/authentication/PrivateRoute.jsx';
import AuthProvider from './utilites/authentication/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={'articles'} />,
      },
      {
        path: 'protected',
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <Protected />,
          },
        ],
      },
      {
        path: 'articles',
        element: <App />,
      },
      {
        path: 'articles/:articleName',
        element: <ArticleItem />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
