import styles from './HeaderComponent.module.scss'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../../features/auth/authSlice';

const HeaderComponent = () => {
  const dispatch = useDispatch()
  const { isAuth, userData } = useSelector(store => store.auth)
  const exitHandler = () => {
    dispatch(authActions.logout())
  }


  return (
    <div className={`red_bg ${styles.header}`}>
      <div className={`${styles.headerTitle}`}>
        <Link to={'/catalog'}>
          <i className="mr-4 bi bi-boxes" style={{ "fontSize": "40px", "color": "white" }}></i>
        </Link>
        <Link to={'/catalog'}>
          <h1>Logistick</h1>
        </Link>
      </div>

      <div className={`${styles.headerNav}`}>
        {isAuth ?
          <>
            {userData.role === 'ADMIN' &&
              <Link to={'/admin_panel'}>
                Admin Panel
              </Link>
            }
            <Link to={'/profile'}>
              Profile
            </Link>
            <Link to={'/cart'}>
              <i className="bi bi-cart2" style={{ "fontSize": "25px", "color": "white" }}></i>
            </Link>
            <div onClick={()=>exitHandler()}>
              Exit
            </div>
          </>
          :
          <Link to={'/'}>
            Auth
          </Link>
        }
      </div>
    </div>
  );
}

export default HeaderComponent;