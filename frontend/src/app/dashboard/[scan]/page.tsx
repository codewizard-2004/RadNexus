"use client"
import React from 'react'
import { Brain, Activity, Zap, Heart, FileText, Download, Calendar, Camera, CheckCircle, Clock, AlertCircle} from 'lucide-react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

const page = () => {
    interface ScanHistoryItem {
        id: number;
        scanType: 'MRI Scan' | 'CT Scan' | 'X-Ray' | 'Ultrasound';
        fileName: string;
        date: string;
        time: string;
        status: 'completed' | 'processing' | 'failed';
        confidence: number;
        color: string;
        findings: string[];
        recommendations: string[];
        patientId: string;
        bodyPart: string;
        imageUrl?: string;
        notes?: string;
        priority: 'normal' | 'urgent' | 'routine';
    }
    const allScans: ScanHistoryItem[] = [
    {
      id: 1,
      scanType: 'MRI Scan',
      fileName: 'brain_scan_001.dcm',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed',
      confidence: 94,
      color: 'from-blue-500 to-cyan-500',
      findings: [
        'No significant abnormalities detected',
        'Brain tissue appears normal',
        'No signs of hemorrhage or mass lesions',
        'Ventricles are of normal size and configuration',
        'White matter signal appears normal'
      ],
      recommendations: [
        'Continue regular health monitoring',
        'Follow up in 12 months if asymptomatic',
        'Consult physician for any new symptoms',
        'Maintain current medication regimen'
      ],
      patientId: 'P001234',
      bodyPart: 'Brain',
      priority: 'normal',
      notes: 'Patient reported mild headaches. Scan performed with contrast enhancement.'
    },
    {
      id: 2,
      scanType: 'X-Ray',
      fileName: 'chest_xray_002.jpg',
      date: '2024-01-12',
      time: '09:15',
      status: 'completed',
      confidence: 87,
      color: 'from-green-500 to-teal-500',
      findings: [
        'Chest X-ray shows clear lung fields',
        'No evidence of pneumonia or fluid accumulation',
        'Heart size appears normal',
        'Bone structures intact'
      ],
      recommendations: [
        'No immediate action required',
        'Annual chest X-ray recommended',
        'Report any persistent cough or chest pain'
      ],
      patientId: 'P001234',
      bodyPart: 'Chest',
      priority: 'normal',
      notes: 'Routine annual checkup. Patient asymptomatic.'
    },
    {
      id: 3,
      scanType: 'CT Scan',
      fileName: 'abdomen_ct_003.dcm',
      date: '2024-01-10',
      time: '16:45',
      status: 'completed',
      confidence: 91,
      color: 'from-purple-500 to-pink-500',
      findings: [
        'Abdominal organs appear normal',
        'No masses or abnormal fluid collections',
        'Liver, kidneys, and spleen normal in size',
        'No evidence of inflammation'
      ],
      recommendations: [
        'Results within normal limits',
        'Continue current diet and exercise',
        'Follow up with primary care physician'
      ],
      patientId: 'P001234',
      bodyPart: 'Abdomen',
      priority: 'normal',
      notes: 'Follow-up scan after previous abnormal lab results. Current scan shows improvement.'
    },
    {
      id: 4,
      scanType: 'Ultrasound',
      fileName: 'cardiac_ultrasound_004.jpg',
      date: '2024-01-08',
      time: '11:20',
      status: 'completed',
      confidence: 89,
      color: 'from-orange-500 to-red-500',
      findings: [
        'Heart function appears normal',
        'No structural abnormalities detected',
        'Ejection fraction within normal range',
        'Valve function adequate'
      ],
      recommendations: [
        'Maintain current cardiac medications',
        'Regular exercise as tolerated',
        'Follow up in 6 months'
      ],
      patientId: 'P001234',
      bodyPart: 'Heart',
      priority: 'normal',
      notes: 'Cardiac function assessment. Patient has history of hypertension.'
    },
    {
      id: 5,
      scanType: 'MRI Scan',
      fileName: 'spine_mri_005.dcm',
      date: '2024-01-05',
      time: '13:00',
      status: 'processing',
      confidence: 0,
      color: 'from-blue-500 to-cyan-500',
      findings: [],
      recommendations: [],
      patientId: 'P001234',
      bodyPart: 'Spine',
      priority: 'urgent',
      notes: 'Patient experiencing lower back pain. Urgent scan requested.'
    },
    {
      id: 6,
      scanType: 'X-Ray',
      fileName: 'knee_xray_006.jpg',
      date: '2024-01-03',
      time: '10:30',
      status: 'completed',
      confidence: 92,
      color: 'from-green-500 to-teal-500',
      findings: [
        'Mild degenerative changes noted',
        'Joint space narrowing present',
        'No acute fractures detected',
        'Soft tissue swelling minimal'
      ],
      recommendations: [
        'Consider physical therapy',
        'Anti-inflammatory medication as needed',
        'Weight management recommended',
        'Follow up in 3 months'
      ],
      patientId: 'P001234',
      bodyPart: 'Knee',
      priority: 'normal',
      notes: 'Patient complained of knee pain after sports injury.'
    }
  ];
  const getScanIcon = (scanType: string) => {
    switch (scanType) {
      case 'MRI Scan': return Brain;
      case 'CT Scan': return Activity;
      case 'X-Ray': return Zap;
      case 'Ultrasound': return Heart;
      default: return FileText;
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return Clock;
      case 'failed': return AlertCircle;
      default: return FileText;
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-400/10';
      case 'normal': return 'text-blue-400 bg-blue-400/10';
      case 'routine': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const downloadReport = (scan: ScanHistoryItem) => {
    const reportData = {
      patient: 'John Doe',
      patientId: scan.patientId,
      scanType: scan.scanType,
      date: `${scan.date} ${scan.time}`,
      findings: scan.findings,
      recommendations: scan.recommendations,
      confidence: scan.confidence,
    };
    
    console.log('Downloading report:', reportData);
    alert(`Report for ${scan.fileName} downloaded successfully!`);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const params = useParams(); // gives { scanId: '1' }
  console.log(params.scan)
  const scanId = parseInt(params.scan as string, 10);

  const selectedScan = allScans.find((scan) => scan.id === scanId);

  return (
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 fixed inset-0 overflow-auto">
            <Navbar userPlan='free'/>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 h-full overflow-y-auto">
              {selectedScan ? (
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedScan.color} flex items-center justify-center`}>
                        {(() => {
                          const IconComponent = getScanIcon(selectedScan.scanType);
                          return <IconComponent className="w-8 h-8 text-white" />;
                        })()}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedScan.scanType}</h2>
                        <p className="text-gray-400">{selectedScan.fileName}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">Patient ID: {selectedScan.patientId}</span>
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(selectedScan.priority)}`}>
                            {selectedScan.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedScan.status === 'completed' && (
                      <button
                        onClick={() => downloadReport(selectedScan)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Report
                      </button>
                    )}
                  </div>

                  {/* Scan Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-400">Date & Time</span>
                      </div>
                      <p className="text-white font-medium">{selectedScan.date}</p>
                      <p className="text-gray-400 text-sm">{selectedScan.time}</p>
                    </div>
                    
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Camera className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-400">Body Part</span>
                      </div>
                      <p className="text-white font-medium">{selectedScan.bodyPart}</p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {(() => {
                          const StatusIcon = getStatusIcon(selectedScan.status);
                          return <StatusIcon className={`w-4 h-4 ${getStatusColor(selectedScan.status)}`} />;
                        })()}
                        <span className="text-sm text-gray-400">Status</span>
                      </div>
                      <p className="text-white font-medium capitalize">{selectedScan.status}</p>
                      {selectedScan.status === 'completed' && (
                        <p className="text-green-400 text-sm">{selectedScan.confidence}% confidence</p>
                      )}
                    </div>
                  </div>

                  {/* Image Preview - Input and Output */}
                  <div className="bg-white/5 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Scan Images</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Original Input Image */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                          <h4 className="text-md font-medium text-white">Original Scan</h4>
                        </div>
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-600 relative overflow-hidden">
                          {/* Simulated medical scan pattern */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="w-full h-full bg-gradient-radial from-blue-400/30 via-transparent to-transparent"></div>
                            {/* Grid pattern to simulate scan lines */}
                            <div className="absolute inset-0" style={{
                              backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                              backgroundSize: '20px 20px'
                            }}></div>
                          </div>
                          <div className="text-center relative z-10">
                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-300 font-medium">Input Image</p>
                            <p className="text-gray-500 text-sm">{selectedScan.fileName}</p>
                            <p className="text-xs text-gray-600 mt-1">Raw scan data</p>
                          </div>
                        </div>
                      </div>

                      {/* AI Processed Output Image */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <h4 className="text-md font-medium text-white">AI Enhanced</h4>
                          {selectedScan.status === 'completed' && (
                            <span className="px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                              {selectedScan.confidence}% Confidence
                            </span>
                          )}
                        </div>
                        {selectedScan.status === 'completed' ? (
                          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-64 flex items-center justify-center border-2 border-solid border-green-400/30 relative overflow-hidden">
                            {/* Enhanced scan visualization */}
                            <div className="absolute inset-0 opacity-30">
                              <div className="w-full h-full bg-gradient-radial from-green-400/40 via-blue-400/20 to-transparent"></div>
                              {/* Enhanced grid pattern */}
                              <div className="absolute inset-0" style={{
                                backgroundImage: 'linear-gradient(0deg, rgba(34,197,94,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.2) 1px, transparent 1px)',
                                backgroundSize: '15px 15px'
                              }}></div>
                              {/* Highlight areas to simulate AI annotations */}
                              <div className="absolute top-8 left-12 w-16 h-12 bg-yellow-400/20 rounded-lg border border-yellow-400/40"></div>
                              <div className="absolute bottom-12 right-8 w-12 h-8 bg-blue-400/20 rounded-lg border border-blue-400/40"></div>
                            </div>
                            <div className="text-center relative z-10">
                              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                                <Brain className="w-6 h-6 text-white" />
                              </div>
                              <p className="text-green-300 font-medium">AI Processed</p>
                              <p className="text-gray-400 text-sm">Enhanced & Analyzed</p>
                              <p className="text-xs text-green-500 mt-1">Annotations visible</p>
                            </div>
                          </div>
                        ) : selectedScan.status === 'processing' ? (
                          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-yellow-400/50">
                            <div className="text-center">
                              <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                              <p className="text-yellow-400 font-medium">Processing...</p>
                              <p className="text-gray-400 text-sm">AI analysis in progress</p>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-600">
                            <div className="text-center">
                              <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                              <p className="text-gray-400">Processing Failed</p>
                              <p className="text-gray-500 text-sm">Unable to generate output</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>


                  {/* Results */}
                  {selectedScan.status === 'completed' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Findings */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Key Findings</h3>
                        <ul className="space-y-3">
                          {selectedScan.findings.map((finding, index) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start gap-3">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommendations */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-white mb-3">Recommendations</h3>
                        <ul className="space-y-3">
                          {selectedScan.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-blue-300 flex items-start gap-3">
                              <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedScan.status === 'processing' && (
                    <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-6 text-center">
                      <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Analysis in Progress</h3>
                      <p className="text-gray-300">Your scan is being processed by our AI system. Results will be available shortly.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Select a scan to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
  )
}

export default page
