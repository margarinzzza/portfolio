import styles from './HeaderComponent.module.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom'

function HeaderComponent() {

  const { isAuth } = useSelector((state) => state.auth)
  const [authSettings, setAuthSettings] = useState(false)

  function logoutHandler() {
    //функция логаута
  }

  return (
    <div className={`${styles.header}`}>
      <Link to={'/'} className={`${styles.headerName}`}>
        <h1>G</h1><span>chan</span>
      </Link>
      <div className={`${styles.headerNav}`}>
        {isAuth ?
          <div onClick={() => setAuthSettings(!authSettings)} className={`${styles.authSettings} ${authSettings && styles.activeAuthSettings}`}>
            <div className='linkItem'>Margarinzza</div>
            <i className={`bi bi-caret-down-fill ${authSettings && 'rotate-180'}`}></i>
            <div className={`${styles.authSettingsList} transition-all ${authSettings && 'opacity-100'}`}>
              <Link to={'/profile'} className='linkItem'>
                Профиль
              </Link>
              <div onClick={() => logoutHandler()} className='linkItem'>
                Выйти
              </div>
            </div>
          </div>
          :
          <>
            <Link to={'/auth'} className='linkItem'>Войти</Link>
            <Link to={'/auth'} className='linkItem'>Зарегистрироваться</Link>
          </>
        }
      </div>
    </div>
  );
}

export default HeaderComponent;
