
import React, { useEffect, useState } from 'react'
import {  useNavigation } from 'react-router-dom';
import { db } from '../components/services/firebaseConfig';
import axios from "axios";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {
    const navigation = useNavigation();
    const[userTrips,setUserTrips] = useState([]);
    useEffect(() => {
     GetUserTrips();
    },[])
    // used to get all user tips
    // @returns
    const GetUserTrips=async() => {
        const user = JSON.parse(localStorage.getItem('user'));
      
        if(!user){
            navigation('/');
            return;
        }
        setUserTrips([]);
        const q = query(collection(db,'AITRIPPLANNER'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setUserTrips(querySnapshot.docs.map(doc => doc.data()));
});
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>My-Text</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
            {userTrips?.length>0?userTrips.map((trip,index)=>(
                <UserTripCardItem trip={trip} />
            ))
          :[1,2,3,4,5,6].map((item,index)=>{
            <div key={index} className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'>
             
            </div>
          })
        }
        </div>
    </div>
  )
}

export default MyTrips