import styles from './BoardComponent.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getBoard } from '../../features/boardSlice';
import { createThread, getThreads, threadReducerAction } from '../../features/threadSlice';
import SpinnerComponent from '../spinner/SpinnerComponent';
import CreateThreadFormComponent from './CreateThreadFormComponent';

function BoardComponent() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { boardHref } = useParams();
  useEffect(() => {
    dispatch(getBoard({ boardHref }))
  }, [])
  const { userData } = useSelector((state) => state.auth)
  const { board, boardLoadStatus } = useSelector((state) => state.board)
  const { threadName, threadDesc, showedThreadsNum, threadsLength, threadsLoadStatus, searchQuery, currentTape, threads } = useSelector((state) => state.thread)
  const [popUp, setPopUp] = useState(false)
  useEffect(() => {
    if (boardLoadStatus === 'loaded') {
      dispatch(getThreads({ boardId: board.id, searchQuery, currentTape }))
    }
  }, [boardLoadStatus, currentTape, searchQuery])
  function createThreadHandler() {
    setPopUp(false)
    let userId
    let creatorNickName
    if (userData.length > 0) {
      userId = userData.id
      creatorNickName = userData.nickName
    } else {
      userId = 'Аноним'
      creatorNickName = 'Аноним'
    }
    dispatch(createThread({ userId, name: threadName, desc: threadDesc, creatorNickName, boardId: board.id }))
  }

  return (
    <div className={`${styles.board}`}>
      {board === 'not found' ?
        <div className='text-center text-gray-500'>Доска не найдена</div>
        :
        <>
          <CreateThreadFormComponent func={createThreadHandler} visible={popUp} setVisible={setPopUp} />
          <div className={`${styles.boardTitle}`}>
            <h1>{board.name}</h1>
            <span onClick={() => setPopUp(true)} className='linkItem'>Создать тред</span>
          </div>
          {threadsLoadStatus === 'loaded' ? threads.length > 0 ?
            <>
              <input className='m-2' value={searchQuery} onChange={(e) => dispatch(threadReducerAction.setSearchQuery(e.target.value))} type="text" placeholder='Поиск' />
              <div className={`${styles.threadList}`}>
                {threads.map(el => {
                  return (
                    <Link key={el.id} to={`${el.id}`} className={`${styles.threadListItem}`}>
                      <img src="https://proprikol.ru/wp-content/uploads/2020/09/kartinki-lyagushki-52.jpg" alt="$" />
                      <div>
                        <div className='flex justify-between'>
                          <span>Создатель: {el.creatorNickName}</span>
                          <span>Постов: {el.postsNum}</span>
                        </div>
                        <h4>{el.name}</h4>
                        <p>{el.desc}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className='text-center text-gray-500 mt-4'>Количество тредов: {board.threadsNum} </div>
              {threadsLength > showedThreadsNum &&
                <div onClick={() => dispatch(threadReducerAction.loadMoreThreads())} className='text-center linkItem my-6'>
                  Загрузить больше
                </div>
              }
            </>
            : <div className='text-center text-gray-500 mt-4'>Треды отсутствуют</div>
            : <SpinnerComponent />
          }
        </>
      }

    </div>
  );
}

export default BoardComponent;
