import React from 'react'
import { 
  Crown
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface AccountProps {
    formData: FormData;
    userPlan: string;
    handleInputChange: (field: 'firstName' | 'lastName' | 'email', value: string) => void;
    handleSave: (section: string) => void;
}

const Account = ({formData , userPlan , handleInputChange , handleSave}: AccountProps) => {
  return (
    <div className="space-y-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </div>
               
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{formData.firstName} {formData.lastName}</h3>
                <p className="text-gray-400">{formData.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  {userPlan === 'pro' ? (
                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                      <Crown className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-yellow-400 font-medium">Pro Member</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full">
                      <span className="text-xs text-gray-400">Free Plan</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  //handleInputChange('firstName', e.target.value)
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <button
              onClick={() => handleSave('Account')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
  )
}

export default Account
