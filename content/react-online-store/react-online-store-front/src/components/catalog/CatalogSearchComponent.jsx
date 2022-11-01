import styles from './CatalogComponent.module.scss'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deviceActions } from '../../features/auth/deviceSlice';

const CatalogSearchComponent = () => {
  const dispatch = useDispatch()

  return (
    <>
      <input onChange={(e)=>dispatch(deviceActions.setNameSearchQuery(e.target.value))} className={`${styles.catalogSearch}`} type="text" placeholder='device name' />
    </>
  );
}

export default CatalogSearchComponent;