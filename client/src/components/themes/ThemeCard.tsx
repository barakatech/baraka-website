import { Link } from "wouter";
import type { Theme } from "../../lib/stocksApi";

interface ThemeCardProps {
  theme: Theme;
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const themeSlug = theme.slug || theme.title.toLowerCase().replace(/\s+/g, '-');
  const icon = theme.image?.icon || theme.image?.thumbnailUrl || theme.image?.smallImageUrl || theme.image?.imageUrl || "/figmaAssets/theme-icons/metaverse.png";

  return (
    <Link href={`/theme/${themeSlug}`}>
      <div className="bg-[#1a1a1a] rounded-[24px] overflow-hidden cursor-pointer hover:bg-[#252525] transition-all hover:scale-[1.02] p-5 h-[160px]">
        <div className="w-[50px] h-[50px] mb-4 flex items-center justify-center">
          <img src={icon} alt={theme.title} className="w-[45px] h-[45px] object-contain" />
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-medium text-white">{theme.title}</h3>
          {theme.isNew && (
            <span className="bg-[#9fd] text-black text-[10px] font-semibold px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
