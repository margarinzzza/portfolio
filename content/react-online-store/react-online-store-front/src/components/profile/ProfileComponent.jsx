import styles from './ProfileComponent.module.scss'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { changeOrderStatus, getOrders } from '../../features/auth/cartSlice';
import phone_img from '../../media/img/phone.png'

const ProfileComponent = () => {
  const { userData } = useSelector(store => store.auth)
  const { ordersData } = useSelector(store => store.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders({ userId: userData.id }))
  }, [])

  const mathOrderCount = (idx) => {
    let count = 0
    for (let i = 0; i < ordersData[idx].items.length; i++) {
      count += ordersData[idx].items[i].count
    }
    return count
  }

  const mathOrderPrice = (idx) => {
    let price = 0
    for (let i = 0; i < ordersData[idx].items.length; i++) {
      price += ordersData[idx].items[i].item.price * ordersData[idx].items[i].count
    }
    return price
  }

  const changeOrderStatusHandler = async (orderId, value) => {
    dispatch(changeOrderStatus({ orderId, value }))
  }

  return (
    <div className={`${styles.profile}`}>
      <h1>Hello, {userData.email}</h1>
      {ordersData.length > 0 ?
        <div>
          <h1>Your orders</h1>
          <div className={`${styles.orders}`}>
            {ordersData.map((el, idx) => {
              return (
                <div key={idx} className={`${el.order.status === 'canceled' && 'text-gray-400'} ${styles.order}`}>
                  <h2 className={`${el.order.status === 'canceled' && 'line-through'}`}>Order id: {el.order.id}</h2>
                  <h4>Order from: {el.order.createdAt.slice(0, 10)} {el.order.createdAt.slice(11, 19)}</h4>
                  {el.items.map((el, idx) => {
                    return (
                      <div className={`${styles.orderDevice}`} key={idx}>
                        <div className={`${styles.orderDeviceDesc}`}>
                          <img src={phone_img} />
                          <h3>{el.item.name}</h3>
                        </div>
                        <div className={`${styles.orderDeviceCount}`}>Count: {el.count}</div>
                        <div className={`${styles.orderDevicePrice}`}>Price: {el.item.price}</div>
                        <div className={`${styles.orderDeviceTotalPrice}`}>Total price: {el.item.price * el.count}</div>
                      </div>
                    )
                  })}
                  <div>
                    <span>Status: {el.order.status}</span>
                    <span className='mx-2'>Items number: {mathOrderCount(idx)}</span>
                    <span>Order price: {mathOrderPrice(idx)}</span>
                    {el.order.status === 'created' &&
                      <span className='ml-6 link_item' onClick={() => changeOrderStatusHandler(el.order.id, 'canceled')}>Cancel order</span>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        :
        <div className='text-center'>
          <h1>You don't have any orders</h1>
          <Link className='link_item' to={'/catalog'}>In catalog</Link>
        </div>
      }


    </div>
  );
}

export default ProfileComponent;