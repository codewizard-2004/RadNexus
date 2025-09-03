"use client";

import { useState } from 'react';
import { FileText, CheckCircle, Clock, AlertCircle, Brain, Activity, Zap, Heart, ChevronRight, Search} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

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

export default function ScanHistoryPage() {
  const [selectedScan, setSelectedScan] = useState<ScanHistoryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // Extended mock data for demonstration
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
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

  // Filter scans based on search and filters
  const filteredScans = allScans.filter(scan => {
    const matchesSearch = scan.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scan.scanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scan.bodyPart.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || scan.status === filterStatus;
    const matchesType = filterType === 'all' || scan.scanType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Set first scan as selected by default if none selected
  if (!selectedScan && filteredScans.length > 0) {
    setSelectedScan(filteredScans[0]);
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 fixed inset-0 overflow-auto">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <Navbar userPlan='free'/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="">
          {/* Sidebar - Scan List */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 h-full flex flex-col">
              {/* Search and Filters */}
              <div className="p-4 border-b border-white/10">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search scans..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="all">All Types</option>
                    <option value="MRI Scan">MRI</option>
                    <option value="CT Scan">CT</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="Ultrasound">Ultrasound</option>
                  </select>
                </div>
              </div>

              {/* Scan List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {filteredScans.map((scan) => {
                  const IconComponent = getScanIcon(scan.scanType);
                  const StatusIcon = getStatusIcon(scan.status);
                  const isSelected = selectedScan?.id === scan.id;
                  
                  return (
                    <div
                      key={scan.id}
                      onClick={() => setSelectedScan(scan)}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-blue-600/20 border-2 border-blue-400' 
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <Link href={`${scan.id}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${scan.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-white text-sm truncate">{scan.scanType}</h3>
                            <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(scan.priority)}`}>
                              {scan.priority}
                            </span>
                          </div>
                          
                          <p className="text-xs text-gray-400 truncate mb-1">{scan.fileName}</p>
                          <p className="text-xs text-gray-500">{scan.bodyPart}</p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">{scan.date}</span>
                            <div className="flex items-center gap-1">
                              <StatusIcon className={`w-3 h-3 ${getStatusColor(scan.status)}`} />
                              {scan.status === 'completed' && (
                                <span className="text-xs text-green-400">{scan.confidence}%</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {isSelected && <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                      </div>
                      </Link>
                    </div>
                  );
                })}
                
                {filteredScans.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No scans found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}