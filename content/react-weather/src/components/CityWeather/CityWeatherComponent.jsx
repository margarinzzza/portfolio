import CityTemperatureComponent from "./CityTemperatureComponent";
import CityWeatherDataComponent from "./CityWeatherDataComponent";

const CityWeatherComponent = () => {

  return (
    <div className="city-weather row d-flex">
      <CityTemperatureComponent/>
      <CityWeatherDataComponent/>
    </div>
  );
}

export default CityWeatherComponent;
