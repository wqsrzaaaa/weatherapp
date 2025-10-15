import React, { useState, useEffect } from "react";
import cloudImage from './assets/cloud.png';
import rain from './assets/rain.webp'
import Clear from './assets/clear.webp'
import snow from './assets/snow.webp'
import fog from './assets/fog.webp'
import LocDets from "./LocDets";
import Header from "./Header";

const App = () => {
  const [CityName, setCityName] = useState("");
  const [Weather, setWeather] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const citySuggestions = {
    Pakistan: ["Karachi", "Lahore", "Islamabad", "Quetta", "Peshawar"],
    India: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
    Japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Sapporo"],
    Default: ["London", "Paris", "Dubai", "Sydney", "New York"],
  };

  const ApiCall = async () => {
    try {
      const fetchData = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${CityName}&units=metric&appid=54155ab527fe0237fc06084e0c897daf`
      );
      const result = await fetchData.json();

      if (result.city) {
        setWeather({
          city: result.city.name,
          country: result.city.country,
          temp: result.list[0].main.temp,
          humidity: result.list[0].main.humidity,
          wind: result.list[0].wind.speed,
          feels_like: result.list[0].main.feels_like,
          main: result.list[0].weather[0].description,
          pressure: result.list[0].main.pressure,
          temp_max: result.list[0].main.temp_max,
          temp_min: result.list[0].main.temp_min,
          img: result.list[0].weather[0].main,
        });
      }

      if (result.list) {
        const filteredData = result.list
          .map((entry) => ({
            time: new Date(entry.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            temp: entry.main.temp,
          }))
          .filter((item) => {
            const hour = parseInt(item.time.split(":")[0]);
            return hour >= 8 && hour <= 17;
          });

        setChartData(filteredData);
      }

      // ✅ Detect country-related suggestions AFTER pressing Enter
      const name = CityName.toLowerCase();
      if (name.includes("karachi") || name.includes("lahore") || name.includes("islamabad") || name.includes("pak"))
        setSuggestions(citySuggestions.Pakistan);
      else if (name.includes("delhi") || name.includes("mumbai") || name.includes("india"))
        setSuggestions(citySuggestions.India);
      else if (name.includes("tokyo") || name.includes("japan"))
        setSuggestions(citySuggestions.Japan);
      else setSuggestions(citySuggestions.Default);

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const [display, setdisplay] = useState('none')

  return (
    <div className="main relative bg-zinc-800 pb-15 " >

      {/* <div style={{display : display}} className="suggestion"> 
      <h1>Suggestion</h1>
      <p onClick = {()=> setCityName("berlin") }>Berlin</p>
      <p onClick = {()=> setCityName("london") }>London</p>
      <p onClick = {()=> setCityName("islamabad") }>Islamabad</p>
      <p onClick = {()=> setCityName("quetta") }>Quetta</p>
     </div> */}

      <Header setdisplay={setdisplay} setCityName={setCityName} ApiCall={ApiCall} CityName={CityName} />

      <div className="px-5">
        <LocDets chartData={chartData} Weather={Weather} />

        {Weather ? (
          <div className="lg:w-[48%] w-full ">
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 lg:px-6 py-4  ">

              {/* Weather Summary Card */}
              <div className="w-full h-[90px] bg-zinc-900 flex items-center justify-evenly rounded-xl  shadow-2xl">
                <img
                  src={
                    Weather.img === "Clear" ? Clear :
                      Weather.img === "Clouds" ? cloudImage :
                        ["Rain", "Drizzle", "Thunderstorm"].includes(Weather.img) ? rain :
                          Weather.img === "Snow" ? snow :
                            ["Smoke", "Haze", "Fog"].includes(Weather.img) ? fog : ""
                  }
                  alt={Weather.main}
                  className="w-20 h-20 object-contain drop-shadow-lg"
                />
                <div className="flex flex-col  items-start text-white">
                  <h3 className="text-2xl capitalize font-semibold">{Weather.main}</h3>
                </div>
              </div>

              {/* Pressure */}
              <div className="w-full h-[90px] bg-zinc-900 flex items-center justify-evenly rounded-xl  shadow-2xl">
                <h3 className="text-zinc-400 text-sm">Pressure</h3>
                <p className="text-3xl font-semibold text-white">
                  {Weather.pressure} <span className="text-zinc-400 text-sm">hPa</span>
                </p>
              </div>
            </div>

            {/* Extra Details */}
            <div id="Extra-dets" className="w-full flex flex-col md:flex-row items-center justify-between gap-6 lg:px-6 py-4 ">
              <div className="w-full h-[90px] bg-zinc-900 flex items-center justify-evenly rounded-xl  shadow-2xl">
                <h3 className="text-zinc-400 text-sm">Min Temperature</h3>
                <p className="text-3xl font-semibold text-white">
                  {Weather.temp_min} °C
                </p>
              </div>
              <div className="w-full h-[90px] bg-zinc-900 flex items-center justify-evenly rounded-xl  shadow-2xl">
                <h3 className="text-zinc-400 text-sm">Max Temperature</h3>
                <p className="text-3xl font-semibold text-white">
                  {Weather.temp_max} °C
                </p>
              </div>
            </div>
          </div>

        ) : ""}

        {suggestions.length > 0 && (
          <div className="w-full h-[100px]  text-white mt-6 pb-15 px-5 rounded-2xl ">
            <h1 className="text-2xl font-bold ">Suggested Cities</h1>
            <div className="flex items-center flex-wrap gap-4  py-3 ">
              {suggestions.map((city, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCityName(city);
                    setTimeout(() => ApiCall(city), 0);
                  }}
                  className="w-fit px-5 py-2 bg-zinc-900 hover:bg-zinc-950 shadow-2xl rounded-xl  transition-all whitespace-nowrap text-lg font-medium"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>


    </div>
  );
};

export default App;
