import { useEffect, useState } from 'react'

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
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'
import ErrorPage from './components/ErrorPage'

const browserRouter= createBrowserRouter([
  {
    path: "/",
    element:<ProtectedRoutes>
      <MainLayout/>
    </ProtectedRoutes>,
    children: [

      {
        path: "/",
        element:<ProtectedRoutes>
          <Home/>
        </ProtectedRoutes>
      },
      {
        path: "/:id/profile",
        element:<ProtectedRoutes>
          <Profile/>
        </ProtectedRoutes>
      },
      {
        path: "/account/edit",
        element:<ProtectedRoutes>
          <EditProfile/>
        </ProtectedRoutes>
      },
      {
        path: "/chat",
        element:<ProtectedRoutes>
          <ChatPage/>
        </ProtectedRoutes>
      },
    ]

  },
  {
    path: "/login",
    element:<Login/>
    // element:<LeftSlidebar/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/forgot-password",
    element:<ForgetPassword/>
  },
  {
    path: "reset-password/:id/:token",
    element: <ResetPassword />
  },
  {
    path:"*",
    element:<ErrorPage/>
  }
])

function App() {
  const {user} = useSelector(store=>store.auth);
  const {socket} = useSelector(store=>store.socketio);
  const dispatch= useDispatch();

  // useEffect(()=>{
  //   if(user){
  //     const socketio = io('http://localhost:6080',{
  //       query:{
  //         userId:user._id
  //       },
  //       transports:['websocket']
  //     });

  //     dispatch(setSocket(socketio));

  //     // listen all the events 
  //     socketio.on('getOnlineUsers',(onlineUsers)=>{
  //       dispatch(setOnlineUsers(onlineUsers));
  //     });

  //     socketio.on('notification',(notification)=>{
  //       dispatch(setLikeNotification(notification));
  //     });

  //     return ()=>{
  //       socketio.close();
  //       dispatch(setSocket(null));
  //     }
  //   }else if(socket){
  //     socket.close();
  //     dispatch(setSocket(null));
  //   }
  // },[user,dispatch]);

  useEffect(() => {
    if (user) {
      // Initialize socket connection
      const socketio = io('https://insta-backend-za7q.onrender.com', {
        query: { userId: user._id },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Dispatch action to set socket in Redux state
      dispatch(setSocket(socketio));

      // Event listener for online users
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Event listener for notifications
      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      // Error and disconnect listeners for socket
      socketio.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      socketio.on('disconnect', (reason) => {
        console.warn('Socket disconnected:', reason);
        if (reason === 'io server disconnect') {
          // Reconnect if the server forcibly disconnected the client
          socketio.connect();
        }
      });

      // Clean up on component unmount or when the user changes
      return () => {
        if (socketio) {
          socketio.close();
          dispatch(setSocket(null));
        }
      };
    } else if (socket) {
      // Close socket if user logs out or becomes null
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  
  return (
   <>
  <RouterProvider router={browserRouter}/>
   </>
  )
}

export default App
