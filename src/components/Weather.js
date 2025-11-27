import { createContext} from "react";
export const WeatherContext = createContext({
    weather:null,
    sunrise:"",
    sunset:"",
    setWeatherData:()=>{}
})