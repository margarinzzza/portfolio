import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { eventsSliceActions, getUserEvents } from "../../../features/eventsSlice";
import LoadingComponent from "../../loading/LoadingComponent";
import ProposalListItemComponent from "./ProposalListItemComponent";

const MyProposalsComponent = () => {

  const [eventQuery, setEventQuery] = useState('')
  const [eventsDataLength, setEventsDataLength] = useState(null)
  const { eventsData, eventsLoading, userEventsDataTape } = useSelector(state => state.eventsSlice)
  const { userData } = useSelector(state => state.authSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    const fn = async () => {
      await dispatch(getUserEvents({ userId: userData._id, eventQuery, userEventsDataTape })).unwrap().then((e) => setEventsDataLength(e.length)).catch()
    }
    fn()
  }, [eventQuery, userEventsDataTape])

  return (
    <div className="my_proposals relative">
      <h1>Мои предложения</h1>
      <input type="text" placeholder="Поиск по названию или описанию" value={eventQuery} onChange={(e) => setEventQuery(e.target.value)} />
      {eventsLoading === 'loading' && <LoadingComponent />}
      {eventsLoading === 'loaded' &&
        eventsData.length === 0 ? <span className="text-slate-500">Ничего не найдено</span> :
        <div>
          <div className="proposals_list">{eventsData.map((el, idx) => <ProposalListItemComponent key={idx} data={el} />)}</div>
          {eventsDataLength > eventsData.length &&
            <span onClick={() => dispatch(eventsSliceActions.setUserEventsDataTape())} className="text-slate-500 flex justify-center cursor-pointer">Загрузить больше</span>
          }
        </div>
      }
    </div>
  );
}

export default MyProposalsComponent;
