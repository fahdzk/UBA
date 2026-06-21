import { Bell } from "lucide-react";

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-heading text-lg font-semibold text-slate-900">Recent Activity</h3>
      <div className="mt-4 flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-slate-100 p-4">
          <Bell className="h-8 w-8 text-slate-300" />
        </div>
        <p className="mt-3 text-sm font-medium text-slate-500">No recent activity</p>
        <p className="mt-1 text-xs text-slate-400">
          Your notifications and updates will appear here
        </p>
      </div>
    </div>
  );
}
