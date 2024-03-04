import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../inputs/InputComponent";
import { authSliceActions, login } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { returnSocket } from "../../App";

const LoginComponent = () => {

  const socket = returnSocket()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loginData, authError } = useSelector(state => state.authSlice)
  const setLoginData = (value) => { dispatch(authSliceActions.setLoginData(value)) }
  const loginHandler = async (loginData) => {
    if (!loginData.email || loginData.email.length === 0) return dispatch(authSliceActions.setAuthError('Введите email'))
    if (!loginData.password || loginData.password.length === 0) return dispatch(authSliceActions.setAuthError('Введите пароль'))
    await dispatch(login(loginData)).unwrap().then(r => {
      socket.emit('addUser', {userId: r.data._id, socketId: socket.id} )
      navigate('/')
    }).catch(e=>{})
  }

  return (
    <div className={`auth auth-login`}>
      <h1>Авторизация</h1>
      <div className={`authForm`}>
        <InputComponent type={'email'} name={'email'} placeholder={'Email'} setValue={setLoginData} value={loginData.email} valuesData={loginData} />
        <InputComponent type={'password'} name={'password'} placeholder={'Пароль'} setValue={setLoginData} value={loginData.password} valuesData={loginData} />
        <div className="flex">
          <div onClick={() => loginHandler(loginData)} className={`button my-3`}>Войти</div>
          <div className={`ml-10 flex items-center ${authError !== '' ? 'opacity-100' : 'opacity-0'}`} >
            <div className="w-[7px] h-[7px] bg-[red] rounded-[50%]"></div>
            <span className={`ml-2 text-red-600 transition-all`}>{authError}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent;
