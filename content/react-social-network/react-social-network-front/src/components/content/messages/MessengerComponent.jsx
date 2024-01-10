import styles from './MessengerComponent.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom';
import MessagesComponent from './MessagesComponent';
import { getMyChats } from '../../../features/profile/chatSlice'
import { useEffect } from 'react';

const MessengerComponent = () => {
  const { myChats, selectedChat, messages } = useSelector(state => state.chat)
  const { userData } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyChats({ userId: userData._id }))
  }, [myChats])

  return (
    <div className={`${styles.messenger}`}>
      <div className={`${styles.dialogs}`}>
        <h1>Dialogs</h1>
        <div className={`${styles.dialogsList}`}>
          {myChats.length > 0 &&
            myChats.map((chat) => {
              return (
                <Link to={`${chat._id}`} key={chat._id}>
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash mr-1" viewBox="0 0 16 16">
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>
                    <span className={`${selectedChat?._id === chat._id && 'default-underline'}`} >
                      {chat.creatorId !== userData._id ? chat.creatorName : chat.participantName}
                    </span>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
      <Routes>
        <Route path=':chatId' element={<MessagesComponent />} />
        <Route path='/' element={<div className='text-center mt-4'>Select the dialog...</div>} />
      </Routes>
    </div>
  );
}

export default MessengerComponent;
