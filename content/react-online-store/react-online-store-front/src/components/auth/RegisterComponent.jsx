import { useState } from 'react';
import styles from './AuthComponent.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { authActions, register } from '../../features/auth/authSlice';

const RegisterComponent = ({ setAuthType }) => {
  const {registerError} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const registerHandler = () => {
    const userData = {
      email, password
    }
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    if (email === '' || password === '') {
      dispatch(authActions.setRegisterError('Fill in the required fields'))
    } else if (!email.match(emailPattern)) {
      dispatch(authActions.setRegisterError('Enter the correct mail format'))
    } 
    else if (password.length<4) {
      dispatch(authActions.setRegisterError('Password must contain at least 4 characters'))
    }
    else {
      dispatch(register(userData))
    }
  }

  return (
    <div className={`${styles.authForm} ${styles.register}`}>
      <h2>Registration</h2>
      <div className={`${styles.formInput}`}>
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='e-mail' />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='password' />
      </div>
      <div className={`${styles.formSubmit}`}>
        <span>
          Have an account?
          <span className='link_item ml-2 font-bold' onClick={() => setAuthType('login')}>
            Login
          </span>
        </span>
        <div onClick={() => registerHandler()} className='link_item'>
          Register
        </div>
      </div>
      <div className={`errorMessage ${registerError !== '' && 'showErrorMessage'}`}>
        {registerError}
      </div>
    </div>
  );
}

export default RegisterComponent;