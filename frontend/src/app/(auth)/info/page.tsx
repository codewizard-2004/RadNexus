"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';


// Define the type for the form data
interface HealthFormData {
  gender: string;
  age: string;
  height: string;
  weight: string;
  heightUnit: string;
  weightUnit: string;
  ethnicity: string;
  activityLevel: string;
  diseases: string[];
  allergies: string[];
  medications: string[];
  familyHistory: string[];
  dietaryRestrictions: string[];
  smokingStatus: string;
  alcoholConsumption: string;
  exerciseFrequency: string;
  sleepHours: string;
}

export default function HealthQuestionnaire() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<HealthFormData>({
    gender: '',
    age: '',
    height: '',
    weight: '',
    heightUnit: 'ft',
    weightUnit: 'lbs',
    ethnicity: '',
    activityLevel: '',
    diseases: [],
    allergies: [],
    medications: [],
    familyHistory: [],
    dietaryRestrictions: [],
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseFrequency: '',
    sleepHours: ''
  });

  const totalSteps = 4;

  const handleInputChange = (field: keyof HealthFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field: keyof HealthFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field])
        ? (prev[field] as string[]).includes(value)
          ? (prev[field] as string[]).filter((item) => item !== value)
          : [...(prev[field] as string[]), value]
        : prev[field]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Health data submitted:', formData);
    // Handle form submission here
    router.push('/pricing');
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-green-300 to-blue-300 text-transparent bg-clip-text">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Gender</label>
                <select 
                  value={formData.gender} 
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm">Age</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="25"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Height</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="5.8"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                  />
                  <select 
                    value={formData.heightUnit}
                    onChange={(e) => handleInputChange('heightUnit', e.target.value)}
                    className="px-3 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="ft">ft</option>
                    <option value="cm">cm</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Weight</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="150"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                  />
                  <select 
                    value={formData.weightUnit}
                    onChange={(e) => handleInputChange('weightUnit', e.target.value)}
                    className="px-3 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Ethnicity</label>
              <select 
                value={formData.ethnicity} 
                onChange={(e) => handleInputChange('ethnicity', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select ethnicity</option>
                <option value="asian">Asian</option>
                <option value="black">Black or African American</option>
                <option value="hispanic">Hispanic or Latino</option>
                <option value="white">White</option>
                <option value="native-american">Native American</option>
                <option value="pacific-islander">Pacific Islander</option>
                <option value="mixed">Mixed</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
              Medical History
            </h2>
            
            <div>
              <label className="block text-gray-300 mb-3 text-sm">Known Diseases/Conditions (Select all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 'Thyroid Issues', 'Depression', 'Anxiety'].map(disease => (
                  <label key={disease} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.diseases.includes(disease)}
                      onChange={() => handleArrayToggle('diseases', disease)}
                      className="w-4 h-4 rounded border border-white/20 bg-white/5 text-blue-400 focus:ring-2 focus:ring-blue-400" 
                    />
                    <span className="text-gray-300 text-sm">{disease}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-3 text-sm">Allergies (Select all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {['Peanuts', 'Tree Nuts', 'Shellfish', 'Dairy', 'Eggs', 'Soy', 'Gluten', 'Pollen', 'Dust', 'Pet Dander'].map(allergy => (
                  <label key={allergy} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.allergies.includes(allergy)}
                      onChange={() => handleArrayToggle('allergies', allergy)}
                      className="w-4 h-4 rounded border border-white/20 bg-white/5 text-blue-400 focus:ring-2 focus:ring-blue-400" 
                    />
                    <span className="text-gray-300 text-sm">{allergy}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-3 text-sm">Current Medications (Select all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {['Blood Pressure', 'Diabetes', 'Cholesterol', 'Antidepressants', 'Pain Relief', 'Vitamins', 'Birth Control', 'None'].map(medication => (
                  <label key={medication} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.medications.includes(medication)}
                      onChange={() => handleArrayToggle('medications', medication)}
                      className="w-4 h-4 rounded border border-white/20 bg-white/5 text-blue-400 focus:ring-2 focus:ring-blue-400" 
                    />
                    <span className="text-gray-300 text-sm">{medication}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
              Lifestyle & Habits
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Activity Level</label>
                <select 
                  value={formData.activityLevel} 
                  onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="lightly-active">Lightly Active</option>
                  <option value="moderately-active">Moderately Active</option>
                  <option value="very-active">Very Active</option>
                  <option value="extremely-active">Extremely Active</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Sleep Hours/Night</label>
                <select 
                  value={formData.sleepHours} 
                  onChange={(e) => handleInputChange('sleepHours', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select</option>
                  <option value="less-than-5">Less than 5</option>
                  <option value="5-6">5-6 hours</option>
                  <option value="7-8">7-8 hours</option>
                  <option value="9-10">9-10 hours</option>
                  <option value="more-than-10">More than 10</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Smoking Status</label>
                <select 
                  value={formData.smokingStatus} 
                  onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select</option>
                  <option value="never">Never smoked</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Alcohol Consumption</label>
                <select 
                  value={formData.alcoholConsumption} 
                  onChange={(e) => handleInputChange('alcoholConsumption', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select</option>
                  <option value="never">Never</option>
                  <option value="occasionally">Occasionally</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-3 text-sm">Dietary Restrictions (Select all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Keto', 'Paleo', 'None'].map(diet => (
                  <label key={diet} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.dietaryRestrictions.includes(diet)}
                      onChange={() => handleArrayToggle('dietaryRestrictions', diet)}
                      className="w-4 h-4 rounded border border-white/20 bg-white/5 text-purple-400 focus:ring-2 focus:ring-purple-400" 
                    />
                    <span className="text-gray-300 text-sm">{diet}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-pink-300 to-orange-300 text-transparent bg-clip-text">
              Family History & Final Details
            </h2>
            
            <div>
              <label className="block text-gray-300 mb-3 text-sm">Family History (Select conditions present in your immediate family)</label>
              <div className="grid grid-cols-2 gap-3">
                {['Heart Disease', 'Diabetes', 'Cancer', 'Stroke', 'High Blood Pressure', 'Mental Health Issues', 'Obesity', 'None Known'].map(condition => (
                  <label key={condition} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.familyHistory.includes(condition)}
                      onChange={() => handleArrayToggle('familyHistory', condition)}
                      className="w-4 h-4 rounded border border-white/20 bg-white/5 text-orange-400 focus:ring-2 focus:ring-orange-400" 
                    />
                    <span className="text-gray-300 text-sm">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4 text-green-300">Review Your Information</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="font-medium">Age:</span> {formData.age} years old</p>
                <p><span className="font-medium">Gender:</span> {formData.gender}</p>
                <p><span className="font-medium">Height:</span> {formData.height} {formData.heightUnit}</p>
                <p><span className="font-medium">Weight:</span> {formData.weight} {formData.weightUnit}</p>
                <p><span className="font-medium">Activity Level:</span> {formData.activityLevel}</p>
                {formData.diseases.length > 0 && (
                  <p><span className="font-medium">Known Conditions:</span> {formData.diseases.join(', ')}</p>
                )}
                {formData.allergies.length > 0 && (
                  <p><span className="font-medium">Allergies:</span> {formData.allergies.join(', ')}</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-white font-sans py-8">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-teal-900/30 via-transparent to-pink-900/30 pointer-events-none"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/5 w-48 h-48 bg-green-500/20 rounded-full blur-xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/5 w-36 h-36 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none"></div>
      <div className="absolute top-3/4 left-2/3 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-500 pointer-events-none"></div>
      
      {/* Main card */}
      <div className="relative z-50 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-2xl mx-4">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 text-transparent bg-clip-text">
              Health Profile Setup
            </h1>
            <p className="text-gray-300">Help us personalize your health experience</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-300">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-300">{Math.round((currentStep / totalSteps) * 100)}% complete</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form content */}
          <div className="min-h-96">
            {renderStep()}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-white transform hover:scale-105'
              }`}
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-green-500/25"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-green-500/25"
              >
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}