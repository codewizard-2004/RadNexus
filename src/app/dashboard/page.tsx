import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from '@/components/theme-toggle'
import Navbar from '@/components/navbar'

const page = () => {
  return (
    <div className='min-h-screen'>
        <Navbar />
        <div className='justify-center items-center h-full  w-full'>
            <div className='p-10'>
                <h1 className="text-5xl font-bold">Welcome Back! John Doe</h1>
                <h2 className='text-xl'>Select your scan type and upload medical images for instant AI-powered analysis.</h2>
            </div>
            
        </div>
      
    </div>
  )
}

export default page
