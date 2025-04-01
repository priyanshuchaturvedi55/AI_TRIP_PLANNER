import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { FaShare } from "react-icons/fa6";
import { GetPlaceDetails, PHOTO_REF_URL } from '../../components/services/GlobalApi';

const InfoSection = ({ trip }) => {
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
    <div>
      <img src={photoUrl ? photoUrl : "/travel.webp"} className="h-[340px] w-full object-cover rounded-xl" />

     
      <div className='flex justify-between items-center'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
        <div className='flex  gap-5'>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:test-md '>📅 {trip?.userSelection?.["no.of.days"]} Day</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:test-md'>💰{trip?.userSelection?.budget} Budget</h2>
        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:test-md'>🥂No. Of Traveler: {trip?.userSelection?.traveler} People </h2>

        </div>
      </div>
      <Button><FaShare /></Button>
      </div>
      
    </div>
  );
};

export default InfoSection;
