import { useState } from 'react';
import { loginUser, setLoginError } from '../../../features/profile/authSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';

const LoginComponent = ({ setAuthType }) => {
  const dispatch = useDispatch()
  const { loginError } = useSelector(state => state.auth)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const loginHandler = () => {
    if (userName === '' || password === '') {
      dispatch(setLoginError('Fill all required fields'))
    } else {
      dispatch(setLoginError(''))
      const loginUserData = { userName, password }
      dispatch(loginUser(loginUserData))
    }
  }

  return (
    <>
      <h1>Login</h1>
      <div className={`form`}>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder='username' name="username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' name="password" />
        <div className={`formSumitBtn`} onClick={() => loginHandler()}>Send</div>
      </div>
      <div className='relative w-full'>
        <div className={`text-center hide-error ${loginError !== '' && 'show-error'}`}>{loginError}</div>
      </div>
      <h2>No account?
        <span onClick={() => setAuthType('register')}> Register</span>
      </h2>
    </>
  );
}

export default LoginComponent;
