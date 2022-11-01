import { useState } from 'react';
import styles from './AuthComponent.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { authActions, login } from '../../features/auth/authSlice';

const LoginComponent = ({ setAuthType }) => {
  const { loginError } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = () => {
    const userData = {
      email, password
    }
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    if (email === '' || password === '' ) {
      dispatch(authActions.setLoginError('Fill in the required fields'))
    } else if (!email.match(emailPattern)) {
      dispatch(authActions.setLoginError('Enter the correct mail format'))
    }
    else {
      dispatch(login(userData))
    }
  }

  return (
    <div className={`${styles.authForm} ${styles.login}`}>
      <h2>Login</h2>
      <div className={`${styles.formInput}`}>
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='e-mail' />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='password' />
      </div>
      <div className={`${styles.formSubmit}`}>
        <span>
          No account?
          <span className='link_item ml-2 font-bold' onClick={() => setAuthType('register')}>
            Registration
          </span>
        </span>
        <div onClick={() => loginHandler()} className='link_item'>
          Login
        </div>
      </div>
      <div className={`errorMessage ${loginError !== '' && 'showErrorMessage'} `}>
        {loginError}
      </div>
    </div>
  );
}

export default LoginComponent;