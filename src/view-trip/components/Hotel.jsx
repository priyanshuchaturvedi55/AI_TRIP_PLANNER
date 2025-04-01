import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";


const Hotel = ({ trip }) => {
  // console.log("Hotel Component Data:", trip);

  // Extract trip details dynamically
  const tripDetails = trip?.tripData && Object.values(trip.tripData)[0]; 
  const hotels = tripDetails?.hotels || [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <HotelCardItem hotel={hotel}/>
          ))
        ) : (
          <p>No hotels available</p>
        )}
      </div>
    </div>
  );
};

export default Hotel;
