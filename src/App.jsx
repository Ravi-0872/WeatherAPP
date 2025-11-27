import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Center from './components/Center'
import Right from './components/Right'
import { WeatherContext } from './components/Weather'

function App() {
const [weather, setWeather] = useState(null);
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const setWeatherData = (weatherData, sunriseStr, sunsetStr) => {
    setWeather(weatherData);
    setSunrise(sunriseStr);
    setSunset(sunsetStr);
  };

  return (
    <WeatherContext.Provider value={{weather,sunrise,sunset,setWeatherData}}>
    <>
      <div className='bg-[#060619] w-full h-screen p-4 flex justify-between'>
      <Navbar/>
      <Center/>
      <Right/>
      </div>
    </>
    </WeatherContext.Provider>
    
  )
}

export default App
