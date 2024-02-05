import React from 'react'

import { Avatar,
         AvatarFallback,
         AvatarImage 
    } from "@/components/ui/avatar"



const UserAvatar = () => {
  return (
    <Avatar className='h-8 w-8' >
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>
            {"T"}
        </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
