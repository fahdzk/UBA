
"use client";

import { useState } from "react";
import { Bell, Check, CheckCheck } from "lucide-react";

const MOCK_NOTIFICATIONS = [
  { id: "1", title: "Application Update", message: "Your application for Brand Ambassador - Nike Store is under review", read: false, date: "2 hours ago" },
  { id: "2", title: "New Job Match", message: "A new job matching your profile was posted: Event Staff - Mercedes Benz", read: false, date: "5 hours ago" },
  { id: "3", title: "Complaint Update", message: "Your complaint #1 status has been updated to Under Review", read: true, date: "1 day ago" },
  { id: "4", title: "Welcome!", message: "Welcome to UBA. Complete your profile to get started.", read: true, date: "3 days ago" },
];

export default function BANotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-2 text-sm text-[#032B66] hover:underline">
            <CheckCheck size={16} />
            Mark all read
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-4 flex items-start gap-3 ${!notif.read ? "bg-blue-50/50" : ""}`}>
              <div className={`p-2 rounded-lg ${notif.read ? "bg-gray-100" : "bg-blue-100"}`}>
                <Bell size={16} className={notif.read ? "text-gray-400" : "text-blue-600"} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm ${notif.read ? "text-gray-600" : "font-medium text-gray-900"}`}>{notif.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.date}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
