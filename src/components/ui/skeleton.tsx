import { cn } from '@/lib/utils';
import React, { HTMLAttributes, useEffect, useState } from 'react';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-[#eceeefd4]', className)}
      {...props}
    />
  );
}

interface TimeoutSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  timeOut?: number | null;
}

function TimeoutSkeleton({
  className,
  style,
  timeOut = null,
  ...props
}: TimeoutSkeletonProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (timeOut && timeOut > 0) {
      setTimeout(() => {
        setShow(false);
      });
    }
  }, []);

  return (show ?
    <div
      className={cn('animate-pulse rounded-md bg-[#eceeefd4]', className)}
      {...props}
    /> : <></>
  );
}


export { Skeleton, TimeoutSkeleton };
