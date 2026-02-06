import { ReactNode } from 'react';
import { Link } from 'wouter';

interface StockLinkProps {
  instrumentId: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * StockLink component for navigating to stock detail pages
 * Navigates with instrumentId - the detail page will fetch slug and replace URL
 */
export function StockLink({ instrumentId, children, className, onClick }: StockLinkProps) {
  return (
    <Link
      href={`/stocks/${instrumentId}`}
      onClick={onClick}
      className={className}
    >
      {children}
    </Link>
  );
}
