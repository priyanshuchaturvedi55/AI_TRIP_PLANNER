import React from 'react'

const CreateTrip = () => {
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
       <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
       <p className='mt-3 text-gray-500 text-xl'>"Just provide some details, and we'll craft a personalized travel itinerary for you effortlessly."</p>

       <div className='mt-20'>
        <div>
        <h2 className='text-xl my-2 font-medium'>what is destination of choice?</h2>
        <GooglePlacesAutocomplete 
           apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
         />
         
        </div>
        
       </div>
    </div>
  )
}

export default CreateTrip