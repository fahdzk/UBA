import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgencyRatingBadgeProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export function AgencyRatingBadge({ rating, size = "md" }: AgencyRatingBadgeProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          )}
        />
      ))}
    </div>
  );
}
