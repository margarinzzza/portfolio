import styles from './IndexComponent.module.scss'
import { Link } from 'react-router-dom'
import { boards } from '../../states';

function IndexComponent() {

  return (
    <>
      <p className='text-center mb-6 mt-4'>
        Gchan - это система форумов, где можно быстро и свободно общаться. <br />
        На данный момент открыто X досок. За все время существования было оставлено X постов.
      </p>
      <div className={`${styles.boards}`}>
        <h2 className='text-center'>Доски</h2>
        <div className={`${styles.boardsList}`}>
          <div className={`${styles.boardsListItem} border-b-2 border-indigo-300`}>
            <div className={`font-medium ${styles.boardsListId}`}>Id</div>
            <div className={`font-medium ${styles.boardsListLink}`}>Доска</div>
            <div className={`font-medium ${styles.boardsListName}`}>Название</div>
            <div className={`font-medium ${styles.boardsListDesc}`}>Описание</div>
            <div className={`font-medium ${styles.boardsListPosts}`}>Постов</div>
          </div>
          {boards.map(el => {
            return (
              <div key={el.id} className={`${styles.boardsListItem}`}>
                <div className={`${styles.boardsListId}`}>{el.id}</div>
                <Link to={`boards/${el.board}`} className={`linkItem ${styles.boardsListLink}`}>/{el.board}</Link>
                <div className={`${styles.boardsListName}`}>{el.name}</div>
                <div className={`${styles.boardsListDesc}`}>{el.desc}</div>
                <div className={`${styles.boardsListPosts}`}>{el.posts}</div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default IndexComponent;
