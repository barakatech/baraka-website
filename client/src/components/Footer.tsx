import { Globe, ChevronDown } from "lucide-react";

const companyLinks = [
  { label: "About Us", href: "https://getbaraka.com/about" },
  { label: "Contact Us", href: "https://getbaraka.com/contact" },
  { label: "Blog", href: "https://getbaraka.com/blog" },
  { label: "FAQs", href: "https://getbaraka.com/faqs" },
  { label: "Press", href: "https://getbaraka.com/press" },
  { label: "Glossary", href: "https://getbaraka.com/glossary" },
  { label: "Careers", href: "https://getbaraka.com/careers" },
  { label: "Market Hours", href: "https://getbaraka.com/market-hours" },
  { label: "Ambassador", href: "https://getbaraka.com/ambassador" },
];

const productLinks = [
  { label: "Bonds", href: "https://getbaraka.com/bonds", isNew: true },
  { label: "Access", href: "https://getbaraka.com/access" },
  { label: "Features", href: "https://getbaraka.com/features" },
  { label: "Subscription", href: "https://getbaraka.com/subscription" },
  { label: "Income Center", href: "https://getbaraka.com/income-center" },
  { label: "Stock Analysis & Reports", href: "https://getbaraka.com/stock-analysis" },
  { label: "Auto-Invest", href: "https://getbaraka.com/auto-invest" },
  { label: "Dividend Reinvestment Plan", href: "https://getbaraka.com/drip" },
  { label: "Investor Calendar", href: "/" },
  { label: "Stocks", href: "/" },
  { label: "News", href: "/news" },
  { label: "Learn", href: "https://getbaraka.com/learn" },
];

const popularStocks = [
  { label: "Lucid (LCID)", href: "/stocks/lcid" },
  { label: "Tesla (TSLA)", href: "/stocks/tsla" },
  { label: "Invesco QQQ ETF (QQQ)", href: "/stocks/qqq" },
  { label: "Snapchat (SNAP)", href: "/stocks/snap" },
  { label: "Apple (AAPL)", href: "/stocks/aapl" },
  { label: "Nio (NIO)", href: "/stocks/nio" },
  { label: "S&P 500 Sharia ETF", href: "/stocks/spus" },
  { label: "NVIDIA (NVDA)", href: "/stocks/nvda" },
  { label: "AMD (AMD)", href: "/stocks/amd" },
];

const investingLinks = [
  { label: "What is a stock?", href: "https://getbaraka.com/learn/what-is-a-stock" },
  { label: "What is an ETF?", href: "https://getbaraka.com/learn/what-is-an-etf" },
  { label: "Dividend 101", href: "https://getbaraka.com/learn/dividend-101" },
  { label: "What is a P/E Ratio?", href: "https://getbaraka.com/learn/pe-ratio" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "https://getbaraka.com/terms" },
  { label: "Privacy Policy", href: "https://getbaraka.com/privacy" },
];

const socialLinks = [
  { icon: "facebook", href: "https://facebook.com/getbaraka" },
  { icon: "linkedin", href: "https://linkedin.com/company/getbaraka" },
  { icon: "tiktok", href: "https://tiktok.com/@getbaraka" },
  { icon: "x", href: "https://x.com/getbaraka" },
  { icon: "instagram", href: "https://instagram.com/getbaraka" },
];

const disclaimerText = `© baraka financial limited. All rights reserved.

Baraka Financial Limited ("Baraka") is registered in the Dubai International Financial Centre ("DIFC") and is regulated by the Dubai Financial Services Authority ("DFSA"). It holds a Category 3C license with a Retail Client and a Holding and Controlling Client Assets endorsement. Baraka is a wholly owned subsidiary of Baraka Technology Holding in Abu Dhabi Global Market.

Baraka shall not be responsible for any loss arising from any investment based on any general information provided by Baraka or as may be available on Baraka's website and other web-based services (collectively, the "Website Services"). Your investment can fluctuate, so you may get back less than you invested. Baraka does not warrant that the information is accurate, reliable or complete or that the supply will be without interruptions. Any third party information provided through does not reflect the views of Baraka.

The content of the Website Services provided by Baraka is only intended to provide you with general information and is neither an offer to sell nor a solicitation of an offer to purchase any security and may not be relied upon for investment purposes. Any commentaries, articles, daily news items, public and/or private chat publications, stock analysis and/or other information contained in the Website Services should not be considered investment advice. Baraka shall not be liable for any delay, inaccuracy, error or omission of any kind in the information provided by Baraka and/or any third party information provider or for any resulting loss or damage you may suffer as a result of or in connection with the information supplied by Baraka and/or any third party information provider. In addition, Baraka shall have no liability for any losses arising from unauthorized access to information or any other misuse of information. Any opinions, news, research, analysis, prices, or other information contained on our Website Services, or emailed to you, are provided as general market commentary, and do not constitute investment advice. Baraka will not accept liability for any loss or damage, including, without limitation, for any loss of profit which may arise directly or indirectly from use of or reliance on such information. Each decision as to whether an investment is appropriate or proper is an independent decision by you. You agree that Baraka has no fiduciary duty to you and is not responsible for any liabilities, claims, damages, costs and expenses, including attorneys' fees, incurred in connection with you following Baraka's generic investment information.

Baraka provides traditional securities and does not intend to engage a Shariah advisor or obtain a fatwa regarding Shariah screened securities. Baraka does not have an Islamic Window endorsement from the DFSA. Clients should be aware that Shariah screened stocks may involve additional risks and costs. There can be no assurance as to the Shariah compliance of the securities listed by Baraka. Clients are reminded that views on Shariah compliance differ and that they should obtain their own independent advice as to the permissibility of a security.`;

export const Footer = (): JSX.Element => {
  return (
    <footer className="w-full bg-black" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
      <div className="w-full px-6 md:px-11 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b-[1.5px] border-[#4D4D4D]">
          <a href="https://getbaraka.com/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/figmaAssets/baraka-footer-logo.avif" 
              alt="baraka" 
              className="h-[32px] w-auto"
            />
          </a>
          
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <span className="text-white text-lg flex items-center gap-2">
              Investing with baraka Starts Here
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H18M18 12L15 9M18 12L15 15" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            
            <div className="flex gap-3">
              <a 
                href="https://apps.apple.com/app/baraka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/figmaAssets/app-store-badge.avif" 
                  alt="Download on the App Store" 
                  className="h-[44px] w-auto"
                />
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.baraka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/figmaAssets/google-play-badge.avif" 
                  alt="Get it on Google Play" 
                  className="h-[44px] w-auto"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-10">
          <div>
            <h3 className="text-white/50 text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white text-sm hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/50 text-sm font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-white text-sm hover:text-white/70 transition-colors flex items-center gap-2"
                  >
                    {link.label}
                    {link.isNew && (
                      <span className="bg-[#9EFFC5] text-black text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/50 text-sm font-medium mb-4">Popular Stocks</h3>
            <ul className="space-y-3">
              {popularStocks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white text-sm hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/50 text-sm font-medium mb-4">Investing 101</h3>
            <ul className="space-y-3">
              {investingLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white text-sm hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/50 text-sm font-medium mb-4">Legal & Regulatory</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white text-sm hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex gap-3 mb-6">
              <a href="https://facebook.com/getbaraka" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://linkedin.com/company/getbaraka" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://tiktok.com/@getbaraka" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://x.com/getbaraka" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/getbaraka" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
            
            <button className="flex items-center gap-2 text-white text-sm border border-white/20 rounded-full px-4 py-2 hover:bg-white/10 transition-colors">
              <Globe size={16} />
              <span>English</span>
              <ChevronDown size={14} className="opacity-60" />
            </button>
          </div>
        </div>

        <div className="pt-8">
          <p className="text-white/40 text-xs leading-relaxed whitespace-pre-line">
            {disclaimerText}
          </p>
        </div>
      </div>
    </footer>
  );
};
