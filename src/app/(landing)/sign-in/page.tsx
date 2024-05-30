"use client";
import React, { useState } from 'react'
import LandingNavbar from '@/components/LandingNavbar'
import axios from 'axios';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"



import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from '@/lib/utils'
import Link from 'next/link';
import { SignInSchema } from '@/validators/auth';
import { useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/store/currentUser';
import {toast} from 'sonner'




const Page = () => {
  const router = useRouter();

  const {email , setEmail} = useCurrentUser();
  const[isLoading , setIsLoading] = useState<boolean>(false);

  type Input = z.infer<typeof SignInSchema>;

  const form = useForm<Input>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "", 
    }
  });

  // console.log(form.watch());


 async function onSubmit(data: Input) {
      console.log(data);
      try {
        setIsLoading(true);
        const response = await axios.post("/api/auth/sign-in" , data);

        if(!response.data.ok) {
          toast("UnSuccessful Sign In");
          console.log(response.data.error);
          return;
        }
        
        localStorage.setItem("userEmail" , response.data.user.email);
        setEmail(response.data.user.email);
        router.push("/dashboard");
        toast("Sign-in Successful");
        
      } catch (error) {
         toast("error while Sign In");
         console.log("error in sign-in" , error);
      } finally{
        setIsLoading(false);
      }

  }


  return (
    <div className='h-screen' >
      <LandingNavbar />

      <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' >
        <Card className="w-[400px] bg-black">
          <CardHeader>
            <CardTitle className='text-white' > Enter the Future </CardTitle>
            <CardDescription className='text-white/90' > Start the Journey with us Today. </CardDescription>
          </CardHeader>

          <CardContent>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-8 overflow-x-hidden">
                <div className={cn("space-y-3", {
                  // "hidden": formStep === 1
                })}
                  // translateX = 0 , when formstep == 0
                  // translateX == -100% , when formstep == 1
                 
                >

                  

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-white' >E-mail</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your E-mail..." {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* password */}

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-white' >Password</FormLabel>
                        <FormControl>
                          <Input type='password' placeholder="Enter your Password" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />


                <div className='flex gap-2 justify-between items-center' >
                  <Button type="submit" disabled={isLoading} className={cn(" hover:bg-white bg-white text-black ", )} >
                    Sign In
                  </Button>

                 


                  <Link href={"/sign-up"} >
                   <h1 className=' border-2 border-white text-white px-4 py-2 rounded-md hover:text-red-500 '>Sign Up</h1>
                  </Link>
                </div>

              </form>
            </Form>
          </CardContent>

        </Card>
      </div>

    </div>
  )
}

export default Page
