'use client';
import React, { useContext } from 'react'
import { Button } from './ui/button'
import { ArrowBigLeft, ArrowLeft, AtSign, Menu, MessageCircle, MessageSquareHeart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MobileSidebar from './mobile-sidebar'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from "sonner"


import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import UserContext from '@/hooks/userContext';


const Navbar = () => {
    const pathName = usePathname();
    const router = useRouter();
    const context: any = useContext(UserContext);
    const {user} = context

    async function handleLogout() {
         try {
            const response = await axios.get("/api/auth/sign-out");
            if(!response.data.ok){
                console.log(response.data.msg);
                return;
            }
            
            router.push("/");
            toast( "Logout Successful")
            
         } catch (error) {
            console.log("error in logout" , error);
         }
    }
    
    return (
        <div className='flex items-center p-4' >
            <MobileSidebar />

            <div className='flex w-full justify-start'>
                {
                    pathName !== "/dashboard" ? <Button className='bg-black' onClick={router.back} >
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

            <div className='flex w-full justify-end hover:cursor-pointer'>
                <DropdownMenu>

                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            {/* <AvatarImage src="https://cdn-icons-png.flaticon.com/128/4128/4128176.png" /> */}
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className='flex-1' >My Account  </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4 text-pink-500" />
                                <span>user?.email</span>

                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4 text-emerald-500" />
                                <span>Settings</span>

                            </DropdownMenuItem>

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <UserPlus className="mr-2 h-4 w-4 text-violet-500" />
                                    <span>Invite users</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Mail className="mr-2 h-4 w-4 text-sky-500" />
                                            <span>Email</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <MessageCircle className="mr-2 h-4 w-4 text-green-500 " />
                                            <span>Whatsapp</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />

                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />


                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={ handleLogout} >
                            <LogOut className="mr-2 h-4 w-4 text-red-500" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>

                </DropdownMenu>

            </div>

        </div>
    )
}

export default Navbar
