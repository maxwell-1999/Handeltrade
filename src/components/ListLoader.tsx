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
    <div className="p-[10px] rounded-[10px] flex items-center w-full gap-4 bg-white">
      <Skeleton className="block w-12 h-12 rounded-full " />
      <div className="flex flex-col w-full gap-3">
        <Skeleton className="block w-full h-6" />
        <Skeleton className="w-3/4 h-6" />
      </div>
    </div>
  );
}
