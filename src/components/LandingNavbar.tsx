'use client';
import React from 'react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const font = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

const LandingNavbar = () => {
    let isSignedIn: boolean = false;
    
    return (
        <nav className='p-4 bg-transparent flex items-center justify-between ' >
            <Link href={"/"} className='flex items-center' >
                <div className='relative h-8 w-8 mr-4 hover:cursor-pointer '>
                    <Image
                        fill
                        alt="Logo"
                        src="/logo.png"
                    />
                </div>

                <h1 className={cn("text-2xl text-white font-bold", font.className)} >
                    Infinity
                </h1>
            </Link>


            <div className='flex items-center gap-x-2'>

                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="outline" className='rounded-full'>
                        Get Started
                    </Button>
                </Link>

            </div>


        </nav>
    )
}

export default LandingNavbar
