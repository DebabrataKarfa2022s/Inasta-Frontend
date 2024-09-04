// SocketContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setOnlineUsers } from '@/redux/chatSlice';
import { setLikeNotification } from '@/redux/rtnSlice';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ user, children }) => {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    // http://localhost:6080
    // https://insta-backend-za7q.onrender.com
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

            setSocket(socketio);

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
                socketio.close();
                setSocket(null);
            };
        } else if (socket) {
            // Close socket if user logs out or becomes null
            socket.close();
            setSocket(null);
        }
    }, [user, dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
