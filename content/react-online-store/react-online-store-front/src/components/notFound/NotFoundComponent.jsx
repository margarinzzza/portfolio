import styles from './NotFoundComponent.module.scss'
import { Link } from 'react-router-dom';

const NotFoundComponent = () => {

  return (
    <div className={`${styles.notFound}`}>
      <h1>404. Not Found</h1> 
      <Link to={'/catalog'} className='link_item'>Go back</Link>
    </div>
  );
}

export default NotFoundComponent;