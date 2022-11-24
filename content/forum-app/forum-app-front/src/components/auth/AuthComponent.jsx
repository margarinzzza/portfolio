import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { login, register } from '../../features/authSlice';

function AuthComponent() {

  const dispatch = useDispatch()
  const [authStatus, setAuthStatus] = useState('register')
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const { loginError, registerError } = useSelector(state => state.auth)

  function auth(authType) {
    const userObj = { nickName, password }
    if (authType === 'login') {
      dispatch(login(userObj))
    } else {
      dispatch(register(userObj))
    }
  }

  return (
    <>
      {authStatus === 'register' ?
        <div className={`form`}>
          <h3>Регистрация</h3>
          <input onChange={(e) => setNickName(e.target.value)} value={nickName} type="text" placeholder='Никнейм' />
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Пароль' />
          <div className='flex flex-wrap justify-between mt-4'>
            <span>Уже есть аккаунт?<span onClick={() => setAuthStatus('login')} className='linkItem ml-2'>Войти</span></span>
            <span onClick={() => auth('register')} className='linkItem'>Зарегистрироваться</span>
          </div>
          <div className='text-center mt-2 text-gray-500'>{registerError !== '' && registerError}</div>
        </div>
        :
        <div className={`form`}>
          <h3>Авторизация</h3>
          <input onChange={(e) => setNickName(e.target.value)} value={nickName} type="text" placeholder='Никнейм' />
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Пароль' />
          <div className='flex flex-wrap justify-between mt-4'>
            <span>Нет аккаунта?<span onClick={() => setAuthStatus('register')} className='linkItem ml-2'>Зарегистрироваться</span></span>
            <span onClick={() => auth('login')} className='linkItem'>Войти</span>
          </div>
          <div className='text-center mt-2 text-gray-500'>{loginError !== '' && loginError}</div>
        </div>
      }
    </>
  );
}

export default AuthComponent;
