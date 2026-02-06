import { useState } from "react";
import { Bell } from "lucide-react";

interface WatchlistSubscriptionSectionProps {
  stockName: string;
  stockSymbol: string;
}

export const WatchlistSubscriptionSection = ({
  stockName,
  stockSymbol
}: WatchlistSubscriptionSectionProps): JSX.Element => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">("daily");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email || phone) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-[#111] rounded-[24px] p-6" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center">
          <Bell className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Add to Watchlist</h3>
        </div>
      </div>

      <p className="text-white/70 mb-6">
        Get notified about <span className="text-white font-semibold">{stockName}</span> price updates and news
      </p>

      <form onSubmit={handleSubscribe} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[56px] bg-[#1a1a1a] rounded-[16px] px-4 text-white placeholder-white/50 focus:outline-none border-2 border-transparent focus:border-white transition-colors"
          />
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-[56px] bg-[#1a1a1a] rounded-[16px] px-4 text-white placeholder-white/50 focus:outline-none border-2 border-transparent focus:border-white transition-colors"
          />
        </div>

        <div>
          <p className="text-white/50 text-sm mb-3">Notification frequency:</p>
          <div className="flex gap-2">
            {(["daily", "weekly", "monthly"] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setFrequency(freq)}
                className={`flex-1 h-[44px] rounded-full text-sm font-medium transition-colors capitalize ${
                  frequency === freq
                    ? "bg-white text-black"
                    : "bg-[#1a1a1a] text-white/70 hover:bg-[#252525]"
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubscribed}
          className={`w-full h-[50px] rounded-full transition-colors text-[16px] leading-[16px] ${
            isSubscribed
              ? "bg-white/80 text-black cursor-default"
              : "bg-white text-black hover:bg-white/90"
          }`}
          style={{ fontFamily: '"Proxima Nova Semibold", "Proxima Nova", sans-serif' }}
        >
          {isSubscribed ? "Subscribed!" : "Subscribe to Watchlist"}
        </button>
      </form>
    </div>
  );
};
