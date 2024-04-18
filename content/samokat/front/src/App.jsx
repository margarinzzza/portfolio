import { Route, Routes, useLocation, useParams, Link } from "react-router-dom"
import NotFoundComponent from "./components/notFound/NotFoundComponent";
import LoadingComponent from "./components/loading/LoadingComponent";
import HeaderComponent from "./components/content/HeaderComponent";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions, refreshMe } from "./features/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { io } from 'socket.io-client'
import SidebarComponent from "./components/content/sidebar/SidebarComponent";
import MainComponent from "./components/content/main/MainComponent";
import CartComponent from "./components/content/CartComponent";
import SidePopUp from "./components/popups/sidePopup/SidePopUp";
import { visibleStatesActions } from "./features/visibleStates";
import InputComponent from "./components/inputs/InputComponent";
import { cartSliceActions } from "./features/cartSlice";
import { productArr, storiesArr } from "./store";
import ProductCardComponent from "./components/content/main/ProductCardComponent";

const socket = io('http://localhost:5000')
export const returnSocket = () => socket

const StoryPopUp = () => {

  const { storyId } = useParams()
  const storyData = storiesArr.find(el => el.storyId == storyId)
  const [relatedProductsArr, setRelatedProductsArr] = useState(null)
  const [pause, setPause] = useState(false)
  const [storiesEnd, setStoriesEnd] = useState(false)
  const [controlHover, setControlHover] = useState(false)
  let [currentStoryIdx, setCurrentStoryIdx] = useState(0)
  const [currentStoryProgress, setCurrentStoryProgress] = useState(0)
  const { type, relatedProducts, title, imgSrc, text } = storyData

  useEffect(() => {
    let arr = []
    relatedProducts.forEach(productId => {
      const product = productArr.find(el => el.productId === productId)
      product && arr.push(product)
      setRelatedProductsArr(arr)
    })
  }, [])

  const setProgress = (idx) => {
    if (idx < currentStoryIdx) return '100'
    if (idx == currentStoryIdx) return currentStoryProgress
    return '0'
  }

  function Interval() {
    setTimeout(() => {
      setCurrentStoryProgress(prev => prev += 1)
    }, 50)
  }

  useEffect(() => {
    if (!pause) {
      if (currentStoryProgress >= 100) {
        if (currentStoryIdx + 1 <= imgSrc.length - 1) {
          setCurrentStoryIdx(prev => prev += 1)
          setCurrentStoryProgress(0)
          Interval()
        }
        if (currentStoryIdx + 1 > imgSrc.length - 1) {
          setStoriesEnd(true)
          setPause(true)
        }
      } else Interval()
    }
  }, [currentStoryProgress, pause])

  const pauseHandler = (state) => {
    if (storiesEnd) {
      setCurrentStoryIdx(0)
      setCurrentStoryProgress(0)
      setPause(false)
      setStoriesEnd(false)
    } else setPause(state)
  }

  return (
    <div className="flex h-full">
      <div onMouseEnter={() => setControlHover(true)} onMouseLeave={() => setControlHover(false)} style={{ background: `url(${imgSrc[currentStoryIdx]})` }} className="rounded mr-5 bg-cover flex w-[500px] relative">
        <div className="controls-wrapper flex justify-center items-center w-full h-full absolute">
          <div className={`transition-all opacity-0 pointer-events-none story-controls flex w-full px-5 ${controlHover && 'opacity-100 pointer-events-auto'}`}>
            <div className="story-controls__item story-controls__arrow flex items-center flex-[1]">
              <svg onClick={() => {
                setCurrentStoryIdx(prev => prev -= 1)
                setCurrentStoryProgress(0)
              }} className={`transition-all rotate-[180deg] rounded-full bg-[#0000002e]
              ${imgSrc.length == 1 && 'pointer-events-none opacity-0'}
              ${(imgSrc.length > 1 && currentStoryIdx == 0) && 'pointer-events-none opacity-0'}
              `} p-1 width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289Z" fill="white"></path>
              </svg>
            </div>
            <div className="story-controls__item story-controls__pause flex items-center justify-center flex-[2]">
              {!pause ?
                <svg onClick={() => pauseHandler(true)} xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="white" class="rounded-full bg-[#0000002e] p-5 bi bi-pause-fill" viewBox="0 0 16 16">
                  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
                </svg>
                :
                <svg onClick={() => pauseHandler(false)} xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="white" class="rounded-full bg-[#0000002e] p-5 bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              }
            </div>
            <div className="story-controls__item story-controls__arrow flex items-center justify-end flex-[1]">
              <svg onClick={() => {
                setCurrentStoryIdx(prev => prev += 1)
                setCurrentStoryProgress(0)
              }} className={`transition-all rounded-full bg-[#0000002e]
                ${imgSrc.length === 1 && 'pointer-events-none opacity-0'}
                ${(imgSrc.length > 1 && currentStoryIdx == imgSrc.length - 1) && 'pointer-events-none opacity-0'}
              `} p-1 width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289Z" fill="white"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex w-full h-fit mt-5 px-4">
          {imgSrc.map((el, idx) => {
            return (
              <div className="h-[4px] flex-1 mx-1 relative">
                <div className="bg-[#726f68] h-full rounded"></div>
                <div style={{ width: `${setProgress(idx)}%` }} className="z-10 h-full bg-[#ffffff] rounded absolute top-0"></div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex w-[400px] flex-col">
        <h2>{title}</h2>
        <p className={`opacity-90 border-y-[2px] py-3 my-3 border-dashed ${!relatedProductsArr && 'border-b-0'}`}>{text}</p>
        <div className="flex flex-wrap">
          {relatedProductsArr && relatedProductsArr.map((el, idx) => <ProductCardComponent data={el} key={idx} />)}
        </div>
      </div>
    </div>
  )
}

const ProductPopUp = () => {

  const { productId } = useParams()
  const dispatch = useDispatch()
  const [count, setCount] = useState(null)
  const productData = productArr.find(el => el.productId == productId)
  const { tags, name, imgSrc, price, measure, text } = productData
  const { cart } = useSelector(state => state.cartSlice)
  useEffect(() => {
    const product = cart.find(el => el.productId == productId)
    if (product) setCount(product.count)
    if (!product) setCount(null)
  }, [cart])

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="w-[445px] h-[445px] bg-cover rounded" style={{ background: `url('https://cm.samokat.ru/processed/m/product_card/58d1c829-7966-48fe-8201-b214dba5caea.jpg')` }} ></div>
        <div className="my-3 font-bold">
          <h3>{name}</h3>
          <span className="opacity-60">{measure}</span>
        </div>
        <div className={`max-w-[445px] opacity-90 border-t-[2px] pt-3 border-dashed`}>{text}</div>
      </div>
      <div onClick={() => dispatch(cartSliceActions.addProduct(Number(productId)))} className="redBtn sticky bottom-0">
        {count && <svg onClick={(e) => {
          dispatch(cartSliceActions.decrementProduct(Number(productId)))
          e.stopPropagation()
        }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="mr-2 bi bi-dash-lg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
        </svg>}
        {count && `${count} x`} {price} ₽

      </div>
    </div>
  )
}

export const App = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const { isAuth, adress } = useSelector(state => state.authSlice)
  const { sidePopUp } = useSelector(state => state.visibleStates)
  const { cart } = useSelector(state => state.cartSlice)
  const [addAdressForm, setAddAdressForm] = useState(false)
  const adressDataInitial = { 'city': '', 'street': '', 'building': '' }
  const [adressData, setAdressData] = useState(adressDataInitial)
  const handleSetAdress = ({ name, value }) => setAdressData({ ...adressData, [name]: value })

  const authDataInitial = { 'phone': '', 'password': '' }
  const [authData, setAuthData] = useState(authDataInitial)
  const handleSetAuth = ({ name, value }) => setAuthData({ ...authData, [name]: value })


  const addAdressHandler = (data) => {
    const newData = `${data.city}*${data.street}*${data.building}`
    let currentAdresses = localStorage.adresses
    currentAdresses += `$${newData}`
    localStorage.adresses = currentAdresses
    const readyAdresses = parseAdresses(currentAdresses)
    localStorage.setItem('selectedAdress', readyAdresses.length - 1)
    dispatch(authSliceActions.setAdress(readyAdresses))
    dispatch(authSliceActions.setSelectedAdress(parseInt(readyAdresses.length - 1)))
    setAdressData(adressDataInitial)
    setAddAdressForm(false)
  }

  const selectAdress = (idx) => {
    localStorage.setItem('selectedAdress', idx)
    dispatch(authSliceActions.setSelectedAdress(parseInt(idx)))
  }

  const parseAdresses = (adresses) => {
    const parsedAdresses = adresses.slice(1).split('$')
    let readyAdresses = []
    parsedAdresses.forEach(el => {
      const a = el.split('*')
      const obj = { city: a[0], street: a[1], building: a[2] }
      readyAdresses.push(obj)
    })
    return readyAdresses
  }

  useEffect(() => {
    const paths = location.pathname.split('/')
    const find = paths.find(el => el == 'product' || el == 'story')
    find && dispatch(visibleStatesActions.showSidePopup(find))
  }, [])

  useEffect(() => {
    const adresses = localStorage.adresses
    const selectedAdress = localStorage.selectedAdress
    if (!adresses) localStorage.setItem('adresses', '')
    if (!selectedAdress) localStorage.setItem('selectedAdress', 0)
    if (adresses !== '') {
      let readyAdresses = parseAdresses(adresses)
      dispatch(authSliceActions.setAdress(readyAdresses))
      dispatch(authSliceActions.setSelectedAdress(parseInt(selectedAdress)))
    }
  }, [localStorage.adresses, localStorage.selectedAdress])

  // useEffect(() => {
  //   (async () => await dispatch(refreshMe()).unwrap().then(e => {
  //     if (e === null) return navigate('/login')
  //     socket.emit('addUser', {userId: e._id, socketId: socket.id})
  //   }).catch(() => navigate('/login')))()
  // }, [])

  // useEffect(() => {
  //   socket.on('returnOnlineUsers', (data) => {
  //     dispatch(chatSliceActions.setOnlineUsers(data))
  //   })
  //   return () => socket.off('returnOnlineUsers')
  // }, [])

  return (
    <>
      <div className={`app`}>
        <div className={`appWrapper`}>
          {/* <LoadingComponent visible={authStatus === 'loading' ? true : false} /> */}
          <HeaderComponent />
          <div className={`content flex flex-row items-start pb-4`}>
            <SidebarComponent />
            <MainComponent />
            <CartComponent />
          </div>
        </div>
        <Link to={'/'} onClick={() => dispatch(visibleStatesActions.hideSidePopup())} className={`blackout ${sidePopUp.isOpened && 'opacity-100 pointer-events-auto'}`}></Link>
        <SidePopUp popUpVisible={sidePopUp.isOpened} hidePopup={visibleStatesActions.hideSidePopup} >
          {sidePopUp.children === 'changeAdress' &&
            <div className="flex flex-col justify-between h-full">
              <div>
                {adress.adressData.map((el, idx) => {
                  return <div onClick={() => selectAdress(idx)} className="flex items-center justify-between cursor-pointer py-2">
                    <h4>{el.city}, {el.street}, {el.building}</h4>
                    {idx === adress.selectedAdressIdx ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#ff335f" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg> : <div className="min-w-[22px] min-h-[22px] bg-[#8080805e] rounded-[50%]"></div>
                    }
                  </div>
                })}
                {addAdressForm &&
                  <div className="w-[360px]">
                    <InputComponent classStyles={''} type={'text'} name={'city'} placeholder={'Город'} setValue={handleSetAdress} value={adressData.city} />
                    <div className="flex">
                      <InputComponent classStyles={'flex-2'} type={'text'} name={'street'} placeholder={'Улица'} setValue={handleSetAdress} value={adressData.street} />
                      <InputComponent classStyles={'flex-1 ml-3'} type={'text'} name={'building'} placeholder={'Дом'} setValue={handleSetAdress} value={adressData.building} />
                    </div>
                    <span className="underline underline-offset-4 opacity-50 flex justify-end cursor-pointer p-2" onClick={() => setAddAdressForm(false)}>Отменить</span>
                  </div>
                }
              </div>
              {!addAdressForm ? <div onClick={() => setAddAdressForm(true)} className={`redBtn`}>Новый адрес</div>
                : <div onClick={() => addAdressHandler(adressData)} className={`redBtn ${(!adressData.city || !adressData.building || !adressData.street) && 'disabledBtn'}`}>Добавить</div>
              }
            </div>
          }

          {sidePopUp.children === 'auth' &&
            <div>
              <div className="mb-5">
                <InputComponent pattern={/^\d*\.?\d*$/} classStyles={''} type={'tel'} name={'phone'} placeholder={'Телефон'} setValue={handleSetAuth} value={authData.phone} />
                <InputComponent pattern={''} classStyles={''} type={'password'} name={'password'} placeholder={'Пароль'} setValue={handleSetAuth} value={authData.password} />
              </div>
              <div>
                <div onClick={() => { }} className={`redBtn mb-3 ${(!authData.password || authData.phone.length < 10) && 'disabledBtn'}`}>Войти</div>
                <div onClick={() => { }} className={`redBtn ${(!authData.password || authData.phone.length < 10) && 'disabledBtn'}`}>Зарегистрироваться</div>
              </div>
            </div>
          }

          {sidePopUp.children === 'lk' &&
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="mb-3">
                  <h1>Никита</h1>
                  <span className="opacity-50 font-bold">+7 951 428 60 49</span>
                </div>
                <div className={`mb-3`}>
                  <div className="flex items-center py-2 border-b-2 cursor-pointer">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.8222 14.9124C36.8222 16.1183 36.7957 17.3404 36.7428 17.9077C36.6452 18.9631 36.0657 19.9411 35.051 20.3356C34.1482 20.6834 33.1924 20.5247 32.3547 20.0855C31.5169 19.6463 30.5571 18.3978 29.9755 17.2895C28.8612 17.2895 28.06 16.4538 27.9421 15.376C27.9137 15.1874 27.9236 14.9949 27.9711 14.8101C28.0186 14.6253 28.1028 14.452 28.2186 14.3004" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M36.8242 11.8926C36.8242 12.1773 36.8242 12.8666 36.8242 13.6922" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28.2023 14.2493C28.0355 13.1126 27.9216 11.9719 27.8078 10.8291C27.7674 10.4214 27.8397 10.0105 28.0168 9.64121C28.194 9.27187 28.4691 8.95827 28.8123 8.7346C29.1957 8.49238 29.6324 8.34726 30.0845 8.31183C30.5366 8.2764 30.9905 8.35171 31.407 8.53126C31.7527 7.69958 32.3586 6.9777 33.3062 6.98787C34.2152 6.98787 34.8191 7.50843 35.1851 8.32385C35.4411 8.21524 35.7166 8.16029 35.9947 8.16239C36.2728 8.16449 36.5474 8.22359 36.8017 8.33605C37.075 8.47818 37.3055 8.6907 37.4692 8.95165C37.6329 9.21261 37.724 9.51254 37.733 9.82047C37.7961 10.5728 37.245 11.313 36.879 11.9454V11.917C36.6847 11.8838 36.4995 11.8106 36.335 11.7021C36.1705 11.5936 36.0303 11.4521 35.9233 11.2866L35.8887 11.2479C35.5059 11.6149 34.9956 11.819 34.4653 11.8173C33.9314 11.834 33.4115 11.6447 33.0134 11.2886C32.9176 11.5372 32.7697 11.7624 32.5796 11.949C32.3895 12.1356 32.1616 12.2793 31.9113 12.3704C31.4087 12.5506 30.8689 12.6017 30.3415 12.5189L30.2805 12.5555V14.8573C30.1137 14.2473 29.4671 13.7206 28.8184 13.9138C28.5847 13.9794 28.3763 14.1141 28.2206 14.3002" fill="#404040"></path><path d="M28.2023 14.2493C28.0355 13.1126 27.9216 11.9719 27.8078 10.8291C27.7674 10.4214 27.8397 10.0105 28.0168 9.64121C28.194 9.27187 28.4691 8.95827 28.8123 8.7346C29.1957 8.49238 29.6324 8.34726 30.0845 8.31183C30.5366 8.2764 30.9905 8.35171 31.407 8.53126C31.7527 7.69958 32.3586 6.9777 33.3062 6.98787C34.2152 6.98787 34.8191 7.50843 35.1851 8.32385C35.4411 8.21524 35.7166 8.16029 35.9947 8.16239C36.2728 8.16449 36.5474 8.22359 36.8017 8.33605C37.075 8.47818 37.3055 8.6907 37.4692 8.95165C37.6329 9.21261 37.724 9.51254 37.733 9.82047C37.7961 10.5728 37.245 11.313 36.879 11.9454V11.917C36.6847 11.8838 36.4995 11.8106 36.335 11.7021C36.1705 11.5936 36.0303 11.4521 35.9233 11.2866L35.8887 11.2479C35.5059 11.6149 34.9956 11.819 34.4653 11.8173C33.9314 11.834 33.4115 11.6447 33.0134 11.2886C32.9176 11.5372 32.7697 11.7624 32.5796 11.949C32.3895 12.1356 32.1616 12.2793 31.9113 12.3704C31.4087 12.5506 30.8689 12.6017 30.3415 12.5189L30.2805 12.5555V14.8573C30.1137 14.2473 29.4671 13.7206 28.8184 13.9138C28.5847 13.9794 28.3763 14.1141 28.2206 14.3002" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M33.0867 15.6096C33.7661 15.6096 34.3169 15.0588 34.3169 14.3794C34.3169 13.7 33.7661 13.1492 33.0867 13.1492C32.4072 13.1492 31.8564 13.7 31.8564 14.3794C31.8564 15.0588 32.4072 15.6096 33.0867 15.6096Z" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M36.9846 14.3005C36.9846 14.5438 36.9125 14.7817 36.7773 14.984C36.6421 15.1863 36.45 15.344 36.2252 15.4371C36.0004 15.5302 35.753 15.5546 35.5144 15.5071C35.2758 15.4596 35.0565 15.3424 34.8845 15.1704C34.7124 14.9983 34.5953 14.7791 34.5478 14.5405C34.5003 14.3019 34.5247 14.0545 34.6178 13.8297C34.7109 13.6049 34.8686 13.4128 35.0709 13.2776C35.2732 13.1424 35.5111 13.0702 35.7544 13.0702C35.9163 13.0689 36.0769 13.0998 36.2268 13.1611C36.3767 13.2225 36.5128 13.313 36.6273 13.4276C36.7418 13.5421 36.8324 13.6782 36.8938 13.8281C36.9551 13.978 36.986 14.1386 36.9846 14.3005Z" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M35.051 20.3355L35.053 21.8768L33.0887 25.8827L29.7864 21.4803V17.4134" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.7955 39.5395C26.7361 40.3834 25.2354 41.5262 24.117 42.2948C23.1857 42.9333 22.3723 43.5271 21.1868 43.4112C19.3058 43.2302 18.2017 41.3472 18.1366 39.6025C18.0776 37.809 20.3917 31.7981 20.8716 30.4805C21.5304 28.9127 21.9717 26.869 23.1613 25.6124C24.0336 24.7055 25.2781 23.949 26.3721 23.3512L29.7883 21.4784" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29.4934 34.9601C29.7927 35.2725 29.9959 35.6642 30.0791 36.0887C30.3414 37.4267 29.7192 39.1389 28.2734 39.4744C26.8276 39.8099 25.1947 38.8461 25.0199 37.3332C24.9712 36.7859 25.0735 36.2358 25.3154 35.7425C25.5574 35.2492 25.9299 34.8317 26.3924 34.5352C26.8795 34.2389 27.4537 34.1195 28.0184 34.1969C28.5832 34.2743 29.1041 34.5438 29.4934 34.9601Z" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.7146 39.0007L25.6828 35.1839" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28.2306 34.2404C27.9211 34.1639 27.5993 34.1512 27.2847 34.2029C26.9701 34.2546 26.6693 34.3698 26.4005 34.5413L26.3721 23.3512L28.2327 22.3345V34.1753" fill="#404040"></path><path d="M28.2306 34.2404C27.9211 34.1639 27.5993 34.1512 27.2847 34.2029C26.9701 34.2546 26.6693 34.3698 26.4005 34.5413L26.3721 23.3512L28.2327 22.3345V34.1753" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.7956 39.5396C26.7362 40.3835 25.2355 41.5263 24.1171 42.2949C23.1858 42.9334 22.3724 43.5272 21.1869 43.4113C19.306 43.2303 18.2018 41.3473 18.1367 39.6026V58.1477H32.4095V39.5416H27.9075" fill="#404040"></path><path d="M27.7956 39.5396C26.7362 40.3835 25.2355 41.5263 24.1171 42.2949C23.1858 42.9334 22.3724 43.5272 21.1869 43.4113C19.306 43.2303 18.2018 41.3473 18.1367 39.6026V58.1477H32.4095V39.5416H27.9075" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M31.8564 49.0497H39.9191L39.3375 28.3634" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M47.9064 52.8035C47.4692 50.9592 44.0896 35.568 42.2961 29.9007C41.7247 28.095 40.95 26.208 39.4493 24.9778C38.05 23.8562 36.5839 22.8207 35.0591 21.8767" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M47.9064 52.8036H41.8223" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.3624 38.1059L15.1089 28.7256C14.9379 28.2341 14.9693 27.6947 15.196 27.2262C15.4227 26.7577 15.8262 26.3985 16.3178 26.2275C16.8094 26.0566 17.3487 26.0879 17.8172 26.3146C18.2857 26.5413 18.6449 26.9449 18.8159 27.4364L20.3593 31.8917" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M38.1743 49.0499L41.8223 59.6544" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M43.5813 52.8219C43.3625 53.3097 43.2699 53.8449 43.3122 54.3779C43.3545 54.9109 43.5303 55.4248 43.8233 55.872C44.0085 56.1557 44.2508 56.3977 44.5348 56.5826C44.8187 56.7675 45.138 56.8913 45.4724 56.946C45.8068 57.0007 46.1489 56.9852 46.4769 56.9004C46.805 56.8156 47.1118 56.6635 47.3778 56.4536C48.3477 55.7094 48.3945 53.8793 47.8739 52.8585" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M41.8223 59.6544L43.3047 54.5159" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M47.7073 56.1122L48.8114 59.5711" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    <h3 className="ml-3">Заказы</h3>
                  </div>
                  <div className="flex items-center py-2 border-b-2 cursor-pointer">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38.0099 13.6147C36.8847 13.576 35.6718 13.5474 34.6444 14.0591C33.8003 14.4655 32.8754 14.6766 31.9384 14.6766C31.0015 14.6766 30.0766 14.4655 29.2324 14.0591C28.2132 13.5474 26.9902 13.576 25.867 13.6147L25.8486 13.4985C25.8486 9.90883 28.574 7 31.9374 7C35.3008 7 38.0262 9.90883 38.0262 13.4985" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28.0625 19.1691C27.7276 17.3694 27.5151 15.5489 27.4265 13.7204" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M36.0877 18.7552C35.9837 19.3097 35.8614 19.858 35.7126 20.4002C35.2947 21.927 33.717 23.3621 32.0333 23.3621C30.3495 23.3621 28.7718 21.9352 28.3641 20.4002C28.2527 19.9926 28.1548 19.5849 28.0706 19.1772" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M36.6442 13.7204C36.5578 15.408 36.3733 17.0891 36.0918 18.7553" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28.0625 19.1694C29.0845 18.3181 30.33 17.7789 31.6501 17.6161C33.2116 17.451 34.934 18.3826 36.0592 18.9819" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M30.9223 16.3502C30.9042 16.4181 30.8671 16.4794 30.8155 16.527C30.7639 16.5746 30.6999 16.6066 30.6308 16.6193C30.5624 16.6268 30.4932 16.6158 30.4305 16.5875C30.3677 16.5591 30.3137 16.5145 30.2741 16.4583C30.0866 16.2055 30.1008 15.119 30.6186 15.2352C30.6916 15.2578 30.7577 15.2987 30.8105 15.354C30.8633 15.4093 30.9011 15.4771 30.9203 15.5512C30.9981 15.8111 30.9981 16.0882 30.9203 16.3482" fill="#404040"></path><path d="M33.7741 16.3502C33.756 16.4181 33.7189 16.4794 33.6673 16.527C33.6157 16.5746 33.5517 16.6066 33.4826 16.6193C33.4142 16.6268 33.345 16.6158 33.2823 16.5875C33.2195 16.5591 33.1655 16.5145 33.1259 16.4583C32.9384 16.2055 32.9526 15.119 33.4704 15.2352C33.5434 15.2578 33.6095 15.2987 33.6623 15.354C33.7151 15.4093 33.7529 15.4771 33.7721 15.5512C33.8499 15.8111 33.8499 16.0882 33.7721 16.3482" fill="#404040"></path><path d="M28.0299 19.1818C26.5582 19.6547 25.7224 17.8099 26.1688 16.6235C26.4032 16.0018 26.9658 15.8082 27.5692 16.0487" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M36.1653 18.8208C37.637 19.2937 38.4728 17.4469 38.0264 16.2605C37.7919 15.649 37.2293 15.4451 36.6239 15.6877" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28.5518 13.8021L27.5693 16.0423L25.8672 13.6146" fill="#404040"></path><path d="M28.5518 13.8021L27.5693 16.0423L25.8672 13.6146" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M35.4294 13.955L36.624 15.6876L38.0101 13.6146" fill="#1D1D1B"></path><path d="M35.4294 13.955L36.624 15.6876L38.0101 13.6146" fill="#404040"></path><path d="M35.4294 13.955L36.624 15.6876L38.0101 13.6146" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29.0328 24.9503C27.2818 25.4436 24.5095 25.9695 22.9175 26.8664C21.4906 27.6818 20.4103 29.0659 19.6785 30.5132" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M41.5365 36.2532C41.5365 37.0841 41.2065 37.8811 40.6189 38.4686C40.0313 39.0562 39.2344 39.3863 38.4035 39.3863C36.9623 39.3863 35.7433 38.2998 35.3458 36.9402C35.204 36.4192 35.1925 35.8714 35.3123 35.3449C35.4321 34.8185 35.6795 34.3295 36.0328 33.9212C36.9093 32.9795 38.5706 32.849 39.7346 33.2078C40.9984 33.5992 41.5365 35.0281 41.5365 36.2532Z" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M41.5264 35.5521L45.6481 45.1999" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M23.1641 35.5521V57.2226" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M40.9148 48.9078V57.4366" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.7047 30.4176C14.2272 30.8672 13.9169 31.4659 13.8246 32.1153C13.7324 32.7647 13.8637 33.4261 14.1971 33.9909C14.9187 35.2955 16.5658 35.6788 17.9172 35.2344C18.5751 35.0324 19.1418 34.607 19.5194 34.0317C20.3002 32.7658 20.0168 30.2504 18.2454 29.7938C18.2903 28.8093 18.4798 27.6942 18.5247 26.7097C18.5471 26.2184 18.7611 24.9444 18.1394 24.71C16.6595 24.1535 16.7513 26.9033 16.6942 27.7105L16.5658 29.5186C16.2906 28.5463 16.0704 27.5515 15.7891 26.622C15.6777 26.1543 15.5021 25.7043 15.2673 25.2848C15.2153 25.1897 15.141 25.1085 15.0508 25.0484C14.9606 24.9882 14.8572 24.9508 14.7494 24.9394C14.6416 24.928 14.5326 24.9429 14.4318 24.9828C14.331 25.0227 14.2414 25.0865 14.1706 25.1686C13.6936 25.7027 14.1095 26.8544 14.246 27.4496L14.8922 30.2504" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.6764 31.6159L17.0489 31.0594C16.8454 31.0164 16.6342 31.0291 16.4373 31.0961C16.3334 31.1271 16.2372 31.1797 16.1549 31.2503C16.0726 31.321 16.0061 31.4082 15.9598 31.5063C15.9135 31.6044 15.8883 31.7111 15.8859 31.8195C15.8836 31.928 15.9041 32.0357 15.9461 32.1357C16.1662 32.7839 16.9164 32.8573 17.5014 33C18.2454 33.1814 18.9996 33.3383 19.7559 33.4484" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.197 33.9906C14.2093 35.3094 14.2194 37.036 14.2296 38.3548C14.2419 39.9285 14.1766 41.5022 14.2296 43.0738C14.2847 44.5435 14.3458 46.2232 15.045 47.5298C15.9868 49.3114 17.5951 50.3265 19.6682 49.9759C21.2989 49.7007 22.3874 48.4206 23.1641 46.798" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.7559 33.4526V44.8474" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22.783 27.1131L23.1397 41.4229C24.1583 38.6911 24.7376 35.8153 24.856 32.9022C24.96 30.6498 25.174 28.2465 25.1108 25.9879" fill="#404040"></path><path d="M22.783 27.1131L23.1397 41.4229C24.1583 38.6911 24.7376 35.8153 24.856 32.9022C24.96 30.6498 25.174 28.2465 25.1108 25.9879" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M38.9335 26.2204L38.0264 33.0247V33.043C38.597 32.9895 39.1727 33.0455 39.7223 33.2081C40.0254 33.3012 40.304 33.4607 40.5377 33.6749L40.5173 33.4507L41.3633 27.1092" fill="#404040"></path><path d="M38.9335 26.2204L38.0264 33.0247V33.043C38.597 32.9895 39.1727 33.0455 39.7223 33.2081C40.0254 33.3012 40.304 33.4607 40.5377 33.6749L40.5173 33.4507L41.3633 27.1092" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.8342 9.09741C27.8097 9.87812 27.8036 10.6588 27.8219 11.4396C28.2908 10.5182 28.5741 9.1871 28.674 8.15769" fill="#1D1D1B"></path><path d="M27.8342 9.09741C27.8097 9.87812 27.8036 10.6588 27.8219 11.4396C28.2908 10.5182 28.5741 9.1871 28.674 8.15769" fill="#404040"></path><path d="M27.8342 9.09741C27.8097 9.87812 27.8036 10.6588 27.8219 11.4396C28.2908 10.5182 28.5741 9.1871 28.674 8.15769" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M32.653 7.27505C32.5431 8.37626 32.2966 9.45952 31.9191 10.4998H31.8376C31.4582 9.46008 31.2117 8.37658 31.1038 7.27505" fill="#1D1D1B"></path><path d="M32.653 7.27505C32.5431 8.37626 32.2966 9.45952 31.9191 10.4998H31.8376C31.4582 9.46008 31.2117 8.37658 31.1038 7.27505" fill="#404040"></path><path d="M32.653 7.27505C32.5431 8.37626 32.2966 9.45952 31.9191 10.4998H31.8376C31.4582 9.46008 31.2117 8.37658 31.1038 7.27505" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M35.9003 8.89363C35.9261 9.67367 35.9309 10.4544 35.9146 11.2358C35.4457 10.3144 35.1624 8.98332 35.0625 7.95392" fill="#1D1D1B"></path><path d="M35.9003 8.89363C35.9261 9.67367 35.9309 10.4544 35.9146 11.2358C35.4457 10.3144 35.1624 8.98332 35.0625 7.95392" fill="#404040"></path><path d="M35.9003 8.89363C35.9261 9.67367 35.9309 10.4544 35.9146 11.2358C35.4457 10.3144 35.1624 8.98332 35.0625 7.95392" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M33.7906 17.8628C34.2044 17.9872 34.6035 18.156 34.981 18.3663C35.2949 18.5416 35.6191 18.774 35.6945 19.1287C35.7273 19.3525 35.7034 19.581 35.6252 19.7932C35.4662 20.3368 35.282 20.8702 35.0728 21.3934C34.9349 21.7733 34.7508 22.1348 34.5244 22.4697C33.6071 23.7498 31.64 24.0494 30.2967 23.2239C29.6937 22.8179 29.2141 22.2537 28.9106 21.5931C28.6313 21.0387 28.2583 20.4414 28.2114 19.7993C28.1645 19.1572 28.6925 18.668 29.1511 18.3092C30.2131 17.4776 31.8011 17.4653 33.0771 17.6977C33.3215 17.7396 33.5632 17.7961 33.8008 17.8669" fill="#404040"></path><path d="M35.1155 24.9503C36.8665 25.4436 39.5857 25.9695 41.1737 26.8664C43.257 28.0548 44.2762 30.238 45.0467 32.4069C46.0007 35.0915 47.0973 37.7414 47.9392 40.4892C48.7016 42.9782 50.21 46.0766 48.83 48.6246C47.9943 50.1657 46.337 51.3214 44.535 51.1747C42.515 51.0096 41.1981 49.656 40.342 47.9132C39.2168 45.6403 37.2558 41.1252 36.4405 38.7199" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29.0327 21.8418V24.9504C29.9826 26.6933 33.4235 27.474 35.1154 24.9504L35.0665 21.3933" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29.0328 24.9504C27.2817 25.4437 24.5095 25.9696 22.9175 26.8665C22.3036 27.2242 21.747 27.6722 21.2664 28.1956L20.1697 29.6408V21.854L29.0287 21.8418" fill="#404040"></path><path d="M29.0328 24.9504C27.2817 25.4437 24.5095 25.9696 22.9175 26.8665C22.3036 27.2242 21.747 27.6722 21.2664 28.1956L20.1697 29.6408V21.854L29.0287 21.8418" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M35.1155 24.9504C36.8665 25.4437 39.5858 25.9696 41.1737 26.8665C41.917 27.3017 42.5956 27.8389 43.1897 28.4626L44.3761 30.5133L44.3598 21.8418H35.0625" fill="#404040"></path><path d="M35.1155 24.9504C36.8665 25.4437 39.5858 25.9696 41.1737 26.8665C41.917 27.3017 42.5956 27.8389 43.1897 28.4626L44.3761 30.5133L44.3598 21.8418H35.0625" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    <h3 className="ml-3">Адреса</h3>
                  </div>
                  <div className="flex items-center py-2 cursor-pointer">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.6101 13.6239C26.9108 16.5293 28.9943 21.6786 32.623 19.9176C33.3219 19.5659 33.8858 18.994 34.2278 18.2902" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M25.6101 13.6239C25.4199 13.175 25.318 12.6936 25.3101 12.2062C25.2218 10.5397 26.0868 9.04593 27.4245 8.05759C29.0334 6.86788 31.4313 6.66857 33.2333 7.52746C35.4011 8.56512 35.9682 11.2918 36.8148 13.3465L36.7572 13.2746C37.1189 14.0965 37.4147 14.9184 37.7127 15.7403C37.9058 16.2766 38.5058 16.4698 38.7544 16.9588C39.0236 17.4889 38.7277 18.0951 38.8428 18.6478C38.9579 19.2006 39.5065 19.3999 39.8702 19.7553C40.5133 20.3718 40.0962 20.8896 39.9524 21.6252C39.8414 22.1943 40.4044 22.5087 40.7373 22.858C40.9597 23.1066 41.099 23.4183 41.1359 23.7498C41.1727 24.0813 41.1052 24.416 40.9428 24.7073C40.5811 25.408 39.5044 25.3237 38.9312 24.9744C38.3579 24.6251 38.249 23.758 38.3414 23.1457C38.3969 22.7882 38.4524 22.6505 38.1771 22.3423C37.9593 22.0978 37.4394 21.8841 37.3264 21.5697C37.1024 20.9348 37.8236 20.2649 37.2647 19.6053C36.9648 19.2519 36.3175 19.2951 36.2374 18.7156C36.1778 18.2492 36.4428 17.8218 36.3031 17.3081C36.0976 16.5992 35.3292 16.4657 34.8936 15.9294V15.8431C35.8798 15.5801 36.3894 14.4582 36.1963 13.4965C35.9415 12.2267 34.3573 11.4418 33.7306 12.9192C33.5739 13.2961 33.4781 13.6956 33.447 14.1027L33.3669 13.9609L30.6751 9.62126C29.7361 10.9733 27.3464 12.7466 25.8259 13.3733" fill="#404040"></path><path d="M25.6101 13.6239C25.4199 13.175 25.318 12.6936 25.3101 12.2062C25.2218 10.5397 26.0868 9.04593 27.4245 8.05759C29.0334 6.86788 31.4313 6.66857 33.2333 7.52746C35.4011 8.56512 35.9682 11.2918 36.8148 13.3465L36.7572 13.2746C37.1189 14.0965 37.4147 14.9184 37.7127 15.7403C37.9058 16.2766 38.5058 16.4698 38.7545 16.9588C39.0236 17.4889 38.7277 18.0951 38.8428 18.6478C38.9579 19.2006 39.5065 19.3999 39.8702 19.7553C40.5133 20.3718 40.0962 20.8896 39.9524 21.6252C39.8414 22.1943 40.4044 22.5087 40.7373 22.858C40.9597 23.1066 41.099 23.4183 41.1359 23.7498C41.1727 24.0813 41.1052 24.416 40.9428 24.7073C40.5811 25.408 39.5044 25.3237 38.9312 24.9744C38.3579 24.6251 38.249 23.758 38.3414 23.1457C38.3969 22.7882 38.4524 22.6505 38.1771 22.3423C37.9593 22.0978 37.4394 21.8841 37.3264 21.5697C37.1024 20.9348 37.8236 20.2649 37.2647 19.6053C36.9648 19.2519 36.3175 19.2951 36.2374 18.7156C36.1778 18.2492 36.4428 17.8218 36.3031 17.3081C36.0976 16.5992 35.3292 16.4657 34.8936 15.9294V15.8431C35.8798 15.5801 36.3894 14.4582 36.1963 13.4965C35.9415 12.2267 34.3573 11.4418 33.7306 12.9192C33.5739 13.2961 33.4781 13.6956 33.447 14.1027L33.3669 13.9609L30.6751 9.62126C29.7361 10.9733 27.3464 12.7466 25.8259 13.3733" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.9546 14.9267C27.9722 14.9951 27.9706 15.0669 27.95 15.1344C27.9293 15.2018 27.8904 15.2622 27.8375 15.3089C27.7813 15.3502 27.7151 15.3758 27.6458 15.383C27.5764 15.3902 27.5064 15.3788 27.443 15.35C27.1532 15.2247 26.621 14.2733 27.1224 14.1172C27.1975 14.1006 27.2755 14.103 27.3494 14.1242C27.4233 14.1453 27.4908 14.1846 27.5457 14.2384C27.7472 14.4251 27.8899 14.6664 27.9566 14.9329" fill="#404040"></path><path d="M30.6566 13.9795C30.6753 14.0476 30.6744 14.1195 30.654 14.1871C30.6337 14.2547 30.5947 14.3152 30.5416 14.3617C30.4853 14.4028 30.4192 14.4282 30.3499 14.4354C30.2806 14.4426 30.2106 14.4314 30.1471 14.4028C29.8553 14.2774 29.3149 13.3261 29.8245 13.1699C29.8995 13.1533 29.9776 13.1558 30.0515 13.1769C30.1254 13.1981 30.1928 13.2374 30.2477 13.2912C30.4492 13.4779 30.592 13.7192 30.6587 13.9857" fill="#404040"></path><path d="M24.1615 33.7543L13.8486 28.7181C12.7226 28.1695 11.1405 27.8489 10.1501 28.8455C8.65216 30.3619 9.75145 32.9674 11.8185 33.0701C12.4356 33.1087 13.05 32.9596 13.5807 32.6423C14.1114 32.3251 14.5336 31.8546 14.7918 31.2927" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29.919 20.3964H29.3601C28.5688 20.3857 27.7849 20.5493 27.064 20.8756C26.3431 21.202 25.7029 21.6831 25.1889 22.2847C24.4019 23.2464 24.1985 24.4731 24.1615 25.6833C24.0876 28.3853 24.1615 31.0483 24.1615 33.7606" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M40.949 35.3324L43.6058 37.4775C45.1756 38.7453 47.6763 41.0898 49.7803 39.6063C51.5084 38.3899 50.3331 35.9961 49.6961 34.5002L46.614 27.2674C45.6914 25.1038 44.588 22.0894 42.3195 20.9963C41.2921 20.497 40.1497 20.4066 39.0093 20.4169" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M39.447 33.6518C38.9065 32.76 39.1244 31.2785 39.8004 30.5244C40.2718 30.0427 40.9034 29.7503 41.5757 29.7025C43.4907 29.5176 44.7688 31.6463 44.2633 33.3394C44.1581 33.7303 43.9667 34.0925 43.7031 34.3997C43.4396 34.7069 43.1106 34.9511 42.7403 35.1145C42.3699 35.2779 41.9678 35.3562 41.5632 35.3438C41.1587 35.3314 40.762 35.2286 40.4024 35.0428" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M43.6079 30.5428L50.214 35.7228" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.8269 33.0724C12.9036 36.6826 13.8426 40.3339 14.9522 43.9359C15.9323 47.1167 16.9083 50.7557 19.2836 53.2091C22.1069 56.1227 26.4075 56.6261 30.141 55.3645" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M41.1544 32.0448C40.4188 34.7243 39.6845 37.4043 38.9517 40.0851C38.4524 41.9036 38.0024 43.7426 37.4558 45.5467C36.3318 49.2453 34.9305 52.5329 31.6614 54.7931" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M41.1545 32.0448L35.5861 37.5311C33.6218 39.4666 31.5958 41.4166 29.1794 42.7851C25.5445 44.8398 21.6487 44.6035 18.5254 41.8748C15.8419 39.5283 14.2515 36.1914 12.7988 32.9715" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29.9189 20.3964C31.3203 23.9449 35.7771 24.4689 39.0092 20.6388" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M44.3762 38.0981L44.4461 46.0829" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28.154 26.5668C28.0526 28.5059 28.2649 30.4487 28.7828 32.3202C29.6709 35.5184 30.0542 38.8357 29.9191 42.1522" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M37.3449 54.0413C37.3449 56.1659 35.6888 57.8878 33.6463 57.8878C31.6039 57.8878 29.9478 56.1659 29.9478 54.0413C29.9478 51.9167 31.6039 50.1948 33.6463 50.1948C35.6888 50.1948 37.3449 51.9167 37.3449 54.0413Z" fill="#404040"></path><path d="M33.6421 57.8878C35.6871 57.8878 37.3448 56.1656 37.3448 54.0413C37.3448 51.9169 35.6871 50.1948 33.6421 50.1948C31.5972 50.1948 29.9395 51.9169 29.9395 54.0413C29.9395 56.1656 31.5972 57.8878 33.6421 57.8878Z" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M52.7227 46.1365H39.8887V55.0028H52.7227V46.1365Z" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.2944 32.3594C15.3835 33.3107 16.5547 34.3258 17.1711 35.6655C17.7279 36.8778 17.6129 38.651 16.306 39.3517L16.2732 39.3764C16.9306 40.2913 17.6888 41.1294 18.5334 41.875C21.5231 44.4866 25.2237 44.8174 28.725 43.0338L28.7004 42.9886L14.7999 31.2929" fill="#404040"></path><path d="M14.2944 32.3594C15.3835 33.3107 16.5547 34.3258 17.1711 35.6655C17.7279 36.8778 17.6129 38.651 16.306 39.3517L16.2732 39.3764C16.9306 40.2913 17.6888 41.1294 18.5334 41.875C21.5231 44.4866 25.2237 44.8174 28.725 43.0338L28.7004 42.9886L14.7999 31.2929" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28.9492 14.9903C29.1896 15.6068 29.1547 16.3156 29.1321 16.9588C29.6006 16.9588 30.0403 17.2917 30.3917 17.6019" stroke="#404040" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    <h3 className="ml-3">Настройки</h3>
                  </div>
                </div>
              </div>
              <div className="redBtn">Выйти</div>
            </div>
          }

          <Routes>
            <Route path="story/:storyId" element={<StoryPopUp />} />
            <Route path="product/:productId" element={<ProductPopUp />} />
          </Routes>
        </SidePopUp>
      </div >
    </>
  )
}

