import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserEvents } from "../../../features/eventsSlice";
import LoadingComponent from "../../loading/LoadingComponent";
import ProposalListItemComponent from "./ProposalListItemComponent";

const MyProposalsComponent = () => {

  const { eventsData, eventsLoading } = useSelector(state => state.eventsSlice)
  const { userData } = useSelector(state => state.authSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserEvents(userData._id))
  }, [])

  return (
    <div className="my_proposals relative">
      <h1>Мои предложения</h1>
      {eventsLoading === 'loading' && <LoadingComponent />}
      {eventsLoading === 'loaded' &&
        eventsData.length === 0 ? <span className="text-slate-500">Ничего не найдено</span> :
        <div className="proposals_list">{eventsData.map((el, idx) => <ProposalListItemComponent key={idx} data={el} />)}</div>
      }
    </div>
  );
}

export default MyProposalsComponent;
