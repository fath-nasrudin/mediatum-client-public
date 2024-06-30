import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App.jsx'
import ArticleItem from './pages/ArticleItem.jsx'
import Layout from './pages/Layout.jsx'
import './index.css'
import Login from './pages/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={'articles'} /> ,
      },
      {
        path: 'articles', 
        element: <App />,
      },
      {
        path: 'articles/:articleName',
        element: <ArticleItem />,
      },
    ]
  },
  {
    path: 'login',
    element: <Login />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>,
)
