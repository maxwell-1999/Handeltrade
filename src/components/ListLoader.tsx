import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

const ListLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export { ListLoader };

export function CardSkeleton() {
  return (
    <div className="p-[10px] rounded-[10px] flex items-start w-full gap-4 bg-white">
      <div className="flex flex-col items-center justify-center gap-3">
        <Skeleton className="block w-[44px] h-[44px] rounded-full mt-3 " />
        <Skeleton className="w-[30px] h-3" />
      </div>
      <div className="flex flex-col w-full gap-3">
        <Skeleton className="block w-full h-6" />
        <Skeleton className="block w-full h-6" />
        <div className="flex gap-3">
          <Skeleton className="w-[80px] h-6" />
          <Skeleton className="w-[80px] h-6" />
        </div>
      </div>
    </div>
  );
}
