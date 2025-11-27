import React, { useContext } from "react";
import { WeatherContext } from "./Weather";

const Right = () => {
  const { weather, sunrise, sunset } = useContext(WeatherContext);
  const humidity = weather?weather.main.humidity:"--";
  const windSpeed = weather?weather.wind.speed:null;
  const windDir = weather?weather.wind.deg:null;
  const visibilityKm = weather?(weather.visibility/1000).toFixed(1):null;


  return (
    <div className="flex flex-col gap-10 ">
      <div className="user bg-[#28273cbb] text-white rounded-xl p-2 px-4 w-[25%] gap-3 flex items-center justify-center relative left-9/12">
        <span class="material-symbols-outlined">account_circle</span>
        Ravi
      </div>
      <div className="BOxy2 bg-[#28273cbb] w-full h-[65%] text-white rounded-xl p-2 px-3 flex justify-around flex-col gap-2 ">
        <h1 className="text-2xl">Today's Highlight</h1>
        <div className="grid grid-cols-2 gap-4 ">
          <div className="bg-[#110f3180] p-1 px-2 w-full h-38 flex justify-center  rounded-xl flex-col gap-0">
            <span>Sunrise:</span>
            <h1 className="relative left-[30%] text-xl font-semibold">{sunrise}</h1>
            <span>Sunset:</span>
            <h1 className="relative left-[30%] text-xl font-semibold">{sunset}</h1>
          </div>
          <div className="bg-[#110f3180] p-1 px-2 w-full h-38 flex justify-center  flex-col gap-2 rounded-xl text-lg">
          Humidity :<div className="relative left-[15%] text-5xl">{humidity}%</div>
          </div>
          <div className="bg-[#110f3180] p-1 px-2 w-full h-38 flex justify-center  flex-col rounded-xl">
            <span>Wind:</span><h1 className="relative left-[20%] text-xl font-semibold">{windSpeed}m/s</h1><span>Direction:</span><h1 className="relative left-[35%] text-xl font-semibold">{windDir}°</h1>
          </div>
          <div className="bg-[#110f3180] p-1 px-2 w-full h-38 flex justify-center  flex-col gap-2 rounded-xl">
            <span>Visibility:</span><h1 className="relative left-[5%] text-5xl ">{visibilityKm}Km</h1>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Right;
