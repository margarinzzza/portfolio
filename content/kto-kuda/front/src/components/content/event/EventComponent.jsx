import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { declOfNum } from "../../../funcs";
import { cities } from "../../../staticStates";
import { categories } from "../../../staticStates";
import { DropdownListComponent } from "../../dropdownList/DropdownListComponent";
import styles from './EventComponent.module.css'
import axios from '../../../axios'
import { useParams } from "react-router";
import NotFoundComponent from "../../notFound/NotFoundComponent";
import { getEvent } from "../../../features/eventsSlice";
import LoadingComponent from '../../loading/LoadingComponent'
import ava from '../../../media/img/ava.png'

const EventComponent = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const { eventData, eventLoading } = useSelector(state => state.eventsSlice)
  const { isAuth, userData } = useSelector(state => state.authSlice)
  const eventId = params.eventId
  const [isEventFound, setIsEventFound] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)

  useEffect(() => {
    dispatch(getEvent(eventId)).unwrap().then((res) => {
      setIsEventFound(true)
    }).catch(() => {
      setIsEventFound(false)
    })
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
    if (string[0] !== '0') finalTime += `${string[0]} дней `
    if (string[1] !== '0') finalTime += `${string[1]} часов `
    if (string[2] !== '0') finalTime += `${string[2]} минут `
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

  const partActionHandler = () => {

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
                {eventData.participants.length !== 0 && eventData.participants.map((el, idx) => {
                  return <div className={`participansList_item flex py-2 px-3 m-2 w-fit bg-[#eeeeee] rounded-[5px]`}>
                    <img src={ava} className="w-[45px] mr-3 " />
                    <h4>Вася</h4>
                  </div>
                })}
              </div>
            </div>
            <div className="w-fit cursor-pointer border-[7px] p-[10px] flex flex-col items-center rounded-[5px]">
              <img src={ava} className="w-[85px] mb-2" />
              <span className="text-slate-500">Организатор</span>
              <h3>Дмитрий</h3>
            </div>
          </div>
          {userData?._id &&
            <div className="fixed w-full left-0 bottom-0 flex justify-center">
              <div className="bg-[#38a1ff] py-4 rounded-t-md w-[305px] flex justify-center items-center cursor-pointer text-white">
                {(() => {
                  if (!eventData.participants.indexOf(userData._id)) return 'Отменить'
                  return 'Записаться'
                })()}
              </div>
            </div>
          }
        </div>
        : <NotFoundComponent />
      }
    </>
  );
}

export default EventComponent;
