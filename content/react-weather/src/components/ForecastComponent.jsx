import { useState } from 'react';
import { useSelector } from 'react-redux';
import cloud from '../media/img/cloud.png'

const ForecastComponent = () => {
  const theme = useSelector((state) => state.theme.themeName)
  const city = useSelector((state) => state.city.city)
  const [schedule, setSchedule] = useState(0)
  return (
    <>
    <div className="forecast row d-flex justify-content-center">

      <div className="row g-0 forecast__schedule d-flex align-items-center">
        <div className='col-md-9 g-0 col-12 d-flex'>
          <div onClick={()=>setSchedule(0)} className={`${schedule===0&&'blue-bg text-white'} w-auto d-inline me-2  forecast__schedule-item ${theme === 'dark' && 'gray-bg'}`}>
            <span>На неделю</span>
          </div>

          <div onClick={()=>setSchedule(1)} className={`${schedule===1&&'blue-bg text-white'} w-auto me-2 d-inline forecast__schedule-item ${theme === 'dark' && 'gray-bg'}`}>
            <span>На месяц</span>
          </div>

          <div onClick={()=>setSchedule(2)} className={`${schedule===2&&'blue-bg text-white'} w-auto me-2 d-inline forecast__schedule-item ${theme === 'dark' && 'gray-bg'}`}>
            <span>На 10 дней</span>
          </div>
        </div>
        <div className='col d-flex justify-content-end'>
          <div onClick={()=>setSchedule(null)} className={` w-auto d-inline forecast__schedule-item ${theme === 'dark' && 'gray-bg'}`}>
            <span>Отменить</span>
          </div>
        </div>
      </div>

      <div className={`forecast__values row ${theme==='dark'&&'gray-bg'}`}>
        <div className={`forecast__value ${theme==='dark'?'dark-bg':'light-bg'}`}>
          <div className={`forecast__value-card d-flex flex-column `}>
            <span className='fs-18'>Сегодня</span>
            <span className='fs-14 fc-gray'>28 авг</span>
            <img src={cloud} alt="cloud" />
            <span className='fs-18'>+18°</span>
            <span className='fs-14 fc-gray'>+15°</span>
            <span className='fs-14 fc-gray'>Облачно</span>
          </div>
        </div>

        <div className={`forecast__value ${theme==='dark'?'dark-bg':'light-bg'}`} >
          <div className={`forecast__value-card d-flex flex-column `}>
            <span className='fs-18'>Сегодня</span>
            <span className='fs-14 fc-gray'>28 авг</span>
            <img src={cloud} alt="cloud" />
            <span className='fs-18'>+18°</span>
            <span className='fs-14 fc-gray'>+15°</span>
            <span className='fs-14 fc-gray'>Облачно</span>
          </div>
        </div>
      </div>

    </div>

    </>
    
  );
}

export default ForecastComponent;
