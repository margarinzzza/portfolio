import style from './SecondTaskPage.module.scss'
import { wayTypes, ways } from '../../store';
import { useEffect, useState } from 'react';
import { translateDateStringToNum, translateTimeStringToNum } from '../../funcs/funcs';

const SecondTaskAtoB = () => {

  const [wayType, setWayType] = useState(null) //тип направления
  const [openWayTypeList, setOpenWayTypeList] = useState(false)

  const [wayTime, setWayTime] = useState(null) //направление в одну сторону
  const [openWayTimeList, setOpenWayTimeList] = useState(false)
  const [wayTimeList, setWayTimeList] = useState(ways)

  const [backWayTime, setBackWayTime] = useState(null) //направление в обратную сторону 
  const [openBackWayTimeList, setOpenBackWayTimeList] = useState(false)
  const [backWayTimeList, setBackWayTimeList] = useState(ways)

  const [wayCost, setWayCost] = useState(0) //общая стоимость проезда
  const [arrivalTime, setArrivalTime] = useState('') //время прибытия в одну сторону
  const [backArrivalTime, setBackArrivalTime] = useState('') //время прибытия в одну сторону
  const [ticketNumber, setTicketNumber] = useState(0) //количество билетов

  const wayTimeYMD = translateDateStringToNum(wayTime?.date) //перевод даты из строки формата (2000-01-01) в обьект
  const wayTimeHM = translateTimeStringToNum(wayTime?.time) //перевод времени из строки формата (11:11:11) в обьект
  const backWayTimeYMD = translateDateStringToNum(backWayTime?.date) //перевод даты из строки формата (2000-01-01) в обьект
  const backWayTimeHM = translateTimeStringToNum(backWayTime?.time) //перевод времени из строки формата (11:11:11) в обьект

  useEffect(() => { //рассчет времени
    if (wayTimeHM) {
      let wayTimeMinutes = wayTimeHM.minutes += wayTime.travelTime
      let wayTimeHours = wayTimeHM.hours
      let wayTimeDays = wayTimeYMD.days
      let wayTimeMonth = wayTimeYMD.month
      let wayTimeYears = wayTimeYMD.years
      let isErrors = false
      while (isErrors === false) {
        if (wayTimeMinutes >= 60) { wayTimeMinutes -= 60; wayTimeHours += 1 }
        else if (wayTimeHours >= 24) { wayTimeHours -= 24; wayTimeDays += 1 }
        else if (wayTimeDays >= 30) { wayTimeDays -= 30; wayTimeMonth += 1 }
        else if (wayTimeMonth >= 12) { wayTimeMonth -= 12; wayTimeYears += 1 }
        else { isErrors = true }
      }
      const arrivalTime = `${wayTimeYears}-${wayTimeMonth < 10 ? '0' + wayTimeMonth : wayTimeMonth}-${wayTimeDays} ${wayTimeHours}:${wayTimeMinutes}`
      setArrivalTime(arrivalTime)
    }
  }, [wayTime])

  useEffect(() => { //рассчет обратного времени
    if (backWayTimeHM) {
      let wayTimeMinutes = backWayTimeHM.minutes += wayTime.travelTime
      let wayTimeHours = backWayTimeHM.hours
      let wayTimeDays = backWayTimeYMD.days
      let wayTimeMonth = backWayTimeYMD.month
      let wayTimeYears = backWayTimeYMD.years
      let isErrors = false
      while (isErrors === false) {
        if (wayTimeMinutes >= 60) { wayTimeMinutes -= 60; wayTimeHours += 1 }
        else if (wayTimeHours >= 24) { wayTimeHours -= 24; wayTimeDays += 1 }
        else if (wayTimeDays >= 30) { wayTimeDays -= 30; wayTimeMonth += 1 }
        else if (wayTimeMonth >= 12) { wayTimeMonth -= 12; wayTimeYears += 1 }
        else { isErrors = true }
      }
      const arrivalTime = `${wayTimeYears}-${wayTimeMonth < 10 ? '0' + wayTimeMonth : wayTimeMonth}-${wayTimeDays} ${wayTimeHours}:${wayTimeMinutes}`
      setBackArrivalTime(arrivalTime)
    }
  }, [backWayTime])

  useEffect(() => { //фильтр списка направлений обратно
    if (wayTime) {
      const arrivalTimeHm = `${arrivalTime[11]}${arrivalTime[12]}${arrivalTime[14]}${arrivalTime[15]}`
      const filteredBackWayTimeList = ways.filter(way => {
        const wayTimeHm = `${way.time[0]}${way.time[1]}${way.time[3]}${way.time[4]}`
        if (way.type === 'BtoA' && wayTimeHm >= arrivalTimeHm) {
          return true
        } else return false
      })
      setBackWayTimeList(filteredBackWayTimeList)
    }
    setBackWayTime(null)
    setBackArrivalTime('')
  }, [wayTime, arrivalTime])

  const wayTypeHandler = (value) => { //обработчик выбора типа направления
    setOpenWayTypeList(false);
    setWayTime(null)
    setBackWayTime(null)
    setWayType(value);
  }

  const ticketNumberVisible = () => { //определитель видимости поля ввода количества билетов
    if (wayType?.typeValue !== 'AtoBtoA') {
      if (wayTime == null) {
        return style.disabledSelector
      }
    } else if (wayType?.typeValue == 'AtoBtoA') {
      if (backWayTime == null) {
        return style.disabledSelector
      }
    }
  }

  const ticketNumberHandler = (value) => { //обработчик выбора количества билетов
    setTicketNumber(value);
    if (backWayTime !== null) {
      setWayCost((wayTime.cost * value) + (backWayTime?.cost * value))
    } else setWayCost(wayTime.cost * value)
  }

  useEffect(() => { //обработчик выбора типа направления и заполнение соответствующих массивов
    if (wayType?.typeValue !== 'AtoBtoA') {
      const filteredWayArray = ways.filter((way) => {
        return way.type === wayType?.typeValue
      })
      setWayTimeList(filteredWayArray)
    } else {
      const filteredWayArray = ways.filter((way) => {
        return way.type === 'AtoB'
      })
      const filteredBackWayArray = ways.filter((way) => {
        return way.type === 'BtoA'
      })
      setWayTimeList(filteredWayArray)
      setBackWayTimeList(filteredBackWayArray)
    }
  }, [wayType])

  useEffect(() => { //обработчик выбора направления и очищения поля количества билетов
    setWayCost(0)
    setTicketNumber(0)
  }, [wayTime, backWayTime])

  return (
    <div className={`${style.content} flex flex-col`}>
      <h3 className={``}>Купить билет</h3>
      <div className={`${style.selectors}`}>

        <div onBlur={() => console.log('first')} onClick={() => setOpenWayTypeList(!openWayTypeList)} className={`${style.selectorBlock}`}>
          <div className={`${style.selectorValue}`}>
            <div className='flex items-center justify-between'>
              {wayType !== null ? <span>{wayType.name}</span> : <span>Выберите направление</span>}
              <svg className={`bi bi-caret-up ${openWayTypeList && style.rotateArrow}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
              </svg>
            </div>
          </div>
          <div className={`${style.selectorValues} ${openWayTypeList && style.showSelectorValues}`}>
            {wayTypes.map((type) => {
              return (
                <div key={type.id} onClick={() => { wayTypeHandler({ typeValue: type.typeValue, name: type.name }) }}>
                  {type.name}
                </div>
              )
            })}
          </div>
        </div>

        <div onClick={() => setOpenWayTimeList(!openWayTimeList)} className={`${style.selectorBlock} ${wayType == null && style.disabledSelector}`}>
          <div className={`${style.selectorValue}`}>
            <div className='flex items-center justify-between'>
              {wayTime !== null ? <span>{wayTime.date} {wayTime.time}</span> : <span>Выберите время</span>}
              <svg className={`bi bi-caret-up ${openWayTimeList && style.rotateArrow}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
              </svg>
            </div>
          </div>
          <div className={`${style.selectorValues} ${openWayTimeList && style.showSelectorValues}`}>
            {wayTimeList.map((way) => {
              return (
                <div key={way.id} onClick={() => { setOpenWayTimeList(false); setWayTime(way) }}>
                  <span className='mr-2'>{way.date}</span>
                  <span>{way.time}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div onClick={() => setOpenBackWayTimeList(!openBackWayTimeList)} className={`${style.selectorBlock} ${(wayType?.typeValue !== 'AtoBtoA' || wayTime == null) && style.disabledSelector}`}>
          <div className={`${style.selectorValue}`}>
            <div className='flex items-center justify-between'>
              {backWayTime !== null ? <span>{backWayTime.date} {backWayTime.time}</span> : <span>{backWayTimeList.length !== 0 ? 'Выберите обратное время' : 'Рейсы отсутвуют'} </span>}
              {backWayTimeList.length !== 0 &&
                <svg className={`bi bi-caret-up ${openBackWayTimeList && style.rotateArrow}`} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
                </svg>
              }

            </div>
          </div>
          <div className={`${style.selectorValues} ${openBackWayTimeList && style.showSelectorValues}`}>
            {backWayTimeList.length !== 0 &&
              backWayTimeList.map((way) => {
                return (
                  <div key={way.id} onClick={() => { setOpenBackWayTimeList(false); setBackWayTime(way) }}>
                    <span className='mr-2'>{way.date}</span>
                    <span>{way.time}</span>
                  </div>
                )
              })
            }
            { }
          </div>
        </div>

        <div className={`${style.selectorBlock} ${ticketNumberVisible()}`}>
          <input onChange={(e) => ticketNumberHandler(e.target.value)} value={ticketNumber} placeholder='Количество билетов' pattern="[0-9]+" min={1} className={`${style.selectorValue}`} type="number" />
        </div>

      </div>
      <div className={`${style.result}`}>
        <div><span>Маршрут:</span> {wayType !== null ? wayType.name + ' ' : '- '}</div>
        <div><span>Цена билета:</span> {wayTime?.cost ? wayTime.cost + 'р.' : '-'}</div>
        <div><span>Количество билетов:</span> {ticketNumber !== 0 ? ticketNumber : '-'}</div>
        <div><span>Стоимость билетов:</span> {wayCost !== 0 ? wayCost + 'р.' : '-'}</div>
        <div><span>Время в пути:</span> {wayTime?.travelTime ? wayTime.travelTime + ' минут' : '-'}</div>
        <div><span>Время отправки:</span> {wayTime?.date ? wayTime?.date + ' ' + wayTime?.time : '-'}</div>
        <div><span>Время прибытия:</span> {arrivalTime}</div>
        {wayType?.typeValue == 'AtoBtoA' &&
          <>
            <div><span>Время отправки обратно:</span> {backWayTime?.date ? backWayTime?.date + ' ' + backWayTime?.time : '-'}</div>
            <div><span>Время прибытия обратно: </span>{backArrivalTime != 0 ? backArrivalTime : '-'}</div>
          </>
        }
      </div>
    </div>
  );
}

export default SecondTaskAtoB;
