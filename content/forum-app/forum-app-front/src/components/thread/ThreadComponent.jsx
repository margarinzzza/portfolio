import styles from './ThreadComponent.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { useEffect, useRef } from 'react';
import { getThread } from '../../features/threadSlice';
import { createPost, getPosts, postReducerAction } from '../../features/postSlice';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { getBoard } from '../../features/boardSlice';

function ThreadComponent() {

  const dispatch = useDispatch()
  const { threadId } = useParams();
  const { boardHref } = useParams();
  useEffect(() => {
    dispatch(getBoard({ boardHref }))
    dispatch(getThread({ threadId }))
    dispatch(getPosts({ threadId }))
  }, [])
  const threadTop = useRef()
  const threadBottom = useRef()
  const { userData } = useSelector((state) => state.auth)
  const { thread, threadLoadStatus } = useSelector((state) => state.thread)
  const { board } = useSelector((state) => state.board)
  const { posts, postsLoadingStatus, createPostErrors, text } = useSelector((state) => state.post)
  let treadCreatedAtDate
  let treadCreatedAtTime

  if (threadLoadStatus === 'loaded') {
    treadCreatedAtDate = thread.createdAt.slice(0, 10)
    treadCreatedAtTime = thread.createdAt.slice(11, 19)
  }

  function setPostCreatedAt(time) {
    treadCreatedAtDate = time.slice(0, 10)
    treadCreatedAtTime = time.slice(11, 19)
    return `${treadCreatedAtDate} ${treadCreatedAtTime}`
  }

  function createPostHandler() {
    const boardId = board.id
    const threadId = thread.id
    let creatorNickName
    let userId
    if (userData.length > 0) {
      creatorNickName = userData.nickName
      userId = userData.id
    } else {
      creatorNickName = 'Аноним'
      userId = 'Аноним'
    }
    dispatch(createPost({ boardId, threadId, creatorNickName, text, userId }))
  }

  return (

    <div className={`${styles.thread}`}>
      {board === 'not found' ?
        <div className='text-center text-gray-500'>Доска не найдена</div>
        :
        thread === 'not found' ?
          <div className='text-center text-gray-500'>Тред не найден</div>
          :
          <>
            <div ref={threadTop} className={`${styles.threadHeader}`}>
              <img src="https://proprikol.ru/wp-content/uploads/2020/09/kartinki-lyagushki-52.jpg" alt="^" />
              <div className={`${styles.threadHeaderData}`}>
                <div className={`${styles.threadCreatorInfo}`}>
                  <span>{thread.creatorNickName}</span>
                  <span>{treadCreatedAtDate} {treadCreatedAtTime}</span>
                  <span>#{thread.id}</span>
                </div>
                <h2 className='my-2'>{thread.name}</h2>
                <p>{thread.desc}</p>
              </div>
            </div>
            <div className={`${styles.postList}`}>
              {postsLoadingStatus === 'loaded' ?
                posts.length > 0 ?
                  posts.map(el => {
                    return (
                      <div key={el.id} className={`${styles.postListItem}`}>
                        <div className={`${styles.postCreatorInfo}`}>
                          <span>{el.creatorNickName}</span>
                          <span>{setPostCreatedAt(el.createdAt)}</span>
                          <span>#{el.id}</span>
                        </div>
                        <p>{el.text}</p>
                      </div>
                    )
                  })
                  : <div className='text-center text-gray-500 mt-4'>Посты отсутствуют</div>
                : <SpinnerComponent />
              }
            </div>
            <div ref={threadBottom} className={`${styles.postForm}`}>
              <textarea value={text} onChange={(e) => dispatch(postReducerAction.setText(e.target.value))} placeholder='Блаблабла..' rows="4"></textarea>
              <span onClick={() => createPostHandler()} className='z-10 linkItem'>Отправить</span>
              <i className='text-gray-500'>{createPostErrors !== '' && createPostErrors}</i>
            </div>
            <div className={`${styles.navArrows}`}>
              <i onClick={() => threadTop.current.scrollIntoView({ behavior: "smooth", })} className="bi bi-arrow-up"></i>
              <i onClick={() => threadBottom.current.scrollIntoView({ behavior: "smooth", })} className="bi bi-arrow-down"></i>
            </div>
          </>
      }
    </div>
  );
}

export default ThreadComponent;
