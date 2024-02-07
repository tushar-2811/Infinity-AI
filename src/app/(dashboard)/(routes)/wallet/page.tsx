"use client";
import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Fingerprint, Wallet2Icon } from 'lucide-react'
import React, { useState } from 'react'

const Page = () => {
  const [isWalletSetup, setWalletSetup] = useState<boolean>(true);
  return (
    <div>
      <Heading
        title='Wallet'
        description='Most Advanced wallet of 21st Century.'
        Icon={Fingerprint}
        iconColor='text-sky-500'
        bgColor='bg-sky-500/10'
      />

      <div className='h-14 bg-black rounded-md flex justify-between items-center mx-4 px-4'>
        <div className='text-white'>
          <p> Pay using your Biometrics. </p>
        </div>

        <div>
          {
            isWalletSetup ? (
              <>
                <Button className='bg-black border-2 hover:bg-white hover:text-black ' >
                  <Wallet2Icon/> 
                </Button>
              </>
            ) : (
              <>
                <Button className='bg-black border-2 hover:bg-white hover:text-black ' >
                  Setup Wallet
                </Button>
              </>
            )
          }

        </div>

      </div>
    </div>

  )
}

export default Page
