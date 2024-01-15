import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteEvent, getUserProposals } from "../../../features/eventsSlice";
import ava from '../../../media/img/ava.png'
import axios from "../../../axios";

const ProposalListItemComponent = ({ data }) => {
  const { userData } = useSelector(state => state.authSlice)
  const [showParticipants, setShowParticipants] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [participants, setParticipants] = useState([])
  const dispatch = useDispatch()

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

  const returnAdress = ({city, adress}) => {
    let str = adress.split(',')
    return `${city}, улица ${str[0]}, дом ${str[1]}`
  }

  const returnParticipants = async (eventId) => {
    await axios.get(`/getParticipants/${eventId}`).then(res => setParticipants(res.data.participantsData))
  }

  useEffect(()=>{
    returnParticipants(data._id)
  }, [])

  return (
    <div className="flex flex-wrap my-[33px] mx-[12px]">
      <div className="item_desc">
        <div className="flex justify-between">
          <span className="text-slate-500">{data.startDateAndTime}</span>
          <span className="text-slate-500">Статус: {data.status}</span>
        </div>
        <span className="text-slate-500">{returnAdress({city: data.city, adress: data.adress})}</span>
        <h2>{data.title}</h2>
        <p>{data.text}</p>
      </div>
      <div className="item_more">
        <div className="item_more_value">
          <h4>Длительность</h4>
          <span className="text-slate-500">{returnDurationTime(data.durationTime)}</span>
        </div>
        <div className="item_more_value">
          <h4>Количество участников</h4>
          <span className="text-slate-500">{`От ${data.participantsMinNum} до ${data.participantsMaxNum} чел.`}</span>
        </div>
        <div className="item_more_value">
          <h4>Стоимость участия</h4>
          <span className="text-slate-500">{returnPrice(data.price)}</span>
        </div>
        <div onClick={() => setShowParticipants(!showParticipants)} className={`item_more_value ${participants.length === 0 ? 'pointer-events-none' : 'pointer-events-auto cursor-pointer'}`}>
          {participants.length !== 0 ?
            <>
              <h4>Участники</h4>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className={`bi bi-arrow-down-circle transition-all ${!showParticipants && 'rotate-180'}`} viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
              </svg>
            </> : <span className="text-slate-500">Участников нет</span>}
        </div>
        <div className={`flex flex-wrap ${showParticipants ? 'participansListShow' : 'participansListHide'}`}>
          {participants.length !== 0 && participants.map((el, idx) => {
            return <div key={idx} className={`participansList_item flex py-2 px-3 m-2 w-fit bg-[#eeeeee] rounded-[5px]`}>
              <img src={ava} className="w-[45px] mr-3 " />
              <h4>{el.name}</h4>
            </div>
          })}
        </div>
        <div className="text-slate-500 cursor-pointer w-fit mt-2">
          {confirmDelete ? <span onClick={async () => {
            await dispatch(deleteEvent({ userId: userData._id, eventId: data._id })).unwrap().then(() => {
              dispatch(getUserProposals({userId: userData._id}))
            }).catch()
          }}>Подтвердить</span> : <span onClick={() => setConfirmDelete(true)}>Отменить событие</span>}
        </div>
      </div>
    </div>
  );
}

export default ProposalListItemComponent;
