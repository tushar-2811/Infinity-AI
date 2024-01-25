'use client';
import React from 'react'
import { Button } from './ui/button'
import { ArrowBigLeft, ArrowLeft, Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MobileSidebar from './mobile-sidebar'
import { usePathname , useRouter } from 'next/navigation'



const Navbar = () => {
    const pathName = usePathname();
    const router = useRouter();
    return (
        <div className='flex items-center p-4' >
           <MobileSidebar/>

           <div className='flex w-full justify-start'>
               {
                 pathName !== "/dashboard" ? <Button onClick={router.back} >
                    <ArrowLeft className=' hover:cursor-pointer' />
                 </Button> : <div></div>
               }
           </div>

           <div className='flex w-full justify-center'>
               {
                 <Button variant={'premium'} >
                    Your AI Bestfriend
                 </Button>
               }
           </div>

            <div className='flex w-full justify-end'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" /> 
                    {/* <AvatarImage src="https://cdn-icons-png.flaticon.com/128/4128/4128176.png" /> */}
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

        </div>
    )
}

export default Navbar
