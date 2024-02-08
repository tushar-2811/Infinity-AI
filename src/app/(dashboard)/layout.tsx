"use client";
import Navbar from '@/components/Navbar'
import SideBar from '@/components/SideBar'
import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import useCurrentUser from '@/hooks/store/currentUser';

const DashBoardLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const {setEmail} = useCurrentUser();
 
  useEffect(() => {
      if(!localStorage.getItem("userEmail")){
         return;
      }else{
        setEmail(localStorage.getItem("userEmail"));
      }
  } , [setEmail])

  return (
    <div
      className='h-full relative' >
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed 
        md:inset-y-0 z-[80] bg-gray-900 '>
        <SideBar />
      </div>

      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>

    </div>
  )
}

export default DashBoardLayout
