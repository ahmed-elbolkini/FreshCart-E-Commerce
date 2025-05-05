import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Products from './components/Products/Products'
import NotFound from './components/NotFound/NotFound'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { AuthContextProvider } from './Context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Payment from './components/Payment/Payment'
import Brands from './components/Brands/Brands'
import CategoryProductsPage from './components/CategoryProductsPage/CategoryProductsPage'
import AllOrders from './components/AllOrders/AllOrders'
import Wishlist from './components/Wishlist/Wishlist'

const myRouter = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [

      { index: true, element: <Register /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      {
        path: 'cart', element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      },
      {
        path: 'AllOrders', element: <ProtectedRoute>
          <AllOrders />
        </ProtectedRoute>
      },
      {
        path: 'Wishlist', element: <ProtectedRoute>
          <Wishlist  />
        </ProtectedRoute>
      },
      {
        path: 'payment', element: <ProtectedRoute>
          <Payment />
        </ProtectedRoute>
      },
      {
        path: 'categories', element: <ProtectedRoute>
          <Categories />
        </ProtectedRoute>
      },
      {
        path: "/category/:categoryId", element: <ProtectedRoute>
          <CategoryProductsPage />
        </ProtectedRoute>
      },
      {
        path: 'brands', element: <ProtectedRoute>
          <Brands />
        </ProtectedRoute>
      },
      { path: 'products', element: <Products /> },
      { path: 'productdetails/:id', element: <ProductDetails /> },

      { path: '*', element: <NotFound /> },
    ]
  },
])
export default function App() {

  const myClint = new QueryClient()
  return (
    <>
      <QueryClientProvider client={myClint}>
        <AuthContextProvider>
          <CartContextProvider>
            <RouterProvider router={myRouter} />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  )
}
