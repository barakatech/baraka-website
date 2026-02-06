import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export const AppPromotionSection = (): JSX.Element => {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  return (
    <>
      <Card className="w-full rounded-[32px] overflow-hidden bg-[url(/figmaAssets/wealth-banner-v2.png)] bg-cover bg-center h-[520px] md:h-[500px] lg:h-[622px] relative border-0">
        <CardContent className="p-0 h-full flex flex-col justify-end relative">
          <div className="absolute inset-x-0 bottom-0 h-[260px] bg-[#1a1a1a99] backdrop-blur-[50px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(50px)_brightness(100%)]" />

          <div className="relative z-10 flex flex-col items-start gap-6 pt-8 pb-8 px-6">
            <div className="flex flex-col items-start gap-2 w-full">
              <h2 className="font-heading-desktop-h2-medium font-[number:var(--heading-desktop-h2-medium-font-weight)] text-white text-[length:var(--heading-desktop-h2-medium-font-size)] tracking-[var(--heading-desktop-h2-medium-letter-spacing)] leading-[var(--heading-desktop-h2-medium-line-height)] [font-style:var(--heading-desktop-h2-medium-font-style)]">
                Build Your Long Term Wealth
              </h2>

              <p className="font-heading-desktop-h4-regular font-[number:var(--heading-desktop-h4-regular-font-weight)] text-white text-[length:var(--heading-desktop-h4-regular-font-size)] tracking-[var(--heading-desktop-h4-regular-letter-spacing)] leading-[var(--heading-desktop-h4-regular-line-height)] [font-style:var(--heading-desktop-h4-regular-font-style)]">
                A modern investment app with fair pricing.
              </p>
            </div>

            <Button 
              onClick={() => setShowDownloadPopup(true)}
              className="w-full h-[50px] bg-white hover:bg-white/90 text-black rounded-[100px] px-6 py-3"
            >
              <span className="text-[16px] font-semibold leading-[20px] tracking-[0]" style={{ fontFamily: '"Proxima Nova", sans-serif' }}>
                Get the App
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

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
