import { useState } from 'react';
import { registerUser, setRegisterError } from '../../../features/profile/authSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';

const RegisterComponent = ({ setAuthType }) => {
  const dispatch = useDispatch()
  const { registerError } = useSelector(state => state.auth)
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [city, setCity] = useState('')
  const [status, setStatus] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const registerHandler = () => {
    if (name === '' || userName === '' || password === '' || confirmPassword === '') {
      dispatch(setRegisterError('Fill all required fields'))
    }else if (name.match(/[a-z]/)==null) {
      dispatch(setRegisterError('The name must not contain digits'))
    } else if (password.length < 4) {
      dispatch(setRegisterError('The password contains at least 4 characters'))
    }
    else if (password !== confirmPassword) {
      dispatch(setRegisterError(`Passwords don't match`))
    } else {
      dispatch(setRegisterError(''))
      const registerUserData = { name, userName, dateOfBirth, city, status, password }
      dispatch(registerUser(registerUserData))
    }
  }

  return (
    <>
      <h1>Register</h1>
      <div className={`form`}>
        <input pattern="[a-z]" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='name *' name="name" />
        <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder='username (used to login) *' name="username" />
        <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} type="date" placeholder='date of birth (optional)' name="dateOfBirth" />
        <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder='city' name="city" />
        <input value={status} onChange={(e) => setStatus(e.target.value)} type="text" placeholder='status' name="status" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password *' minLength={4} name="password" />
        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='confirm password *' name="confirmPassword" />
        <div className={`formSumitBtn`} onClick={() => registerHandler()} >Send</div>
      </div>
      <div className='relative w-full'>
        <div className={`text-center hide-error ${registerError !== '' && 'show-error'}`}>{registerError}</div>
      </div>

      <h2>Have an account?
        <span onClick={() => setAuthType('login')}> Login</span>
      </h2>
    </>
  );
}

export default RegisterComponent;
