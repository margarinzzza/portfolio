import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../inputs/InputComponent";
import { authSliceActions, registerUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { returnSocket } from "../../App";

const RegisterComponent = () => {

  const socket = returnSocket()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authError, registerData } = useSelector(state => state.authSlice)
  const setRegisterData = (value) => { dispatch(authSliceActions.setRegisterData(value)) }
  const register = async (registerData) => {
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    const nameRegex = /^[a-zA-Zа-яёА-ЯЁ]{2,20}$/i
    const linkRegex = /^\w+$/
    if (!registerData.email || registerData.email.length === 0) return dispatch(authSliceActions.setAuthError('Введите email'))
    if (!emailRegex.test(registerData.email)) return dispatch(authSliceActions.setAuthError('Введите корректный email'))

    if (!registerData.name || registerData.name.length === 0) return dispatch(authSliceActions.setAuthError('Введите имя'))
    if (!nameRegex.test(registerData.name)) return dispatch(authSliceActions.setAuthError('Введите корректное имя'))

    if (!registerData.surname || registerData.surname.length === 0) return dispatch(authSliceActions.setAuthError('Введите фамилию'))
    if (!nameRegex.test(registerData.surname)) return dispatch(authSliceActions.setAuthError('Введите корректную фамилию'))

    if (!registerData.link || registerData.link.length === 0) return dispatch(authSliceActions.setAuthError('Введите никнейм'))
    if (!linkRegex.test(registerData.link)) return dispatch(authSliceActions.setAuthError('Введите корректный никнейм'))

    if (!registerData.password || registerData.password.length === 0) return dispatch(authSliceActions.setAuthError('Введите пароль'))
    if (registerData.password.length < 6) return dispatch(authSliceActions.setAuthError('Пароль содержит минимум 6 символов'))
    if (registerData.password !== registerData.confirmPassword) return dispatch(authSliceActions.setAuthError('Пароли не совпадают'))
    await dispatch(registerUser(registerData)).unwrap().then(r => {
      socket.emit('addUser', {userId: r.data._id, socketId: socket.id})
      navigate('/')
    }).catch(e => { })
  }

  return (
    <div className={`auth auth-register`}>
      <h1>Регистрация</h1>
      <div className={`authForm`}>
        <InputComponent type={'email'} name={'email'} placeholder={'Email'} setValue={setRegisterData} value={registerData.email} valuesData={registerData} />
        <InputComponent type={'text'} name={'name'} placeholder={'Имя'} setValue={setRegisterData} value={registerData.name} valuesData={registerData} />
        <InputComponent type={'text'} name={'surname'} placeholder={'Фамилия'} setValue={setRegisterData} value={registerData.surname} valuesData={registerData} />
        <h4 className="mt-3">Придумайте никнейм, он будет ссылкой на вашу страницу</h4>
        <InputComponent type={'text'} name={'link'} placeholder={'@nickName'} setValue={setRegisterData} value={registerData.link} valuesData={registerData} />
        <InputComponent type={'password'} name={'password'} placeholder={'Пароль'} setValue={setRegisterData} value={registerData.password} valuesData={registerData} />
        <InputComponent type={'password'} name={'confirmPassword'} placeholder={'Повторите пароль'} setValue={setRegisterData} value={registerData.confirmPassword} valuesData={registerData} />
        <div className="flex">
          <div onClick={() => register(registerData)} className={`button my-3`}>Зарегистрироваться</div>
          <div className={`ml-10 flex items-center ${authError !== '' ? 'opacity-100' : 'opacity-0'}`} >
            <div className="w-[7px] h-[7px] bg-[red] rounded-[50%]"></div>
            <span className={`ml-2 text-red-600 transition-all`}>{authError}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent;
