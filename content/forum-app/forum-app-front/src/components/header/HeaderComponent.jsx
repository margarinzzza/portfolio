import styles from './HeaderComponent.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { authReducerAction } from '../../features/authSlice';

function HeaderComponent() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth, userData } = useSelector((state) => state.auth)
  const [authSettings, setAuthSettings] = useState(false)

  function logoutHandler() {
    dispatch(authReducerAction.logout())
    navigate('/')
  }

  return (
    <div className={`${styles.header}`}>
      <Link to={'/'} className={`${styles.headerName}`}>
        <h1>G</h1><span>chan</span>
      </Link>
      <div className={`${styles.headerNav}`}>
        {isAuth ?
          <div onBlur={() => setAuthSettings(false)} onClick={() => setAuthSettings(!authSettings)} className={`${styles.authSettings} ${authSettings && styles.activeAuthSettings}`}>
            <div className='linkItem'>{userData.nickName}</div>
            <i className={`bi bi-caret-down-fill ${authSettings && 'rotate-180'}`}></i>
            <div className={`${styles.authSettingsList} transition-all ${authSettings && 'opacity-100 pointer-events-auto'}`}>
              <Link to={'/profile'} className='linkItem'>
                Профиль
              </Link>
              {userData.role === 'ADMIN' &&
                <Link to={'/admin'} className='linkItem'>
                  Панель администратора
                </Link>
              }
              <div onClick={() => logoutHandler()} className='linkItem'>
                Выйти
              </div>
            </div>
          </div>
          : <Link to={'/auth'} className='linkItem'>Авторизация</Link>
        }
      </div>
    </div>
  );
}

export default HeaderComponent;
