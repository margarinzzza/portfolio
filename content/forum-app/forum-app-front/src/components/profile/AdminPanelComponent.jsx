import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react';
import styles from './ProfileComponent.module.scss'
import { useEffect } from 'react';
import { adminReducerAction, blockUser, getUsers } from '../../features/adminSlice';
import SpinnerComponent from '../spinner/SpinnerComponent';
import { boardReducerAction, createBoard } from '../../features/boardSlice';

function AdminPanelComponent() {

  const dispatch = useDispatch()
  const { searchQuery, usersLoadingStatus, currentTape, usersDataLength, showedUsersNum } = useSelector((state) => state.admin)
  const { boardName, boardDesc, boardHref, createBoardError } = useSelector((state) => state.board)

  useEffect(() => {
    dispatch(getUsers({ currentTape, searchQuery }))
  }, [searchQuery, currentTape])
  const { usersData } = useSelector((state) => state.admin)
  const [actionType, setActionType] = useState('')

  function createBoardHandler() {
    dispatch(createBoard({ boardName, boardDesc, boardHref }))
  }

  function actionHandler() {
    switch (actionType) {
      case 'findUser':
        return (
          <div>
            <input className='mb-4 nt-2' onChange={(e) => dispatch(adminReducerAction.setSearchQuery(e.target.value))} value={searchQuery} type="text" placeholder='nickname' />
            <div className={`${styles.userList}`}>
              {usersLoadingStatus === 'loaded' ?
                usersData.length > 0 ?
                  usersData.map((el, idx) => {
                    return (
                      <div key={el.id} className={` ${el.isBanned === true && 'opacity-40'} ${idx % 2 === 0 && 'bg-slate-300'} ${styles.userListItem}`}>
                        <div className={`${styles.userListItemData}`}>
                          <span>Никнейм: {el.nickName} </span>
                          <span>Id: {el.id} </span>
                          <span>Роль: {el.role} </span>
                          <span>Количество созданных тредов: {el.threadsNum}</span>
                          <span>Количество постов: {el.postsNum}</span>
                          {el.isBanned === true && <span>Status: banned</span>}
                        </div>
                        <div onClick={() => dispatch(blockUser({ userId: el.id }))} className={`${styles.userListItemActions} linkItem p-4`}>
                          Заблокировать
                        </div>
                      </div>
                    )
                  })
                  : <div className='text-center text-gray-500 mt-4'>Пользователи отсутствуют</div>
                : <SpinnerComponent />
              }
              {usersDataLength > showedUsersNum &&
                <div onClick={() => dispatch(adminReducerAction.loadMoreUsers())} className='text-center linkItem my-6'>
                  Загрузить больше
                </div>
              }
            </div>
          </div>
        )
      case 'createBoard':
        return (
          <div>
            <div className={`form`}>
              <h3>Создание доски</h3>
              <input onChange={(e) => dispatch(boardReducerAction.setBoardName(e.target.value))} value={boardName} type="text" placeholder='Название' />
              <textarea onChange={(e) => dispatch(boardReducerAction.setBoardDesc(e.target.value))} value={boardDesc} placeholder='Описание' rows="4"></textarea>
              <input onChange={(e) => dispatch(boardReducerAction.setBoardHref(e.target.value))} value={boardHref} type="text" placeholder='Ссылка' />
              <span onClick={() => createBoardHandler()} className='text-right p-2 linkItem'>Создать</span>
              <span className='text-gray-500 text-center'>{createBoardError !== '' && createBoardError}</span>
            </div>
          </div>
        )
      default: break;
    }
  }

  return (
    <div>
      {actionType !== '' && <span className='linkItem' onClick={() => setActionType('')}>Назад</span>}
      {actionType === '' &&
        <ul>
          <li className='linkItem' onClick={() => setActionType('findUser')}>Найти юзера</li>
          <li className='linkItem' onClick={() => setActionType('createBoard')}>Создать доску</li>
        </ul>
      }
      {actionHandler()}
    </div>
  );
}

export default AdminPanelComponent;
