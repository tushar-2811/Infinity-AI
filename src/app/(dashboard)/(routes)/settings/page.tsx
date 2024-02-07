import Heading from '@/components/Heading'
import { Settings } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <div>
        <Heading
          title='Settings'
          description='Manage account settings.'
          Icon={Settings}
          iconColor='text-gray-700'
          bgColor='bg-gray-700/10'
        />

        <div className='px-4 lg:px-8 space-y-4'>
            <div className='text-muted-foreground text-sm'>
               hello
            </div>

        </div>
    </div>
  )
}

export default Page
