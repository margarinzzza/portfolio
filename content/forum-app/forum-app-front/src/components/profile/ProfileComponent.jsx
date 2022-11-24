import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { deleteUser, updateUser } from '../../features/authSlice';

function ProfileComponent() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData, redactProfileError } = useSelector((state) => state.auth)
  const [redactFormVisible, setRedactFormVisible] = useState(false)
  const [newNickName, setNewNickName] = useState(userData.nickName)
  const [newPassword, setNewPasword] = useState(userData.password)
  const [deleting, setDeleting] = useState(false)
  function deleteMe() {
    dispatch(deleteUser({ userId: userData.id }))
    navigate('/')
  }
  function redactProfileHandler() {
    let userId = userData.id
    const userObj = { newNickName, newPassword, userId }
    dispatch(updateUser(userObj))
  }

  return (
    <>
      <h3>Здравствуйте, {userData.nickName}</h3>
      <div className='flex flex-col my-2'>
        <span>Количество созданных тредов: {userData.threadsNum}</span>
        <span>Количество постов: {userData.postsNum}</span>
      </div>
      <div className='flex justify-center flex-wrap'>
        <span onClick={() => setRedactFormVisible(!redactFormVisible)} className='m-2 linkItem'>Редактировать профиль</span>
        {deleting ?
          <>
            <span onClick={() => deleteMe()} className='m-2 linkItem'>Подтвердить</span>
            <span onClick={() => setDeleting(false)} className='m-2 linkItem'>Отменить</span>
          </>
          :
          <span onClick={() => setDeleting(true)} className='m-2 linkItem'>Удалить профиль</span>
        }

      </div>
      {redactFormVisible &&
        <div className={`form`}>
          <h3>Редактирование</h3>
          <input type="text" onChange={(e) => setNewNickName(e.target.value)} value={newNickName} placeholder='Новый никнейм' />
          <input type="text" onChange={(e) => setNewPasword(e.target.value)} value={newPassword} placeholder='Новый пароль' />
          <div className='flex justify-between mt-4'>
            <span onClick={() => setRedactFormVisible(false)} className='linkItem'>Отменить</span>
            <span onClick={() => redactProfileHandler()} className='linkItem'>Редактировать</span>
          </div>
          <span className='text-gray-500 text-center'>{redactProfileError !== '' && redactProfileError}</span>
        </div>
      }

    </>
  );
}

export default ProfileComponent;
