import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe, ArrowRight } from "lucide-react";
import { WebSocketIndicator } from "./WebSocketIndicator";

const navLinks = [
  { label: "Invest", href: "#invest", hasDropdown: true },
  { label: "Features", href: "https://getbaraka.com/features", hasDropdown: false },
  { label: "Subscription", href: "https://getbaraka.com/subscription", hasDropdown: false },
  { label: "Learn", href: "https://getbaraka.com/learn", hasDropdown: false },
  { label: "News", href: "/news", hasDropdown: false },
];

const mobileNavLinks = [
  { label: "Stocks", href: "/" },
  { label: "Bonds", href: "https://getbaraka.com/bonds" },
  { label: "Private Markets", href: "https://getbaraka.com/access" },
  { label: "Features", href: "https://getbaraka.com/features" },
  { label: "Subscription", href: "https://getbaraka.com/subscription" },
  { label: "Learn", href: "https://getbaraka.com/learn" },
  { label: "News", href: "/news" },
];

const investDropdownLinks = [
  { label: "Stocks", href: "/", isNew: false },
  { label: "Bonds", href: "https://getbaraka.com/bonds", isNew: true },
  { label: "Private Markets", href: "https://getbaraka.com/access", isNew: false },
];

export const Header = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showInvestDropdown, setShowInvestDropdown] = useState(false);

  return (
    <>
      <header className="w-full bg-black sticky top-0 z-50 backdrop-blur-[6px]">
        <div className="w-full py-4 px-11 min-h-[100px] flex items-center">
          <div className="flex items-center w-full">
            <a href="https://getbaraka.com/" className="flex items-center shrink-0" target="_blank" rel="noopener noreferrer">
              <div className="h-[50px] w-[50px] p-1 flex items-center justify-center">
                <img 
                  src="/figmaAssets/baraka-logo-new.avif" 
                  alt="baraka" 
                  className="h-full w-full object-contain"
                />
              </div>
            </a>

            <nav className="hidden lg:flex items-center justify-center gap-[44px] flex-1">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div 
                    key={link.label} 
                    className="relative"
                    onMouseEnter={() => setShowInvestDropdown(true)}
                    onMouseLeave={() => setShowInvestDropdown(false)}
                  >
                    <button
                      className="flex items-center gap-1.5 text-white hover:text-white/60 transition-colors text-[16px] font-normal leading-[20px]"
                      style={{ fontFamily: '"Proxima Nova Regular", "Proxima Nova Regular Placeholder", sans-serif', WebkitFontSmoothing: 'antialiased' }}
                    >
                      {link.label}
                      <ChevronDown size={14} className="text-white opacity-80" />
                    </button>
                    {showInvestDropdown && (
                      <>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[169px] h-4" />
                        <div 
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 rounded-[20px] px-6 pt-6 pb-6 z-50 w-[169px] border border-[#404040]"
                          style={{ 
                            backgroundColor: 'rgba(15, 15, 15, 0.85)', 
                            backdropFilter: 'blur(80px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(80px) saturate(180%)',
                            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 10px 20px 0px',
                            fontFamily: '"Proxima Nova Regular", "Proxima Nova", sans-serif'
                          }}
                        >
                          <div className="flex flex-col gap-4">
                            {investDropdownLinks.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                onClick={() => setShowInvestDropdown(false)}
                                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors text-[16px] whitespace-nowrap"
                                style={{ fontFamily: '"Proxima Nova Regular", "Proxima Nova", sans-serif' }}
                              >
                                {item.label}
                                {item.isNew && (
                                  <span className="bg-[#9EFFC5] text-black text-[11px] font-semibold px-2 py-0.5 rounded-full">
                                    New
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors text-[16px] font-normal leading-[20px]"
                    style={{ fontFamily: '"Proxima Nova Regular", "Proxima Nova Regular Placeholder", sans-serif', WebkitFontSmoothing: 'antialiased' }}
                  >
                    {link.label}
                  </a>
                )
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <WebSocketIndicator showText={false} className="mr-2" />
              <button className="flex items-center gap-1 text-white hover:text-white/80 transition-colors p-2">
                <Globe size={18} />
                <ChevronDown size={14} className="opacity-60" />
              </button>
              <div 
                onClick={() => setShowDownloadPopup(true)}
                className="relative group cursor-pointer w-[160px]"
              >
                {/* Animated trimming path border - hidden on hover */}
                <div className="absolute inset-0 rounded-full overflow-hidden group-hover:opacity-0 transition-opacity">
                  <div 
                    className="absolute inset-[-100%] animate-spin-slow"
                    style={{
                      background: 'conic-gradient(from 180deg, transparent 0deg, transparent 288deg, rgba(255,255,255,0.2) 300deg, rgba(255,255,255,0.6) 330deg, white 350deg, white 360deg)',
                    }}
                  />
                </div>
                {/* Static subtle border - visible on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-white/15 group-hover:border-white/50 transition-all" />
                {/* Button content */}
                <div className="relative bg-black rounded-full px-5 h-11 flex items-center justify-center gap-2 text-white transition-all m-[2px]">
                  <span 
                    className="text-[18px] font-normal leading-[18px] text-center whitespace-nowrap"
                    style={{ fontFamily: '"Proxima Nova Semibold", "Proxima Nova Semibold Placeholder", sans-serif', WebkitFontSmoothing: 'antialiased' }}
                  >
                    Get the App
                  </span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>

            <button
              className="lg:hidden text-white ml-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ width: '37px', height: '24px' }}
            >
              <img 
                src="/figmaAssets/menu-icon.png" 
                alt="Menu" 
                className="w-full h-auto"
              />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 w-full h-full z-[9999] flex flex-col items-center"
          style={{ 
            backdropFilter: 'blur(20px)', 
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="flex flex-col w-full h-full">
            <div className="flex items-center justify-end px-4 md:px-11 h-[72px]">
              <button
                className="text-white"
                onClick={() => setMobileMenuOpen(false)}
                style={{ width: '37px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <img 
                  src="/figmaAssets/close-icon.png" 
                  alt="Close" 
                  style={{ width: '24px', height: '24px' }}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-center py-4">
              <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors p-2">
                <Globe size={20} />
                <ChevronDown size={14} className="opacity-60" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-8 flex-1">
              {mobileNavLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-white text-[24px] font-normal hover:text-white/80 transition-all duration-300 opacity-0"
                  style={{ 
                    fontFamily: '"Proxima Nova", "Proxima Nova-Regular", Helvetica, sans-serif',
                    animation: `slideUpFadeIn 0.4s ease-out forwards`,
                    animationDelay: `${index * 80}ms`
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div 
              className="flex justify-center pb-12 opacity-0"
              style={{ 
                animation: `slideUpFadeIn 0.4s ease-out forwards`,
                animationDelay: `${mobileNavLinks.length * 80 + 100}ms`
              }}
            >
              <button 
                onClick={() => { setMobileMenuOpen(false); setShowDownloadPopup(true); }}
                className="bg-transparent hover:bg-white/10 text-white border border-white/40 rounded-full px-8 h-12 flex items-center gap-3 transition-colors"
              >
                <span className="text-[16px] font-semibold leading-[20px] tracking-[0]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                  Get the App
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {showDownloadPopup && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowDownloadPopup(false)}
        >
          <div 
            className="relative max-w-[900px] w-full rounded-[24px] overflow-hidden mt-6 bg-[#191919]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowDownloadPopup(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-20"
            >
              <X size={28} />
            </button>
            <img 
              src="/attached_assets/ZkFIPSrXEnHyZXj9vrhEmbBsjs_1768999469405.png" 
              alt="Download Baraka App"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};
