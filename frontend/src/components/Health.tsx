import React from 'react'
import { useRouter } from 'next/navigation'

const Health = () => {
    const router = useRouter();

  return (
    <div className="space-y-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Health Profile Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Age</p>
              <p className="text-white font-semibold">28 years</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Gender</p>
              <p className="text-white font-semibold">Male</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Height</p>
              <p className="text-white font-semibold">5&apos;10&quot; (178 cm)</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Weight</p>
              <p className="text-white font-semibold">165 lbs (75 kg)</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/info")}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300"
          >
            Update Health Information
          </button>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Medical History</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">Known Conditions</span>
              <span className="text-white">None reported</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">Allergies</span>
              <span className="text-white">Peanuts, Shellfish</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">Current Medications</span>
              <span className="text-white">Vitamins</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-300">Activity Level</span>
              <span className="text-white">Moderately Active</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Health
