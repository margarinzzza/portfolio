import styles from './CartComponent.module.scss'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { addToCart, deleteFromCart, getCart, makeOrder } from '../../features/auth/cartSlice';
import phone_img from '../../media/img/phone.png'
import { useState } from 'react';

const CartComponent = () => {
  const dispatch = useDispatch()
  const [makeOrderPopup, setMakeOrderPopup] = useState(false)
  const { userData } = useSelector(store => store.auth)
  const { cartData, cartLoading } = useSelector(store => store.cart)

  useEffect(() => {
    dispatch(getCart({ userId: userData.id }))
  }, [])

  const addToCartHandler = (deviceId) => {
    const userId = userData.id
    dispatch(addToCart({ userId, deviceId }))
  }

  const deleteFromCartHandler = (deviceId) => {
    const userId = userData.id
    dispatch(deleteFromCart({ userId, deviceId }))
  }

  const mathCartCount = () => {
    let count = 0
    for (let i = 0; i < cartData.length; i++) {
      count += cartData[i].count
    }
    return count
  }

  const mathCartPrice = () => {
    let price = 0
    for (let i = 0; i < cartData.length; i++) {
      price += cartData[i].item.price * cartData[i].count
    }
    return price
  }

  const makeOrderHandler = () => {
    setMakeOrderPopup(true)
    const userId = userData.id
    const deviceData = cartData
    dispatch(makeOrder({ userId, deviceData }))
    setTimeout(()=>{
      setMakeOrderPopup(false)
    }, 5000)
  }

  return (
    <>
      {cartData?.length > 0 ?
        <div className={`${styles.cart}`}>
          <div className={`${styles.cartItems}`}>
            <h1>Cart</h1>
            {cartData.map((el, idx) => {
              return (
                <div key={idx} className={`${styles.cartItem}`}>
                  <div className={`${styles.cartItemDesc}`}>
                    <img src={phone_img} />
                    <span>{el.item.name}</span>
                  </div>
                  <div className={`${styles.cartItemCount}`}>
                    {cartLoading === 'loading' ?
                      <div className='loading'></div>
                      :
                      <>
                        <i onClick={() => deleteFromCartHandler(el.item.id)} className="bi bi-dash"></i>
                        <span>{el.count}</span>
                        <i onClick={() => addToCartHandler(el.item.id)} className="bi bi-plus"></i>
                      </>
                    }
                  </div>
                  <div className={`${styles.cartItemPrice}`}>
                    <span>
                      {el.item.price * el.count} ₽
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={`${styles.cartTotal}`}>
            <span className='text-gray-500'>Total: </span>
            {cartLoading === 'loading' ?
              <div className='loading'></div>
              :
              <div className='flex justify-between my-2'>
                <b>{mathCartCount()} items</b>
                <b>{mathCartPrice()} ₽</b>
              </div>
            }
            <div className='text-right'>
              <span
                onClick={() => makeOrderHandler()}
                className='link_item'>Buy</span>
            </div>
          </div>


        </div>
        :
        <div className='text-center'>
          <h1>Cart is empty</h1>
          <Link className='link_item' to={'/catalog'}>In catalog</Link>
        </div>
      }

      {makeOrderPopup &&
        <div className='text-gray-500 absolute left-0 right-0 bottom-10 text-center'>
          The order has been placed
        </div>
      }

    </>

  );
}

export default CartComponent;