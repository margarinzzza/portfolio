import { useDispatch, useSelector } from 'react-redux';
import CartComponent from '../components/cart/CartComponent';
import EmptyCartComponent from '../components/emptyCart/EmptyCartComponent';


const CartPage = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)

  return (
    <>
      {cart.length > 0 ? <CartComponent /> : <EmptyCartComponent />}
    </>
  );
}

export default CartPage;
