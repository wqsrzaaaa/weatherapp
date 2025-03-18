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
          feels_like : result.list[0].main.feels_like,
          main : result.list[0].weather[0].description,
          pressure : result.list[0].main.pressure,
          temp_max : result.list[0].main.temp_max,
          temp_min : result.list[0].main.temp_min,
          img : result.list[0].weather[0].main,
        });
      }


      if (result.list) {
        const filteredData = result.list
          .map((entry) => ({
            time: new Date(entry.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
            temp: entry.main.temp,
          }))
          .filter((item) => {
            const hour = parseInt(item.time.split(":")[0]);
            return hour >= 8 && hour <= 17;
          });

        setChartData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  
  const [display, setdisplay] = useState('none')
  
  return (
    <div className="main relative">

     {/* <div style={{display : display}} className="suggestion"> 
      <h1>Suggestion</h1>
      <p onClick = {()=> setCityName("berlin") }>Berlin</p>
      <p onClick = {()=> setCityName("london") }>London</p>
      <p onClick = {()=> setCityName("islamabad") }>Islamabad</p>
      <p onClick = {()=> setCityName("quetta") }>Quetta</p>
     </div> */}

     <Header setdisplay={setdisplay} setCityName={setCityName} ApiCall={ApiCall} CityName={CityName} />

      <LocDets chartData={chartData}  Weather={Weather} />
      
      {Weather ? (
        <>
          <div id="Extra-dets">
            <div id="Each-div">
              <img src=
              {Weather.img === "Clear"  ? Clear : 
               Weather.img === "Clouds"  ? cloudImage :
               Weather.img === "Rain" || Weather.img === "Drizzle" || Weather.img === 'Thunderstorm' ? rain : 
               Weather.img === "Snow" ? snow :
               Weather.img === "Smoke" || Weather.img === "Haze" || Weather.img === "Fog" ? fog :
               ""
               }
               alt="" />
              <h3>{ Weather.main }</h3>
            </div>
            <div id="Each-div">
              <h3>Pressure</h3>
              <p><span id="pressure">{Weather.pressure}</span> hPa </p>
            </div>
          </div>
          <div id="Extra-dets">
            <div id="Each-div">
              <h3>Min Temprature</h3>
              <p id="min-temp">{Weather.temp_min} °C</p>
            </div>
            <div id="Each-div">
              <h3>Max Temprature</h3>
              <p id="max-temp">{Weather.temp_max} °C</p>
            </div>
          </div>
        </>
      ) : ""}
    </div>
  );
};

export default App;
