import { Route, Routes } from "react-router-dom"
import NotFoundComponent from "./components/notFound/NotFoundComponent";
import LoadingComponent from "./components/loading/LoadingComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshMe } from "./features/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import AuthComponent from "./components/auth/AuthComponent";
import SidebarComponent from "./components/content/SidebarComponent";
import ChatsComponent from "./components/content/ChatsComponent";
import ProfileComponent from "./components/content/ProfileComponent";
import FriendsComponent from "./components/content/friends/FriendsComponent";
import {io} from 'socket.io-client'
import { chatSliceActions } from "./features/chatSlice";

const socket = io('http://localhost:5000')
export const returnSocket = () => socket

export const App = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { isAuth, authStatus } = useSelector(state => state.authSlice)
  useEffect(() => {
    (async () => await dispatch(refreshMe()).unwrap().then(e => {
      if (e === null) return navigate('/login')
      socket.emit('addUser', {userId: e._id, socketId: socket.id})
    }).catch(() => navigate('/login')))()
  }, [])

  useEffect(() => {
    socket.on('returnOnlineUsers', (data) => {
      dispatch(chatSliceActions.setOnlineUsers(data))
    })
    return () => socket.off('returnOnlineUsers')
  }, [])

  return (
    <>
      <div className={`app relative`}>
        {isAuth && <SidebarComponent />}
        <LoadingComponent visible={authStatus === 'loading' ? true : false} />
        <div className="content relative">
          <Routes>
            {isAuth &&
              <>
                <Route path="/" element={<ChatsComponent />} />
                <Route path="/chats/:chatId" element={<ChatsComponent  />} />
                <Route path="/chats" element={<Navigate to={'/'} />} />
                <Route path="/profile" element={<ProfileComponent />} />
                <Route path="/friends" element={<FriendsComponent />} />
              </>
            }
            {!isAuth &&
              <>
                <Route path="/login" element={<AuthComponent authType={'log'} />} />
                <Route path="/register" element={<AuthComponent authType={'reg'} />} />
              </>
            }
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </div>
      </div>
    </>
  )
}
