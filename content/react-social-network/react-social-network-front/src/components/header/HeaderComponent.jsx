import styles from './HeaderComponent.module.scss'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { navItems } from '../../states/states';
import { useEffect } from 'react';
import { logout, setSelectedNavItem } from '../../features/profile/authSlice';
import { resetSelectDialog } from '../../features/profile/chatSlice';

const HeaderComponent = () => {
  const pathname = window.location.pathname
  const { selectedNavItem } = useSelector(state => state.auth)
  const { isAuth } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetSelectDialog())
  }, [selectedNavItem])

  const logoutHandler = () => {
    window.localStorage.removeItem('token')
    dispatch(logout())
  }

  return (
    <div className={`${styles.header}`}>
      <Link onClick={() => dispatch(setSelectedNavItem('/'))} to={`${isAuth ? '/profile' : '/'}`}>
        <div className={`${styles.headerLogo}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2.5vh" height="2.5vh" fill="#858585" className="bi bi-broadcast-pin" viewBox="0 0 16 16">
            <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM6 8a2 2 0 1 1 2.5 1.937V15.5a.5.5 0 0 1-1 0V9.937A2 2 0 0 1 6 8z" />
          </svg>
        </div>
      </Link>
      {isAuth &&
        <>
          <div className={`${styles.headerNav}`}>
            {navItems.map(item => {
              return (
                <Link onClick={() => dispatch(setSelectedNavItem(item.path))} key={item.id} to={`${item.path}`}>
                  <div className={`${styles.headerNavDesktopItem} ${pathname.includes(item.path) && 'default-underline'} ${styles.headerNavItem}`}>{item.name}</div>
                </Link>
              )
            })}
            <Link onClick={() => logoutHandler()}>
              <div className={`${styles.headerNavDesktopItem} ${styles.headerNavItem}`}>Logout</div>
            </Link>
          </div>
          <div className={`${styles.headerNavMobile}`}>
            <input id="menu__toggle" type="checkbox" />
            <label className={`${styles.headerNavMobileMenuBnt}`} htmlFor="menu__toggle"><span></span></label>

            <div className={`${styles.headerNavMobileMenuBox}`}>
              {navItems.map(item => {
                return (
                  <Link key={item.id} to={`${item.path}`}>
                    <div className={`${styles.headerNavMobileItem} ${styles.headerNavItem}`}>{item.name}</div>
                  </Link>
                )
              })}
              <Link onClick={() => logoutHandler()}>
              <div className={`${styles.headerNavMobileItem} ${styles.headerNavItem}`}>Logout</div>
            </Link>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default HeaderComponent;