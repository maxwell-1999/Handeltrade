import MemoNodataImage from '@/SVG/NodataImage';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const NoDataFound: React.FC<{ className?: string; children: ReactNode }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full gap-3 p-6 bg-white rounded-md',
        className
      )}
    >
      <MemoNodataImage />
      <div className="text-2">{children}</div>
    </div>
  );
};

export { NoDataFound };
