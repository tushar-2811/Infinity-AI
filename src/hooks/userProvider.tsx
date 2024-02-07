"use client";
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import axios from 'axios';
import { toast } from "sonner"

const UserProvider = ({children} : {children: React.JSX.Element} ) => {
  const [user , setUser] = useState(undefined);
  useEffect(() => {
     async function getUser() {
        try {
          const {data} = await axios.get("/api/auth/current-user");
          if(!data.ok) {
             console.log(data.msg , data.error);
             toast(data.msg);
             return;
          }else{
            console.log(data.user)
            setUser({...data.user});
          }
          
        } catch (error) {
           console.log("error in getting current user" , error);
           toast("Error in getting user" );
           setUser(undefined);
        }
     }
     getUser();
  } , [])
  return (
    <UserContext.Provider value={{user , setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
