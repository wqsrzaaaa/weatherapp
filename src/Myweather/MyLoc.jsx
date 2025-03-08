import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";

const MyLoc = ({temp , feelsLike ,humidity , wind , city , country}) => {
  return (
    <div id='My-Loc'>
          <div id='my-loc-dets'>
            <h1>{city}, <span id='City-span'> {country}</span></h1>
            <div id="degries">
                <h1 id='deg'>{temp}°C</h1>  
                <div id='Feels-like'>
                    <p id='feel'>Feels like <span id='span-feel'>{feelsLike}</span></p>
                    <div id='up-down'>
                      <FaArrowUp className='up'/> <p>{temp}</p>
                      <FaArrowDown className='down'/> <p>{temp}</p>
                    </div>
                </div>
            </div>
            <div id="wind-humidity">
              <div id='wind'>
                <FiWind id='Wind-icon'/>
                 <div id='speed-val'>
                  <h3>Wind speed</h3>
                  <p>{wind}km/h</p>
                 </div>
              </div>
              <div id='wind'>
                <WiHumidity id='Wind-icon'/>
                 <div id='speed-val'>
                  <h3>Humidity</h3>
                  <p>{humidity}%</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default MyLoc