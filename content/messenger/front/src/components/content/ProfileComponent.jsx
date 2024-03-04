import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom"
import ava from '../../media/img/ava.png'
import { declOfNum } from "../../funcs";
import FullWPopUpComponent from "../popups/fullwpopup/FullWPopUpComponent";
import { authSliceActions, deleteUser } from "../../features/authSlice";
import { returnSocket } from "../../App";

const ProfileComponent = () => {

  const socket = returnSocket()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.authSlice)
  const [isRedactAvaShown, setIsRedactAvaShown] = useState(false)
  const [popUpVisible, setPopUpVisible] = useState(false)
  const [popUpData, setPopUpData] = useState({ title: '', text: '', confirmFn: null, checkBox: { text: '' }  })
  const logout = () => {
    dispatch(authSliceActions.logout())
    navigate('/login')
    socket.emit('logout', { socketId: socket.id })
  }
  const deleteProfile = () => {
    dispatch(deleteUser({ userId: userData._id }))
    navigate('/login')
    socket.emit('logout', { socketId: socket.id })
  }

  return (
    <div className={`profile`}>
      <h1>Профиль</h1>
      <div className={`profile-header flex mt-4`}>
        <div onMouseEnter={() => setIsRedactAvaShown(true)} onMouseLeave={() => setIsRedactAvaShown(false)} className={`relative`}>
          <img className="max-w-[150px] border-2 border-white rounded-[50%] mr-3" src={ava} alt="ava" />
          <div className={`${isRedactAvaShown ? 'opacity-100' : 'opacity-0'} cursor-pointer transition-all absolute top-[0px] right-[10px] w-[40px] h-[40px] bg-[#8e38ab] flex items-center justify-center rounded-[50%] text-[#ffffff] border-2 border-white`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-pencil-square`} viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>
          </div>
        </div>
        <div>
          <h4 className="text-slate-500">@{userData.link}</h4>
          <h3>{userData.name} {userData.surname}</h3>
          <span className="text-slate-500">{userData.friends.length > 0 ? `${userData.friends.length} ${declOfNum(userData.friends.length, ['друг', 'друга', 'друзей'])}` : 'Друзей нет'}</span>
        </div>
      </div>
      <div className={`profile-info mt-5 flex flex-wrap`}>
        <div onClick={() => {
          setPopUpVisible(true)
          setPopUpData({ title: 'Выход', text: 'Подтвердите выход', confirmFn: logout, checkBox: { text: '' } })
        }} className={`flex items-center text-slate-500 cursor-pointer w-fit my-2 mx-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-door-open mr-2" viewBox="0 0 16 16">
            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
          </svg>
          <span>Выйти</span>
        </div>
        <div onClick={() => {
          setPopUpVisible(true)
          setPopUpData({ title: 'Удаление', text: 'Действительно удалить профиль?', confirmFn: deleteProfile, checkBox: { text: '' } })
        }} className={`flex items-center text-red-800 cursor-pointer w-fit my-2 mx-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash3 mr-2" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
          <span>Удалить профиль</span>
        </div>
      </div>
      <FullWPopUpComponent checkBox={popUpData.checkBox} confirmFn={popUpData.confirmFn} popUpVisible={popUpVisible} setPopUpVisible={setPopUpVisible} title={popUpData.title}>{popUpData.text}</FullWPopUpComponent>
    </div>
  )
}

export default ProfileComponent;
