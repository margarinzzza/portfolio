import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cities, categories } from "../../../staticStates";
import { DropdownListComponent } from "../../dropdownList/DropdownListComponent";
import styles from './EventsComponent.module.css'
import axios from '../../../axios'
import { eventsSliceActions, getEvents } from "../../../features/eventsSlice";
import LoadingComponent from '../../loading/LoadingComponent'
import EventComponent from "./EventComponent";

const EventsComponent = () => {

  const dispatch = useDispatch()
  const { userData, isAuth } = useSelector(state => state.authSlice)
  const { eventsData, eventsLoading, eventsDataPage } = useSelector(state => state.eventsSlice)
  const [selectedCity, setSelectedCity] = useState(isAuth ? userData.city : cities[0])
  const [eventQuery, setEventQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [eventsArrLength, setEventsArrLength] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(null)

  useEffect(() => {
    const test = async () => {
      await dispatch(getEvents({ eventsDataPage, eventQuery, selectedCity, selectedCategory })).unwrap().then((e) => {
        setEventsArrLength(e.length)
        setItemsPerPage(e.itemsPerPage)
      }).catch()
    }
    test()
  }, [eventsDataPage, eventQuery, selectedCity, selectedCategory])

  useEffect(() => {
    dispatch(eventsSliceActions.setEventsDataPage(1))
  }, [selectedCity, selectedCategory])

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
          {eventsArrLength === 0 && <div className="text-slate-500 mt-4">Ничего не найдено</div>}
          {eventsData.map((el, idx) => <EventComponent data={el} key={idx}  />)}
        </div>
      } {eventsLoading === 'loading' && <LoadingComponent />}

      {eventsArrLength > itemsPerPage &&
        <div className={`pagination`}>
          <svg onClick={() => {
            if (eventsDataPage > 1) {
              dispatch(eventsSliceActions.setEventsDataPage(eventsDataPage - 1))
            }
          }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
          <div className={`pagination_items flex mx-3`}>
            {Array(Math.ceil(eventsArrLength / itemsPerPage)).fill().map((el, idx) => {
              return <span className={`${eventsDataPage === idx + 1 && 'transition-all bg-black text-white'}`} onClick={() => dispatch(eventsSliceActions.setEventsDataPage(idx + 1))} key={idx}>{idx + 1}</span>
            })}
          </div>
          <svg onClick={() => {
            if (eventsDataPage < Math.ceil(eventsArrLength / itemsPerPage)) dispatch(eventsSliceActions.setEventsDataPage(eventsDataPage + 1))
          }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </div>
      }
    </div>
  );
}

export default EventsComponent;
