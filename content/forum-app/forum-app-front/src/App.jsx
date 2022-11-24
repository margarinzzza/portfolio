import HeaderComponent from "./components/header/HeaderComponent";
import "bootstrap-icons/font/bootstrap-icons.css"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import NotFoundComponent from "./components/NotFoundComponent";
import IndexComponent from "./components/index/IndexComponent";
import BoardComponent from "./components/board/BoardComponent";
import { useSelector } from 'react-redux'
import ProfileComponent from "./components/profile/ProfileComponent";
import AuthComponent from "./components/auth/AuthComponent";
import ThreadComponent from "./components/thread/ThreadComponent";
import { useEffect } from "react";
import AdminPanelComponent from "./components/profile/AdminPanelComponent";
import { useDispatch } from 'react-redux'
import { checkAuth } from "./features/authSlice";

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    dispatch(checkAuth({ token }))
  }, [])
  const { isAuth, userData } = useSelector((state) => state.auth)
  useEffect(() => {
    if (isAuth) navigate('/')
  }, [isAuth])

  return (
    <div className="app">
      <HeaderComponent />
      {userData.isBanned === true ?
        <div className="text-center text-gray-500">Ваш аккаунт заблокирован</div>
        :
        <Routes>
          <Route path="/" element={<IndexComponent />} />
          <Route path="/boards/:boardHref" element={<BoardComponent />} />
          <Route path="/boards/:boardHref/:threadId" element={<ThreadComponent />} />
          <Route path="/boards" element={<Navigate to="/" />} />
          {isAuth ?
            <>
              <Route path="/profile" element={<ProfileComponent />} />
              {userData.role === 'ADMIN' &&
                <Route path="/admin" element={<AdminPanelComponent />} />}
            </>
            :
            <Route path="/auth" element={<AuthComponent />} />
          }
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      }



    </div>
  );
}

export default App;
