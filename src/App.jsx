import { Link } from "react-router"

/**
 * Landing page for the gallery application
 * 
 * @returns {JSX.Element} The landing page component
 */
function App() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6 sm:gap-8 px-4'> 
      <h1 className='bbh-sans text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-center'>gallary.</h1>
      <Link to="/photos" className='font-semibold text-base sm:text-lg px-5 sm:px-6 py-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300'>
        Explore
      </Link>
    </div>
  )
}

export default App
