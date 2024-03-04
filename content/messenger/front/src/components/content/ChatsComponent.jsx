import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import ava from '../../media/img/ava.png'
import { useParams } from 'react-router-dom';
import { chatSliceActions, getChats, getMessages } from "../../features/chatSlice";
import ChatWindowComponent from "./ChatWindowComponent";

const ChatsComponent = () => {

  let { chatId } = useParams()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.authSlice)
  const { chats, onlineUsers, messages } = useSelector(state => state.chatSlice)
  const [findChatQuery, setFindChatQuery] = useState('')
  const [findMsgQuery, setFindMsgQuery] = useState('')

  useEffect(() => {
    (async () => await dispatch(getChats({ userId: userData._id, chatId: userData.chats, findChatQuery, currentTape: chats.chatsDataTape })).unwrap().then(async (response) => {
      if (chatId) {
        const selectedChat = response.finalArr.find(el => el._id === chatId)
        dispatch(chatSliceActions.setChat(selectedChat))
        dispatch(getMessages({ userId: userData._id, chatId, findMsgQuery, currentTape: messages.messagesDataTape }))
      }
    }))()
  }, [findChatQuery, chats.chatsDataTape])

  useEffect(() => {
    if (chatId) {
      const selectedChat = chats.chatsData.find(el => el._id === chatId)
      dispatch(chatSliceActions.setChat(selectedChat))
      dispatch(getMessages({ userId: userData._id, chatId, findMsgQuery, currentTape: messages.messagesDataTape }))
    }
    if (!chatId) dispatch(chatSliceActions.resetChat())
  }, [chatId, findMsgQuery, messages.messagesDataTape])

  return (
    <div className={`chats h-full`}>
      <h1>Диалоги</h1>
      <div className={`chats-wrapper flex h-full`}>
        <div className={`flex flex-col flex-[3]`}>
          <input value={findChatQuery} onChange={(e) => setFindChatQuery(e.target.value)} type="text" name="name" placeholder="Поиск" className={`my-2 ml-2 p-4`} />
          <div className={`chats-list flex flex-col`}>
            {chats.chatsData.length > 0 ?
              chats.chatsData.map((el, idx) => {
                if (el === null) return 0
                let interlocutorName, currentDate = '', interlocutorId, isRead = false
                if (el !== null) {
                  if (el.messages?.length === 0) isRead = true
                  if (el.messages?.length > 0) {
                    let lastMsgDate = el.messages[0].createdAt.split(',')
                    let date = new Date().toLocaleString().split(',')
                    if (lastMsgDate[0] === date[0]) currentDate = lastMsgDate[1].slice(0, 6)
                    if (lastMsgDate[0] !== date[0]) currentDate = lastMsgDate[0]
                    const candidate = el.messages[0].whoRead.find(el => el === userData._id)
                    if (candidate) isRead = true
                  }
                  if (el.type === 'personal') {
                    if (el.creator.link === userData.link) {
                      interlocutorName = `${el.participants[0].name} ${el.participants[0].surname}`
                      interlocutorId = el.participants[0]._id
                    }
                    if (el.participants[0].link === userData.link) {
                      interlocutorName = `${el.creator.name} ${el.creator.surname}`
                      interlocutorId = el.creator._id
                    }
                  }
                }

                return <Link to={`/chats/${el._id}`} key={idx} className={`chats-list__item ${chatId === el._id && 'chats-list__item-selected'} shadow-lg `}>
                  <div className="relative h-fit mr-[13px]">
                    <img src={ava} alt="ava" className="min-w-[50px] h-[50px]" />
                    {onlineUsers.find(el => el.userId === interlocutorId) && <div className={`bg-green-900 w-[12px] h-[12px] rounded-[50%] absolute right-[0px] bottom-[0px] border-2 border-white `}></div>}
                  </div>
                  <div className="flex flex-col flex-[1]">
                    <h5>{interlocutorName}</h5>
                    <p className="line-clamp-1">{el.messages.length > 0 ?
                      <span> {el.messages[0].userId.link === userData.link ? 'Вы:' : `${el.messages[0].userId.name}: `} {el.messages[0].text}</span> : <span>Диалог пуст</span>}</p>
                  </div>
                  <div className={`flex flex-col relative`}>
                    <span>{currentDate}</span>
                    <div className={`transition-all min-w-[7px] min-h-[7px] bg-indigo-500 rounded-[7px] bottom-[10px] right-[2px] absolute ${isRead ? 'opacity-0' : 'opacity-100'}`}></div>
                  </div>

                </Link>
              }) : <span className="text-slate-500 text-center text-sm">Ничего не нашлось</span>}
            {chats.chatsData.length > 0 && chats.chatsData.length < chats.arrLength && <span onClick={() => dispatch(chatSliceActions.setChatsDataTape())} className="cursor-pointer text-slate-500 text-center text-sm">Загрузить больше</span>}
          </div>
        </div>
        <ChatWindowComponent findMsg={{ findMsgQuery, setFindMsgQuery }} />
      </div>
    </div>
  )
}

export default ChatsComponent;
