import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../components/services/GlobalApi';
import { Link } from 'react-router-dom';

const UserTripCardItem = ({trip}) => {
      const [photoUrl, setPhotoUrl] = useState(null);
    
      useEffect(() => {
        if (trip?.userSelection?.location) {
          GetPlacePhoto();
        }
      }, [trip]);
    
      const GetPlacePhoto = async () => {
        try {
          const data = { textQuery: trip?.userSelection?.location };
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
    <Link to={'/view-trip/'+ trip?.id}>   
    <div className='hover:scale-105 transition-all duration-300'>
        <img src={photoUrl ? photoUrl : "/travel.webp"}className="h-[250px] w-[270px] object-cover rounded-xl"/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='text-sm text-gray-800'>{trip?.userSelection?.["no.of.days"]} Days trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem