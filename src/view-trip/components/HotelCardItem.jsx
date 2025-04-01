import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../components/services/GlobalApi';

const HotelCardItem = ({hotel}) => {

   const [photoUrl, setPhotoUrl] = useState(null);
  
    useEffect(() => {
       if(hotel){
        GetPlacePhoto();
       }
      
    }, [hotel]);
  
    const GetPlacePhoto = async () => {
      try {
        const data = { textQuery: hotel?.hotelName};
        const result = await GetPlaceDetails(data);
        
        if (result.data.places?.[0]?.photos?.length > 0) {
          const photoIndex = result.data.places[0].photos.length > 3 ? 3 : 0; // Avoid out-of-bound errors
          const photoName = result.data.places[0].photos[photoIndex].name;
          const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
          
          // console.log(photoUrl); // Debugging
          setPhotoUrl(photoUrl);
        } else {
          console.error("No photos available");
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

  return (
    <div>
        <Link to= {'https://www.google.com/maps/search/?api=1&query='+ hotel?.hotelName + hotel?.hotelAddress} target='_blank'>
            <div  className="hover:scale-105 transition-all duration-300 cursor-pointer">
              <img src={photoUrl || "/travel.webp"}className="rounded-xl h-[180px] w-full object-cover" />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="text-x5 text-gray-500">📍{hotel?.hotelAddress}</h2>
                <h2 className="text-sm">💲{hotel?.price} per night</h2>
                <h2 className="text-sm flex item-centers gap-2">⭐{hotel?.rating} stars </h2>
              </div>
              
            </div>
            </Link>
    </div>
  )
}

export default HotelCardItem