import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import './App.css';
import CityWeatherComponent from './components/CityWeather/CityWeatherComponent';
import ForecastComponent from './components/ForecastComponent';
import HeaderComponent from './components/HeaderComponent';

const App = () => {
  const theme = useSelector((state)=>state.theme.themeName)
  if(theme==='dark'){
    document.body.style.backgroundColor = 'rgba(13, 17, 23, 1)';
  } else {
    document.body.style.backgroundColor = "white";
  }
  
  return (
      <div className={`app container-fluid ${theme === 'dark' && 'dark-theme'} `}>
        <div className='content m-auto'>
          <HeaderComponent />
          <CityWeatherComponent/>
          <ForecastComponent/>
        </div>
      </div>
  );
}

export default App;
