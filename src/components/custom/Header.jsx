import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";



const Header = () => {
 const [open1, setOpen1] = useState(false);
   const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
 
  useEffect(() => {
    // console.log(user);
  }, []);
  const login = useGoogleLogin ({
    onSuccess:(codeResp)=> GetUserProfile(codeResp),
    onError:(error)=> console.log(error)
  })

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
      window.location.reload();
    })
  }
  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <h1 className="font-extrabold text-3xl">Travel <span className="text-red-600">EAse</span>🌍</h1>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full">
              + Create Trip
            </Button>
            </a>


            <a href="/my-trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger>
              <img
              src={user?.picture}
              className="h-[35px] w-[35px] rounded-full"
              alt=""
            />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
                
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={()=> setOpen1(true)}>Sign In</Button>
        )}
      </div>
     
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
  );
};

export default Header;
