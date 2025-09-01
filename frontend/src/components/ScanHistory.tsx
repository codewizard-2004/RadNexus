"use client"
import React from 'react'
import { FileText, CheckCircle} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ScanHistoryItem {
  id: number;
  scanType: string;
  fileName: string;
  date: string;
  status: string;
  confidence: number;
  color: string;
}

interface scanHistoryProps {
    scanHistory: ScanHistoryItem[]
}

const ScanHistory = ({scanHistory}: scanHistoryProps) => {
    const router = useRouter();
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Recent Scans</h2>
                <button 
                  onClick={()=>router.push("/dashboard/history")}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                  See All
                </button>
              </div>
              <div className="space-y-3">
                {scanHistory.map((scan: ScanHistoryItem) => (
                  <div key={scan.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${scan.color} flex items-center justify-center`}>
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{scan.scanType}</h3>
                        <p className="text-sm text-gray-400">{scan.fileName}</p>
                        <p className="text-xs text-gray-500">{scan.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-400">{scan.confidence}%</span>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
  )
}

export default ScanHistory
