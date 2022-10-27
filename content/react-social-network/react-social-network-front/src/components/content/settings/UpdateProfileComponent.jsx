import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateError, updateProfile } from '../../../features/profile/authSlice';

const UpdateProfileComponent = () => {
  const dispatch = useDispatch()
  const { userData, updateError } = useSelector(state => state.auth)
  const [name, setName] = useState(userData.name)
  const [userName, setUserName] = useState(userData.userName)
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth)
  const [city, setCity] = useState(userData.city)
  const [status, setStatus] = useState(userData.status)
  const [password, setPassword] = useState(userData.password)
  useEffect(() => {
    dispatch(setUpdateError(''))
  }, [])
  const updateProfileHandler = () => {
    if (name === '' || userName === '' || password === '') {
      dispatch(setUpdateError('Fill all required fields'))
    } else if (name.match(/[a-z]/) == null) {
      dispatch(setUpdateError('The name must not contain digits'))
    } else if (password.length < 4) {
      dispatch(setUpdateError('The password contains at least 4 characters'))
    } else {
      dispatch(setUpdateError(''))
      const registerUserData = { name, userName, dateOfBirth, city, status, password }
      const userId = userData._id
      //window.localStorage.removeItem('token')
      dispatch(updateProfile({ registerUserData, userId }))
      dispatch(setUpdateError('Profile updated successfuly'))
      //setTimeout(window.location.reload(), 4000)
      
    }
  }

  return (
    <div className='flex flex-col items-center mt-6'>
      <h1>Updating profile</h1>
      <div className={`form`}>
        <input pattern="[a-z]" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='name' name="name" />
        <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder='username' name="username" />
        <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} type="date" placeholder='date of birth (optional)' name="dateOfBirth" />
        <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder='city (optional)' name="city" />
        <input value={status} onChange={(e) => setStatus(e.target.value)} type="text" placeholder='status (optional)' name="status" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' minLength={4} name="password" />
        <div className={`formSumitBtn`} onClick={() => updateProfileHandler()} >Send</div>
      </div>
      <div className='relative w-full'>
        <div className={`text-center hide-error ${updateError !== '' && 'show-error'}`}>{updateError}</div>
      </div>
    </div>
  );
}

export default UpdateProfileComponent;
