import styles from './CatalogComponent.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addItemToCart, deleteItemsFromCart } from '../../redux/slices/cartSlice';
import { useEffect } from 'react';

const PizzaComponent = ({ data }) => {
  const dispatch = useDispatch()
  const [selectedDoughtType, setSelectedDoughtType] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [errors, setErrors] = useState('empty')
  const [itemsCount, setItemsCount] = useState(0)
  const { cart } = useSelector(state => state.cart)

  useEffect(() => {

    const filteredArray = cart.filter(el => {
      return el.itemId === data.id
    })
    if (filteredArray.length > 0) {
      let value = filteredArray.reduce((sum, current) => sum + current.count, 0)
      setItemsCount(value)
    } else {
      setItemsCount(0) 
    }

  }, [cart])


  const addItemToCartHandler = () => {
    if (selectedSize === '' || selectedDoughtType === '') {
      setErrors('Укажите все параметры')
    } else {
      setErrors('')
      let item = {
        id: new Date().valueOf(),
        itemId: data.id,
        title: data.title,
        imgSrc: data.imgScr,
        doughtType: selectedDoughtType,
        size: selectedSize,
        price: data.price,
        count: 1
      }
      dispatch(addItemToCart(item))
    }
  }

  const deleteItemsFromCartHandler = () => {
    dispatch(deleteItemsFromCart(data.id))
  }

  const doughtTypeHandler = (el) => {
    if (selectedDoughtType === el) {
      setSelectedDoughtType('')
    } else setSelectedDoughtType(el)
  }
  const sizeHandler = (el) => {
    if (selectedSize === el) {
      setSelectedSize('')
    } else setSelectedSize(el)
  }
  return (
    <div className={`${styles.pizzasItem}`}>
      <img src={data.imgSrc} alt={data.title} />
      <h2>{data.title}</h2>
      <div className={`${styles.doughtTypes}`}>
        {data.doughtType.map((el, idx) =>
          <span onClick={() => doughtTypeHandler(el)} key={idx} className={`mx-2 ${selectedDoughtType === el && 'underline underline-offset-2'}`}>{el}</span>
        )}
      </div>
      <div className={`${styles.sizes}`}>
        {data.sizes.map((el, idx) =>
          <span onClick={() => sizeHandler(el)} key={idx} className={`mx-2 ${selectedSize === el && 'underline underline-offset-2'}`}>{el} см.</span>
        )}
      </div>
      <div className={`${styles.priceAndAdd}`}>
        <h3>от {data.price} ₽</h3>
        <div className={`${styles.addButton}`}>
          <svg onClick={() => addItemToCartHandler()} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E" />
          </svg>
          <h4 onClick={() => addItemToCartHandler()}>Добавить</h4>
          <div onClick={() => deleteItemsFromCartHandler()} className={`${itemsCount > 0 && styles.notEmptyItemsCounter}`}>
            <span className={`${styles.deleteItem}`}>-</span>
            <span className={`${styles.itemConter}`}>{itemsCount}</span>
          </div>
        </div>
      </div>
      <span className={`text-gray-400 opacity-0 transition-all mt-2 ${errors !== 'empty' && 'opacity-100'}`}>{errors}</span>
    </div>
  );
}

export default PizzaComponent;
