import styles from './MessengerComponent.module.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMessages, selectDialog, sendMessage } from '../../../features/profile/chatSlice'
import { useEffect, useState } from 'react'
import { useRef } from 'react';

const MessagesComponent = () => {
  const { selectedChat, myChats, messages } = useSelector(state => state.chat)
  const { userData } = useSelector(state => state.auth)
  const { chatId } = useParams()

  const messageChat = useRef(null)
  const scrollToBottom = () => {
    messageChat.current?.scrollIntoView({ behavior: "auto", block: 'nearest', inline: 'start'})
  }

  useEffect(() => {
    dispatch(getMessages({ chatId }))
    scrollToBottom()
  }, [])

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(selectDialog(chatId))
  }, [chatId])

  const [messageText, setMessageText] = useState('')
  const [isEmptyPostText, setIsEmptyPostText] = useState(false)

  const addMessageHandler = (messageText) => {
    if (messageText !== '') {
      setIsEmptyPostText(false)
      const newMessage = {
        chatId,
        senderName: userData.name,
        text: messageText
      }
      dispatch(sendMessage(newMessage))
      setMessageText('')
      messageChat.scrollIntoView({ behavior: "smooth" })
    } else setIsEmptyPostText(true)

  }


  return (
    <div className={`${styles.messages}`}>
      {selectedChat !== null ?
        messages.length > 0 ?
          // НЕПУСТОЙ ДИАЛОГ
          <>
            <div  className={`${styles.messageList}`}>
              <div  className={`${styles.messageChat}`}>
                {messages.map(message => {
                  return (
                    <div ref={messageChat} key={message._id} className={`${message.senderName == userData.name && styles.myMessage} ${styles.message}`}>
                      <div className={`${styles.messageSender}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                        <span>
                          {message.senderName !== userData.name ? message.senderName : 'You'}
                        </span>
                      </div>
                      <div className={`${styles.messageText}`}>{message.text}</div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='relative'>
              <textarea onChange={(e) => setMessageText(e.target.value)} value={messageText} placeholder='how are you...'></textarea>
              <div className={`text-center hide-error ${isEmptyPostText && 'show-error'}`}>enter the text</div>
              <div onClick={() => addMessageHandler(messageText)} className='formButton'>
                <span>Send</span>
              </div>
            </div>
          </>
          :
          // ПУСТОЙ ДИАЛОГ
          <>
            <div className={`${styles.messageList}`}>
              <div className={`${styles.messageChat}`}>
                <div className='text-center my-4'>The dialog is empty</div>
              </div>
            </div>
            <div className='relative'>
              <textarea onChange={(e) => setMessageText(e.target.value)} value={messageText} placeholder='how are you...'></textarea>
              <div className={`text-center hide-error ${isEmptyPostText && 'show-error'}`}>enter the text</div>
              <div onClick={() => addMessageHandler(messageText)} className='formButton'>
                <span>Send</span>
              </div>
            </div>
          </>
        : <div className='text-center my-4'>There is no dialog</div>
      }

    </div>
  );
}

export default MessagesComponent;
