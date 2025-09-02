"use client";

import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Crown, 
  Heart,  
  Bell, 
  Shield, 
  Settings,
  LogOut,
  LucideIcon,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Account from '@/components/Account';
import Security from '@/components/Security';
import Subscription from '@/components/Subscription';
import Health from '@/components/Health';
import Modal from '@/components/Modal';
import { useToastActions } from '@/components/Toast';
import { useRouter } from 'next/navigation';

// Define types for state objects
interface ShowPasswordState {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  notifications: {
    email: boolean;
    marketing: boolean;
  };
  privacy: {
    dataSharing: boolean;
    analytics: boolean;
  };
}

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    current: false,
    new: false,
    confirm: false
  });
  const [formData, setFormData] = useState<FormDataState>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      marketing: false
    },
    privacy: {
      dataSharing: false,
      analytics: true
    }
  });
  const [userPlan, setUserPlan] = useState<'free' | 'pro'>('free');
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { success } = useToastActions();
  const router = useRouter();

  const tabs: Tab[] = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'subscription', label: 'Subscription', icon: Crown },
    { id: 'health', label: 'Health Info', icon: Heart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  const handleInputChange = (field: keyof Omit<FormDataState, 'notifications' | 'privacy'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (
    parent: 'notifications' | 'privacy', 
    field: keyof FormDataState['notifications'] | keyof FormDataState['privacy'], 
    value: boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const togglePassword = (field: keyof ShowPasswordState) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = (section: string) => {
    console.log(`Saving ${section}:`, formData);
    // In a real app, you would show a toast notification instead of an alert.
    // For this example, we'll keep the alert.
    success(`${section} settings saved successfully!`)
  };

  const handleUpgradePlan = () => {
    console.log('Upgrading to Pro plan');
    router.push('/auth/pricing');
    setUserPlan('pro');
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    alert('Account deletion initiated. Check your email for confirmation.');
    setShowDeleteModal(false);
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'account':
        return (
          <Account 
            formData={formData} 
            userPlan={userPlan} 
            handleInputChange={handleInputChange} 
            handleSave={handleSave} />
        );

      case 'security':
        return (
          <Security 
            formData={formData}
            showPassword={showPassword}
            togglePassword={togglePassword}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            isGoogleLinked = {isGoogleLinked}
            setIsGoogleLinked={setIsGoogleLinked}
            setShowDeleteModal={setShowDeleteModal}
          />
        );

      case 'subscription':
        return (
          <Subscription
            userPlan={userPlan} 
            handleUpgradePlan={handleUpgradePlan}
            />
        );

      case 'health':
        return (
          <Health />
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Communication Preferences</h3>
              <div className="space-y-4">
                {(Object.keys(formData.notifications) as Array<keyof typeof formData.notifications>).map((key) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-gray-400 text-sm">
                        {key === 'email' && 'Receive notifications via email'}
                        {key === 'marketing' && 'Product updates and offers'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications[key]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNestedChange('notifications', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSave('Notifications')}
                className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300"
              >
                Save Preferences
              </button>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                {(Object.keys(formData.privacy) as Array<keyof typeof formData.privacy>).map((key) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-gray-400 text-sm">
                        {key === 'dataSharing' && 'Share anonymized data for research purposes'}
                        {key === 'analytics' && 'Allow usage analytics to improve our service'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.privacy[key]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNestedChange('privacy', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSave('Privacy')}
                className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300"
              >
                Save Settings
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans">
      {/* Navbar */}
      <Navbar userPlan={userPlan} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><Settings className="w-5 h-5"/> Settings</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-white capitalize">
                  {activeTab} Settings
                </h1>
                <p className="text-gray-400 mt-1">
                  Manage your {activeTab} preferences and personal details.
                </p>
              </div>
              
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <Modal
          type='warning'
          title = 'Delete Account'
          text= 'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.'
          buttonText='Delete Account'
          onCancel={() => setShowDeleteModal(false)}
          onSuccess={handleDeleteAccount}
          />
      )}
    </div>
  );
}
