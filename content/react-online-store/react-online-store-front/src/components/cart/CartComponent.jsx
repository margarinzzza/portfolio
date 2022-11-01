import styles from './CartComponent.module.scss'
import { Link } from 'react-router-dom';

const CartComponent = () => {
  
  return (
    <>
      <div className='text-center'>
        <h1>Cart is empty</h1>
        <Link className='link_item' to={'/catalog'}>In catalog</Link>
      </div>

      <div className={`${styles.cart}`}>
        
      </div>
    </>

  );
}

export default CartComponent;