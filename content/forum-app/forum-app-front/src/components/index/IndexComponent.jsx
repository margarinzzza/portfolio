import styles from './IndexComponent.module.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { boardReducerAction, getBoards } from '../../features/boardSlice';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { getPostsNum } from '../../features/postSlice';

function IndexComponent() {

  const dispatch = useDispatch()
  function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2] }
    if (n1 > 1 && n1 < 5) { return text_forms[1] }
    if (n1 === 1) { return text_forms[0] }
    return text_forms[2]
  }
  const { boards, boardsLoadStatus, currentTape, showedBoardsNum, boardsLength, searchQuery } = useSelector(state => state.board)
  useEffect(() => {
    dispatch(getBoards({ currentTape, searchQuery }))
  }, [currentTape, searchQuery])
  useEffect(() => {
    dispatch(getPostsNum())
  }, [])
  const { postsNum } = useSelector(state => state.post)

  return (
    <>
      <p className='text-center mb-6 mt-4'>
        Gchan - это система форумов, где можно быстро и свободно общаться. <br />
        На данный момент {declOfNum(boardsLength, ['открыта', 'открыты', 'открыто'])} {boardsLength} {declOfNum(boardsLength, ['доска', 'доски', 'досок'])}.
        За все время существования {declOfNum(postsNum, ['был оставлен', 'было оставлено', 'было оставлено'])} {postsNum} {declOfNum(postsNum, ['пост', 'поста', 'постов'])}.
      </p>
      <div className={`${styles.boards}`}>
        <h2 className='text-center'>Доски</h2>
        <div className={`${styles.boardsList}`}>
          <input value={searchQuery} onChange={(e) => dispatch(boardReducerAction.setSearchQuery(e.target.value))} type="text" className='w-fit mb-2' placeholder='Поиск' />
          {boardsLoadStatus === 'loaded' ? boards.length > 0 ?
            <>
              <div className={`${styles.boardsListItem} border-b-2 border-indigo-300`}>
                <div className={`font-medium ${styles.boardsListLink}`}>Доска</div>
                <div className={`font-medium ${styles.boardsListName}`}>Название</div>
                <div className={`font-medium ${styles.boardsListDesc}`}>Описание</div>
                <div className={`font-medium ${styles.boardsListThreads}`}>Тредов</div>
                <div className={`font-medium ${styles.boardsListPosts}`}>Постов</div>
              </div>
              {boards.map(el => {
                return (
                  <div key={el.id} className={`${styles.boardsListItem}`}>
                    <Link to={`boards/${el.href}`} className={`linkItem ${styles.boardsListLink}`}>/{el.href}</Link>
                    <div className={`${styles.boardsListName}`}>{el.name}</div>
                    <div className={`${styles.boardsListDesc}`}>{el.desc}</div>
                    <div className={`${styles.boardsListThreads}`}>{el.threadsNum}</div>
                    <div className={`${styles.boardsListPosts}`}>{el.postsNum}</div>
                  </div>
                )
              })}
              <div className='text-center text-gray-500 mt-4'>Количество досок: {boardsLength} </div>
              {boardsLength > showedBoardsNum &&
                <div onClick={() => dispatch(boardReducerAction.loadMoreBoards())} className='text-center linkItem my-6'>
                  Загрузить больше
                </div>
              }
            </>
            : <div className='text-center text-gray-500 mt-4'>Доски отсутствуют</div>
            : <SpinnerComponent />
          }
        </div>
      </div>
    </>
  );
}

export default IndexComponent;
