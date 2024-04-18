import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { cartSliceActions } from "../../../features/cartSlice";
import { visibleStatesActions } from "../../../features/visibleStates";

const ProductCardComponent = ({ data, isInCart }) => {

  const { productId, name, imgSrc, price, measure } = data
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cartSlice)
  const [isAdded, setIsAdded] = useState(false)
  const [productCount, setProductCount] = useState(null)
  useEffect(() => {
    const productIdx = cart.findIndex(i => i.productId === productId)
    if (productIdx !== -1) {
      setIsAdded(true)
      setProductCount(cart[productIdx].count)
    } else {
      setIsAdded(false)
      setProductCount(null)
    }
  }, [cart])

  const addToCartHandler = (productId) => {
    dispatch(cartSliceActions.addProduct(productId))
  }

  const decrementProductHandler = (productId) => {
    dispatch(cartSliceActions.decrementProduct(productId))
  }

  const deleteProductHandler = (productId) => {
    dispatch(cartSliceActions.deleteProduct(productId))
  }

  return (
    <div className={`product-card ${isInCart && 'productInCart'}`}>
      <Link onClick={()=>dispatch(visibleStatesActions.showSidePopup('product'))} to={`/product/${productId}`} className="relative product-img">
        <img src="https://cm.samokat.ru/processed/m/product_card/58d1c829-7966-48fe-8201-b214dba5caea.jpg" alt="#" />
        <div className={`img-blackout ${(isAdded && !isInCart) && 'img-blackout-true'}`}> <h1 className={`${(isAdded && !isInCart) ? 'text-white' : 'text-transparent'}`}>{isAdded && productCount}</h1> </div>
      </Link>

      <div className={`flex flex-col flex-1 ${isInCart && 'justify-between'}`}>
        <Link onClick={()=>dispatch(visibleStatesActions.showSidePopup('product'))} to={`/product/${productId}`} className="flex flex-col ">
          <div className={`leading-none flex justify-between`}>
            <span className="product-name">{name}</span>
            {isInCart && <svg onClick={() => deleteProductHandler(productId)} xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="grey" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
            }
          </div>
          <span className="product-measure">{measure}</span>
        </Link>
        <div className={`flex items-center mt-4 justify-between`}>
          <div className={`product-price ${isAdded && 'product-price_added'}`}>
            {isAdded && <svg onClick={() => decrementProductHandler(productId)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
            </svg>}
            <div className="flex items-center" onClick={() => addToCartHandler(productId)}>
              <span>{isInCart ? `${productCount}` : `${price} ₽`} </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
              </svg>
            </div>
          </div>
          {isInCart && <h5>{productCount * price} ₽</h5>} 
        </div>
      </div>
    </div>
  )
}

export default ProductCardComponent;
