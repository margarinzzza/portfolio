import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import ava from '../../media/img/ava.png'
import PopUpListComponent from "../popups/popUpList/PopUpListComponent";
import { useParams } from 'react-router-dom';
import { chatSliceActions } from "../../features/chatSlice";
import { returnSocket } from '../../App'
import MessageComponent from "./MessageComponent";
import { declOfNum } from "../../funcs";
import FullWPopUpComponent from "../popups/fullwpopup/FullWPopUpComponent";

const ChatWindowComponent = ({ findMsg }) => {

  const socket = returnSocket()
  let { chatId } = useParams()
  const dispatch = useDispatch()
  const [popUpListVisible, setPopUpListVisible] = useState(false)
  const [showChatWindowInput, setShowChatWindowInput] = useState(false)
  const chatWindowInput = useRef(null)
  const { userData } = useSelector(state => state.authSlice)
  const { chats, messages } = useSelector(state => state.chatSlice)
  const [text, setText] = useState('')
  const [selectedMsgs, setSelectedMsgs] = useState([])
  const [popUpVisible, setPopUpVisible] = useState(false)
  const [popUpData, setPopUpData] = useState({ title: '', text: '', confirmFn: null, checkBox: { text: '' } })
  const [isUpdating, setIsUpdating] = useState(false)
  const [updatedMsgData, setUpdatedMsgData] = useState(null)
  const [deleteForAll, setDeleteForAll] = useState(false)

  useEffect(() => {
    socket.on('msgRecieve', (data) => {
      const newHref = window.location.pathname.split('/')
      if (newHref[newHref.length - 1] === data.chatId) return dispatch(chatSliceActions.refreshChat({ data, isInChat: true }))
      return dispatch(chatSliceActions.refreshChat({ data, isInChat: false }))
    })
    return () => socket.off('msgRecieve')
  }, [])

  useEffect(() => {
    socket.on('msgUpdate', (data) => {
      const newHref = window.location.pathname.split('/')
      if (newHref[newHref.length - 1] === data.chatId) return dispatch(chatSliceActions.updateMsg({ data, isInChat: true }))
      return dispatch(chatSliceActions.updateMsg({ data, isInChat: false }))
    })
    return () => socket.off('msgUpdate')
  }, [])

  useEffect(() => {
    socket.on('msgDelete', (data) => {
      let isMyself = false
      if(data.from === userData._id) isMyself = true
      const newHref = window.location.pathname.split('/')
      if (newHref[newHref.length - 1] === data.chatId) return dispatch(chatSliceActions.deleteMsg({ data, isInChat: true, isMyself }))
      return dispatch(chatSliceActions.deleteMsg({ data, isInChat: false }))
    })
    return () => socket.off('msgDelete')
  }, [])

  useEffect(() => {
    setSelectedMsgs([])
    setText('')
    setIsUpdating(false)
    setUpdatedMsgData(null)
  }, [chatId])

  const sendMessageHandler = async ({ from, text, chatId }) => {
    const selectedChat = chats.selectedChat
    let createdAt = new Date().toLocaleString(), updatedAt = 0, to
    if (selectedChat.creator._id === userData._id) {
      to = selectedChat.participants[0]._id
    } else to = selectedChat.creator._id
    socket.emit('sendMsg', { to, from, text, chatId, createdAt, updatedAt, isModified: false })
    setText('')
  }

  const selectMessage = (msg) => {
    let updatedMsg = { ...msg, isMyself: true }
    if (msg.userId !== userData._id) updatedMsg.isMyself = false
    const candidate = selectedMsgs.find(el => el._id === msg._id)
    if (!candidate) return setSelectedMsgs([...selectedMsgs, updatedMsg])
    const filteredArr = selectedMsgs.filter(el => el._id !== msg._id)
    return setSelectedMsgs(filteredArr)
  }

  const startUpdateMessage = (msg) => {
    setText(msg.text)
    setIsUpdating(true)
    setSelectedMsgs([])
    setUpdatedMsgData(msg)
  }

  const updateMessage = (msg) => {
    let updatedAt = new Date().toLocaleString(), to
    if (chats.selectedChat.creator._id === userData._id) {
      to = chats.selectedChat.participants[0]._id
    } else to = chats.selectedChat.creator._id
    socket.emit('updateMsg', { to, updatedAt, ...msg })
    setText('')
    setIsUpdating(false)
    setUpdatedMsgData(null)
  }

  const startDeleteMessage = (msgs) => {
    const notMyMsg = msgs.find(el => el.userId !== userData._id)
    setPopUpVisible(true)
    if (!notMyMsg) {
      setPopUpData({
        title: 'Удалить', text: `Вы действительно хотите удалить ${msgs.length} ${declOfNum(msgs.length, ['сообщение', 'сообщения', 'сообщений'])}?`,
        confirmFn: deleteMessage, checkBox: { text: 'Удалить для всех' }
      })
    } else {
      setPopUpData({
        title: 'Удалить', text: `Вы действительно хотите удалить ${msgs.length} ${declOfNum(msgs.length, ['сообщение', 'сообщения', 'сообщений'])}?`,
        confirmFn: deleteMessage, checkBox: { text: '' }
      })
    }
  }

  const deleteMessage = (delForAll) => {
    let to, from = userData._id
    if (chats.selectedChat.creator._id === userData._id) {
      to = chats.selectedChat.participants[0]._id
    } else to = chats.selectedChat.creator._id
    socket.emit('deleteMsg', { to, from, chatId, delForAll, selectedMsgs })
    setSelectedMsgs([])
  }

  const cancelUpdateMessage = () => {
    setText('')
    setIsUpdating(false)
    setUpdatedMsgData(null)
  }

  return (
    <div className={`chat-window`}>
      <FullWPopUpComponent checkBox={popUpData.checkBox} confirmFn={popUpData.confirmFn} popUpVisible={popUpVisible} setPopUpVisible={setPopUpVisible} title={popUpData.title}>
        {popUpData.text}
      </FullWPopUpComponent>
      {!chats.selectedChat?.hasOwnProperty('type') ? <span className="text-slate-500 text-center mt-5">Выберите диалог</span> :
        <>
          <div className={`chat-window-header flex items-center justify-between`}>
            {selectedMsgs.length > 0 ?
              <div className={`py-2 flex justify-between w-full items-center`}>
                <div className={`flex items-center`}>
                  <h3>{selectedMsgs.length} {declOfNum(selectedMsgs.length, ['сообщение', 'сообщения', 'сообщений'])}</h3>
                  <svg onClick={() => setSelectedMsgs([])} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </div>
                <div className={`flex items-center`}>
                  <svg onClick={() => startDeleteMessage(selectedMsgs)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="cursor-pointer bi bi-trash3 mr-2" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                  {selectedMsgs.length === 1 && selectedMsgs[0].isMyself &&
                    <svg onClick={() => startUpdateMessage(selectedMsgs[0])} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  }
                </div>
              </div>
              :
              <>
                <h3>
                  {chats.selectedChat?.creator?.link === userData.link && `${chats.selectedChat?.participants[0].name} ${chats.selectedChat?.participants[0].surname}`}
                  {chats.selectedChat?.participants[0]?.link === userData.link && `${chats.selectedChat.creator.name} ${chats.selectedChat.creator.surname}`}
                </h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <svg onClick={() => { setShowChatWindowInput(true); chatWindowInput?.current?.focus() }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search mr-3" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <input value={findMsg.findMsgQuery} onChange={(e) => findMsg.setFindMsgQuery(e.target.value)} ref={chatWindowInput} onBlur={() => findMsg.findMsgQuery === '' && setShowChatWindowInput(false)} type="text" name="search" placeholder="Поиск по сообщениям" className={`transition-all duration-[300ms] px-0  max-w-[0px] ${showChatWindowInput && 'inputSearchActive'} `} />
                  </div>
                  <div className="relative">
                    <svg onClick={() => setPopUpListVisible(!popUpListVisible)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                    </svg>
                    <PopUpListComponent popUpVisible={popUpListVisible} data={[{ title: 'Удалить диалог', fn: () => console.log('delete') }]} />
                  </div>
                </div>
              </>
            }
          </div>
          <div className={`messages-wrapper ${chats.selectedChat?.type === 'personal' && 'privateChat'} `}>
            <div className={`flex flex-col justify-end`}>
              {messages.messagesData.length > 0 && messages.messagesData.length < messages.arrLength && <span onClick={() => dispatch(chatSliceActions.setMessagesDataTape())} className="cursor-pointer text-slate-500 text-center text-sm my-2">Загрузить больше</span>}
              {messages.messagesData.length > 0 && messages.messagesData.map((el, idx) => <MessageComponent selectMsg={{ selectedMsgs, selectMessage }} key={idx} data={{ el, idx }} />)}
              {findMsg.findMsgQuery === '' && messages.messagesData.length === 0 && <span className="text-slate-500 text-sm text-center mb-2">Начните диалог</span>}
              {findMsg.findMsgQuery !== '' && messages.messagesData.length === 0 && <span className="text-slate-500 text-sm text-center mb-2">Сообщения не найдены</span>}
            </div>
          </div>
          <div className="flex flex-col">
            {isUpdating && <span onClick={() => cancelUpdateMessage()} className="cursor-pointer text-slate-500 text-sm pt-2">Отменить редактирование</span>}
            <div className="flex items-center">
              <input value={text} onChange={(e) => setText(e.target.value)} type="text" name="text" placeholder="Введите сообщение..." className="mr-3" />
              <div className="flex items-center">
                <div className="mr-3 to-blue-500 w-[40px] h-[40px] rounded-[50%] flex items-center justify-center cursor-pointer transition-all shadow-xl hover:bg-[#0000000a]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
                  </svg>
                </div>
                <div onClick={() => {
                  isUpdating ? updateMessage({ from: userData._id, text, chatId, msgId: updatedMsgData._id, text }) : sendMessageHandler({ from: userData._id, text, chatId })
                }} className={`${text === '' ? 'scale-0 max-w-[0px]' : 'scale-100 max-w-[100vw]'} duration-300 bg-[length:70px_300px] hover:bg-[center_top_100px] bg-gradient-to-r from-cyan-500 to-blue-500 w-[50px] h-[50px] rounded-[50%] flex items-center justify-center cursor-pointer transition-all shadow-xl shadow-blue-500/50`}>
                  {isUpdating ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" class="bi bi-check2-all" viewBox="0 0 16 16">
                      <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                      <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ffffff" className="bi bi-send" viewBox="0 0 16 16">
                      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                    </svg>
                  }
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default ChatWindowComponent;
