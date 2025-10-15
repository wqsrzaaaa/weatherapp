import React from 'react'

const Header = ({ setdisplay, CityName, setCityName, ApiCall }) => {
  return (
    <div id="header" className='w-full h-18 flex items-center lg:px-10 p-2 justify-between px-6  text-white'>
      <h2 className='text-2xl font-bold'>ClimateX</h2>
      <input
        onFocus={() => setdisplay('flex')}
        type="text"
        value={CityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            ApiCall();
            setdisplay('none');
            setCityName('');
          }
        }}
        id="Input-Field"
        placeholder="Enter Your City"
        className='!px-4 p-1 lg:w-82 w-fit rounded-xl border-1 border-zinc-500'
      />
    </div>
  )
}

export default Header