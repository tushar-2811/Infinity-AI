'use client';
import Heading from '@/components/Heading'
import { Download, ImageIcon, MessagesSquare, Move3D } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useForm } from 'react-hook-form'


import { conversationSchema } from '@/validators/conversation';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import  { ChatCompletionMessageParam }  from 'openai/resources/index.mjs';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/avatars/UserAvatar';
import BotAvatar from '@/components/avatars/BotAvatar';
import { amountOptions, imagePromptSchema, resolutionOptions } from '@/validators/image';
import { Select, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectContent, SelectValue } from '@radix-ui/react-select';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

const Page = () => {
  const router = useRouter();
  const [images , setImages] = useState<string[]>([]);
  
  type ImageFormInput = z.infer<typeof imagePromptSchema>;

  const form = useForm<ImageFormInput>({
    resolver: zodResolver(imagePromptSchema),
    defaultValues: {
      prompt: "",
      amount : "1",
      resolution : "512x512"
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof imagePromptSchema>) => {
      try {
        setImages([]);
        const response = await axios.post("/api/image" , data);
       

        const urls = response.data.map((image : {url : string}) => image.url);
        setImages(urls);
        form.reset();
      } catch (error: any) {
         console.log(error)
      }finally{
         router.refresh();
      }
  }

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Generate Images from Simple English"
        Icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A picture of cute Indian girl with long hairs."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
               control={form.control}
               name='amount'
               render={({field}) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  <Select disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                 <SelectValue defaultValue={field.value} />
                              </SelectTrigger>
                            </FormControl>
                          
                          <SelectContent>
                            {amountOptions.map((option) => (
                              <SelectItem
                               key={option.value}
                               value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>

                  </Select>
                </FormItem>
               )}
              />

<FormField
               control={form.control}
               name='resolution'
               render={({field}) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  <Select disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                 <SelectValue defaultValue={field.value} />
                              </SelectTrigger>
                            </FormControl>
                          
                          <SelectContent>
                            {resolutionOptions.map((option) => (
                              <SelectItem
                               key={option.value}
                               value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>

                  </Select>
                </FormItem>
               )}
              />

              <Button className="col-span-12 lg:col-span-2 w-full bg-black " type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>
        </div>


        <div className='space-y-4 mt-4 font-bold '>
          {
            isLoading && (
              <div className='p-20'>
                 <Loader/>
               </div>
            )
          }
        {
          images.length === 0 && !isLoading && (     
              <Empty label='No Images generated.' />
          )
        }
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
           {images.map((src) => (
            <Card
             key={src}
             className='rounded-lg overflow-hidden'
            >
              <div className='relative aspect-square'>
                <Image
                alt='Image'
                fill
                src={src}
                 
                />

              </div>
              <CardFooter className='p-2 '>
                <Button onClick={() => window.open(src)} variant={'secondary'} className='w-full'>
                  <Download className='h-4 w-4 mr-2' />
                  Download
                </Button>

              </CardFooter>

            </Card>
           ))}
          </div>
        </div>

      </div>



    </div>
  )
}

export default Page
