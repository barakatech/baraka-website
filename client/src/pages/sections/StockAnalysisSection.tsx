import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const trendData = [
  {
    score: 4,
    period: "1w",
    barHeight: "h-[52px]",
    barColor: "bg-solidred",
    barTop: "top-[111px]",
    barLeft: "left-[-22px]",
    barWidth: "w-[52px]",
  },
  {
    score: 5,
    period: "1m",
    barHeight: "h-[72px]",
    barColor: "bg-white",
    barTop: "top-[101px]",
    barLeft: "-left-8",
    barWidth: "w-[72px]",
  },
  {
    score: 9,
    period: "3m",
    barHeight: "h-[126px]",
    barColor: "bg-solidbaraka-green",
    barTop: "top-[74px]",
    barLeft: "left-[-59px]",
    barWidth: "w-[126px]",
  },
  {
    score: 8,
    period: "6m",
    barHeight: "h-[113px]",
    barColor: "bg-solidbaraka-green",
    barTop: "top-20",
    barLeft: "left-[-53px]",
    barWidth: "w-[113px]",
  },
  {
    score: 8,
    period: "1y",
    barHeight: "h-28",
    barColor: "bg-solidbaraka-green",
    barTop: "top-[81px]",
    barLeft: "left-[-52px]",
    barWidth: "w-28",
  },
];

export const StockAnalysisSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-4">
      <header className="inline-flex items-center gap-2">
        <h2 className="font-heading-desktop-h3-medium font-[number:var(--heading-desktop-h3-medium-font-weight)] text-white text-[length:var(--heading-desktop-h3-medium-font-size)] tracking-[var(--heading-desktop-h3-medium-letter-spacing)] leading-[var(--heading-desktop-h3-medium-line-height)] [font-style:var(--heading-desktop-h3-medium-font-style)]">
          Stock Analysis
        </h2>
      </header>

      <Card className="w-full bg-[#191919] rounded-[18px] border-0">
        <CardContent className="flex flex-col items-start gap-3 p-6">
          <h3 className="font-heading-desktop-h5-medium font-[number:var(--heading-desktop-h5-medium-font-weight)] text-[#ffffff80] text-[length:var(--heading-desktop-h5-medium-font-size)] leading-[var(--heading-desktop-h5-medium-line-height)] tracking-[var(--heading-desktop-h5-medium-letter-spacing)] [font-style:var(--heading-desktop-h5-medium-font-style)]">
            AVERAGE SCORE
          </h3>

          <div className="flex h-[83px] items-center gap-4 w-full">
            <div className="relative w-[72px] h-[72px] flex-shrink-0">
              <div className="relative h-[72px] bg-[url(/figmaAssets/ellipse.svg)] bg-[100%_100%]">
                <img
                  className="absolute top-0 left-px w-[72px] h-[72px]"
                  alt="Ellipse"
                  src="/figmaAssets/ellipse-1.svg"
                />

                <div className="absolute top-3 left-3 w-12 h-12">
                  <img
                    className="left-0 h-[45px] absolute top-0 w-12"
                    alt="Ellipse"
                    src="/figmaAssets/ellipse-2.svg"
                  />

                  <img
                    className="left-px h-12 absolute top-0 w-12"
                    alt="Ellipse"
                    src="/figmaAssets/ellipse-3.svg"
                  />

                  <div className="absolute top-[calc(50.00%_-_10px)] left-[calc(50.00%_-_7px)] text-[length:var(--h4-font-size)] whitespace-nowrap font-h4 font-[number:var(--h4-font-weight)] text-white text-center tracking-[var(--h4-letter-spacing)] leading-[var(--h4-line-height)] [font-style:var(--h4-font-style)]">
                    6
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-1 flex-1">
              <h4 className="font-heading-desktop-h4-medium font-[number:var(--heading-desktop-h4-medium-font-weight)] text-white text-[length:var(--heading-desktop-h4-medium-font-size)] tracking-[var(--heading-desktop-h4-medium-letter-spacing)] leading-[var(--heading-desktop-h4-medium-line-height)] [font-style:var(--heading-desktop-h4-medium-font-style)]">
                Positive Outlook
              </h4>

              <p className="font-heading-desktop-h5-regular font-[number:var(--heading-desktop-h5-regular-font-weight)] text-[#ffffff80] text-[length:var(--heading-desktop-h5-regular-font-size)] tracking-[var(--heading-desktop-h5-regular-letter-spacing)] leading-[var(--heading-desktop-h5-regular-line-height)] [font-style:var(--heading-desktop-h5-regular-font-style)]">
                Remained a score of 6 for 7 weeks, which is higher then
                it&apos;s 3 years average of 7.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-[#191919] rounded-[18px] border-0">
        <CardContent className="flex flex-col items-start gap-2.5 p-6">
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="font-heading-desktop-h5-medium font-[number:var(--heading-desktop-h5-medium-font-weight)] text-[#ffffff80] text-[length:var(--heading-desktop-h5-medium-font-size)] leading-[var(--heading-desktop-h5-medium-line-height)] tracking-[var(--heading-desktop-h5-medium-letter-spacing)] [font-style:var(--heading-desktop-h5-medium-font-style)]">
              AVERAGE SCORE TREND
            </h3>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 lg:gap-20 w-full relative">
              <div className="flex items-start justify-between flex-1 w-full md:w-auto">
                {trendData.map((item, index) => (
                  <div
                    key={index}
                    className="inline-flex flex-col items-center gap-2"
                  >
                    <div className="font-body-3 font-[number:var(--body-3-font-weight)] text-white text-[length:var(--body-3-font-size)] text-center tracking-[var(--body-3-letter-spacing)] leading-[var(--body-3-line-height)] [font-style:var(--body-3-font-style)]">
                      {item.score}
                    </div>

                    <div className="relative w-[7px] h-[140px]">
                      <div className="absolute top-[66px] left-[-67px] w-[141px] h-2 bg-[#ffffff1a] rounded-[100px] -rotate-90" />

                      <div
                        className={`absolute ${item.barTop} ${item.barLeft} ${item.barWidth} ${item.barColor} h-2 rounded-[100px] -rotate-90`}
                      />
                    </div>

                    <div className="font-body-3 font-[number:var(--body-3-font-weight)] text-[#ffffff4c] text-[length:var(--body-3-font-size)] text-center leading-[var(--body-3-line-height)] tracking-[var(--body-3-letter-spacing)] [font-style:var(--body-3-font-style)]">
                      {item.period}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col w-auto md:w-[87px] items-start gap-2.5 pt-0 pb-0 md:pb-12 px-0">
                <Badge className="bg-solidgreen rounded-[18px] px-3 pt-[3px] pb-1 h-auto hover:bg-solidgreen">
                  <span className="[font-family:'Proxima_Nova-Semibold',Helvetica] font-normal text-black text-sm text-right tracking-[0] leading-[18px] whitespace-nowrap">
                    Current: 6
                  </span>
                </Badge>
              </div>

              <div
                className="hidden md:block absolute top-[calc(50%_-_1px)] left-0 right-0 h-px border-t border-dashed border-white/30"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
