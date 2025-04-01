import React from 'react'
import { Button } from '../ui/button'
import {Link} from 'react-router-dom'
const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 '>

      {/* Video Background */}
      <video 
        className="absolute top-[70px] left-0 w-full h-[80vh] object-cover z-[-1] opacity-80"
        autoPlay 
        loop 
        muted 
        playsInline // Ensures mobile compatibility
      >
        <source src="/videoplayback.mp4" type="video/mp4" />
        {/* <source src="/videos/hero-video.webm" type="video/webm" /> */}
        Your browser does not support the video tag.
      </video>

        <h1
        className='font-extrabold text-[50px] text-center mt-16'
        >
          <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span><br/> Personalized Itineraries at Your Fingertips</h1>
          <p className="text-xl font-bold text-black-900 text-center">
          "AI plans seamless, personalized trips for adventure, relaxation, and exploration."
          </p>
          <Link to={'/create-trip'}>
          <Button>"Discover Your Trip" ✈️</Button>
          </Link>
          
     <h2>Created by Priyanshu</h2>
    </div>
  )
}

export default Hero