import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ toast, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, duration, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-400 flex-shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-slate-900/95 text-emerald-200',
    error: 'border-red-500/30 bg-slate-900/95 text-red-200',
    info: 'border-indigo-500/30 bg-slate-900/95 text-indigo-200',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-bounce-short max-w-md w-full px-4">
      <div
        className={`flex items-center justify-between p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all ${borders[toast.type]}`}
      >
        <div className="flex items-center space-x-3 pr-2">
          {icons[toast.type]}
          <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
