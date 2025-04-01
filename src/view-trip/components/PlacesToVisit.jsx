import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  const tripDetails = trip?.tripData && Object.values(trip.tripData)[0];
  const itineraryObject = tripDetails?.itinerary || {};

  // Convert itinerary object into an array of { day: "day1", activities: [...] }
  const itineraryArray = Object.entries(itineraryObject).map(
    ([day, details]) => ({
      day,
      activities: details.activities || [],
    })
  );

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div >
        {itineraryArray
      .sort((a, b) => {
        const numA = parseInt(a.day.replace("day", ""), 10);
        const numB = parseInt(b.day.replace("day", ""), 10);
        return numA - numB;
      }).map((place, index) => (
          <div key={index} >
            <h2 className="font-bold text-lg">{place.day}</h2>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
            {place.activities.map((activity, index) => (
              <div key={index} className="mb-4">
                
                
                <div className="">
                  <h2 className="font-medium text-sm text-orange-500">
                  {activity.bestTimeToVisit || "Anytime "}
                </h2>
                  <PlaceCardItem activity={activity}/>
                </div>

              </div>
            ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
