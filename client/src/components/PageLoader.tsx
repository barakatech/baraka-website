export function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Baraka branded spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin" />
        </div>
        <p className="text-white/60 text-sm" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
          Loading...
        </p>
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="bg-[#191919] rounded-[24px] p-6 animate-pulse">
      <div className="h-8 bg-white/10 rounded w-1/3 mb-4" />
      <div className="space-y-3">
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="h-4 bg-white/10 rounded w-4/6" />
      </div>
    </div>
  );
}
