import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";

const MyLoc = ({temp , feelsLike ,humidity , wind , city , country}) => {
  return (
    <div id='My-Loc' className="lg:w-[45%] w-full   flex flex-col gap-6">
          <div id='my-loc-dets' className="w-full bg-zinc-900 h-[280px] justify-evenly p-5 px-5 rounded-xl flex flex-col gap-3 shadow-2xl text-white" >
            <h1 className="text-4xl font-extrabold">{city}, <span className="text-sm font-light"> {country}</span></h1>
            <div className="w-full flex items-center justify-between ">
                <h1 className="text-5xl font-bold">{temp}°C</h1>  
                <div id='Feels-like'>
                    <p id='feel'>Feels like <span id='span-feel'>{feelsLike}</span></p>
                    <div className="flex items-center gap-3">
                      <FaArrowUp className='text-green-500'/> <p>{temp}</p>
                      <FaArrowDown className='text-red-400'/> <p>{temp}</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex  items-center gap-5  justify-between  ">
              <div className=" flex items-center gap-3">
                <FiWind   className="text-zinc-400" size={25}/>
                 <div id='speed-val'>
                  <h3 className="text-xl font-bold">Wind speed</h3>
                  <p>{wind}km/h</p>
                 </div>
              </div>
              <div className=" flex items-center gap-3 pr-3  ">
                <WiHumidity  className="text-blue-300" size={35}/>
                 <div id='speed-val'>
                  <h3 className="text-xl font-bold">Humidity</h3>
                  <p>{humidity}%</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default MyLoc