"use client";

import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Loader2, 
  X 
} from 'lucide-react';

// Toast Types
export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface Toast {
  id: string;
  title: string;
  text?: string;
  variant: ToastVariant;
  duration?: number;
  persistent?: boolean;
}

interface ToastProps extends Toast {
  onClose: (id: string) => void;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
  clearAll: () => void;
}

// Toast Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Variant configurations
const variantConfig = {
  success: {
    icon: CheckCircle,
    bgGradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/40',
    iconColor: 'text-green-400',
    titleColor: 'text-green-100',
    textColor: 'text-green-200',
    progressColor: 'bg-green-400'
  },
  error: {
    icon: XCircle,
    bgGradient: 'from-red-500/20 to-rose-500/20',
    borderColor: 'border-red-500/40',
    iconColor: 'text-red-400',
    titleColor: 'text-red-100',
    textColor: 'text-red-200',
    progressColor: 'bg-red-400'
  },
  warning: {
    icon: AlertTriangle,
    bgGradient: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/40',
    iconColor: 'text-yellow-400',
    titleColor: 'text-yellow-100',
    textColor: 'text-yellow-200',
    progressColor: 'bg-yellow-400'
  },
  info: {
    icon: Info,
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/40',
    iconColor: 'text-blue-400',
    titleColor: 'text-blue-100',
    textColor: 'text-blue-200',
    progressColor: 'bg-blue-400'
  },
  loading: {
    icon: Loader2,
    bgGradient: 'from-purple-500/20 to-indigo-500/20',
    borderColor: 'border-purple-500/40',
    iconColor: 'text-purple-400',
    titleColor: 'text-purple-100',
    textColor: 'text-purple-200',
    progressColor: 'bg-purple-400'
  }
};

// Individual Toast Component
const ToastComponent: React.FC<ToastProps> = ({
  id,
  title,
  text,
  variant,
  duration = 5000,
  persistent = false,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  useEffect(() => {
    // Entrance animation
    setTimeout(() => setIsVisible(true), 50);

    if (!persistent && duration > 0) {
      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (duration / 50));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 50);

      // Auto dismiss
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timer);
      };
    }
  }, [duration, persistent]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-out ${
        isVisible
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div
        className={`
          relative overflow-hidden
          bg-gradient-to-r ${config.bgGradient}
          backdrop-blur-lg border ${config.borderColor}
          rounded-xl p-4 shadow-2xl
          min-w-80 max-w-md
        `}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl" />
        
        {/* Content */}
        <div className="relative z-10 flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <IconComponent 
              className={`w-5 h-5 ${config.iconColor} ${
                variant === 'loading' ? 'animate-spin' : ''
              }`} 
            />
          </div>
          
          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold ${config.titleColor} text-sm`}>
              {title}
            </h4>
            {text && (
              <p className={`mt-1 text-sm ${config.textColor} leading-relaxed`}>
                {text}
              </p>
            )}
          </div>
          
          {/* Close button */}
          {!persistent && (
            <button
              onClick={handleClose}
              className="flex-shrink-0 ml-2 p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white/60 hover:text-white/80" />
            </button>
          )}
        </div>
        
        {/* Progress bar */}
        {!persistent && duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div
              className={`h-full ${config.progressColor} transition-all duration-75 ease-linear`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Toast Container
const ToastContainer: React.FC<{ toasts: Toast[]; onClose: (id: string) => void }> = ({
  toasts,
  onClose
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastComponent {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
};

// Toast Provider Component
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      ...toastData
    };
    
    setToasts(prev => [...prev, newToast]);
  };

  const hideToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAll = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast, clearAll }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
};

// Convenience functions for common toast types
export const useToastActions = () => {
  const context = useToast();
  return {
    success: (title: string, text?: string, options?: Partial<Toast>) =>
      context.showToast({ title, text, variant: 'success', ...options }),

    error: (title: string, text?: string, options?: Partial<Toast>) =>
      context.showToast({ title, text, variant: 'error', ...options }),

    warning: (title: string, text?: string, options?: Partial<Toast>) =>
      context.showToast({ title, text, variant: 'warning', ...options }),

    info: (title: string, text?: string, options?: Partial<Toast>) =>
      context.showToast({ title, text, variant: 'info', ...options }),

    loading: (title: string, text?: string, options?: Partial<Toast>) =>
      context.showToast({ title, text, variant: 'loading', persistent: true, ...options })
  };
};


// Example usage component
export const ToastExample: React.FC = () => {
  const { showToast } = useToast();

  const examples = [
    {
      label: 'Success Toast',
      action: () => showToast({
        title: 'Success!',
        text: 'Your account has been updated successfully.',
        variant: 'success'
      })
    },
    {
      label: 'Error Toast',
      action: () => showToast({
        title: 'Error occurred',
        text: 'Failed to save changes. Please try again.',
        variant: 'error'
      })
    },
    {
      label: 'Warning Toast',
      action: () => showToast({
        title: 'Warning',
        text: 'Your session will expire in 5 minutes.',
        variant: 'warning'
      })
    },
    {
      label: 'Info Toast',
      action: () => showToast({
        title: 'New feature available',
        text: 'Check out our latest AI analysis improvements.',
        variant: 'info'
      })
    },
    {
      label: 'Loading Toast',
      action: () => showToast({
        title: 'Processing...',
        text: 'Analyzing your medical scan.',
        variant: 'loading',
        persistent: true
      })
    }
  ];

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Toast Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={example.action}
            className="p-4 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 text-white font-medium transition-all duration-200 hover:scale-105"
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Usage Instructions:
/*
1. Wrap your app with ToastProvider:
   <ToastProvider>
     <App />
   </ToastProvider>

2. Use in any component:
   const { showToast } = useToast();
   
   showToast({
     title: "Success!",
     text: "Operation completed successfully",
     variant: "success",
     duration: 5000
   });

3. Or use convenience functions:
   toast.success("Success!", "Operation completed");
   toast.error("Error!", "Something went wrong");
   toast.warning("Warning!", "Please check your input");
   toast.info("Info", "New update available");
   toast.loading("Processing...", "Please wait", { persistent: true });
*/