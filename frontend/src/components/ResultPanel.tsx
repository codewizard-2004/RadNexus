"use client";

import React from 'react';
import { Download, CheckCircle, AlertCircle, Brain } from 'lucide-react';

interface ScanResult {
  scanType: string;
  fileName: string;
  timestamp: string;
  findings: string[];
  recommendations: string[];
  confidence: number;
  showOutputImage?: boolean; // Optional flag to show/hide output image
}

interface ResultPanelProps {
  scanResult: ScanResult | null;
  onDownloadReport: () => void;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ scanResult, onDownloadReport }) => {
  if (!scanResult) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 sticky top-8">
        <h2 className="text-xl font-semibold text-white mb-4">Scan Results</h2>
        <div className="text-center py-8">
          <Brain className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">Upload a file and start scanning to see results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 sticky top-8">
      <h2 className="text-xl font-semibold text-white mb-4">Scan Results</h2>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-white">Analysis Complete</h3>
            <span className="text-green-400 text-sm">✓ {scanResult.confidence}% confidence</span>
          </div>
          <p className="text-sm text-gray-400">Scan Type: {scanResult.scanType.toUpperCase()}</p>
          <p className="text-sm text-gray-400">Date: {scanResult.timestamp}</p>
        </div>

        {/* Optional AI Output Image Section */}
        {scanResult.showOutputImage && (
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <h4 className="text-md font-medium text-white">AI Segmented Output</h4>
              <span className="px-2 py-1 bg-green-400/20 text-green-400 text-xs rounded-full">
                {scanResult.confidence}% Confidence
              </span>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-48 flex items-center justify-center border-2 border-solid border-green-400/30 relative overflow-hidden">
              {/* Enhanced scan visualization with AI segmentation */}
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full bg-gradient-radial from-green-400/40 via-blue-400/20 to-transparent"></div>
                {/* Enhanced grid pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(0deg, rgba(34,197,94,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.2) 1px, transparent 1px)',
                  backgroundSize: '15px 15px'
                }}></div>
                {/* AI segmentation highlights */}
                <div className="absolute top-6 left-8 w-12 h-10 bg-yellow-400/30 rounded-lg border border-yellow-400/50"></div>
                <div className="absolute bottom-8 right-6 w-10 h-8 bg-blue-400/30 rounded-lg border border-blue-400/50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-purple-400/20 rounded-lg border border-purple-400/40"></div>
              </div>
              <div className="text-center relative z-10">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <p className="text-green-300 font-medium text-sm">AI Segmented</p>
                <p className="text-gray-400 text-xs">Enhanced & Analyzed</p>
                <p className="text-xs text-green-500 mt-1">Segmentation visible</p>
              </div>
            </div>
          </div>
        )}

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
          onClick={onDownloadReport}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default ResultPanel;
