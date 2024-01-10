import styles from './CartComponent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, decrementOneItemFromCart, deleteOneItemFromCart } from '../../redux/slices/cartSlice';
import { useState } from 'react';
import { useEffect } from 'react';

const CartItemComponent = ({ data }) => {
  const dispatch = useDispatch()
  const [itemsCount, setItemsCount] = useState(0)
  const { cart } = useSelector(state => state.cart)

  useEffect(() => {
    const filteredArray = cart.filter(el => {
      return el.itemId === data.itemId
    })
    if (filteredArray.length > 0) {
      let value = filteredArray.reduce((sum, current) => sum + current.count, 0)
      setItemsCount(value)
    } else {
      setItemsCount(0)
    }
  }, [cart])

  const addItemToCartHandler = () => {
    let itemPrice = data.price
    console.log(itemsCount, itemPrice)
    if(data.count>1){
      itemPrice = itemPrice/data.count
    }
    let item = {
      id: new Date().valueOf(),
      itemId: data.itemId,
      title: data.title,
      imgSrc: data.imgScr,
      doughtType: data.doughtType,
      size: data.size,
      price: itemPrice,
      count: 1
    }
    dispatch(addItemToCart(item))
  }

  return (
    <div key={data.id} className={`${styles.cartItem}`}>
      <div className={`${styles.cartItemData}`}>
        <img src="https://static.tildacdn.com/tild3635-3633-4162-b035-633639383734/pizza-1.png" alt="" />
        <div className='flex flex-col'>
          <h3>{data.title}</h3>
          <span>{data.doughtType}, {data.size} см.</span>
        </div>
      </div>
      <div className={`${styles.cartItemCount}`}>
        <div onClick={()=>dispatch(decrementOneItemFromCart(data.id))}>-</div>
        <span>{data.count}</span>
        <div onClick={() => addItemToCartHandler()}>+</div>
      </div>
      <h2>{data.price} ₽</h2>
      <div onClick={()=> dispatch(deleteOneItemFromCart(data.id))} className={`${styles.deleteCartItem}`}>
        <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.74791 6.95572L6.49931 4.70712L8.74791 2.45852C9.16184 2.04459 9.16184 1.37338 8.74791 0.959454C8.33398 0.545525 7.66277 0.545525 7.24884 0.959454L5.00024 3.20805L2.75164 0.959454C2.33771 0.545525 1.66651 0.545525 1.25258 0.959454C0.838648 1.37338 0.838648 2.04459 1.25258 2.45852L3.50118 4.70712L1.25258 6.95572C0.838649 7.36965 0.838649 8.04086 1.25258 8.45479C1.66651 8.86872 2.33772 8.86872 2.75164 8.45479L5.00024 6.20619L7.24884 8.45479C7.66277 8.86872 8.33398 8.86872 8.74791 8.45479C9.16184 8.04086 9.16184 7.36965 8.74791 6.95572Z" fill="#D0D0D0" />
        </svg>
      </div>
    </div>
  );
}

export default CartItemComponent;
