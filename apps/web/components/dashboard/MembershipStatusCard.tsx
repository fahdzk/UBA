import { Crown } from "lucide-react";

export function MembershipStatusCard() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2">
      <Crown className="h-4 w-4 text-amber-500" />
      <span className="text-sm font-semibold text-amber-700">Trial</span>
      <span className="text-xs text-amber-600">30 days left</span>
    </div>
  );
}
