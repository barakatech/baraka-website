import { Link } from "wouter";
import { useState, useEffect } from "react";

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

export function NewsListingPage() {
  const [email, setEmail] = useState("");
  const [showMoreAkhbaraka, setShowMoreAkhbaraka] = useState(false);
  const [showMoreOther, setShowMoreOther] = useState(false);
  const [showMoreBlog, setShowMoreBlog] = useState(false);
  const [hoveredHeadline, setHoveredHeadline] = useState<typeof recentHeadlines[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
        </div>
      </div>
    </div>
  );
}
