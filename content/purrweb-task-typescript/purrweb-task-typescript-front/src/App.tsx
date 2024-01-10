import '../src/media/css/Fonts.css';
import '../src/media/css/App.css';
import '../src/media/css/Solutions.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import RedactProfilePage from './pages/RedactProfilePage';
import HeaderComponent from './components/HeaderComponent';
import { ButtonComponent } from './components/ButtonsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, logout, selectIsAuth } from './Auth';

function App() {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  const onClickLogout = () => {
    setPopup(!popup)
    dispatch(logout())
    window.localStorage.clear()
  }
  const [popup, setPopup] = useState(false)
  const changePopup = () => {
    setPopup(!popup)
  }

  return (
    <>
      <div className='popup-box'>
        <div className={popup === true ? 'popup-blackout' : ''}>
          <div className={popup === true ? 'show exit-popup z-4' : 'hide exit-popup'}>
            <svg className='c-pointer close-popup' onClick={changePopup} width="1.7vh" height="1.7vh" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9998 0.999848C10.8436 0.843622 10.6317 0.755859 10.4107 0.755859C10.1897 0.755859 9.97779 0.843622 9.82152 0.999848L5.99985 4.82152L2.17818 0.999848C2.02191 0.843622 1.80998 0.755859 1.58901 0.755859C1.36804 0.755859 1.15612 0.843622 0.999848 0.999848C0.843622 1.15612 0.755859 1.36804 0.755859 1.58901C0.755859 1.80998 0.843622 2.02191 0.999848 2.17818L4.82152 5.99985L0.999848 9.82152C0.843622 9.97779 0.755859 10.1897 0.755859 10.4107C0.755859 10.6317 0.843622 10.8436 0.999848 10.9998C1.15612 11.1561 1.36804 11.2438 1.58901 11.2438C1.80998 11.2438 2.02191 11.1561 2.17818 10.9998L5.99985 7.17818L9.82152 10.9998C9.97779 11.1561 10.1897 11.2438 10.4107 11.2438C10.6317 11.2438 10.8436 11.1561 10.9998 10.9998C11.1561 10.8436 11.2438 10.6317 11.2438 10.4107C11.2438 10.1897 11.1561 9.97779 10.9998 9.82152L7.17818 5.99985L10.9998 2.17818C11.1561 2.02191 11.2438 1.80998 11.2438 1.58901C11.2438 1.36804 11.1561 1.15612 10.9998 0.999848Z" fill="#CACDD7" />
            </svg>
            <h3 className='w-95'>Вы уверены что хотите выйти из аккаунта?</h3>
            <div className='exit-buttons d-flex justify-content-evenly mt-3'>
              <div onClick={changePopup} className='button paleblue_button w-40'>
                <span>Отмена</span>
              </div>
              <div onClick={onClickLogout} className='button blue_button w-40'>
                <span>Выйти</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="app main-content m-auto d-flex flex-column">
        <div className='wrapper header_wrapper'>
          <HeaderComponent isAuth={isAuth} showPopup={changePopup} />
        </div>
        <div className='wrapper content_wrapper'>
          <Routes>
            <Route path='/profile' element={<ProfilePage isAuth={isAuth} />} />
            <Route path='/redact_profile' element={<RedactProfilePage isAuth={isAuth} />} />
            <Route path='/' element={<AuthPage isAuth={isAuth} />} />
          </Routes>
        </div>

      </div>
    </>

  );
}

export default App;
