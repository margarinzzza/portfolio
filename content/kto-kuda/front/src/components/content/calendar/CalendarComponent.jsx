import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingComponent from "../../loading/LoadingComponent";
import EventComponent from "../events/EventComponent";
import { getMyEvents } from "../../../features/eventsSlice";

const CalendarComponent = () => {

  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.authSlice)
  const { eventsData, eventsLoading } = useSelector(state => state.eventsSlice)
  const [selectedDay, setSelectedDay] = useState(-1)
  const [carouselOffset, setCarouselOffset] = useState(0)
  const [calendarData, setCalendarData] = useState([])
  const [eventsFinalData, setEventsFinalData] = useState([])
  const daysDivRef = useRef(null)
  const calendarDivRef = useRef(null)
  const offsetValue = calendarDivRef?.current?.offsetWidth - 100
  const weekDayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

  useEffect(() => {
    let dateMs = Date.now();
    const counter = 31
    const arr = []
    for (let i = 0; i <= counter; i++) {
      const refreshDate = new Date(dateMs)
      const refreshDateSplit = refreshDate.toLocaleDateString().split('.')
      const arrEl = { weekDay: weekDayNames[refreshDate.getDay()], date: `${refreshDateSplit[2]}-${refreshDateSplit[1]}-${refreshDateSplit[0]}` }
      dateMs += 86400000
      arr.push(arrEl)
    }
    setCalendarData(arr)
  }, [])

  useEffect(() => {
    const test = async () => {
      let arr
      await dispatch(getMyEvents({ userId: userData._id })).then((r) => {
        if (selectedDay === -1) return setEventsFinalData(r.payload.data)
        if (selectedDay.el) arr = r.payload.data.filter(el => el.startDateAndTime.slice(0, 10) === selectedDay.el.date)
        setEventsFinalData(arr)
      })
    }
    test()
    
  }, [selectedDay])

  return (
    <div className="calendarPage">
      <h1>Мои события</h1>
      <div className="flex items-center mt-3">
        <h3 onClick={() => setSelectedDay(-1)} className={`cursor-pointer transition-all min-w-[60px] h-[60px] flex justify-center items-center rounded-[50%] text-white ${selectedDay === -1 ? 'bg-[#1067a4]' : 'bg-[#a7d2ff]'}`}>Все</h3>
        <div ref={calendarDivRef} className="calendar flex relative ml-3 max-w-[500px] overflow-hidden">
          <div onClick={() => {
            let a = carouselOffset - offsetValue
            if (a >= 0) return setCarouselOffset(e => e - offsetValue)
            if (a < 0) return setCarouselOffset(0)
          }} className="prevWeek">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16">
              <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
            </svg>
          </div>
          <div style={{ right: `${carouselOffset}px` }} ref={daysDivRef} className={`days relative flex transition-all duration-500`}>
            {calendarData?.map((el, idx) => {
              let flag = eventsData.find(e => e.startDateAndTime.slice(0, 10) === el.date)
              return <div onClick={() => setSelectedDay({ el, idx })} className={`day`} key={idx}>
                <span className={`text-slate-500 border-b-[3px] ${flag ? 'border-[#1067a4]' : 'border-[#ffffff]'} `}>{el.weekDay}</span>
                <h4 className={`${selectedDay.idx === idx && 'bg-[#1067a4] text-white'}`}>{el.date.slice(8, 10)}</h4>
              </div>
            })}
          </div>
          <div onClick={() => {
            let a = carouselOffset + offsetValue
            let b = daysDivRef.current.offsetWidth - calendarDivRef.current.offsetWidth
            if (a < b) return setCarouselOffset(e => e + offsetValue)
            if (a > b) return setCarouselOffset(b)
          }} className="nextWeek">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
              <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap my-6">
        {eventsLoading === 'loading' && <LoadingComponent />}
        {eventsFinalData.length === 0 && <div className="text-slate-500 mt-4">Ничего не найдено</div>}
        {eventsFinalData.map((el, idx) => <EventComponent data={el} key={idx} />)}
      </div>


    </div>
  );
}

export default CalendarComponent;
