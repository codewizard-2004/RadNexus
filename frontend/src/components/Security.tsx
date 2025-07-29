import React from 'react'
import { Eye, EyeOff, Globe, AlertTriangle } from 'lucide-react';

interface SecurityProps {
  showPassword: any;
  formData: any;
  togglePassword: any;
  handleInputChange: any;
  handleSave: any;
  isGoogleLinked: boolean;
  setIsGoogleLinked: any;
    setShowDeleteModal: any;
    }


const Security = ({showPassword , formData , togglePassword , handleInputChange , handleSave , isGoogleLinked , setIsGoogleLinked, setShowDeleteModal}: SecurityProps) => {
  return (
    <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('currentPassword', e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />
                    <button
                      onClick={() => togglePassword('current')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('newPassword', e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />
                    <button
                      onClick={() => togglePassword('new')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    />
                    <button
                      onClick={() => togglePassword('confirm')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleSave('Password')}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300"
                >
                  Update Password
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Connected Accounts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                       <Globe className="w-5 h-5 text-gray-800" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Google</p>
                      <p className="text-sm text-gray-400">
                        {isGoogleLinked ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsGoogleLinked(!isGoogleLinked)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isGoogleLinked
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isGoogleLinked ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </h3>
              <p className="text-gray-300 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
  )
}

export default Security
