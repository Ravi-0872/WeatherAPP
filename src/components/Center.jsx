import React, { useContext,useState } from "react";
import { WeatherContext } from "./Weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Center = () => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weekTemps, setWeekTemps] = useState([]);
  const {setWeatherData,weather} = useContext(WeatherContext);

  async function getWeeklyWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Cannot get weekly data");
    return res.json();
  }

  const getWeekTemps = (list, timezone) => {
    const daily = {};

    list.forEach((item) => {
      const date = new Date((item.dt + timezone) * 1000);
      const day = date.toLocaleDateString(undefined, { weekday: "long" });

      if (!daily[day]) {
        daily[day] = {
          temps: [],
          min: item.main.temp_min,
          max: item.main.temp_max,
        };
      }

      daily[day].temps.push(item.main.temp);
      daily[day].min = Math.min(daily[day].min, item.main.temp_min);
      daily[day].max = Math.max(daily[day].max, item.main.temp_max);
    });

    const weekOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return weekOrder
      .filter((d) => daily[d])
      .map((day) => ({
        day,
        avg: Math.round(
          daily[day].temps.reduce((a, b) => a + b) / daily[day].temps.length
        ),
        min: Math.round(daily[day].min),
        max: Math.round(daily[day].max),
      }));
  };
 const handlesearch = async (e) => {
  e.preventDefault();
  console.log("form submitted:",city)
  setError("");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    const sunriseVal = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const sunsetVal = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setWeatherData(data, sunriseVal, sunsetVal);
    const weekData = await getWeeklyWeather(city);
    const week = getWeekTemps(weekData.list, data.timezone);
    setWeekTemps(week);

    console.log(week);
  } catch (err) {
    setError(err.message);
  }
};

 
  const getLocalDate = () => {
    if (!weather) return "";
    const localTime = new Date((weather.dt + weather.timezone) * 1000);
    return localTime.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getLocalDay = () => {
    if (!weather) return "";
    const localTime = new Date((weather.dt + weather.timezone) * 1000);
    return localTime.toLocaleDateString(undefined, { weekday: "long" });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* <span className="material-symbols-outlined" >search</span> */}
      <form onSubmit={handlesearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city... "
          className="bg-[#28273cbb] border-0 text-white flex-1 outline-none rounded-xl p-1 px-3 w-[40vw]"
        />
      </form>

      <div className="BOxy bg-[#28273cbb] w-[50vw] h-[40vh] text-white rounded-xl p-2 px-3 flex justify-between ">
        <div className="leftside flex flex-col gap-9 ">
          <h1 className="Location bg-purple-600 rounded-xl max-w-fit px-4 ">
            {weather ? weather.sys.country : "Country"}
          </h1>
          <div className="daydate flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">
              {weather ? weather.name : "City Name"}
            </h1>
            <h2>{weather ? getLocalDate() : "Day,Date"}</h2>
          </div>
          <div className="temp flex flex-col gap-2">
            <h1 className="text-4xl font-semibold">
              {weather ? `${Math.round(weather.main.temp_max)}°C` : "-- °C"}
            </h1>
            <h2>
              {weather
                ? `High:${Math.round(weather.main.temp_max)} Low:${Math.round(
                    weather.main.temp_min
                  )}`
                : "High:-- Low:--"}
            </h2>
          </div>
        </div>
        <div className="rightside flex flex-col justify-around">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/024/825/195/small/3d-weather-icon-day-with-rain-free-png.png"
            className="w-1/2 "
            alt=""
          />
          <div>
            <h1 className="text-3xl font-semibold">
              {weather ? weather.weather[0].description : "Condition"}
            </h1>
            <h2>
              {weather
                ? `Feels like ${Math.round(weather.main.feels_like)}°C`
                : ""}
            </h2>
          </div>
        </div>
      </div>
      <div className="BOxy2 bg-[#28273cbb] w-[50vw] h-[40vh] flex flex-col gap-8 text-white rounded-xl p-2 px-3">
        <h1 className="text-xl">Weekly Forecast</h1>

        <div className="cards w-full h-full flex gap-5">
          {" "}
          {weekTemps.length > 0 ? (
            weekTemps.slice(0, 5).map((w, i) => (
              <div
                key={w.day + i}
                className="bg-slate-300 text-slate-700 text-lg w-[18%] h-[80%] rounded-xl flex flex-col justify-between p-2"
              >
                <div>{w.day}</div>
                <div className="tempshort text-2xl font-semibold">{w.avg}°C</div>
                <div className="text-sm">
                  High:{w.max}° Low:{w.min}°
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Search a city to see week data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Center;
