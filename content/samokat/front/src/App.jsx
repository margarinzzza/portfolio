import { Route, Routes } from "react-router-dom"
import NotFoundComponent from "./components/notFound/NotFoundComponent";
import LoadingComponent from "./components/loading/LoadingComponent";
import HeaderComponent from "./components/content/HeaderComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshMe } from "./features/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { io } from 'socket.io-client'
import { chatSliceActions } from "./features/chatSlice";
import SidebarComponent from "./components/content/sidebar/SidebarComponent";
import MainComponent from "./components/content/main/MainComponent";
import CartComponent from "./components/content/CartComponent";
import SidePopUp from "./components/popups/sidePopup/SidePopUp";

const socket = io('http://localhost:5000')
export const returnSocket = () => socket

export const App = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { isAuth, authStatus } = useSelector(state => state.authSlice)
  const [blackout, setBlackout] = useState(false)

  // useEffect(() => {
  //   (async () => await dispatch(refreshMe()).unwrap().then(e => {
  //     if (e === null) return navigate('/login')
  //     socket.emit('addUser', {userId: e._id, socketId: socket.id})
  //   }).catch(() => navigate('/login')))()
  // }, [])

  // useEffect(() => {
  //   socket.on('returnOnlineUsers', (data) => {
  //     dispatch(chatSliceActions.setOnlineUsers(data))
  //   })
  //   return () => socket.off('returnOnlineUsers')
  // }, [])

  return (
    <>
      <div className={`app`}>
        <div className={`appWrapper`}>
          {/* <LoadingComponent visible={authStatus === 'loading' ? true : false} /> */}
          <HeaderComponent />
          <div className={`content flex flex-row items-start`}>
            <SidebarComponent />
            <MainComponent />
            <CartComponent />
          </div>
          {/* <div className="content relative">
          <Routes>
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </div> */}
        </div>
        <div className={`blackout ${blackout && ''}`}></div>
      </div>
    </>
  )
}
