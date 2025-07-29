"use client";

import { useRouter } from 'next/navigation'; 


export default function PricingPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-white font-sans">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-pink-900/30 via-transparent to-cyan-900/30"></div>
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none"></div>
      <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-500 pointer-events-none"></div>
      {/* Glassmorphism card */}
      <div className="relative z-50 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-10 w-full max-w-5xl flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
        <div className="relative z-10  flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 text-transparent bg-clip-text animate-pulse">
            Pricing Plans
          </h1>
          <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Free Plan */}
            <div className="flex-1 bg-white/10 rounded-xl p-6 border border-white/20 flex flex-col items-center mb-4 md:mb-0 min-w-[300px] md:min-w-[350px] lg:min-w-[400px]">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Free Plan</h2>
              <p className="text-4xl font-extrabold mb-2 text-white">$0<span className="text-lg font-normal">/mo</span></p>
              <ul className="text-gray-200 mb-4 list-disc list-inside text-left">
                <li>AI-powered medical imaging reports</li>
                <li>Upload MRI images</li>
                <li>Download results as PDF</li>
                <li>Basic analytics</li>
                <li>Email support</li>
                <li>Limited monthly reports</li>
              </ul>
              <button onClick={() => router.push("/dashboard")} className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-blue-500/25">
                Get Started Free
              </button>
            </div>
            {/* Pro Plan */}
            <div className="flex-1 bg-white/10 rounded-xl p-6 border border-white/20 flex flex-col items-center min-w-[300px] md:min-w-[350px] lg:min-w-[400px]">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">Pro Plan</h2>
              <p className="text-4xl font-extrabold mb-2 text-white">$9<span className="text-lg font-normal">/mo</span></p>
              <ul className="text-gray-200 mb-4 list-disc list-inside text-left">
                <li>Unlimited AI-powered medical reports</li>
                <li>Upload MRI, CT, PET, Ultrasound, and more</li>
                <li>Download results as PDF</li>
                <li>Priority AI processing</li>
                <li>Advanced analytics</li>
                <li>Premium support</li>
              </ul>
              <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-purple-500/25">
                Upgrade Now
              </button>
            </div>
          </div>
          <div className="text-center text-gray-300 text-sm mt-8">
            Have questions? <a href="/contact" className="text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text hover:from-purple-200 hover:to-pink-200 font-semibold transition-all duration-300">Contact us</a>
          </div>
        </div>
      </div>
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-repeat pointer-events-none"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60 l 60 0' stroke='%23ffffff' stroke-width='0.5' fill='none' opacity='0.1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e")`
             }}>
        </div>
      </div>
    </main>
  );
}
