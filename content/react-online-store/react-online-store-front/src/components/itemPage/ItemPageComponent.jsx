import styles from './ItemPageComponent.module.scss'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import phone_img from '../../media/img/phone.png'
import { useEffect } from 'react';
import { getDevice } from '../../features/auth/deviceSlice';

const ItemPageComponent = () => {
  const { itemId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDevice({ itemId }))
  }, [])
  const { isAuth } = useSelector(store => store.auth)
  const { deviceData, deviceInfoData } = useSelector(store => store.device)

  return (
    <div className={`${styles.itemPage}`}>
      <img src={phone_img} alt="" />
      <div>
        <h1>{deviceData !== null && deviceData.name}</h1>
        <h2>Specifications: </h2>
        <div className={`${styles.itemSpec}`}>
          {deviceInfoData.length > 0 ?
            deviceInfoData.map(el => <div>{el.title}: {el.description}</div>)
            : <div>Device info is empty</div>
          }
        </div>
        <div className={`${styles.itemPriceBuy}`}>
          <h2>From: {deviceData !== null && deviceData.price}₽</h2>
          {isAuth ?
            <div className='link_item'>
              Add to cart
            </div>
            :
            <div className='text-gray-500 cursor-default'>
              Auth for add cart
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ItemPageComponent;