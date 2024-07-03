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
import SignupPage from './pages/Signup/SignupPage.jsx';
import SignupSuccessPage from './pages/Signup/SignupSuccessPage.jsx';

const rootChildrenWithLayout = [
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
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthProvider />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: rootChildrenWithLayout,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        children: [
          {
            index: true,
            element: <SignupPage />,
          },
          { path: 'success', element: <SignupSuccessPage />, children: [] },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
