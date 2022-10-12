import { useSelector } from 'react-redux';
import sun_img from '../../media/img/sun.png'

const CityTemperatureComponent = () => {
  const theme = useSelector((state) => state.theme.themeName)
  const city = useSelector((state) => state.city.city)

  return (
    <div className={`col-md-5 col-12`}>
      <div className={`city-temperature d-flex flex-column card ${theme === 'dark' && 'gray-bg'}`}>
        <div className='d-flex align-items-center mb-3'>
          <div className='d-flex flex-column me-4'>
            <span className='fs-96 fw-bold fc-blue'>{city.temperature}°</span>
            <span className='fs-40'>Сегодня</span>
          </div>
          <div>
            <img src={sun_img} alt="sunny" />
          </div>
        </div>

        <div className='d-flex flex-column fc-gray fs-25'>
          <span>Время: {city.time}</span>
          <span>Город: {city.name}</span>
        </div>
      </div>

    </div>
  );
}

export default CityTemperatureComponent;
