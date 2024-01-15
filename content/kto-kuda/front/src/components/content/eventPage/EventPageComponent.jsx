import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { declOfNum } from "../../../funcs";
import axios from '../../../axios'
import { useParams } from "react-router";
import NotFoundComponent from "../../notFound/NotFoundComponent";
import { getEvent } from "../../../features/eventsSlice";
import LoadingComponent from '../../loading/LoadingComponent'
import ava from '../../../media/img/ava.png'

const EventPageComponent = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const { eventData, eventLoading } = useSelector(state => state.eventsSlice)
  const { isAuth, userData } = useSelector(state => state.authSlice)
  const eventId = params.eventId
  const [isEventFound, setIsEventFound] = useState(false)
  const [eventCreatorData, setEventCreatorData] = useState({})
  const [participants, setParticipants] = useState([])
  const [showParticipants, setShowParticipants] = useState(false)

  const getEventReq = async () => {
    await dispatch(getEvent(eventId)).unwrap().then(async (res) => {
      await axios.get(`/getEventCreator/${res.data.creator}`).then(res => setEventCreatorData(res.data.userData))
      await axios.get(`/getParticipants/${res.data._id}`).then(res => setParticipants(res.data.participantsData))
      setIsEventFound(true)
    }).catch(() => setIsEventFound(false))
  }

  useEffect(() => {
    getEventReq()
  }, [])

  const returnStartDateAndTime = (e) => {
    let arr = e.split(',')
    return (
      <div className="text-[14px]">
        <span>{arr[0]}</span>
        <span className="bg-red-700 text-center inline-block px-2 py-1 rounded-[5px] ms-3">{arr[1]}</span>
      </div>
    )
  }

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

  const returnAdress = ({ city, adress }) => {
    let str = adress.split(',')
    return `${city}, улица ${str[0]}, дом ${str[1]}`
  }

  const partActionHandler = async () => {
    if (isAuth) {
      if (eventData.creator !== userData._id) {
        if (eventData.participants.length !== eventData.participantsMaxNum) {
          if (eventData.participants.find(e => e === userData._id)) {
            await axios.post(`/cancelParticipate`, { userId: userData._id, eventId: eventData._id })
            return getEventReq()
          }
          await axios.post(`/participate`, { userId: userData._id, eventId: eventData._id })
          return getEventReq()
        }
        if (eventData.participants.length === eventData.participantsMaxNum && eventData.participants.find(e => e === userData._id)) {
          await axios.post(`/cancelParticipate`, { userId: userData._id, eventId: eventData._id })
          return getEventReq()
        }
      }
    }
  }

  return (
    <>
      {eventLoading === 'loading' && <LoadingComponent />}
      {eventLoading === 'loaded' &&
        isEventFound ?
        <div className="eventPage">
          <div className="event_img" style={{ backgroundImage: `url(${eventData.imgUrl})` }}>
            <div className="w-[85%]">
              {returnStartDateAndTime(eventData.startDateAndTime)}
              <h1>{eventData.title}</h1>
            </div>
          </div>
          <div className="eventPage_text">
            <span className="text-slate-500">{returnAdress({ city: eventData.city, adress: eventData.adress })}</span>
            <h2 className="mb-3">О событии</h2>
            <p>{eventData.text}</p>
            <div className="eventPage_media flex flex-wrap my-4">
              <div style={{ backgroundImage: `url(${eventData.imgUrl})` }}></div>
              <div style={{ backgroundImage: `url(https://i.pinimg.com/originals/c3/cd/0d/c3cd0d54770f50677ee5c56afbbe71a4.png)` }}></div>
              <div style={{ backgroundImage: `url(https://joeczubiak.com/static/4474a61ee50c511b34ecaf764db8f538/box-shadows-cover.png)` }}></div>
            </div>
            <div className="flex flex-wrap my-[33px] flex-col">
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
              <div className={`flex flex-wrap ${showParticipants ? 'participansListShow' : 'participansListHide'}`}>
                {participants.length !== 0 && participants.map((el, idx) => {
                  console.log(el)
                  return <div key={idx} className={`participansList_item flex py-2 px-3 m-2 w-fit rounded-[5px] ${el._id === userData._id ? 'bg-[#77c0ff]' : 'bg-[#eeeeee]'}`}>
                    <img src={ava} className="w-[45px] mr-3 " />
                    <h4>{el.name === userData.name ? 'Вы' : el.name}</h4>
                  </div>
                })}
              </div>
            </div>
            {eventData.creator !== userData?._id &&
              <div className="w-fit cursor-pointer border-[3px] p-[10px] flex flex-col items-center rounded-[5px]">
                <img src={ava} className="w-[85px] mb-2" />
                <span className="text-slate-500">Организатор</span>
                <h3>{eventCreatorData.name}</h3>
              </div>
            }
          </div>
          <div className="fixed w-full left-0 bottom-0 flex justify-center">
            <div onClick={() => partActionHandler()} className="bg-[#38a1ff] py-4 rounded-t-md w-[305px] flex justify-center items-center cursor-pointer text-white">
              {(() => {
                if (!userData) return 'Войдите чтобы принять участие'
                if (eventData.creator === userData._id) return 'Вы организатор'
                if (eventData.participants.length === eventData.participantsMaxNum && !eventData.participants.find(e => e === userData._id)) return 'Максимальное число участников'
                if (eventData.participants.find(e => e === userData._id)) return 'Отменить'
                return 'Записаться'
              })()}
            </div>
          </div>
        </div>
        : <NotFoundComponent />
      }
    </>
  );
}

export default EventPageComponent;
