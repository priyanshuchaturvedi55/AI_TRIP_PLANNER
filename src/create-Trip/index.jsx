import React, { useEffect, useRef, useState } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Input } from "postcss";
import { Button } from "../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "../constants/option";
import { toast } from "sonner";
import { chatSession } from "../components/services/AIMODEL";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../components/services/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// Define libraries array outside the component
const libraries = ["places"];

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [open1, setOpen1] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchBoxRef = useRef(null);
  const [formData, setFormData] = useState({});
  const Navigate = useNavigate();

  const handlePlaceChanged = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  // here we are using the useGoogleLogin hook to get the login function

  const login = useGoogleLogin ({
    onSuccess:(codeResp)=> GetUserProfile(codeResp),
    onError:(error)=> console.log(error)
  })
// here we are using the useGoogleLogin hook to get the login function

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpen1(true);
      return;
    }

    if (
      formData?.["no.of.days"] > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("please fill all the details");
      return;
    }
   setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.["no.of.days"])
      .replace("{travel}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    // now we send a message to the AI model with the final prompt  --AIModel
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
// Add a new document in collection "cities"
await setDoc(doc(db, "AITRIPPLANNER", docId), {
  userSelection: formData,
  tripData:JSON.parse(TripData),
  userEmail:user?.email,
  id:docId
});
setLoading(false);
Navigate(`/view-trip/${docId}`); 
  }



  // here we are using the useGoogleLogin hook to get the login function
  const GetUserProfile = (tokenInfo) =>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo.access_token}`,{
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
        }
    }).then((resp)=>{
      console.log(resp);
      // save the data in localstorage
      localStorage.setItem("user",JSON.stringify(resp.data));
      setOpen1(false);
      OnGenerateTrip();
    })
  }
  


  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        "Just provide some details, and we'll craft a personalized travel
        itinerary for you effortlessly."
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-2 font-medium">
            What is your destination of choice?
          </h2>

          {/* Load Google Maps API */}
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            libraries={libraries}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (searchBoxRef.current = ref)}
              onPlacesChanged={() => {
                if (!searchBoxRef.current) return;
                const places = searchBoxRef.current.getPlaces();
                if (!places || places.length === 0) return;
                const selectedPlace = places[0].formatted_address;
                setPlace(selectedPlace);
                handlePlaceChanged("location", selectedPlace);
              }}
            >
              <input
                type="text"
                placeholder="Enter a destination"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </StandaloneSearchBox>
          </LoadScript>

          {/* Display selected place */}
          {place && (
            <p className="mt-2 text-lg text-gray-700">Selected: {place}</p>
          )}
        </div>

        <div>
          <h2 className="text-xl my-2 font-medium">
            how many days are you planning for trip?
          </h2>
          <input
            type="number"
            placeholder="Ex. 3"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handlePlaceChanged("no.of.days", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-2 font-medium">
          What is your budget for the trip?
          {/* The budget is exclusively allocated for activities and dining purposes. */}
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handlePlaceChanged("budget", item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                ${formData?.budget == item.title && "shadow-lg border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-2 font-medium">
          Who do you plan on traveling with on your next adventure?
          {/* The budget is exclusively allocated for activities and dining purposes. */}
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handlePlaceChanged("traveler", item.people)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg
                ${
                  formData?.traveler == item.people && "shadow-lg border-black"
                }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button
        disabled={loading}
        onClick={OnGenerateTrip}>
          {
            loading?
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />: "Generate Trip"
          }
          </Button>

        <Dialog open={open1}>
        
          <DialogContent>
            <DialogHeader>
              {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
              <DialogDescription>
                <img src="/logo.svg" alt="" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the App with Google Authentication securely</p>
              <Button 
              disable={loading}
              onClick={login}
              className="w-full mt-5 flex gap-4 items-center" >
                
               <FcGoogle className="h-7 w-7" />
               Sign in With Google
            
               </Button>

              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
