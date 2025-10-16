import logo from '../public/logo.png'

const Header = ({ setdisplay, CityName, setCityName, ApiCall }) => {
  return (
    <div id="header" className='w-full h-18 flex items-center lg:px-10 p-2 justify-between md:px-6 px-2  text-white'>
      <div className='flex items-center gap-2'> 
        <img src={logo} className='md:w-12 md:h-12 w-5 h-5 object-cover' alt="" />
        <h2 className='md:text-2xl text-sm font-bold'>ClimateX</h2>
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