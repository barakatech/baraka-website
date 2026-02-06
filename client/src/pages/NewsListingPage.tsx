import { Link } from "wouter";
import { useState } from "react";

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

function NewsCard({ news, showSource = false }: { news: typeof moreFromAkhbaraka[0] & { source?: string }; showSource?: boolean }) {
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
        </div>
        <div className="text-center px-2 pb-2">
          <h3 className="text-white font-normal text-[20px] leading-snug mb-2 line-clamp-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>{news.subtitle}</h3>
          <p className="text-white/40 text-sm">8 min. read</p>
        </div>
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
  const [hoveredHeadline, setHoveredHeadline] = useState<typeof recentHeadlines[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const displayedHero = hoveredHeadline || heroNews;
  const visibleAkhbaraka = showMoreAkhbaraka ? moreFromAkhbaraka : moreFromAkhbaraka.slice(0, 3);
  const visibleOther = showMoreOther ? inOtherNews : inOtherNews.slice(0, 3);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">

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
            <h2 className="text-2xl font-medium mb-6">In Other News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleOther.map((news) => (
                <NewsCard key={news.id} news={news as any} showSource />
              ))}
            </div>
            {inOtherNews.length > 3 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowMoreOther(!showMoreOther)}
                  className="bg-white text-black h-[50px] px-[24px] rounded-full hover:bg-gray-200 transition-colors"
                >
                  <span className="text-[16px] font-semibold leading-[20px]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                    {showMoreOther ? "Show Less" : "Load More"}
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
