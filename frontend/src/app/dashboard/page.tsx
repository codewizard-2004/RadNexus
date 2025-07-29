"use client";

import { useState } from 'react';
import { User, Upload, Download, Activity, Heart, Brain, Zap, Crown, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Navbar from '@/components/Navbar';

export default function HealthDashboard() {
  const [selectedScan, setSelectedScan] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [userPlan, setUserPlan] = useState('free'); // 'free' or 'pro'
  const router = useRouter();

  const scanTypes = [
    { 
      id: 'mri', 
      name: 'MRI Scan', 
      description: 'Magnetic Resonance Imaging',
      icon: Brain,
      free: true,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'ct', 
      name: 'CT Scan', 
      description: 'Computed Tomography',
      icon: Activity,
      free: false,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'xray', 
      name: 'X-Ray', 
      description: 'Radiographic Imaging',
      icon: Zap,
      free: false,
      color: 'from-green-500 to-teal-500'
    },
    { 
      id: 'ultrasound', 
      name: 'Ultrasound', 
      description: 'Sonographic Imaging',
      icon: Heart,
      free: false,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Total Scans', value: '24', icon: FileText, color: 'text-blue-400' },
    { label: 'This Month', value: '8', icon: CheckCircle, color: 'text-green-400' },
    { label: 'Processing', value: '2', icon: Clock, color: 'text-yellow-400' },
    { label: 'Alerts', value: '1', icon: AlertCircle, color: 'text-red-400' }
  ];

interface ScanType {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    free: boolean;
    color: string;
}

interface Stat {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface ScanResult {
    scanType: string;
    fileName: string;
    timestamp: string;
    findings: string[];
    recommendations: string[];
    confidence: number;
}

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
        setUploadedFile(file);
    }
};

  const handleScan = async () => {
    if (!selectedScan || !uploadedFile) {
      alert('Please select a scan type and upload a file');
      return;
    }

    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setScanResult({
        scanType: selectedScan,
        fileName: uploadedFile.name,
        timestamp: new Date().toLocaleString(),
        findings: [
          'No significant abnormalities detected',
          'Brain tissue appears normal',
          'No signs of hemorrhage or mass lesions',
          'Ventricles are of normal size and configuration'
        ],
        recommendations: [
          'Continue regular health monitoring',
          'Follow up in 12 months if asymptomatic',
          'Consult physician for any new symptoms'
        ],
        confidence: 94
      });
      setIsScanning(false);
    }, 3000);
  };

  const downloadReport = () => {
    if (!scanResult) {
      alert('No scan result available to download.');
      return;
    }
    // Simulate PDF download
    const reportData = {
      patient: 'John Doe',
      scanType: scanResult.scanType.toUpperCase(),
      date: scanResult.timestamp,
      findings: scanResult.findings,
      recommendations: scanResult.recommendations,
      confidence: scanResult.confidence
    };
    
    console.log('Downloading report:', reportData);
    alert('Report downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}
      <Navbar userPlan={userPlan} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scan Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Select Scan Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scanTypes.map((scan) => {
                  const IconComponent = scan.icon;
                  const isDisabled = !scan.free && userPlan === 'free';
                  
                  return (
                    <div
                      key={scan.id}
                      onClick={() => !isDisabled && setSelectedScan(scan.id)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedScan === scan.id
                          ? 'border-blue-400 bg-blue-400/10'
                          : isDisabled
                          ? 'border-gray-600 bg-gray-800/50 cursor-not-allowed opacity-50'
                          : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                      }`}
                    >
                      {isDisabled && (
                        <div className="absolute top-2 right-2">
                          <Crown className="w-4 h-4 text-yellow-400" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${scan.color} flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{scan.name}</h3>
                          <p className="text-sm text-gray-400">{scan.description}</p>
                        </div>
                      </div>
                      
                      {isDisabled && (
                        <p className="text-xs text-yellow-400 mt-2">Pro Plan Required</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Upload Medical File</h2>
              <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">Drop your medical files here or click to browse</p>
                <p className="text-sm text-gray-500 mb-4">Supports: DICOM, JPG, PNG, PDF (Max 50MB)</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".dcm,.jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Choose File
                </label>
                {uploadedFile && (
                  <p className="mt-3 text-green-400 text-sm">✓ {uploadedFile.name}</p>
                )}
              </div>
            </div>

            {/* Scan Button */}
            <button
              onClick={handleScan}
              disabled={!selectedScan || !uploadedFile || isScanning}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isScanning
                  ? 'bg-yellow-600 cursor-not-allowed'
                  : !selectedScan || !uploadedFile
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white transform hover:scale-105'
              }`}
            >
              {isScanning ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Scan...
                </div>
              ) : (
                'Start AI Analysis'
              )}
            </button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 sticky top-8">
              <h2 className="text-xl font-semibold text-white mb-4">Scan Results</h2>
              
              {!scanResult ? (
                <div className="text-center py-8">
                  <Brain className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Upload a file and start scanning to see results</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">Analysis Complete</h3>
                      <span className="text-green-400 text-sm">✓ {scanResult.confidence}% confidence</span>
                    </div>
                    <p className="text-sm text-gray-400">Scan Type: {scanResult.scanType.toUpperCase()}</p>
                    <p className="text-sm text-gray-400">Date: {scanResult.timestamp}</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Key Findings:</h4>
                    <ul className="space-y-1">
                      {scanResult.findings.map((finding, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Recommendations:</h4>
                    <ul className="space-y-1">
                      {scanResult.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-blue-300 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={downloadReport}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}