import { useState } from "react";
import { declOfNum } from "../../../funcs";
import ava from '../../../media/img/ava.png'
import ChatComponent from "../chat/ChatComponent";

const EventInfoComponent = ({ eventData, participants, userData, }) => {

  const [showParticipants, setShowParticipants] = useState(false)
  const returnDurationTime = (e) => {
    const string = e.split('/')
    let finalTime = ''
    if (string[0] !== '0') finalTime += `${string[0]} ${declOfNum(string[0], ['день', 'дня', 'дней'])} `
    if (string[1] !== '0') finalTime += `${string[1]} ${declOfNum(string[1], ['час', 'часа', 'часов'])} `
    if (string[2] !== '0') finalTime += `${string[2]} ${declOfNum(string[2], ['минута', 'минуты', 'минут'])}`
    if (finalTime === '') return 'Не указано'
    return finalTime
  }
  const returnPrice = (e) => {
    const slashIdx = e.indexOf('/')
    if (slashIdx !== -1) {
      let minPrice, maxPrice
      minPrice = e.slice(0, slashIdx)
      maxPrice = e.slice(slashIdx + 1, e.length)
      return `От ${minPrice} ₽ до ${maxPrice} ₽`
    }
    if (!Number(e) > 0) return 'Бесплатно'
    return `${e} ₽`
  }

  return (
    <div className="flex flex-wrap flex-col">
      <div className="item_more_value">
        <h4>Длительность</h4>
        <span className="text-slate-500">{returnDurationTime(eventData.durationTime)}</span>
      </div>
      <div className="item_more_value">
        <h4>Количество участников</h4>
        <span className="text-slate-500">{`От ${eventData.participantsMinNum} до ${eventData.participantsMaxNum} чел.`}</span>
      </div>
      <div className="item_more_value">
        <h4>Стоимость участия</h4>
        <span className="text-slate-500">{returnPrice(eventData.price)}</span>
      </div>
      <div onClick={() => setShowParticipants(!showParticipants)} className={`item_more_value ${eventData.participants.length === 0 ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'}`}>
        {eventData.participants.length !== 0 ?
          <>
            <h4>Участники</h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-arrow-down-circle transition-all ${!showParticipants && 'rotate-180'}`} viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
            </svg>
          </> : <span className="text-slate-500">Участников нет</span>}
      </div>
      <div className={`flex flex-wrap ${showParticipants ? 'item_more_valueShow' : 'item_more_valueHide'}`}>
        {participants.length !== 0 && participants.map((el, idx) => {
          return <div key={idx} className={`participansList_item flex py-2 px-3 m-2 w-fit rounded-[5px] ${el._id === userData?._id ? 'bg-[#77c0ff]' : 'bg-[#eeeeee]'}`}>
            <img src={ava} className="w-[45px] mr-3 " />
            <h4>{el.name === userData?.name ? 'Вы' : el.name}</h4>
          </div>
        })}
      </div>
      <ChatComponent eventData={eventData} userData={userData} />
    </div>
  );
}

export default EventInfoComponent;
