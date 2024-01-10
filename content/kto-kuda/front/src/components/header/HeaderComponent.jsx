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

  const auth = async () => {
    const telRegex = /((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}/
    const nameRegex = /^[a-zA-Zа-яёА-ЯЁ]{3,}$/i
    if (!telRegex.test(phoneNumber)) {
      return dispatch(authSliceActions.setAuthError('Введите корректный телефон'))
    }
    if (authType === 'Вход') {
      const loginUserData = { phone: phoneNumber, password }
      await dispatch(login(loginUserData))
        .unwrap()
        .then(() => {
          setPopUpVisible(false)
        })
        .catch(() => {
          console.log('провал')
        })

    } else {
      if (!nameRegex.test(userName)) {
        return dispatch(authSliceActions.setAuthError('Введите корректное имя'))
      }
      if (age < 14) {
        return dispatch(authSliceActions.setAuthError('Пользователи должны достигнуть 14 лет'))
      }
      if (age > 100) {
        return dispatch(authSliceActions.setAuthError('Введите корректный возраст'))
      }
      if (city === '') {
        return dispatch(authSliceActions.setAuthError('Укажите город'))
      }
      if (password.length < 4 || password.length > 15) {
        return dispatch(authSliceActions.setAuthError('Пароль содержит минимум 4 символа'))
      }
      if (password !== confirmPassword) {
        return dispatch(authSliceActions.setAuthError('Пароли не совпадают'))
      }
      const registerUserData = { phone: phoneNumber, name: userName, avatarUrl, city, age, interests, password }
      await dispatch(registerUser(registerUserData))
        .unwrap()
        .then(() => {
          //console.log('успех')
        })
        .catch(() => {
          //console.log('провал')
        })
    }
  }

  return (
    <div className="header flex justify-between items-center">
      <div className={`header_logo flex`}>
        <img src={logo} alt="Кто куда" />
        <div className={`header_logo_name`}>
          <Link to={'/'}>
            <h1>Кто куда</h1>
          </Link>
        </div>
      </div>
      <div className={`header_nav flex`}>
        {isAuth ?
          <>
            <ul className={`nav_items`}>
              <Link to={'/'}>События</Link>
              <Link to={'/my-proposals'}>Мои предложения</Link>
              <Link to={'/alerts'}>Уведомления</Link>
              <Link to={'/my-events'}>Мои события</Link>
            </ul>
            <div className={`nav_account flex`}>
              <img src={userData.avatarUrl === '' ? reserveAvatar : userData.avatarUrl} alt="ava" />
              <div className={`ms-2`}>
                <h4>{userData !== null && userData.name}</h4>
                <Link to={'/account'} className={`text-sm text-slate-500`}>В кабинет</Link>
              </div>
            </div>
          </>
          :
          <ul className={`nav_items`}>
            <span onClick={() => {
              dispatch(authSliceActions.setAuthType('Вход'))
              setPopUpVisible(true);
            }}>Вход</span>
            <span onClick={() => {
              dispatch(authSliceActions.setAuthType('Регистрация'))
              setPopUpVisible(true);
            }}>Регистрация</span>
          </ul>
        }

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
