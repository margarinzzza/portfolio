import { useSelector } from 'react-redux';
import thermometr from '../../media/img/thermometr.png'
import pressure from '../../media/img/pressure.png'
import precipitation from '../../media/img/precipitation.png'
import wind from '../../media/img/wind.png'
import cloud_bg from '../../media/img/cloud_bg.png'


const CityWeatherDataComponent = () => {
  const theme = useSelector((state) => state.theme.themeName)
  const city = useSelector((state) => state.city.city)

  const checkPressure = (value) => {
    if (value == 760) {
      return 'нормальное'
    } else if (value < 760) {
      return 'пониженное'
    } else {
      return 'повышенное'
    }
  }

  const checkWind = (value) => {
    if (0.1 < value && value < 5) {
      return 'тихий'
    }
    if (5.1 < value && value < 10) {
      return 'умеренный'
    }
    if (10.1 < value && value < 18) {
      return 'сильный'
    }
    if (18.1 < value) {
      return 'очень сильный'
    }
  }

  return (
    <div className={`col-md-7 col-12 `}>
      <div className={`d-flex weather-data h-100 ${theme === 'dark' && 'gray-bg'} card justify-content-evenly city-weather-data flex-column `}>

        <div className='row d-flex align-items-center'>
          <div className='col-md-1 col-1'>
            <div className='white-circle'>
              <img src={thermometr} alt="$" />
            </div>
          </div>
          <div className='col-md-3 ms-4 col-3 fc-gray'>
            <span>Температура</span>
          </div>
          <div className='col-md col'>
            <span>{city.temperature}° - ощущается как 17°</span>
          </div>
        </div>

        <div className='row d-flex align-items-center'>
          <div className='col-md-1 col-1'>
            <div className='white-circle'>
              <img src={pressure} alt="$" />
            </div>
          </div>
          <div className='col-md-3 ms-4 col-3 fc-gray'>
            <span>Давление</span>
          </div>
          <div className='col-md col'>
            <span>{city.pressure} мм ртутного столба - {checkPressure(city.pressure)}</span>
          </div>
        </div>

        <div className='row d-flex align-items-center'>
          <div className='col-md-1 col-1'>
            <div className='white-circle'>
              <img src={precipitation} alt="$" />
            </div>
          </div>
          <div className='col-md-3 ms-4 col-3 fc-gray'>
            <span>Осадки</span>
          </div>
          <div className='col-md col'>
            <span>{city.precipitation ? 'Дождь' : 'Без осадков'}</span>
          </div>
        </div>

        <div className='row d-flex align-items-center'>
          <div className='col-md-1 col-1'>
            <div className='white-circle'>
              <img src={wind} alt="$" />
            </div>
          </div>
          <div className='col-md-3 ms-4 col-3 fc-gray'>
            <span>Ветер</span>
          </div>
          <div className='col-md col'>
            <span>{city.wind.speed} м/с {city.wind.direction} - {checkWind(city.wind.speed)} ветер</span>
          </div>
        </div>

      </div>
    </div>

  );
}

export default CityWeatherDataComponent;
