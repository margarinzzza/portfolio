import { useState } from 'react';
import styles from './AdminPanelComponent.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { createCategory, filtersActions } from '../../features/auth/filtersSlice';
import { useEffect } from 'react';
import { changeOrderStatus, getAllOrders } from '../../features/auth/cartSlice';
import phone_img from '../../media/img/phone.png'

const GetOrdersComponent = () => {
  const dispatch = useDispatch()
  const { ordersData } = useSelector(store => store.cart)
  useEffect(() => {
    dispatch(getAllOrders())
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

  const changeOrderStatusHandler = (orderId, value) => {
    dispatch(changeOrderStatus({ orderId, value }))
    dispatch(getAllOrders())
  }

  const compareOrderStatus = (orderId, value) => {
    switch (value) {
      case 'created':
        return (
          <>
            <span className='ml-6 link_item' onClick={() => changeOrderStatusHandler(orderId, 'canceled')}>Cancel order</span>
            <span className='ml-6 link_item' onClick={() => changeOrderStatusHandler(orderId, 'accepted')}>Accept the order</span>
            <span className='ml-6 link_item' onClick={() => changeOrderStatusHandler(orderId, 'completed')}>Mark completed</span>
          </>
        )
      case 'accepted':
        return (
          <span className='ml-6 link_item' onClick={() => changeOrderStatusHandler(orderId, 'completed')}>Mark compeleted</span>
        )
    }
  }

  return (
    <div className={`${styles.createForm}`}>
      {ordersData.length > 0 ?
        <>
          {ordersData.map((el, idx) => {
            return (
              <div>
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
                    {compareOrderStatus(el.order.id, el.order.status)}
                  </div>
                </div>

              </div>

            )
          })}
        </>
        : <h2>Orders list empty</h2>
      }

    </div>
  );
}

export default GetOrdersComponent;