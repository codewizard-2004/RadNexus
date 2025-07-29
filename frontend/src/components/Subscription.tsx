import React from 'react'
import { User, Check, X, Crown, CreditCard } from 'lucide-react'


interface SubscriptionProps {
    userPlan: string;
    handleUpgradePlan: () => void;
}

const Subscription = ({userPlan , handleUpgradePlan}: SubscriptionProps) => {
  return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-xl border-2 transition-all ${
                    userPlan === 'free' 
                      ? 'border-blue-400 bg-blue-400/10' 
                      : 'border-white/20 bg-white/5'
                  }`}>
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-6 h-6 text-gray-400" />
                      <h3 className="text-xl font-semibold text-white">Free Plan</h3>
                      {userPlan === 'free' && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Current</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-white mb-4">$0<span className="text-sm text-gray-400">/month</span></p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        MRI scans only
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        Basic analysis
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        5 scans per month
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <X className="w-4 h-4 text-red-400" />
                        Priority support
                      </li>
                    </ul>
                  </div>
    
                  <div className={`p-6 rounded-xl border-2 transition-all ${
                    userPlan === 'pro' 
                      ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/10 to-orange-400/10' 
                      : 'border-white/20 bg-white/5 hover:border-yellow-400/50'
                  }`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="w-6 h-6 text-yellow-400" />
                      <h3 className="text-xl font-semibold text-white">Pro Plan</h3>
                      {userPlan === 'pro' && (
                        <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-medium">Current</span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-white mb-4">$29<span className="text-sm text-gray-400">/month</span></p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        All scan types (MRI, CT, X-Ray)
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        Advanced AI analysis
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        Unlimited scans
                      </li>
                      <li className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        Priority support
                      </li>
                       <li className="flex items-center gap-2 text-gray-300">
                        <Check className="w-4 h-4 text-green-400" />
                        Detailed PDF reports
                      </li>
                    </ul>
                    {userPlan === 'free' && (
                      <button
                        onClick={handleUpgradePlan}
                        className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Upgrade to Pro
                      </button>
                    )}
                  </div>
                </div>
    
                {userPlan === 'pro' && (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Billing Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Next billing date</p>
                        <p className="text-white font-medium">August 29, 2025</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Payment method</p>
                        <p className="text-white font-medium">**** **** **** 4242</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all">
                        Update Payment
                      </button>
                      <button className="px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-white transition-all">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>
                )}
              </div>
  )
}

export default Subscription
