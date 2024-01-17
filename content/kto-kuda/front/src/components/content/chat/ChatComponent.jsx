import { useEffect, useRef, useState } from "react";
import ava from '../../../media/img/ava.png'
import { useDispatch } from "react-redux";
import { eventsSliceActions, sendMessage } from "../../../features/eventsSlice";
import io from 'socket.io-client'

const ChatComponent = ({ eventData, userData }) => {

  const socket = io.connect('http://localhost:5000')
  const dispatch = useDispatch()
  const [showParticipantsChat, setShowParticipantsChat] = useState(false)
  const [text, setText] = useState('')
  const [textErrMsg, setTextErrMsg] = useState('')
  const messagesEndRef = useRef(null)

  const sendMessageHandler = async ({ userId, text, eventId }) => {
    if (text === '') return setTextErrMsg('Введите сообщение')
    //await dispatch(sendMessage({ userId, text, eventId })).unwrap().then().catch()
    socket.emit('sendMsg', { userId, text, eventId })
    setTextErrMsg('')
    setText('')
  }

  useEffect(() => {
    socket.emit('join', {eventId: eventData._id, userName: userData.name})
    messagesEndRef.current?.scrollIntoView()
  }, [])

  useEffect(() => {
    socket.on('refreshChat', (event) => {
      dispatch(eventsSliceActions.refreshChat(event))
      messagesEndRef.current?.scrollIntoView()
    })
  }, [])

  useEffect(() => {
    if (eventData.participants.find(e => e === userData?._id) || eventData.creator === userData?._id) setShowParticipantsChat(true)
  }, [eventData])

  return (
    <div className="flex flex-wrap flex-col">
      <div onClick={() => setShowParticipantsChat(!showParticipantsChat)} className={`item_more_value ${eventData.participants.find(e => e === userData?._id) || eventData.creator === userData?._id ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'}`}>
        {eventData.participants.find(e => e === userData?._id) || eventData.creator === userData?._id ?
          <>
            <h4>Чат</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-arrow-down-circle transition-all ${!showParticipantsChat && 'rotate-180'}`} viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
            </svg>
          </> : <span className="text-slate-500">Чат для участников</span>}
      </div>
      <div className={`flex flex-col flex-wrap my-3  ${showParticipantsChat ? 'item_more_valueShow' : 'item_more_valueHide'}`}>
        <div className="messages h-[250px] overflow-y-scroll flex flex-col">
          {eventData.chat.length === 0 ? <span>Сообщений нет</span> :
            eventData.chat.map((el, idx) => {
              return <div key={idx} className={`flex my-3 bg-[aliceblue] p-[10px] ${el.userName === userData.name && 'justify-end'}`}>
                <img src={ava} className={`w-[55px] h-[55px] flex ${el.userName === userData.name ? 'order-2 ml-3' : 'mr-3'}`}  />
                <div>
                  <h4>{el.userName === userData.name? 'Вы' : el.userName}</h4>
                  <p>{el.text}</p>
                </div>
              </div>
            })
          }
          <div ref={messagesEndRef}></div>
        </div>
        <div className="flex items-center">
          <input value={text} onChange={(e) => setText(e.target.value)} type="text" name="msg" placeholder="Ваше сообщение" />
          <svg onClick={() => sendMessageHandler({ userId: userData._id, text, eventId: eventData._id })} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-right-circle mx-[20px] cursor-pointer" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </div>
        <span className="text-slate-500 text-center mt-2">{textErrMsg !== '' && textErrMsg}</span>
      </div>
    </div>
  );
}

export default ChatComponent;
