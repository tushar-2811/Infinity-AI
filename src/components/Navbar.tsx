import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Navbar = () => {
    return (
        <div className='flex items-center p-4' >
            <Button variant="ghost" size="icon" className='md:hidden' >
                <Menu />
            </Button>

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
