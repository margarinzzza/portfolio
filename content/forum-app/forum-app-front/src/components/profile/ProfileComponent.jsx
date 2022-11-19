import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';

function ProfileComponent() {

  const { isAuth } = useSelector((state) => state.auth)
  const [redactFormVisible, setRedactFormVisible] = useState(false)

  return (
    <>
      <h3>Здравствуйте, Margarinzza</h3>
      <div className='flex flex-col my-2'>
        <span>Количество созданных тредов: X</span>
        <span>Количество отравленных сообщений: X</span>
      </div>
      <div className='flex justify-center flex-wrap'>
        <span onClick={() => setRedactFormVisible(!redactFormVisible)} className='m-2 linkItem'>Редактировать профиль</span>
        <span className='m-2 linkItem'>Удалить профиль</span>
        <span className='m-2 linkItem'>Выйти</span>
      </div>
      {redactFormVisible &&
        <div className={`form`}>
          <h3>Редактирование</h3>
          <input type="text" placeholder='Никнейм' />
          <input type="password" placeholder='Пароль' />
          <div className='flex justify-between mt-4'>
            <span onClick={() => setRedactFormVisible(false)} className='linkItem'>Отменить</span>
            <span className='linkItem'>Редактировать</span>
          </div>
        </div>
      }

    </>
  );
}

export default ProfileComponent;
