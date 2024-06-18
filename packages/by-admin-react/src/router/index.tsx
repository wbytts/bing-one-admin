import React from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'
import Login from '@/views/login'
import Error404 from '@/views/404'
import Layout from '@/layout'
import { lazyLoad } from './lazy-load'
import AuthLoader from './auth-loader'

export const routes = [
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    id: 'layout',
    element: <Layout />,
    loader: AuthLoader,
    children: [
      {
        path: '/home',
        element: lazyLoad(React.lazy(() => import("@/views/home")))
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  },
  {
    path: "/404",
    element: <Error404 />
  }
]

export default createHashRouter(routes)
