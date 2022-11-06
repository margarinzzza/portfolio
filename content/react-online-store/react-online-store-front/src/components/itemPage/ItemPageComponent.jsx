import styles from './ItemPageComponent.module.scss'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import phone_img from '../../media/img/phone.png'
import { useEffect } from 'react';
import { getDevice } from '../../features/auth/deviceSlice';
import { addToCart } from '../../features/auth/cartSlice';
import { useState } from 'react';

const ItemPageComponent = () => {
  const { itemId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDevice({ itemId }))
  }, [])
  const [addPopUp, setAddPopUp] = useState([0])
  const { isAuth, userData } = useSelector(store => store.auth)
  const { deviceData, deviceInfoData } = useSelector(store => store.device)

  const addToCartHandler = () => {
    const userId = userData.id
    const deviceId = deviceData.id
    dispatch(addToCart({ userId, deviceId }))
    setAddPopUp([...addPopUp, 'new'])
    setTimeout(() => {
      setAddPopUp([addPopUp.shift()])

    }, 3000)
  }

  return (
    <>
      <div className={`${styles.itemPage}`}>
        <img src={phone_img} alt="" />
        <div>
          <h1>{deviceData !== null && deviceData.name}</h1>
          <h2>Specifications: </h2>
          <div className={`${styles.itemSpec}`}>
            {deviceInfoData.length > 0 ?
              deviceInfoData.map(el => <div key={el.id}>{el.title}: {el.description}</div>)
              : <div>Device info is empty</div>
            }
          </div>
          <div className={`${styles.itemPriceBuy}`}>
            <h2>From: {deviceData !== null && deviceData.price}₽</h2>
            {isAuth ?
              <div onClick={() => addToCartHandler()} className='link_item'>
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
      <div className={`${styles.addPopUp}`}>
        {addPopUp.length > 1 &&
          addPopUp.map((el, idx) => {
            if (el !== 0) {
              return <div key={idx}>Item added</div>
            }
          })
        }
      </div>
    </>

  );
}

export default ItemPageComponent;