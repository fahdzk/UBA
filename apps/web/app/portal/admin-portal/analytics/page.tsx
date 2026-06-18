
import { TrendingUp, Users, Briefcase, MessageSquare, DollarSign } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      <p className="text-gray-500 mt-1">Platform performance metrics</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {[
          { label: "User Growth", value: "+12%", icon: Users, color: "bg-blue-500" },
          { label: "Job Fill Rate", value: "78%", icon: Briefcase, color: "bg-green-500" },
          { label: "Resolution Rate", value: "92%", icon: MessageSquare, color: "bg-purple-500" },
          { label: "Revenue", value: "$24.5K", icon: DollarSign, color: "bg-amber-500" },
        ].map((stat) => { const Icon = stat.icon; return (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">{stat.label}</p><p className="text-2xl font-bold mt-1">{stat.value}</p></div>
              <div className={`${stat.color} p-3 rounded-lg`}><Icon size={20} className="text-white" /></div>
            </div>
          </div>
        ); })}
      </div>
      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="font-semibold mb-4">Activity Overview</h2>
        <p className="text-gray-500 text-sm">Charts and detailed analytics will appear here. Integrate with your preferred analytics provider.</p>
      </div>
    </div>
  );
}
