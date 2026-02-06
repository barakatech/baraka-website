interface InfoIconProps {
  onClick: () => void;
}

export function InfoIcon({ onClick }: InfoIconProps) {
  return (
    <button onClick={onClick} className="focus:outline-none">
      <svg className="w-5 h-5 text-white/40 hover:text-white/60 transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v4M12 16h.01" />
      </svg>
    </button>
  );
}
