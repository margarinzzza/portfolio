import styles from './BoardComponent.module.scss'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';

function BoardComponent() {

  const { isAuth } = useSelector((state) => state.auth)
  const [authSettings, setAuthSettings] = useState(false)
  const { boardName } = useParams();

  return (

    <div className={`${styles.board}`}>
      <div className={`${styles.boardTitle}`}>
        <h1>Бред</h1>
        <span className='linkItem'>Создать тред</span>
      </div>
      <input type="text" placeholder='Поиск' />
      <div className={`${styles.boardList}`}>
        <Link to={'2'} className={`${styles.boardListItem}`}>
          <img src="https://2ch.hk/b/thumb/277842064/16688733031360s.jpg" alt="$" />
          <div>
            <span>Постов: 5</span>
            <h4>Заголовок</h4>
            <p>Текст</p>
          </div>
        </Link>
      </div>
      <div className='text-center linkItem my-8'>
        Загрузить больше
      </div>
    </div>
  );
}

export default BoardComponent;
