import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import Login from './components/Login'
import Signup from './components/Signup'
import {  useSelector } from 'react-redux'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'
import ErrorPage from './components/ErrorPage'
import { SocketProvider } from './context/SocketContext'

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes>
      <MainLayout />
    </ProtectedRoutes>,
    children: [

      {
        path: "/",
        element: <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      },
      {
        path: "/:id/profile",
        element: <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      },
      {
        path: "/account/edit",
        element: <ProtectedRoutes>
          <EditProfile />
        </ProtectedRoutes>
      },
      {
        path: "/chat",
        element: <ProtectedRoutes>
          <ChatPage />
        </ProtectedRoutes>
      },
    ]

  },
  {
    path: "/login",
    element: <Login />
    // element:<LeftSlidebar/>
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />
  },
  {
    path: "reset-password/:id/:token",
    element: <ResetPassword />
  },
  {
    path: "*",
    element: <ErrorPage />
  }
])

function App() {
  const { user } = useSelector(store => store.auth);
  return (
    <>
      <SocketProvider user={user}>
        <RouterProvider router={browserRouter} />
      </SocketProvider>
    </>
  )
}

export default App
