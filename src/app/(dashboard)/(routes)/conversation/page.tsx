'use client';
import Heading from '@/components/Heading'
import { MessagesSquare, Move3D } from 'lucide-react'
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

const page = () => {
  const router = useRouter();
  const [messages , setMessages] = useState<ChatCompletionMessageParam[]>([])
  type PromptFormInput = z.infer<typeof conversationSchema>;

  const form = useForm<PromptFormInput>({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof conversationSchema>) => {
      try {
        const userMessage: ChatCompletionMessageParam = {
          role : 'user',
          content : data.prompt,
        }

        const newMessages : any = [...messages , userMessage]
        
        const response = await axios.post("/api/conversation" , {
           messages : newMessages
        });

        setMessages((current : any) => [...current , userMessage , response.data]);
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
        title="Conversation"
        description="Most Advanced AI Model Of 21st Century"
        Icon={MessagesSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
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
            <div className='flex flex-col-reverse gap-y-4'>
                {
                  messages?.map((message:any) => (
                    <>
                     <div className='text-green' >
                      {message.content}
                     </div>
                    </>
                  ))
                }
            </div>
        </div>

      </div>



    </div>
  )
}

export default page
