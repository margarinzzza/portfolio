import logo from '../../media/img/logo.png'
import { Link } from "react-router-dom"
import reserveAvatar from '../../media/img/ava.png'
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react'
import PopUpComponent from '../popUp/PopUpComponent'
import { cities, categories } from '../../staticStates'
import { DropdownListComponent } from '../dropdownList/DropdownListComponent'
import { MultiselectListComponent } from '../multiselectList/MultiselectListComponent'
import { authSliceActions, login, registerUser } from '../../features/authSlice'
import useWindowDimensions from '../../hooks/windowWidth'

const HeaderComponent = () => {

  const dispatch = useDispatch()
  const [popUpVisible, setPopUpVisible] = useState(false)
  const { isAuth, userData, authError, authType } = useSelector(state => state.authSlice)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [city, setCity] = useState('')
  const [age, setAge] = useState('')
  const [interests, setInterests] = useState([])
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { windowHeight, windowWidth } = useWindowDimensions();

  const auth = async () => {
    const telRegex = /((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}/
    const nameRegex = /^[a-zA-Zа-яёА-ЯЁ]{3,}$/i
    if (!telRegex.test(phoneNumber)) return dispatch(authSliceActions.setAuthError('Введите корректный телефон'))
    if (authType === 'Вход') {
      const loginUserData = { phone: phoneNumber, password }
      dispatch(authSliceActions.setAuthError(''))
      return await dispatch(login(loginUserData)).unwrap().then(() => setPopUpVisible(false)).catch(() => console.log('провал'))
    }
    if (!nameRegex.test(userName)) return dispatch(authSliceActions.setAuthError('Введите корректное имя'))
    if (age < 14) return dispatch(authSliceActions.setAuthError('Пользователи должны достигнуть 14 лет'))
    if (age > 100) return dispatch(authSliceActions.setAuthError('Введите корректный возраст'))
    if (city === '') return dispatch(authSliceActions.setAuthError('Укажите город'))
    if (password.length < 4 || password.length > 15) return dispatch(authSliceActions.setAuthError('Пароль содержит минимум 4 символа'))
    if (password !== confirmPassword) return dispatch(authSliceActions.setAuthError('Пароли не совпадают'))
    const registerUserData = { phone: phoneNumber, name: userName, avatarUrl, city, age, interests, password }
    dispatch(authSliceActions.setAuthError(''))
    return dispatch(registerUser(registerUserData)).then(() => setPopUpVisible(false))
  }

  const authPopupHanler = (aythType) => {
    dispatch(authSliceActions.setAuthType(aythType))
    dispatch(authSliceActions.setAuthError(''))
    setPopUpVisible(true)
  }

  return (
    <div className="header">
      <Link to={'/'} className='flex header_logo'>
        <img src={logo} alt="Кто куда" className='h-fit max-w-[87px]' />
        <h1 className={`header_logo_name ${(() => {
          if (isAuth && windowWidth < 838) return 'hidden'
          if (!isAuth && windowWidth < 640) return 'hidden'
        })()}`}>Кто куда</h1>
      </Link>
      <div className={`header_nav flex`}>
        <ul className={`nav_items ${isAuth && 'mr-3'}`}>
          {!isAuth ?
            <>
              <span onClick={() => authPopupHanler('Вход')}>Вход</span>
              <span onClick={() => authPopupHanler('Регистрация')}>Регистрация</span>
            </> :
            <>
              <Link to={'/'}>События</Link>
              <Link to={'/my-proposals'}>Мои предложения</Link>
              <Link to={'/my-events'}>Мои события</Link>
            </>
          }
        </ul>
        {isAuth &&
          <div className={`nav_account flex`}>
            <img src={userData?.avatarUrl === '' ? reserveAvatar : userData?.avatarUrl} alt="ava" />
            <div className={`ms-2`}>
              <h4>{userData !== null && userData.name}</h4>
              <Link to={'/account'} className={`text-sm text-slate-500 whitespace-nowrap`}>В кабинет</Link>
            </div>
          </div>}
      </div>

      <PopUpComponent popUpVisible={popUpVisible} setPopUpVisible={setPopUpVisible} title={authType}>
        <div className={`form authForm flex flex-col`}>
          <input value={phoneNumber} type="text" placeholder='Номер телефона' onChange={(e) => setPhoneNumber(e.target.value)} />
          {authType === 'Регистрация' &&
            <>
              <input value={userName} type="text" placeholder='Имя' onChange={(e) => setUserName(e.target.value)} />
              <input value={age} type="number" min={1} placeholder='Возраст' onChange={(e) => setAge(e.target.value)} />
              <DropdownListComponent data={cities} selectedItem={city} setItem={setCity} placeholder={'город'} />
              <MultiselectListComponent data={categories} selectedData={interests} setItem={setInterests} placeholder={'ваши интересы'} />
              <span className='relative top-[10px] text-slate-700'>Загрузить аватар</span>
              <input type="file" onChange={(e) => setAvatarUrl(e.target.files[0])} />
            </>
          }
          <input value={password} type="password" placeholder='Пароль' onChange={(e) => setPassword(e.target.value)} />
          {authType === 'Регистрация' && <input value={confirmPassword} type="password" placeholder='Повторите пароль' onChange={(e) => setConfirmPassword(e.target.value)} />}
          <span className='flex justify-end cursor-pointer hover:underline' onClick={() => auth()}>
            {authType === 'Вход' && <>Войти</>}
            {authType === 'Регистрация' && <>Зарегистрироваться</>}
          </span>
          <span className={`text-slate-500 mt-1 flex justify-center transition-all opacity-0 ${authError !== '' && 'opacity-100'}`}>
            {authError}
          </span>
        </div>
      </PopUpComponent>
    </div>
  );
}

export default HeaderComponent;
