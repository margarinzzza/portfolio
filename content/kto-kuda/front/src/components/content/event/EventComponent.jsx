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

const EventComponent = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const { eventData, eventLoading } = useSelector(state => state.eventsSlice)
  const eventId = params.eventId
  const [isEventFound, setIsEventFound] = useState(false)
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
      <div className="text-[12px]">
        <span>{arr[0]}</span>
        <span>{arr[1]}</span>
      </div>
    )
  }

  return (
    <>
      {eventLoading === 'loading' && <LoadingComponent />}
      {eventLoading === 'loaded' &&
        isEventFound ?
        <div className="eventPage">
          <div className="event_img" style={{ backgroundImage: `url(${eventData.imgUrl})` }}>
            <div>
              {returnStartDateAndTime(eventData.startDateAndTime)}
              <h1>{eventData.title}</h1>
            </div>
          </div>
        </div>
        : <NotFoundComponent />
      }
    </>
  );
}

export default EventComponent;
