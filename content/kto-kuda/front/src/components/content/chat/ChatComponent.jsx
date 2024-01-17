import { useState } from "react";
import ava from '../../../media/img/ava.png'

const ChatComponent = ({ eventData, userData}) => {

  const [showParticipantsChat, setShowParticipantsChat] = useState(false)

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
        <div className="messages h-[250px] overflow-y-scroll flex flex-col justify-end">
          <div className="flex my-3 bg-[aliceblue] p-[10px]">
            <img src={ava} className="w-[55px] h-[55px] mr-3" />
            <div>
              <h4>Игорь</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <input type="text" name="msg" placeholder="Ваше сообщение" />
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-right-circle mx-[20px] cursor-pointer" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
