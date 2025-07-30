"use client";
import { useState, useEffect } from 'react';
import { Home, ArrowLeft, Search, Brain, Zap, Heart, Activity, RefreshCw } from 'lucide-react';

export default function Error404Page() {
  const [glitchText, setGlitchText] = useState('404');
  const [searchQuery, setSearchQuery] = useState('');

  const glitchVariations = ['404', '4O4', '40₄', '₄04', '4０4', '４04'];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * glitchVariations.length);
      setGlitchText(glitchVariations[randomIndex]);
      
      setTimeout(() => {
        setGlitchText('404');
      }, 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Health Profile', href: '/health', icon: Heart },
    { label: 'Scan History', href: '/scans', icon: Activity },
    { label: 'Settings', href: '/settings', icon: Brain }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-white font-sans">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-red-900/20 via-transparent to-blue-900/20 pointer-events-none"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none"></div>
      <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500 pointer-events-none"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-repeat pointer-events-none" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60 l 60 0' stroke='%23ffffff' stroke-width='0.5' fill='none' opacity='0.1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e")`
             }}>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-50 text-center max-w-4xl mx-auto px-4">
        {/* Glitch 404 */}
        <div className="mb-8 relative">
          <h1 className="text-8xl md:text-9xl font-black mb-4 relative">
            <span className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 text-transparent bg-clip-text animate-pulse">
              {glitchText}
            </span>
            <div className="absolute inset-0 text-8xl md:text-9xl font-black opacity-20 animate-ping">
              <span className="bg-gradient-to-r from-red-600 to-purple-600 text-transparent bg-clip-text">
                404
              </span>
            </div>
          </h1>
          
          {/* Floating icons around 404 */}
          <div className="absolute -top-4 -left-4 animate-bounce delay-100">
            <Zap className="w-8 h-8 text-yellow-400 opacity-60" />
          </div>
          <div className="absolute -top-8 -right-8 animate-bounce delay-300">
            <Brain className="w-10 h-10 text-purple-400 opacity-60" />
          </div>
          <div className="absolute -bottom-4 left-1/4 animate-bounce delay-500">
            <Heart className="w-6 h-6 text-red-400 opacity-60" />
          </div>
          <div className="absolute -bottom-8 right-1/4 animate-bounce delay-700">
            <Activity className="w-8 h-8 text-green-400 opacity-60" />
          </div>
        </div>

        {/* Error message */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-white text-transparent bg-clip-text">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Looks like this page took a wrong turn in cyberspace
          </p>
          <p className="text-gray-400">
            The page you're looking for might have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-3 rounded-xl text-white font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <a
            href="/dashboard"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            <Home className="w-4 h-4" />
            Go Home
          </a>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Page
          </button>
        </div>

        {/* Help text */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Still can't find what you're looking for?{' '}
            <a href="/contact" className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 font-semibold transition-all duration-300">
              Contact our support team
            </a>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-24 h-24 border border-white/10 rounded-full animate-spin opacity-20 pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-16 h-16 border border-white/20 rounded-lg rotate-45 animate-pulse opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-32 right-32 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-bounce opacity-40 pointer-events-none"></div>
    </div>
  );
}