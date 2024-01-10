import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { declOfNum } from "../../../funcs";
import { cities, categories } from "../../../staticStates";
import { DropdownListComponent } from "../../dropdownList/DropdownListComponent";
import styles from './EventsComponent.module.css'
import axios from '../../../axios'
import { Link } from "react-router-dom";
import { getEvents } from "../../../features/eventsSlice";
import ava from '../../../media/img/ava.png'
import LoadingComponent from '../../loading/LoadingComponent'

const EventsComponent = () => {

  const dispatch = useDispatch()
  const { userData, isAuth } = useSelector(state => state.authSlice)
  const { eventsData, eventsLoading, eventActionsError } = useSelector(state => state.eventsSlice)
  const [selectedCity, setSelectedCity] = useState(isAuth ? userData.city : cities[0])
  const [eventQuery, setEventQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [eventsArr, setEventsArr] = useState([])
  const [tapeArr, setTapeArr] = useState([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 9

  useEffect(() => {
    const test = async () => {
      let arr = []
      let tape = []
      const getEventsReq = await dispatch(getEvents()).then((res) => {
        arr = res.payload.data
        if(selectedCategory!=='') arr = arr.filter((item) => item.category === selectedCategory)
        arr = arr.filter((item) => item.title.toLowerCase().includes(eventQuery.toLowerCase()) && item.city === selectedCity)
        tape = arr.slice((page * itemsPerPage) - itemsPerPage, page * itemsPerPage)
        setEventsArr(arr)
        setTapeArr(tape)
      }).catch(() => {
        console.log('эвенты не загружены')
      })
    }
    test()
  }, [page, eventQuery, selectedCity, selectedCategory])

  return (
    <div className="events">
      <div className={`flex items-center`}>
        <h1>События</h1>
        <div className={`relative ms-3 pl-3 py-2 border-l-2`}>
          <DropdownListComponent data={cities} selectedItem={selectedCity} setItem={setSelectedCity} placeholder={'город'} />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div onClick={() => setSelectedCategory('')} className={`${selectedCategory === '' ? 'bg-[#bebebe]' : 'bg-[#e0e0e0]'} transition-all cursor-pointer rounded-[8px] py-[5px] px-[14px] my-[5px] mx-[10px]`}>Все</div>
        {categories.map((el, idx) => {
          return <div onClick={() => setSelectedCategory(el)} className={`${selectedCategory === el ? 'bg-[#bebebe]' : 'bg-[#e0e0e0]'} transition-all cursor-pointer rounded-[8px] py-[5px] px-[14px] my-[5px] mx-[10px]`} key={idx}>{el}</div>
        })}
      </div>
      <input onChange={(e) => setEventQuery(e.target.value)} value={eventQuery} className={`w-min ml-2 border-b-2 border-solid border-white mt-3 p-3 transition-all focus:border-b-gray-400`} type="text" placeholder="Поиск по названию" />
      {eventsLoading === 'loaded' &&
        <div className={`events_list`}>
          {eventsArr.length === 0 && <div className="text-slate-500 mt-4">Ничего не найдено</div>}
          {tapeArr.map((el, idx) => {
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
            return <Link key={idx} to={`/events/${el._id}`}>
              <div className={`event cursor-pointer`}>
                <div className={`flex items-center text-slate-400 justify-between`}>
                  <span>{el.startDateAndTime.slice(0, 10)}</span>
                  <span>{el.startDateAndTime.slice(12, 17)}</span>
                </div>
                <span className="bg-[#e0e0e0] text-[15px] text-[#a2a0a0] px-[9px] py-[3px] rounded-[6px] mx-[5px] mt-1 w-fit">{el.category}</span>
                <h3 className={`mt-1`}>{el.title}</h3>
                <span className="text-slate-500 mt-1">{el.adress}</span>
                <div className="flex items-center mb-[20px] mt-[15px]">
                  <div className="flex">
                    <img className="w-[50px] mx-1" src={ava} />
                    <img className="w-[50px] mx-1" src={ava} />
                    <img className="w-[50px] mx-1" src={ava} />
                  </div>
                  <span className={`text-slate-500 ml-3`}>{el.participants?.length} из {el.participantsMaxNum} чел.</span>
                </div>
                <h4 className="pt-[12px] border-t-2 border-slate-200">{returnPrice(el.price)}</h4>
              </div>
            </Link>
          })}
        </div>
      } {eventsLoading === 'loading' && <LoadingComponent />}

      {eventsArr.length > itemsPerPage &&
        <div className={`pagination`}>
          <svg onClick={() => {
            if (page > 1) {
              setPage(p => p - 1)
            }
          }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
          <div className={`pagination_items flex mx-3`}>
            {Array(Math.ceil(eventsArr.length / itemsPerPage)).fill().map((el, idx) => {
              return <span className={`${page === idx + 1 && 'transition-all bg-black text-white'}`} onClick={() => setPage(idx + 1)} key={idx}>{idx + 1}</span>
            })}
          </div>
          <svg onClick={() => {
            if (page < Math.ceil(eventsArr.length / itemsPerPage)) {
              setPage(p => p + 1)
            }
          }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </div>
      }
    </div>
  );
}

export default EventsComponent;
