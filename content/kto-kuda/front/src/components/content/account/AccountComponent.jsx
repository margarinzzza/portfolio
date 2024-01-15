import { useDispatch, useSelector } from "react-redux";
import { authSliceActions, deleteUser, updateUser } from "../../../features/authSlice";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { declOfNum } from "../../../funcs";
import PopUpComponent from "../../popUp/PopUpComponent";
import { DropdownListComponent } from '../../dropdownList/DropdownListComponent'
import { MultiselectListComponent } from '../../multiselectList/MultiselectListComponent'
import { cities } from "../../../staticStates";
import { categories } from "../../../staticStates";
import reserveAvatar from '../../../media/img/ava.png'

const AccountComponent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isAuth, userData, authError } = useSelector(state => state.authSlice)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [popUpVisible, setPopUpVisible] = useState(false)

  const [userName, setUserName] = useState(userData.name)
  const [age, setAge] = useState(userData.age)
  const [password, setPassword] = useState(userData.password)
  const [city, setCity] = useState(userData.city)
  const [interests, setInterests] = useState(userData.interests)
  const [avatarUrl, setAvatarUrl] = useState('')

  const updateProfile = async () => {
    const nameRegex = /^[a-zA-Zа-яёА-ЯЁ]{3,}$/i
    if (!nameRegex.test(userName)) return dispatch(authSliceActions.setAuthError('Введите корректное имя'))
    if (age < 14) return dispatch(authSliceActions.setAuthError('Пользователи должны достигнуть 14 лет'))
    if (age > 100) return dispatch(authSliceActions.setAuthError('Введите корректный возраст'))
    if (city === '') return dispatch(authSliceActions.setAuthError('Укажите город'))
    if (password.length < 4 || password.length > 15) return dispatch(authSliceActions.setAuthError('Пароль содержит минимум 4 символа'))
    const updateUserData = { name: userName, city, age, interests, password, id: userData._id, avatarUrl }
    dispatch(updateUser(updateUserData))
  }

  return (
    <div className="account">
      <h1>Мой аккаунт</h1>
      <div className={`flex my-4`}>
        <img className="w-40 rounded-[10px]" src={userData.avatarUrl === '' ? reserveAvatar : userData.avatarUrl} alt="ava" />
        <div className={`flex flex-col ml-4`}>
          <h2>{userData.name}, {userData.age}</h2>
          <span className="flex items-center text-slate-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 bi bi-geo-alt" viewBox="0 0 16 16">
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>{userData.city}</span>
          <span className="hover:underline cursor-pointer">{userData.events.length} {declOfNum(userData.events.length, ['событие', 'события', 'событий'])}</span>
        </div>
      </div>
      <div>
        <h3>Дополнительная информация</h3>
        <div className={`detail-info`}>
          <div className={`detail-info_item flex flex-wrap p-2`}>
            <div className={`item_property mr-3 text-slate-500`}>Интересы {userData.interests.length == 0 && 'не выбраны'}</div>
            <div className={`item_value flex flex-col`}>
              <div className={`flex flex-wrap`}>
                {userData.interests.length !== 0 && userData.interests.map((el, idx) => {
                  return <span key={idx} className={`cursor-pointer p-2 m-2 mt-0 border border-indigo-600 rounded-full transition-all hover:border-indigo-900`}>{el}</span>
                })}
              </div>
            </div>
          </div>
          <div className={`detail-info_item flex flex-wrap p-2`}>
            <div className={`item_property mr-3 text-slate-500`}>Пароль</div>
            <div className={`item_value flex flex-col`}>
              <span className="flex items-center">{showPassword ? userData.password : '*'.repeat(userData.password.length)}
                <svg onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ml-2 bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-8">
        <span className={`text-red-700 flex items-center cursor-pointer mx-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
          {confirmDelete ? <span onClick={() => { dispatch(deleteUser({ id: userData._id })); navigate('/') }}>Подтвердить</span> : <span onClick={() => setConfirmDelete(true)}>Удалить аккаунт</span>}
        </span>
        <span onClick={() => { dispatch(authSliceActions.logout()); navigate('/') }} className={`text-slate-500 flex items-center cursor-pointer mx-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 bi bi-door-open" viewBox="0 0 16 16">
            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
          </svg> Выйти из аккаунта
        </span>

        <span onClick={() => { setPopUpVisible(true) }} className={`text-slate-500 flex items-center cursor-pointer mx-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg> Редактировать
        </span>
        <PopUpComponent popUpVisible={popUpVisible} setPopUpVisible={setPopUpVisible} title={'Редактировать'}>
          <div className={'form '}>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder={'Имя'} />
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder={'Возраст'} />
            <DropdownListComponent data={cities} selectedItem={city} setItem={setCity} placeholder={'город'} />
            <MultiselectListComponent data={categories} selectedData={interests} setItem={setInterests} placeholder={'ваши интересы'} />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={'Пароль'} />
            <span className='flex justify-end cursor-pointer hover:underline' onClick={() => updateProfile()}>Подтвердить</span>
            <span className={`text-slate-500 mt-1 flex justify-center transition-all opacity-0 ${authError !== '' && 'opacity-100'}`}>
              {authError}
            </span>

          </div>
        </PopUpComponent>
      </div>
    </div>
  );
}

export default AccountComponent;
