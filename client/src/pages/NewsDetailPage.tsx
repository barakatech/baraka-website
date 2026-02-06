import { Link, useParams } from "wouter";
import { useState } from "react";

const newsArticles: Record<string, {
  id: string;
  title: string;
  image: string;
  category: string;
  content: string[];
}> = {
  "1": {
    id: "1",
    title: "Automatic Dividend Reinvestment: Analyzing Benefits",
    image: "https://framerusercontent.com/images/4EkwAM0tIzIeEFzUWEtUtRs650.jpg?lossless=1&width=1166&height=510",
    category: "Investing",
    content: [
      `If you're an investor, you've likely encountered the term "dividends." Dividends are your share of a company's profits paid out to you as a shareholder. They are a form of income, in addition to any potential capital gains from the appreciation of the stock. Typically, companies with stable and predictable profits, such as blue-chip or utility companies, pay dividends. Receiving dividends can be a source of passive income, especially appealing for those looking to fund their retirement or grow their investments over time.`,
      `Understanding dividends is crucial because they represent a tangible return on your investment. Unlike unrealized capital gains, which are only on paper until you sell the asset, dividends provide real cash that you can spend or reinvest. Furthermore, dividends are often seen as a sign of a company's financial health and a commitment to returning value to shareholders, which can be reassuring during market volatility.`,
      `However, once you receive dividends, you face a choice. You can either take the cash or reinvest it. This is where the concept of automatic dividend reinvestment enters the scene. By choosing to reinvest your dividends, you're deciding to use those funds to purchase more shares of the company, potentially setting the stage for compounded growth over time.`,
      `### Understanding Automatic Dividend Reinvestment`,
      `What is automatic dividend reinvestment, exactly? It's a service that many investment platforms and brokerages offer, allowing you to automatically use dividend payouts to purchase additional shares or fractions of shares of the stock or fund that paid the dividend. This process is done without any action required on your part, after you've initially set it up. It's a hands-off approach that ensures your dividends are consistently put to work, potentially maximizing your investment growth.`,
      `The power of automatic dividend reinvestment lies in the magic of compounding. By reinvesting dividends, you're buying more shares, which will, in turn, generate their own dividends. Over time, this cycle can significantly increase the number of shares you own and the value of your investment. It's a strategy that can turn small, steady investments into substantial holdings through the sheer force of exponential growth.`,
      `To illustrate, imagine you own stock in a company that pays a regular dividend. Instead of receiving a quarterly check, automatic dividend reinvestment means those funds are immediately used to buy more of that company's stock. As a result, your share count grows with each dividend payment, and when the company pays its next dividend, you'll receive an even larger payout because you now own more shares.`,
      `### How to Reinvest Dividends Automatically`,
      `Now that you've grasped the concept of automatic dividend reinvestment, how exactly do you reinvest dividends? The process is surprisingly simple. First, you need to own shares of a dividend-paying stock or mutual fund. Once you have these in your portfolio, you'll typically have the option to enroll in a Dividend Reinvestment Plan (DRIP). A DRIP is a program that automatically reinvests your dividends into more shares of the stock or mutual fund that paid them.`,
      `To enroll in a DRIP, you'd typically log into your brokerage account and select the option for dividend reinvestment for each eligible stock or fund. This can often be done through an online portal or by contacting customer service. Once set up, the process becomes seamless. Every time a dividend is paid, your brokerage will automatically purchase additional shares on your behalf, using the dividend amount.`,
      `It's important to note that not all stocks or funds offer DRIPs, and some brokerages might have specific rules or fees associated with their dividend reinvestment programs. Therefore, you should review the terms and conditions before enrolling. Additionally, keep in mind that while most DRIPs allow you to buy fractional shares, meaning that every cent of your dividend is put to work, not all brokerages offer this feature.`,
      `### Pros and Cons of Automatic Dividend Reinvestment`,
      `As with any investment strategy, there are both advantages and disadvantages to automatic dividend reinvestment. Let's explore some of these to give you a clearer picture.`,
      `### Pros of Automatic Dividend Reinvestment`,
      `One of the most significant advantages of automatic dividend reinvestment is the benefit of compounding returns. Over time, reinvesting dividends can substantially increase the value of your investment, as the dividends from the additional shares you've purchased with your initial dividends will also earn dividends in the future.`,
      `Automatic dividend reinvestment is also a form of dollar-cost averaging since you're purchasing shares at various price points over time, regardless of market conditions. This can help smooth out the volatility of stock prices in the long run, as you're not trying to time the market to make purchases.`,
      `Another advantage is the convenience factor. Once you've set up automatic reinvestment, you don't have to take any further action. This can be particularly beneficial for busy investors or those who prefer a more hands-off approach to their investment strategy.`,
      `### Cons of Automatic Dividend Reinvestment`,
      `On the flip side, there are some drawbacks to consider. One potential disadvantage is that reinvesting dividends means you won't have access to that cash for other uses. If you rely on dividend income to fund living expenses or other financial goals, automatic reinvestment might not be suitable for you.`,
      `Another consideration is tax implications. Dividends used to purchase additional shares are still taxable, even if you don't get to see the cash. This can complicate your tax situation, especially if you're not prepared to pay taxes on income that you've reinvested rather than spent.`,
      `Finally, automatic dividend reinvestment means you're increasing your investment in a particular stock or fund. While this can be beneficial if the investment performs well, it also means you're putting more of your eggs in one basket, which could expose you to higher risk if that investment's value drops.`,
      `### Conclusion: Is Automatic Dividend Reinvestment Right for You?`,
      `As you've seen, automatic dividend reinvestment can be a compelling choice for investors looking to capitalize on the power of compounding returns and passive investment strategies. However, it's not a one-size-fits-all solution. You need to consider your financial objectives, cash flow needs, and risk tolerance before committing to this approach.`,
      `If you're a long-term investor with a focus on growing your portfolio, and you don't require immediate income from your investments, automatic dividend reinvestment could be a valuable component of your investment strategy. On the other hand, if you need regular cash payouts or prefer more flexibility, you may want to think twice before enrolling in a DRIP.`,
      `Remember, investing is about making informed decisions that align with your personal financial landscape. Whether or not to reinvest your dividends automatically is one of those decisions, and now you're equipped with the knowledge to make that choice confidently.`
    ]
  },
  "2": {
    id: "2",
    title: "Global Push: Tech Giants Expand into Emerging Markets",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    category: "Technology",
    content: [
      `Tech giants are expanding their presence in emerging markets at an unprecedented pace. From Southeast Asia to Latin America, major technology companies are investing billions to capture the next wave of digital consumers.`,
      `The push comes as growth in mature markets slows and companies seek new revenue streams. Local partnerships, infrastructure investments, and tailored products are becoming key strategies for success in these diverse markets.`
    ]
  },
  "3": {
    id: "3",
    title: "Chip Diplomacy: How Semiconductors Became Geopolitical Chess Pieces",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
    category: "Technology",
    content: [
      `Semiconductors have become central to geopolitical competition between major powers. Export controls, subsidies, and strategic partnerships are reshaping the global chip industry.`,
      `Nations are racing to build domestic chip manufacturing capacity, recognizing that semiconductor independence is now a matter of national security. This shift is creating both challenges and opportunities for investors in the tech sector.`
    ]
  }
};

const similarNews = [
  {
    id: "10",
    title: "Dollar index to sell Mass Bonds at $200+ Billion Bouncer",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400",
    readTime: "8 min. read"
  },
  {
    id: "11",
    title: "Global Push: Tech Giants Expand Markets",
    image: "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=400",
    readTime: "6 min. read"
  },
  {
    id: "12",
    title: "Chip Diplomacy Reshapes Industry",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400",
    readTime: "5 min. read"
  }
];

function SimilarNewsCard({ news }: { news: typeof similarNews[0] }) {
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
          <h3 className="text-white font-normal text-[20px] leading-snug mb-2 line-clamp-2" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>{news.title}</h3>
          <p className="text-white/40 text-sm">{news.readTime}</p>
        </div>
      </div>
    </Link>
  );
}

export function NewsDetailPage() {
  const params = useParams<{ id: string }>();
  const articleId = params.id || "1";
  const article = newsArticles[articleId] || newsArticles["1"];
  const shareOnX = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };
  
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href="/news" className="hover:text-white transition-colors">Learn</Link>
          <span>›</span>
          <span className="text-white font-medium">{article.category}</span>
        </div>

        <div className="rounded-[44px] overflow-hidden mb-8 h-[314px]">
          <img 
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 
          className="text-[44px] font-medium leading-[1.1] mb-6"
          style={{ fontFamily: '"Proxima Nova", sans-serif' }}
        >
          {article.title}
        </h1>

        <div className="flex items-center gap-3 mb-10">
          <button 
            onClick={shareOnX}
            className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] hover:scale-105 transition-all rounded-full px-5 h-[54px] border border-white/10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-sm font-medium">Share on X</span>
          </button>
          <button 
            onClick={shareOnFacebook}
            className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] hover:scale-105 transition-all rounded-full px-5 h-[54px] border border-white/10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-sm font-medium">Share on Facebook</span>
          </button>
          <button 
            onClick={shareOnLinkedIn}
            className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] hover:scale-105 transition-all rounded-full px-5 h-[54px] border border-white/10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-sm font-medium">Share on Linkedin</span>
          </button>
        </div>

        <div className="mb-16" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {article.content.map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h2 
                  key={index}
                  className="text-[28px] font-semibold mt-6"
                  style={{ fontFamily: '"Proxima Nova", sans-serif' }}
                >
                  {paragraph.replace('### ', '')}
                </h2>
              );
            }
            return (
              <p 
                key={index}
                style={{ 
                  fontFamily: '"Proxima Nova", sans-serif',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: '1.2em',
                  textAlign: 'start',
                  color: '#ffffff'
                }}
              >
                {paragraph}
              </p>
            );
          })}
        </div>

      </div>
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 mt-24 pb-16">
        <h2 className="text-2xl font-semibold mb-8 text-white" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>Similar News</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarNews.map((news) => (
            <SimilarNewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
}
