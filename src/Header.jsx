import React from 'react'

const Header = ({setdisplay , CityName,setCityName , ApiCall}) => {
  return (
    <div id="header">
    <h2>ClimateX</h2>
    <input
      onFocus={()=> setdisplay('flex')}
      type="text"
      value={CityName}
      onChange={(e) => setCityName(e.target.value)}
      onKeyDown={(e) => (e.key === "Enter" && ApiCall() , setdisplay('none') ,setCityName('') )}
      id="Input-Field"
      placeholder="Enter Your Location"
    />
  </div>
  )
}

export default Header