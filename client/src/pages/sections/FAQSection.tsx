import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Apple Inc. (AAPL)?",
    answer: "Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the world's largest technology company by revenue, with US$394.3 billion in 2022 revenue. It designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories."
  },
  {
    question: "How can I buy Apple stock?",
    answer: "You can buy Apple stock through the Baraka app. Simply download the app, create an account, fund your account, search for AAPL, and place your order. You can buy whole shares or fractional shares starting from as little as $1."
  },
  {
    question: "Does Apple pay dividends?",
    answer: "Yes, Apple pays quarterly dividends to shareholders. The company has been paying dividends since 2012 and has consistently increased its dividend payments over the years. The current dividend yield is approximately 0.5%."
  },
  {
    question: "What are the trading hours for Apple stock?",
    answer: "Apple stock trades on the NASDAQ exchange during regular market hours from 9:30 AM to 4:00 PM Eastern Time (ET), Monday through Friday. Extended hours trading is also available through some brokers."
  },
  {
    question: "What factors affect Apple's stock price?",
    answer: "Apple's stock price is influenced by various factors including quarterly earnings reports, new product launches, global economic conditions, supply chain issues, competition, regulatory changes, and overall market sentiment towards technology stocks."
  },
];

export const FAQSection = (): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
      <h2 className="text-white text-xl font-semibold">Frequently Asked Questions</h2>
      
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <div 
            key={index}
            className="bg-[#111] rounded-[18px] overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="text-white font-medium pr-4">{item.question}</span>
              <ChevronDown 
                className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
              />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5">
                <p className="text-white/70 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
