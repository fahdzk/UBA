"use client";

import { Bell, Check, Trash2, Briefcase, AlertTriangle, Scale, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  { id: "1", type: "application_filled", title: "Application Update", body: "Your application for Brand Ambassador - Tech Conference has been received.", time: "2 hours ago", read: false, icon: Briefcase },
  { id: "2", type: "violation_update", title: "Violation Review", body: "Your filed violation has been assigned to a case manager.", time: "1 day ago", read: false, icon: AlertTriangle },
  { id: "3", type: "payment_received", title: "Payment Received", body: "You've received a payment of $140.00 from Elite Promotions.", time: "3 days ago", read: true, icon: CreditCard },
  { id: "4", type: "case_update", title: "Legal Case Update", body: "Your legal case has been matched with attorney Sarah Johnson.", time: "5 days ago", read: true, icon: Scale },
  { id: "5", type: "system", title: "Welcome to UBA", body: "Welcome to the Union of Brand Ambassadors! Complete your profile to get started.", time: "1 week ago", read: true, icon: Bell },
];

export default function NotificationsPage() {
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-slate-900">Notifications</h1>
        {unread > 0 && (
          <Button variant="ghost" size="sm" className="text-xs">
            <Check className="mr-1 h-3 w-3" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={cn(
              "flex items-start gap-3 rounded-xl border p-4 transition-colors",
              n.read
                ? "border-slate-200 bg-white"
                : "border-navy-200 bg-navy-50/50"
            )}
          >
            <div className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              n.read ? "bg-slate-100 text-slate-400" : "bg-navy-100 text-navy-600"
            )}>
              <n.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={cn("text-sm", n.read ? "text-slate-600" : "font-semibold text-slate-900")}>
                  {n.title}
                </p>
                <span className="shrink-0 text-xs text-slate-400">{n.time}</span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">{n.body}</p>
            </div>
            {!n.read && (
              <div className="h-2 w-2 shrink-0 rounded-full bg-brand-red" />
            )}
          </div>
        ))}
      </div>

      {NOTIFICATIONS.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16">
          <Bell className="h-12 w-12 text-slate-300" />
          <p className="mt-3 text-sm font-medium text-slate-500">No notifications</p>
          <p className="mt-1 text-xs text-slate-400">You&apos;re all caught up</p>
        </div>
      )}
    </div>
  );
}
