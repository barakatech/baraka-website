import { ReactNode } from "react";

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function InfoPopup({ isOpen, onClose, title, children }: InfoPopupProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#1a1a1a] w-full max-w-[500px] rounded-[24px] p-6 relative"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: '"Proxima Nova", sans-serif' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-white text-xl font-semibold text-center mb-4 leading-6">{title}</h2>
        
        <div className="text-white/70 text-base leading-[18px] space-y-4 mb-6">
          {children}
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-white text-black h-[50px] rounded-full font-semibold text-base hover:bg-gray-200 transition-colors"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
