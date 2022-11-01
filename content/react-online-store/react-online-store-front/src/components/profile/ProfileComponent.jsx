import styles from './ProfileComponent.module.scss'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

const ProfileComponent = () => {
  const { isAuth, userData } = useSelector(store => store.auth)

  return (
    <div className={`${styles.profile}`}>
      <h1>Hello, {userData.email}</h1>
      <div className='text-center'>
        <h1>You don't have any orders</h1>
        <Link className='link_item' to={'/catalog'}>In catalog</Link>
      </div>
      
    </div>
  );
}

export default ProfileComponent;