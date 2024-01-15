import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ava from '../../../media/img/ava.png'

const EventComponent = ({ data }) => {

  const { userData } = useSelector(state => state.authSlice)
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
    <Link to={`/events/${data._id}`} className="event">
      <div className={`flex items-center text-slate-400 justify-between`}>
        <span>{data.startDateAndTime.slice(0, 10)}</span>
        <span>{data.startDateAndTime.slice(12, 17)}</span>
      </div>
      <span className="bg-[#e0e0e0] text-[15px] text-[#a2a0a0] px-[9px] py-[3px] rounded-[6px] mx-[5px] mt-1 w-fit">{data.category}</span>
      <h3 className={`mt-1`}>{data.title}</h3>
      <span className="text-slate-500 mt-1">{data.adress}</span>
      <div className="flex items-center mb-[20px] mt-[15px]">
        <div className="flex">
          <img className="w-[50px] mx-1" src={ava} />
          <img className="w-[50px] mx-1" src={ava} />
          <img className="w-[50px] mx-1" src={ava} />
        </div>
        <span className={`text-slate-500 ml-3`}>{data.participants?.length} из {data.participantsMaxNum} чел.</span>
      </div>
      <div className="pt-[12px] border-t-2 border-slate-200 flex justify-between items-center">
        <h4>{returnPrice(data.price)}</h4>
        <span className={`${(data.creator === userData?._id || data.participants.find(e => e === userData?._id) || data.participants.length === data.participantsMaxNum) && 'px-[9px] py-[3px]'}
          ${data.participants.find(e => e === userData?._id) && 'bg-[#77c0ff]'} 
          ${data.creator === userData?._id && 'bg-[#000092]'} 
          ${(data.participants.length === data.participantsMaxNum && !data.participants.find(e => e === userData?._id)) && 'bg-[#97080c]'}
          text-[15px] text-white rounded-[6px] mx-[5px] w-fit`}>
          {data.participants.find(e => e === userData?._id) && 'Вы участник'}
          {data.creator === userData?._id && 'Вы создатель'}
          {(data.participants.length === data.participantsMaxNum && !data.participants.find(e => e === userData?._id)) && 'Максимум участников'}
        </span>
      </div>
    </Link>
  );
}

export default EventComponent;
