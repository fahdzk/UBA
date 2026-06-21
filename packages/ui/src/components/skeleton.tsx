import * as React from "react";
import { cn } from "../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-shimmer rounded bg-gradient-to-r from-surface-raised via-surface-overlay to-surface-raised bg-[length:200%_100%]", className)}
      {...props}
    />
  );
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <Skeleton ref={ref} className={cn("h-4 w-full", className)} {...props} />
  )
);
SkeletonText.displayName = "SkeletonText";

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <Skeleton ref={ref} className={cn("h-10 w-10 rounded-full", className)} {...props} />
  )
);
SkeletonAvatar.displayName = "SkeletonAvatar";

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-card border border-surface-border bg-surface p-6", className)} {...props}>
      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  )
);
SkeletonCard.displayName = "SkeletonCard";

const SkeletonTable = React.forwardRef<HTMLDivElement, SkeletonProps & { rows?: number; cols?: number }>(
  ({ className, rows = 5, cols = 4, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-3", className)} {...props}>
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIdx) => (
            <Skeleton key={colIdx} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
);
SkeletonTable.displayName = "SkeletonTable";

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable };
