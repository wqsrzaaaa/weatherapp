import logo from '../public/logo.png'

const Header = ({ setdisplay, CityName, setCityName, ApiCall }) => {
  return (
    <div id="header" className='w-full h-18 flex items-center lg:px-10 p-2 justify-between px-6  text-white'>
      <div className='flex items-center gap-2'> 
        <img src={logo} className='w-12 h-12 object-cover' alt="" />
        <h2 className='text-2xl font-bold'>ClimateX</h2>
      </div>
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