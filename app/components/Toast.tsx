import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export function Toast({
  message,
  isVisible,
  onClose,
}: {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 segundos visible
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 sm:top-10 left-1/2 -translate-x-1/2 z-[9999] w-[90%] sm:w-auto min-w-[300px] pointer-events-none">
      <div className="bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 border border-gray-700">
        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
