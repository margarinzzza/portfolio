import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../inputs/InputComponent";
import { visibleStatesActions } from "../../features/visibleStates";
import { productArr } from "../../store";
import ProductCardComponent from "./main/ProductCardComponent";

const CartComponent = () => {

  const dispatch = useDispatch()
  const { adress, isAuth } = useSelector(state => state.authSlice)
  const { cart } = useSelector(state => state.cartSlice)
  const [finalCost, setFinalCost] = useState(null)
  const adressDataInitial = { 'city': '', 'street': '', 'building': '' }
  const [adressData, setAdressData] = useState(adressDataInitial)
  const handleSetAdress = ({ name, value }) => setAdressData({ ...adressData, [name]: value })
  const addAdressHandler = (data) => {
    const newData = `${data.city}*${data.street}*${data.building}`
    let currentAdresses = localStorage.adresses
    currentAdresses += `$${newData}`
    localStorage.adresses = currentAdresses
    setAdressData(adressDataInitial)
  }

  useEffect(() => {
    let finalCost = 0
    cart.forEach(el => {
      const product = productArr.find(i => i.productId === el.productId)
      const sum = product.price * el.count
      finalCost += sum
    })
    setFinalCost(finalCost)
  }, [cart])

  return (
    <div className={`cart min-w-[400px] `}>
      <div className={`cart min-w-[400px] max-w-[400px] bg-white rounded padded fixed flex flex-col max-h-[750px]`}>
        {!isAuth && localStorage.adresses === '' ?
          <>
            <h3>Добавить адрес</h3>
            <div className={``}>
              <div className="mb-4">
                <InputComponent classStyles={''} type={'text'} name={'city'} placeholder={'Город'} setValue={handleSetAdress} value={adressData.city} />
                <div className="flex">
                  <InputComponent classStyles={'flex-2'} type={'text'} name={'street'} placeholder={'Улица'} setValue={handleSetAdress} value={adressData.street} />
                  <InputComponent classStyles={'flex-1 ml-3'} type={'text'} name={'building'} placeholder={'Дом'} setValue={handleSetAdress} value={adressData.building} />
                </div>
              </div>
              <div onClick={() => addAdressHandler(adressData)} className={`redBtn ${!adressData.city || !adressData.street || !adressData.building ? 'disabledBtn' : ''} `}>
                Все верно
              </div>
            </div>
          </> :
          <>
            <div onClick={() => dispatch(visibleStatesActions.showSidePopup({ children: 'changeAdress' }))} className="flex items-center cursor-pointer">
              <h3>{adress.adressData.length !== 0 && `${adress.adressData[adress.selectedAdressIdx].street}, ${adress.adressData[adress.selectedAdressIdx].building}`}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0000003d" class="bi bi-caret-down-fill ms-2" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </div>
            <div className={`py-4 flex ${cart.length === 0 && 'items-center'} h-[60vh]`}>
              {cart.length === 0 &&
                <div className="flex items-center flex-col text-center">
                  <svg width="168" height="168" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M99.7267 35.8822C96.7818 35.7808 93.6075 35.7061 90.9187 37.0452C88.7093 38.109 86.2887 38.6614 83.8366 38.6614C81.3844 38.6614 78.9638 38.109 76.7544 37.0452C74.087 35.7061 70.886 35.7808 67.9465 35.8822L67.8984 35.5781C67.8984 26.1833 75.0313 18.5703 83.8339 18.5703C92.6366 18.5703 99.7694 26.1833 99.7694 35.5781" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M73.6938 50.419C72.8172 45.7087 72.2611 40.9443 72.0293 36.1587" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M94.6991 49.3364C94.427 50.7875 94.1069 52.2226 93.7175 53.6417C92.6238 57.6376 88.4946 61.3934 84.0879 61.3934C79.6813 61.3934 75.552 57.6589 74.485 53.6417C74.1934 52.5747 73.9373 51.5077 73.7168 50.4408" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M96.1528 36.1587C95.9266 40.5754 95.4439 44.9753 94.707 49.336" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M81.1798 43.042C81.1323 43.2195 81.0354 43.3799 80.9004 43.5046C80.7653 43.6293 80.5977 43.713 80.4169 43.7462C80.2378 43.7657 80.0568 43.737 79.8926 43.6628C79.7284 43.5887 79.587 43.472 79.4833 43.3247C78.9925 42.6632 79.0298 39.8197 80.3849 40.1237C80.5761 40.1828 80.749 40.2898 80.8872 40.4346C81.0254 40.5793 81.1242 40.757 81.1744 40.9507C81.378 41.6311 81.378 42.3562 81.1744 43.0366" fill="#A6A6A6"></path><path d="M88.6427 43.042C88.5952 43.2195 88.4983 43.3799 88.3632 43.5046C88.2282 43.6293 88.0606 43.713 87.8798 43.7462C87.7007 43.7657 87.5196 43.737 87.3555 43.6628C87.1913 43.5887 87.0499 43.472 86.9462 43.3247C86.4553 42.6632 86.4927 39.8197 87.8478 40.1237C88.0389 40.1828 88.2118 40.2898 88.35 40.4346C88.4882 40.5793 88.5871 40.757 88.6373 40.9507C88.8409 41.6311 88.8409 42.3562 88.6373 43.0366" fill="#A6A6A6"></path><path d="M73.6093 50.4524C69.7575 51.6901 67.5701 46.862 68.7385 43.7571C69.352 42.1299 70.8245 41.6231 72.4036 42.2526" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M94.9004 49.5075C98.7522 50.7452 100.94 45.9117 99.7712 42.8068C99.1577 41.2063 97.6852 40.6728 96.1008 41.3077" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M74.9734 36.3727L72.4019 42.2358L67.9473 35.8818" fill="#A6A6A6"></path><path d="M74.9734 36.3727L72.4019 42.2358L67.9473 35.8818" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M92.9746 36.7728L96.1009 41.3075L99.7287 35.8818" fill="#A6A6A6"></path><path d="M92.9746 36.7728L96.1009 41.3075L99.7287 35.8818" fill="#A6A6A6"></path><path d="M92.9746 36.7728L96.1009 41.3075L99.7287 35.8818" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M76.2321 65.5498C71.6493 66.8409 64.3938 68.2173 60.2272 70.5646C56.4928 72.6986 53.6652 76.3211 51.75 80.1089" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M108.956 95.1316C108.956 97.3063 108.092 99.3919 106.554 100.93C105.017 102.467 102.931 103.331 100.756 103.331C96.9844 103.331 93.7941 100.488 92.7538 96.9294C92.3826 95.566 92.3524 94.1322 92.6659 92.7544C92.9795 91.3765 93.627 90.0969 94.5517 89.0284C96.8457 86.5636 101.194 86.2222 104.24 87.1611C107.548 88.1855 108.956 91.9252 108.956 95.1316Z" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M108.932 93.2964L119.719 118.547" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M60.875 93.2964V150.012" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M107.33 128.251V150.572" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M38.7339 79.8584C37.4843 81.0352 36.6721 82.6021 36.4307 84.3016C36.1893 86.0011 36.533 87.7322 37.4055 89.2105C39.2941 92.6249 43.6047 93.6279 47.1418 92.4648C48.8635 91.9362 50.3467 90.8229 51.335 89.3172C53.3783 86.0042 52.6368 79.4209 48.0007 78.2259C48.1181 75.6491 48.6142 72.7309 48.7316 70.1541C48.7903 68.8684 49.3505 65.534 47.7233 64.9205C43.8501 63.4641 44.0902 70.6609 43.9408 72.7736L43.6047 77.5057C42.8845 74.9609 42.3083 72.3574 41.5721 69.9247C41.2805 68.7007 40.8209 67.523 40.2064 66.425C40.0703 66.176 39.8759 65.9636 39.6399 65.8062C39.4038 65.6487 39.1331 65.5509 38.8509 65.521C38.5687 65.4911 38.2835 65.5301 38.0197 65.6345C37.7559 65.739 37.5213 65.9059 37.3362 66.1209C36.0878 67.5186 37.1761 70.5329 37.5335 72.0907L39.2247 79.4209" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M51.7451 82.9945L44.8683 81.538C44.3359 81.4255 43.783 81.4587 43.2678 81.6341C42.9958 81.7153 42.744 81.8528 42.5286 82.0378C42.3133 82.2228 42.1393 82.451 42.0181 82.7077C41.8968 82.9643 41.8309 83.2437 41.8247 83.5275C41.8185 83.8113 41.8721 84.0932 41.9821 84.3549C42.5583 86.0514 44.5216 86.2435 46.0527 86.6169C47.9999 87.0917 49.9739 87.5025 51.9531 87.7906" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M37.4062 89.21C37.4383 92.6617 37.4649 97.1804 37.4916 100.632C37.5236 104.751 37.3529 108.869 37.4916 112.982C37.6357 116.829 37.7957 121.225 39.6256 124.645C42.0903 129.307 46.2996 131.964 51.7252 131.047C55.9932 130.326 58.8421 126.976 60.8747 122.729" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M51.9531 87.8018V117.624" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M59.875 71.21L60.8086 108.661C63.4745 101.512 64.9907 93.9852 65.3006 86.3613C65.5727 80.4662 66.1329 74.1763 65.9675 68.2651" fill="#A6A6A6"></path><path d="M59.875 71.21L60.8086 108.661C63.4745 101.512 64.9907 93.9852 65.3006 86.3613C65.5727 80.4662 66.1329 74.1763 65.9675 68.2651" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M102.146 68.8735L99.7715 86.6816V86.7296C101.265 86.5894 102.772 86.7361 104.21 87.1617C105.003 87.4054 105.732 87.8227 106.344 88.3834L106.291 87.7966L108.505 71.1996" fill="#A6A6A6"></path><path d="M102.146 68.8735L99.7715 86.6816V86.7296C101.265 86.5894 102.772 86.7361 104.21 87.1617C105.003 87.4054 105.732 87.8227 106.344 88.3834L106.291 87.7966L108.505 71.1996" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M73.0951 24.0595C73.0311 26.1028 73.0151 28.1461 73.0631 30.1894C74.2901 27.778 75.0317 24.2942 75.2931 21.6001" fill="#A6A6A6"></path><path d="M73.0951 24.0595C73.0311 26.1028 73.0151 28.1461 73.0631 30.1894C74.2901 27.778 75.0317 24.2942 75.2931 21.6001" fill="#A6A6A6"></path><path d="M73.0951 24.0595C73.0311 26.1028 73.0151 28.1461 73.0631 30.1894C74.2901 27.778 75.0317 24.2942 75.2931 21.6001" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M85.7069 19.29C85.4193 22.1721 84.7742 25.0072 83.7863 27.7299H83.5729C82.5801 25.0087 81.9348 22.1729 81.6523 19.29" fill="#A6A6A6"></path><path d="M85.7069 19.29C85.4193 22.1721 84.7742 25.0072 83.7863 27.7299H83.5729C82.5801 25.0087 81.9348 22.1729 81.6523 19.29" fill="#A6A6A6"></path><path d="M85.7069 19.29C85.4193 22.1721 84.7742 25.0072 83.7863 27.7299H83.5729C82.5801 25.0087 81.9348 22.1729 81.6523 19.29" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M94.2083 23.5258C94.2759 25.5673 94.2883 27.6106 94.2456 29.6557C93.0186 27.2443 92.277 23.7606 92.0156 21.0664" fill="#A6A6A6"></path><path d="M94.2083 23.5258C94.2759 25.5673 94.2883 27.6106 94.2456 29.6557C93.0186 27.2443 92.277 23.7606 92.0156 21.0664" fill="#A6A6A6"></path><path d="M94.2083 23.5258C94.2759 25.5673 94.2883 27.6106 94.2456 29.6557C93.0186 27.2443 92.277 23.7606 92.0156 21.0664" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M92.1523 65.5498C96.7351 66.8409 103.852 68.2173 108.008 70.5646C113.46 73.6749 116.128 79.3887 118.144 85.065C120.641 92.0912 123.511 99.0266 125.714 106.218C127.71 112.732 131.658 120.841 128.046 127.51C125.859 131.543 121.521 134.568 116.805 134.184C111.518 133.752 108.072 130.209 105.831 125.648C102.886 119.699 97.754 107.883 95.6201 101.587" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M76.2344 57.4141V65.5499C78.7205 70.1113 87.7258 72.1546 92.1538 65.5499L92.1255 57.125" stroke="#A6A6A6" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path><path d="M76.2334 65.5499C71.6507 66.8409 64.3952 68.2173 60.2286 70.5647C58.6219 71.5009 57.1651 72.6735 55.9073 74.0431L53.0371 77.8256V57.4461L76.2228 57.4141" fill="#A6A6A6"></path><path d="M76.2334 65.5499C71.6507 66.8409 64.3952 68.2173 60.2286 70.5647C58.6219 71.5009 57.1651 72.6735 55.9073 74.0431L53.0371 77.8256V57.4461L76.2228 57.4141" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path><path d="M92.1543 65.5499C96.737 66.8409 103.854 68.2173 108.01 70.5647C109.955 71.7035 111.731 73.1097 113.286 74.742L116.391 80.1089L116.348 57.4141H92.0156" fill="#A6A6A6"></path><path d="M92.1543 65.5499C96.737 66.8409 103.854 68.2173 108.01 70.5647C109.955 71.7035 111.731 73.1097 113.286 74.742L116.391 80.1089L116.348 57.4141H92.0156" stroke="#A6A6A6" stroke-width="2.09375" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  <h4 className="opacity-50">Соберите корзину, а мы всё быстро привезём</h4>
                </div>
              }
              {cart.length !== 0 &&
                <div className="cart-list overflow-y-auto w-full">
                  {cart.map((el, idx) => {
                    const data = productArr.find(item => item.productId === el.productId)
                    return <ProductCardComponent isInCart={true} key={idx} data={data} />
                  })}
                </div>
              }
            </div>
            <div>
              <div className={`price-total ${cart.length !== 0 && 'opacity-100'}`}>
                <h5 className="opacity-70">Итого</h5>
                <h2 className="font-bold leading-none">{finalCost} ₽</h2>
              </div>
              <div onClick={() => addAdressHandler(adressData)} className={`redBtn ${cart.length === 0 && 'disabledBtn'} `}>
                Продолжить
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default CartComponent;
