"use client";

import React from 'react'
import { User, Brain, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
    userPlan: string;
}

const Navbar = ({userPlan}: NavbarProps) => {
    const router = useRouter();
  return (
    <>
      {/* Navbar */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/dashboard")}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                RadNexus
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                {userPlan === 'pro' ? (
                  <Crown className="w-4 h-4 text-yellow-400" />
                ) : (
                  <User className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm text-white capitalize">{userPlan}</span>
              </div>
              
              <div 
                className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center hover:size-10 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-blue-500/30"
                onClick={() => router.push("/dashboard/profile")}
                >
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
