"use client";
import React, { useState } from 'react'
import LandingNavbar from '@/components/LandingNavbar'

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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { SignUpSchema } from '@/validators/auth'
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from '@/lib/utils';
import { ArrowBigRight, ArrowLeft, ArrowRight } from 'lucide-react';




const page = () => {
  const [formStep, setFormStep] = useState(0);
  type Input = z.infer<typeof SignUpSchema>;

  const form = useForm<Input>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      confirmPassword: "",
      gender: ""
    }
  });

  // console.log(form.watch());


  function onSubmit(data: Input) {
    console.log(data);
  }


  return (
    <div className='h-screen' >
      <LandingNavbar />

      <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' >
        <Card className="w-[400px] bg-black">
          <CardHeader>
            <CardTitle className='text-white' > Register </CardTitle>
            <CardDescription className='text-white/90' > Start the Journey with us Today. </CardDescription>
          </CardHeader>

          <CardContent>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                <div className={cn("space-y-3", {
                  "hidden": formStep === 1
                })}>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-white' >Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your Name..." {...field} />
                        </FormControl>
                        <FormDescription className='text-white/60' >
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <FormField
                    control={form.control}
                    name="phoneNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-white' >Phone No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your Phone No..." {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-white' >Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Your Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />


                </div>

                {/* password and confirm password */}

                <div className={cn("space-y-3", {
                  "hidden": formStep === 0
                })}>

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


                  <FormField
                    control={form.control}
                    name="confirmPassword"

                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-white' >Confirm Password</FormLabel>
                        <FormControl>
                          <Input type='password' placeholder="Confirm your Password" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>


                <div className='flex gap-2' >
                  <Button type="submit" className={cn(" hover:bg-white bg-white text-black ", {
                    "hidden": formStep === 0
                  })} >Submit</Button>
                  <Button
                    onClick={() => {
                      form.trigger(['name', 'email', 'phoneNo', 'gender']);
                      const nameState = form.getFieldState('name');
                      const emailState = form.getFieldState('email');
                      const phoneNoState = form.getFieldState('phoneNo');
                      const genderState = form.getFieldState('gender');

                      if (!nameState.isDirty || nameState.invalid) {
                        return;
                      }
                      if (!emailState.isDirty || emailState.invalid) {
                        return;
                      }
                      if (!phoneNoState.isDirty || phoneNoState.invalid) {
                        return;
                      }
                      if (!genderState.isDirty || genderState.invalid) {
                        return;
                      }
                      setFormStep(1)
                    }}
                    className={cn('bg-black text-white border-2' , {"hidden" : formStep === 1})}>
                    Next Step <ArrowRight className='h-4 w-4 ml-2 ' />
                  </Button>

                  <Button 
                  onClick={() => {
                    setFormStep(0);
                  }}
                  type="submit" className={cn('bg-black text-white border-2', {
                    "hidden": formStep === 0
                  })} ><ArrowLeft className='h-4 w-4 mr-2 ' /> Go Back  </Button>
                </div>



              </form>
            </Form>

          </CardContent>

        </Card>
      </div>

    </div>
  )
}

export default page
