import React from 'react'
import { AlertTriangle } from 'lucide-react'

interface ModalProps {
    type: string;
    title: string;
    text: string;
    buttonText: string;
    onCancel: () => void;
    onSuccess: () => void;
}

const Modal = ({type, title , text, buttonText , onCancel , onSuccess}: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800/70 backdrop-blur-lg rounded-xl p-8 border border-white/20 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-500/50">
              {type == 'warning' && <AlertTriangle className="w-8 h-8 text-red-400" />}
                
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-300 mb-6">
                {text}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={onSuccess}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-all"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Modal
