import { Link } from "wouter";
import { useState, useEffect } from "react";
import womenWealth1 from '../assets/images/women-portrait-new_1.jpg';
import womenWealth2 from '../assets/images/women-portrait-new_2.jpg';
import womenWealth3 from '../assets/images/women-portrait-new_3.jpg';
import womenWealth4 from '../assets/images/women-leader.jpg';
import womenWealth5 from '../assets/images/women-portrait-new_5.jpg';

const heroNews = {
  id: "1",
  title: "Beyond Believable",
  subtitle: "How AI is reshaping the future of investing",
  image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
  category: "Technology",
  date: "March 13, 2025",
  readTime: "5 min read"
};

const sidebarNews = [
  {
    id: "2",
    title: "Global Push",
    subtitle: "Tech giants expand into emerging markets",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    date: "1 day ago"
  },
  {
    id: "3",
    title: "Chip Diplomacy",
    subtitle: "How semiconductors became geopolitical chess pieces",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    date: "1 day ago"
  },
  {
    id: "4",
    title: "Robotics Acquisition",
    subtitle: "Major tech merger signals industry consolidation",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
    date: "2 days ago"
  }
];

const recentHeadlines = [
  { id: "5", title: "Dubai IPO Watch", subtitle: "Major listing marks UAE financial milestone", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", date: "2 days ago" },
  { id: "6", title: "Under 30 Trailblazers", subtitle: "Young leaders reshape the media landscape", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800", date: "2 days ago" },
  { id: "7", title: "Silvergate Shuts Down", subtitle: "Cryptocurrency sector faces new challenges", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800", date: "2 days ago" },
  { id: "8", title: "Iran Sanctions Update", subtitle: "Diplomatic tensions rise in Middle East", image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800", date: "2 days ago" },
  { id: "9", title: "Google Green Claims", subtitle: "Tech giants face scrutiny over green claims", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800", date: "2 days ago" }
];

const moreFromAkhbaraka = [
  {
    id: "10",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion Bouncer",
    image: "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?w=400",
    change: "+1.66%",
    isPositive: true,
    date: "About 23 hours ago"
  },
  {
    id: "11",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion",
    image: "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=400",
    change: "+3.20%",
    isPositive: true,
    date: "About 23 hours ago"
  },
  {
    id: "12",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion Bouncer in Q4 2025",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400",
    change: "+0.85%",
    isPositive: true,
    date: "About 23 hours ago"
  },
  {
    id: "13",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    change: "-2.40%",
    isPositive: false,
    date: "About 23 hours ago"
  },
  {
    id: "14",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400",
    change: "+4.88%",
    isPositive: true,
    date: "About 23 hours ago"
  },
  {
    id: "15",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion Bouncer",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400",
    change: "+4.88%",
    isPositive: true,
    date: "About 23 hours ago"
  }
];

const inOtherNews = [
  {
    id: "20",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion Bouncer",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400",
    change: "-1.66%",
    isPositive: false,
    source: "Reuters",
    date: "About 23 hours ago"
  },
  {
    id: "21",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400",
    change: "+3.20%",
    isPositive: true,
    source: "Bloomberg",
    date: "About 23 hours ago"
  },
  {
    id: "22",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion Bouncer",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400",
    change: "+0.85%",
    isPositive: true,
    source: "CNBC",
    date: "About 23 hours ago"
  },
  {
    id: "23",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    change: "-2.40%",
    isPositive: false,
    source: "Financial Times",
    date: "About 23 hours ago"
  },
  {
    id: "24",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400",
    change: "+4.88%",
    isPositive: true,
    source: "WSJ",
    date: "About 23 hours ago"
  },
  {
    id: "25",
    title: "Surf's Up",
    subtitle: "Dollar index to sell Mass Bonds at $200+ Billion Bouncer",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400",
    change: "+4.88%",
    isPositive: true,
    source: "MarketWatch",
    date: "About 23 hours ago"
  }
];

const ourBlog = [
  {
    id: "30",
    title: "Investment Insights",
    subtitle: "Understanding market volatility and how to navigate uncertain times",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    category: "Investing",
    change: "+2.15%",
    isPositive: true,
    date: "About 12 hours ago"
  },
  {
    id: "31",
    title: "Wealth Building",
    subtitle: "Strategies for long-term portfolio growth in emerging markets",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    category: "Wealth",
    change: "+1.85%",
    isPositive: true,
    date: "About 18 hours ago"
  },
  {
    id: "32",
    title: "Market Analysis",
    subtitle: "Breaking down the latest trends in GCC stock markets",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400",
    category: "Markets",
    change: "+3.40%",
    isPositive: true,
    date: "About 1 day ago"
  },
  {
    id: "33",
    title: "Financial Planning",
    subtitle: "Expert tips for building a diversified investment portfolio",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
    category: "Planning",
    change: "-0.75%",
    isPositive: false,
    date: "About 1 day ago"
  },
  {
    id: "34",
    title: "Trading Strategies",
    subtitle: "How to identify high-growth opportunities in tech stocks",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    category: "Trading",
    change: "+4.20%",
    isPositive: true,
    date: "About 2 days ago"
  },
  {
    id: "35",
    title: "Economic Outlook",
    subtitle: "Global economic trends shaping investment opportunities in 2025",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400",
    category: "Economy",
    change: "+2.90%",
    isPositive: true,
    date: "About 2 days ago"
  }
];

const adxStocks = [
  {
    id: "40",
    title: "ADX Update",
    subtitle: "Abu Dhabi Securities Exchange reaches new milestone with record trading volume",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    category: "ADX",
    date: "About 5 hours ago"
  },
  {
    id: "42",
    title: "ADNOC Distribution",
    subtitle: "Energy giant announces Q4 dividend increase for shareholders",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400",
    category: "ADX",
    date: "About 12 hours ago"
  },
  {
    id: "44",
    title: "First Abu Dhabi Bank",
    subtitle: "FAB reports strong quarterly earnings beating analyst expectations",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    category: "ADX",
    date: "About 1 day ago"
  }
];

const dfmStocks = [
  {
    id: "41",
    title: "DFM Rally",
    subtitle: "Dubai Financial Market sees strong gains in banking sector",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=400",
    category: "DFM",
    date: "About 8 hours ago"
  },
  {
    id: "43",
    title: "Emirates NBD",
    subtitle: "Premier banking index shows resilience amid global uncertainty",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400",
    category: "DFM",
    date: "About 1 day ago"
  },
  {
    id: "45",
    title: "Dubai Islamic Bank",
    subtitle: "DIB announces expansion plans across the GCC region",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    category: "DFM",
    date: "About 2 days ago"
  }
];

const learnMarkets = [
  {
    id: "50",
    title: "Beginner's Guide",
    subtitle: "Everything you need to know about starting your investment journey",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    category: "Guide",
    date: "Essential"
  },
  {
    id: "51",
    title: "ETF Basics",
    subtitle: "Understanding Exchange-Traded Funds and how they work",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    category: "ETFs",
    date: "Essential"
  },
  {
    id: "52",
    title: "Reading Charts",
    subtitle: "Technical analysis fundamentals for smart investing decisions",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    category: "Analysis",
    date: "Intermediate"
  }
];

const womenWealth = [
  {
    id: "60",
    title: "Breaking Barriers",
    subtitle: "How women investors are reshaping the GCC financial landscape",
    image: womenWealth1,
    category: "Women",
    date: "Featured"
  },
  {
    id: "61",
    title: "Financial Independence",
    subtitle: "Building long-term wealth strategies tailored for women",
    image: womenWealth2,
    category: "Wealth",
    date: "Guide"
  },
  {
    id: "62",
    title: "Investment Circles",
    subtitle: "Community-driven investing and the power of collective wisdom",
    image: womenWealth3,
    category: "Community",
    date: "Trending"
  },
  {
    id: "63",
    title: "Leading with Confidence",
    subtitle: "Women at the forefront of investment management in the UAE",
    image: womenWealth4,
    category: "Leadership",
    date: "Spotlight"
  },
  {
    id: "64",
    title: "Smart Money Moves",
    subtitle: "Essential financial planning tips for modern women investors",
    image: womenWealth5,
    category: "Planning",
    date: "Guide"
  }
];

const academyInsights = [
  {
    id: "70",
    title: "Market Psychology",
    subtitle: "Understanding investor behavior and emotional decision-making",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    category: "Academy",
    date: "Course"
  },
  {
    id: "71",
    title: "Portfolio Theory",
    subtitle: "Modern approaches to diversification and risk management",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    category: "Academy",
    date: "Course"
  },
  {
    id: "72",
    title: "Dividend Investing",
    subtitle: "Building passive income through strategic dividend stocks",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400",
    category: "Academy",
    date: "Course"
  }
];

const toolsResources = [
  {
    id: "80",
    title: "Compound Calculator",
    subtitle: "See how your investments can grow over time with compound interest",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
    category: "Calculator",
    date: "Tool"
  },
  {
    id: "81",
    title: "Risk Assessment",
    subtitle: "Discover your investor profile and risk tolerance level",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    category: "Assessment",
    date: "Tool"
  },
  {
    id: "82",
    title: "Why Baraka",
    subtitle: "Learn how Baraka is revolutionizing investing in the GCC region",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400",
    category: "About",
    date: "Overview"
  }
];

function NewsCard({ news, showSource = false }: { news: typeof moreFromAkhbaraka[0] & { source?: string; category?: string }; showSource?: boolean }) {
  return (
    <Link href={`/news/${news.id}`}>
      <div 
        className="cursor-pointer group p-6 transition-all duration-300 border-[1.5px] border-transparent hover:border-[#444]"
        style={{ 
          backgroundColor: '#191919', 
          borderRadius: '32px',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#000000'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#191919'}
      >
        <div className="relative h-[180px] rounded-[24px] overflow-hidden mb-4">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover"
          />
          {news.category && (
            <span className="absolute top-3 left-3 bg-white/90 text-black text-xs font-medium px-3 py-1 rounded-full" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
              {news.category}
            </span>
          )}
        </div>
        <div className="text-center px-2 pb-2">
          <h3 className="text-white font-normal text-[20px] leading-snug mb-2 line-clamp-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>{news.subtitle}</h3>
          <p className="text-white/40 text-sm">8 min. read</p>
        </div>
      </div>
    </Link>
  );
}

function LocalNewsCard({ news }: { news: typeof adxStocks[0] }) {
  return (
    <Link href={`/news/${news.id}`}>
      <div 
        className="cursor-pointer group p-4 transition-all duration-300 border-[1.5px] border-transparent hover:border-[#444] flex gap-4"
        style={{ 
          backgroundColor: '#191919', 
          borderRadius: '24px',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#000000'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#191919'}
      >
        <div className="relative w-[120px] h-[100px] rounded-[16px] overflow-hidden flex-shrink-0">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 bg-white/90 text-black text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
            {news.category}
          </span>
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <h3 className="text-white font-medium text-[16px] leading-snug mb-1 line-clamp-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>{news.subtitle}</h3>
          <p className="text-white/40 text-sm">{news.date}</p>
        </div>
      </div>
    </Link>
  );
}

function LearnCard({ news }: { news: typeof learnMarkets[0] }) {
  return (
    <Link href={`/news/${news.id}`}>
      <div 
        className="cursor-pointer group h-full transition-all duration-300 border-[2px] border-[#333] hover:border-[#0DDD00] rounded-[24px] overflow-hidden"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div className="relative h-[140px] overflow-hidden">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-3 left-3 bg-[#0DDD00] text-black text-[10px] font-bold px-3 py-1 rounded-full" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
            {news.date}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-white font-semibold text-[18px] mb-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>{news.title}</h3>
          <p className="text-white/50 text-sm line-clamp-2">{news.subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

function WomenWealthCarousel({ items }: { items: typeof womenWealth }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative">
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="overflow-hidden">
        <div 
          className="flex gap-4 transition-transform duration-500 ease-out px-8"
          style={{ transform: `translateX(-${currentIndex * 296}px)` }}
        >
          {items.map((news, index) => (
            <Link key={news.id} href={`/news/${news.id}`}>
              <div 
                className="flex-shrink-0 w-[280px] h-[340px] rounded-[24px] overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: '#1f1f1f' }}
              >
                <div className="h-[200px] overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-medium text-lg mb-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                    {news.title}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-2">{news.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-6">
        <button 
          onClick={prevSlide}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-1">
          {items.map((_, index) => (
            <div 
              key={index}
              className={`h-1 rounded-full transition-all ${index === currentIndex ? 'w-6 bg-white' : 'w-1 bg-white/30'}`}
            />
          ))}
        </div>
        <button 
          onClick={nextSlide}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function AcademyCard({ news, index }: { news: typeof academyInsights[0]; index: number }) {
  return (
    <Link href={`/news/${news.id}`}>
      <div 
        className="cursor-pointer group flex items-center gap-4 p-4 transition-all duration-300 hover:bg-[#1a1a1a] rounded-[16px] border-b border-white/10"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0DDD00] flex items-center justify-center text-black font-bold text-lg" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-[16px] group-hover:text-[#0DDD00] transition-colors" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>{news.title}</h3>
          <p className="text-white/40 text-sm line-clamp-1">{news.subtitle}</p>
        </div>
        <svg className="w-5 h-5 text-white/40 group-hover:text-[#0DDD00] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

function ToolCard({ news }: { news: typeof toolsResources[0] }) {
  const getIcon = (category: string) => {
    switch(category) {
      case 'Calculator':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'Assessment':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <Link href={`/news/${news.id}`}>
      <div 
        className="cursor-pointer group h-full p-6 transition-all duration-300 border-[2px] border-dashed border-white/20 hover:border-[#0DDD00] rounded-[20px] flex flex-col items-center text-center"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="w-16 h-16 rounded-full bg-[#0DDD00]/10 flex items-center justify-center text-[#0DDD00] mb-4 group-hover:bg-[#0DDD00]/20 transition-colors">
          {getIcon(news.category)}
        </div>
        <span className="text-[#0DDD00] text-xs font-semibold mb-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
          {news.category.toUpperCase()}
        </span>
        <h3 className="text-white font-semibold text-[18px] mb-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>{news.title}</h3>
        <p className="text-white/40 text-sm line-clamp-2">{news.subtitle}</p>
      </div>
    </Link>
  );
}

function SidebarNewsCard({ news }: { news: typeof sidebarNews[0] }) {
  return (
    <Link href={`/news/${news.id}`}>
      <div className="bg-[#1a1a1a] rounded-[16px] overflow-hidden cursor-pointer hover:bg-[#252525] transition-colors flex items-center gap-4 p-3">
        <div className="w-[100px] h-[70px] rounded-[12px] overflow-hidden flex-shrink-0">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm mb-1">{news.title}</h3>
          <p className="text-white/50 text-xs line-clamp-2">{news.subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

export function NewsListingPageV2() {
  const [email, setEmail] = useState("");
  const [showMoreAkhbaraka, setShowMoreAkhbaraka] = useState(false);
  const [showMoreOther, setShowMoreOther] = useState(false);
  const [showMoreBlog, setShowMoreBlog] = useState(false);
  const [hoveredHeadline, setHoveredHeadline] = useState<typeof recentHeadlines[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [calcInitial, setCalcInitial] = useState(10000);
  const [calcMonthly, setCalcMonthly] = useState(500);
  const [calcReturn, setCalcReturn] = useState(8);
  const [calcYears, setCalcYears] = useState(10);
  const [activeCalculator, setActiveCalculator] = useState<'wealth' | 'retirement'>('wealth');
  const [retireCurrentAge, setRetireCurrentAge] = useState(30);
  const [retireTargetAge, setRetireTargetAge] = useState(65);
  const [retireMonthlyExpense, setRetireMonthlyExpense] = useState(5000);
  const [retireSavings, setRetireSavings] = useState(50000);

  const calculateProjection = () => {
    const monthlyRate = calcReturn / 100 / 12;
    const months = calcYears * 12;
    let balance = calcInitial;
    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyRate) + calcMonthly;
    }
    return balance;
  };

  const calculateRetirement = () => {
    const yearsToRetire = retireTargetAge - retireCurrentAge;
    const monthlyRate = calcReturn / 100 / 12;
    const months = yearsToRetire * 12;
    let balance = retireSavings;
    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyRate) + calcMonthly;
    }
    return balance;
  };

  const calculateRetirementNeeded = () => {
    const yearsInRetirement = 30;
    const inflationAdjusted = retireMonthlyExpense * Math.pow(1.03, retireTargetAge - retireCurrentAge);
    return inflationAdjusted * 12 * yearsInRetirement;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayedHero = hoveredHeadline || heroNews;
  const visibleAkhbaraka = showMoreAkhbaraka ? moreFromAkhbaraka : moreFromAkhbaraka.slice(0, 3);
  const visibleOther = showMoreOther ? inOtherNews : inOtherNews.slice(0, 3);
  const visibleBlog = showMoreBlog ? ourBlog : ourBlog.slice(0, 3);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-[44px]">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
              The Investor's Companion
            </h1>
            <p className="text-white text-sm mb-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
              by <span className="text-white">baraka</span>
            </p>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
              Build wealth with confidence. Learn, invest, and grow with trusted insights tailored for GCC investors.
            </p>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-12 relative overflow-hidden">
          <div className="hidden lg:block absolute top-0 right-0 bottom-0 z-0 flex items-start">
            <img 
              src="/attached_assets/image_1768473510653.png" 
              alt="Akhbaraka App"
              className="h-[500px] w-auto object-contain"
            />
          </div>
          
          <div className="relative z-10 max-w-[500px] mb-16 min-h-[500px]">
            <h1 className="text-4xl md:text-5xl font-medium mb-4 italic">
              Get Smarter About<br />Investing
            </h1>
            <p className="text-white mb-8">
              <span className="text-[#0DDD00]">Join 45,000+ subscribers</span> and get our 5 min daily newsletter on daily local and international financial news.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full h-[64px] bg-[#1a1a1a] rounded-[18px] px-[16px] py-[16px] text-white text-[14px] italic placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20"
                style={{ fontFamily: '"Proxima Nova", sans-serif' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[64px] bg-[#1a1a1a] rounded-[18px] px-[16px] py-[16px] text-white text-[14px] italic placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20"
                style={{ fontFamily: '"Proxima Nova", sans-serif' }}
              />
              <div className="pt-4 flex items-center gap-6">
                <button
                  type="submit"
                  className="bg-white text-black h-[50px] px-[24px] py-[12px] rounded-full hover:bg-white/90 transition-colors"
                >
                  <span className="text-[16px] font-semibold leading-[20px] tracking-[0]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                    Subscribe
                  </span>
                </button>
                <img 
                  src="/attached_assets/image_1768993723737.png" 
                  alt="akhbaraka - Fresh Financial News" 
                  className="h-[40px] w-auto object-contain"
                />
              </div>
            </form>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 mb-16 items-start mt-[44px]">
            <Link href={`/news/${displayedHero.id}`}>
              <div className="relative h-[400px] rounded-[24px] overflow-hidden cursor-pointer group">
                <img 
                  src={displayedHero.image}
                  alt={displayedHero.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h2 className="text-3xl font-medium text-white mb-2">{displayedHero.title}</h2>
                  <p className="text-gray-300">{displayedHero.subtitle}</p>
                </div>
              </div>
            </Link>

            <div className="flex flex-col">
              {recentHeadlines.slice(0, 5).map((headline, index, arr) => (
                <Link key={headline.id} href={`/news/${headline.id}`}>
                  <div 
                    className={`group relative transition-opacity ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-75' : 'opacity-100'}`}
                    onMouseEnter={() => { setHoveredHeadline(headline); setHoveredIndex(index); }}
                    onMouseLeave={() => { setHoveredHeadline(null); setHoveredIndex(null); }}
                  >
                    <div className="cursor-pointer group-hover:bg-[#1a1a1a] group-hover:rounded-[24px] px-4 py-3 transition-all">
                      <p className="text-white text-sm leading-relaxed">{headline.title}</p>
                      <p className="text-white/40 text-xs mt-1">{headline.date}</p>
                    </div>
                    {index < arr.length - 1 && (
                      <div className={`border-b transition-colors ${hoveredIndex === index || hoveredIndex === index + 1 ? 'border-transparent' : 'border-[#808080]'}`} />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-medium mb-6">More From Akhbaraka</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleAkhbaraka.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
            {moreFromAkhbaraka.length > 3 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowMoreAkhbaraka(!showMoreAkhbaraka)}
                  className="bg-white text-black h-[50px] px-[24px] rounded-full hover:bg-gray-200 transition-colors"
                >
                  <span className="text-[16px] font-semibold leading-[20px]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                    {showMoreAkhbaraka ? "Show Less" : "Load More"}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-medium mb-6">Local Stocks <span className="text-white/40 text-lg">(ADX & DFM News)</span></h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-medium text-white/80">ADX</h3>
                {adxStocks.map((news) => (
                  <LocalNewsCard key={news.id} news={news} />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-medium text-white/80">DFM</h3>
                {dfmStocks.map((news) => (
                  <LocalNewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-medium mb-6">Learn Markets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {learnMarkets.map((news) => (
                <NewsCard key={news.id} news={news as any} />
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-1 h-24 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full flex-shrink-0 mt-2" />
                  <h2 className="text-4xl md:text-5xl font-medium leading-tight" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                    Women & Wealth,<br />built to grow together
                  </h2>
                </div>
                <p className="text-white/50 text-lg mb-8" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                  Empowering women investors in the GCC with tailored insights and community support.
                </p>
                <Link href="/news">
                  <button className="bg-white text-black h-[50px] px-8 rounded-full hover:bg-white/90 transition-colors">
                    <span className="text-base font-medium" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                      Load More
                    </span>
                  </button>
                </Link>
              </div>
              <WomenWealthCarousel items={womenWealth} />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-medium mb-6">Our Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleBlog.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
            {ourBlog.length > 3 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowMoreBlog(!showMoreBlog)}
                  className="bg-white text-black h-[50px] px-[24px] rounded-full hover:bg-gray-200 transition-colors"
                >
                  <span className="text-[16px] font-semibold leading-[20px]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                    {showMoreBlog ? "Show Less" : "Load More"}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="mb-16">
            {/* Calculator Section Title */}
            <h1 className="text-white text-4xl md:text-5xl font-semibold mb-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
              Plan Your Financial Future
            </h1>
            <p className="text-white/50 text-lg mb-8 max-w-2xl" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
              Use our interactive calculators to visualize your wealth growth and retirement goals.
            </p>

            {/* Calculator Tabs */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setActiveCalculator('wealth')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeCalculator === 'wealth'
                    ? 'bg-transparent text-white border border-white'
                    : 'bg-[#303030]/80 text-white/60 border border-transparent hover:text-white'
                }`}
                style={{ fontFamily: '"Proxima Nova", sans-serif' }}
              >
                Wealth Calculator
              </button>
              <button
                onClick={() => setActiveCalculator('retirement')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeCalculator === 'retirement'
                    ? 'bg-transparent text-white border border-white'
                    : 'bg-[#303030]/80 text-white/60 border border-transparent hover:text-white'
                }`}
                style={{ fontFamily: '"Proxima Nova", sans-serif' }}
              >
                Retirement Calculator
              </button>
            </div>

            {activeCalculator === 'wealth' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart Card */}
              <div className="bg-[#111] rounded-[24px] p-8 border border-white/10">
                <p className="text-[#4A7CFF] text-sm font-medium mb-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Wealth Calculator</p>
                <h3 className="text-white text-2xl md:text-3xl font-medium mb-8" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                  Your wealth could grow to{' '}
                  <span className="text-white/50">${calculateProjection().toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                  {' '}by year{' '}
                  <span className="text-white/50">{new Date().getFullYear() + calcYears}</span>
                </h3>
                
                {/* Dynamic Chart SVG */}
                <div className="relative h-[200px] mb-4">
                  <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="none">
                    {/* Gray baseline area */}
                    <path
                      d="M 0 170 L 400 170 L 400 180 L 0 180 Z"
                      fill="#333"
                      fillOpacity="0.3"
                    />
                    {/* White growth curve with gradient fill - dynamic based on return */}
                    <defs>
                      <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 0 170 Q ${80 + calcReturn * 2} ${165 - calcReturn}, ${160 + calcYears} ${150 - calcReturn * 2} Q ${280 + calcReturn} ${120 - calcReturn * 3}, 400 ${Math.max(20, 170 - (calcReturn * calcYears * 0.8))} L 400 180 L 0 180 Z`}
                      fill="url(#whiteGradient)"
                    />
                    <path
                      d={`M 0 170 Q ${80 + calcReturn * 2} ${165 - calcReturn}, ${160 + calcYears} ${150 - calcReturn * 2} Q ${280 + calcReturn} ${120 - calcReturn * 3}, 400 ${Math.max(20, 170 - (calcReturn * calcYears * 0.8))}`}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* End point dot */}
                    <circle cx="400" cy={Math.max(20, 170 - (calcReturn * calcYears * 0.8))} r="6" fill="#ffffff" />
                    <circle cx="400" cy={Math.max(20, 170 - (calcReturn * calcYears * 0.8))} r="10" fill="#ffffff" fillOpacity="0.3" />
                    {/* Dashed vertical line at end */}
                    <line x1="400" y1={Math.max(20, 170 - (calcReturn * calcYears * 0.8))} x2="400" y2="180" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                  {/* Labels */}
                  <div className="absolute bottom-0 left-0 text-white/40 text-sm" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Today</div>
                  <div className="absolute bottom-0 right-0 text-white/40 text-sm" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>{new Date().getFullYear() + calcYears}</div>
                </div>
              </div>

              {/* Right side - Allocation & Inputs */}
              <div className="space-y-6">
                {/* Allocation breakdown */}
                <div className="bg-[#111] rounded-[24px] p-6 border border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm">Stocks</span>
                        <div className="w-24 h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#4A7CFF] rounded-full" style={{ width: '62%' }} />
                        </div>
                      </div>
                      <span className="text-white text-sm font-medium">62%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm">Bonds</span>
                        <div className="w-24 h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#FF7A5C] rounded-full" style={{ width: '17%' }} />
                        </div>
                      </div>
                      <span className="text-white text-sm font-medium">17%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm">Real Estate</span>
                        <div className="w-24 h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#5CE1E6] rounded-full" style={{ width: '17%' }} />
                        </div>
                      </div>
                      <span className="text-white text-sm font-medium">17%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm">Crypto</span>
                        <div className="w-24 h-3 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#FF9F5C] rounded-full" style={{ width: '4%' }} />
                        </div>
                      </div>
                      <span className="text-white text-sm font-medium">4%</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                      <span className="text-white text-sm">Total Contributions</span>
                      <span className="text-white text-lg font-semibold">${(calcInitial + (calcMonthly * 12 * calcYears)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Input controls */}
                <div className="bg-[#111] rounded-[24px] p-6 space-y-4 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Initial Investment</label>
                      <input
                        type="number"
                        value={calcInitial}
                        onChange={(e) => setCalcInitial(Number(e.target.value))}
                        className="w-full h-[48px] bg-[#1a1a1a] rounded-[12px] px-3 text-white text-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Monthly Contribution</label>
                      <input
                        type="number"
                        value={calcMonthly}
                        onChange={(e) => setCalcMonthly(Number(e.target.value))}
                        className="w-full h-[48px] bg-[#1a1a1a] rounded-[12px] px-3 text-white text-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Annual Return (%)</label>
                      <input
                        type="number"
                        value={calcReturn}
                        onChange={(e) => setCalcReturn(Number(e.target.value))}
                        className="w-full h-[48px] bg-[#1a1a1a] rounded-[12px] px-3 text-white text-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Years: {calcYears}</label>
                      <div className="relative pt-2">
                        <input
                          type="range"
                          min="1"
                          max="40"
                          value={calcYears}
                          onChange={(e) => setCalcYears(Number(e.target.value))}
                          className="w-full h-2 bg-[#333] rounded-lg cursor-pointer"
                          style={{
                            WebkitAppearance: 'none',
                            appearance: 'none',
                            background: `linear-gradient(to right, #fff 0%, #fff ${((calcYears - 1) / 39) * 100}%, #333 ${((calcYears - 1) / 39) * 100}%, #333 100%)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-white/30 text-xs mt-4 text-center">
                    *This calculator provides estimates based on assumed returns. Actual results may vary.
                  </p>
                </div>
              </div>
            </div>
            ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Retirement Chart Card */}
              <div className="bg-[#111] rounded-[24px] p-8 border border-white/10">
                <p className="text-white/50 text-sm font-medium mb-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Retirement Calculator</p>
                <h3 className="text-white text-2xl md:text-3xl font-medium mb-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                  By age <span className="text-white/50">{retireTargetAge}</span>, you could have{' '}
                  <span className="text-white/50">${calculateRetirement().toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </h3>
                <p className="text-white/50 text-lg mb-8" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                  Estimated needed for retirement: <span className="text-white/50">${calculateRetirementNeeded().toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </p>
                
                {/* Progress visualization */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">Retirement Goal Progress</span>
                      <span className="text-white/50 font-medium">{Math.min(100, (calculateRetirement() / calculateRetirementNeeded() * 100)).toFixed(0)}%</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (calculateRetirement() / calculateRetirementNeeded() * 100))}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-[#1a1a1a] rounded-[16px] p-4 text-center">
                      <p className="text-white/40 text-xs mb-1">Years to Retirement</p>
                      <p className="text-white/50 text-2xl font-bold">{retireTargetAge - retireCurrentAge}</p>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-[16px] p-4 text-center">
                      <p className="text-white/40 text-xs mb-1">Monthly at Retirement</p>
                      <p className="text-white/50 text-2xl font-bold">${Math.round(calculateRetirement() / (30 * 12)).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Retirement Inputs */}
              <div className="space-y-6">
                <div className="bg-[#111] rounded-[24px] p-6 space-y-4 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Current Age</label>
                      <input
                        type="number"
                        value={retireCurrentAge}
                        onChange={(e) => setRetireCurrentAge(Number(e.target.value))}
                        className="w-full h-[48px] bg-[#1a1a1a] rounded-[12px] px-3 text-white text-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Target Retirement Age</label>
                      <input
                        type="number"
                        value={retireTargetAge}
                        onChange={(e) => setRetireTargetAge(Number(e.target.value))}
                        className="w-full h-[48px] bg-[#1a1a1a] rounded-[12px] px-3 text-white text-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Current Savings ($)</label>
                      <input
                        type="number"
                        value={retireSavings}
                        onChange={(e) => setRetireSavings(Number(e.target.value))}
                        className="w-full h-[48px] bg-[#1a1a1a] rounded-[12px] px-3 text-white text-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Monthly Contribution ($)</label>
                      <input
                        type="number"
                        value={calcMonthly}
                        onChange={(e) => setCalcMonthly(Number(e.target.value))}
                        className="w-full h-[48px] bg-[#1a1a1a] rounded-[12px] px-3 text-white text-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Expected Monthly Expense</label>
                      <input
                        type="number"
                        value={retireMonthlyExpense}
                        onChange={(e) => setRetireMonthlyExpense(Number(e.target.value))}
                        className="w-full h-[48px] bg-[#1a1a1a] rounded-[12px] px-3 text-white text-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-xs mb-1 block">Annual Return (%)</label>
                      <input
                        type="number"
                        value={calcReturn}
                        onChange={(e) => setCalcReturn(Number(e.target.value))}
                        className="w-full h-[48px] bg-[#1a1a1a] rounded-[12px] px-3 text-white text-lg focus:outline-none"
                      />
                    </div>
                  </div>
                  <p className="text-white/30 text-xs mt-4 text-center">
                    *Assumes 3% annual inflation and 30 years in retirement. Actual results may vary.
                  </p>
                </div>

                {/* Retirement Tips */}
                <div className="bg-[#111] rounded-[24px] p-6 border border-white/10">
                  <h4 className="text-white font-medium mb-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Retirement Planning Tips</h4>
                  <ul className="space-y-3 text-white/60 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0DDD00]">•</span>
                      Start early - compound interest works best over time
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0DDD00]">•</span>
                      Aim to save 15-20% of your income for retirement
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0DDD00]">•</span>
                      Diversify investments to manage risk
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
