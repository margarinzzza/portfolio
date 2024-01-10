import styles from './EmptyCartComponent.module.css';
import { useDispatch } from 'react-redux';
import emptyCartImg from '../../media/img/emptyCart.png'
import { Link } from 'react-router-dom';

const EmptyCartComponent = () => {
  const dispatch = useDispatch()

  return (
    <div className={`${styles.emptyCart}`}>
      <div className='flex items-center'>
        <h1>Корзина пустая</h1>
        <span>😕</span>
      </div>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={emptyCartImg} alt="empty cart" />
      <Link className={`${styles.goBackButton}`} to={'../'}>Вернуться назад</Link>
    </div>
  );
}

export default EmptyCartComponent;
