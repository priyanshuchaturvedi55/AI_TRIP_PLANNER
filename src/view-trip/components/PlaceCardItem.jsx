import {Button} from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../components/services/GlobalApi";


const PlaceCardItem = ({ activity }) => {
      const [photoUrl, setPhotoUrl] = useState(null);
    
      useEffect(() => {
        if (activity) {
          GetPlacePhoto();
        }
      }, [activity]);
    
      const GetPlacePhoto = async () => {
        try {
          const data = { textQuery: activity?.placeName};
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
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ activity?.placeName } targret='_blank'>
    
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer">
      <img src={photoUrl ? photoUrl : "/travel.webp"} className="w-[130px] h-[130px] rounded-xl object-cover" />

      <div className="mt-5">
        <h2 className="font-semibold text-lg">
          {activity.placeName || "Unnamed Place"}
        </h2>
        <p className="text-sm text-gray-800">{activity.placeDetails}</p>
        <h2 className="mt-2">⌚{activity.timeToTravelFromHotel}</h2>
        <div className="mt-2">
        <Button  size='sm'><FaMapLocationDot /></Button>
        </div>
        
      </div>
    </div>
    </Link>
  );
};

export default PlaceCardItem;
