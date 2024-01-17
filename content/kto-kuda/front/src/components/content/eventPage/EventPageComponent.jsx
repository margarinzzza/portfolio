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
import EventInfoComponent from "../eventInfo/EventInfoComponent";

const EventPageComponent = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const { eventData, eventLoading } = useSelector(state => state.eventsSlice)
  const { isAuth, userData } = useSelector(state => state.authSlice)
  const eventId = params.eventId
  const [isEventFound, setIsEventFound] = useState(false)
  const [eventCreatorData, setEventCreatorData] = useState({})
  const [participants, setParticipants] = useState([])

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
            </div>
            <EventInfoComponent eventData={eventData} participants={participants} userData={userData}  />
            {eventData.creator !== userData?._id &&
              <div className="w-fit cursor-pointer border-[3px] p-[10px] flex flex-col items-center rounded-[5px] mt-4">
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
