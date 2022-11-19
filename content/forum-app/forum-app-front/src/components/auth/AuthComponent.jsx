import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';

function AuthComponent() {

  const [authStatus, setAuthStatus] = useState('register')

  return (
    <>
      {authStatus === 'register' ?
        <div className={`form`}>
          <h3>Регистрация</h3>
          <input type="text" placeholder='Никнейм' />
          <input type="password" placeholder='Пароль' />
          <div className='flex flex-wrap justify-between mt-4'>
            <span>Уже есть аккаунт?<span onClick={() => setAuthStatus('login')} className='linkItem ml-2'>Войти</span></span>
            <span className='linkItem'>Зарегистрироваться</span>
          </div>
        </div>
        :
        <div className={`form`}>
          <h3>Авторизация</h3>
          <input type="text" placeholder='Никнейм' />
          <input type="password" placeholder='Пароль' />
          <div className='flex flex-wrap justify-between mt-4'>
            <span>Нет аккаунта?<span onClick={() => setAuthStatus('register')} className='linkItem ml-2'>Зарегистрироваться</span></span>
            <span className='linkItem'>Войти</span>
          </div>
        </div>
      }
    </>
  );
}

export default AuthComponent;
