import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { deleteEvent, getUserProposals } from "../../../features/eventsSlice";
import ava from '../../../media/img/ava.png'
import axios from "../../../axios";
import EventInfoComponent from "../eventInfo/EventInfoComponent";

const ProposalListItemComponent = ({ data }) => {
  const { userData } = useSelector(state => state.authSlice)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [participants, setParticipants] = useState([])
  const dispatch = useDispatch()

  const returnAdress = ({ city, adress }) => {
    let str = adress.split(',')
    return `${city}, улица ${str[0]}, дом ${str[1]}`
  }

  const returnParticipants = async (eventId) => {
    await axios.get(`/getParticipants/${eventId}`).then(res => setParticipants(res.data.participantsData))
  }

  useEffect(() => {
    returnParticipants(data._id)
  }, [])

  return (
    <div className="flex flex-wrap my-[33px] mx-[12px]">
      <div className="item_desc">
        <div className="flex justify-between">
          <span className="text-slate-500">{data.startDateAndTime}</span>
          <span className="text-slate-500">Статус: {data.status}</span>
        </div>
        <span className="text-slate-500">{returnAdress({ city: data.city, adress: data.adress })}</span>
        <h2>{data.title}</h2>
        <p>{data.text}</p>
      </div>
      <div className="item_more">
        <EventInfoComponent eventData={data} participants={participants} userData={userData} />
        <div className="text-slate-500 cursor-pointer w-fit mt-2">
          {confirmDelete ? <span onClick={async () => {
            await dispatch(deleteEvent({ userId: userData._id, eventId: data._id })).unwrap().then(() => {
              dispatch(getUserProposals({ userId: userData._id }))
            }).catch()
          }}>Подтвердить</span> : <span onClick={() => setConfirmDelete(true)}>Отменить событие</span>}
        </div>
      </div>
    </div>
  );
}

export default ProposalListItemComponent;
