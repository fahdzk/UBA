"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bell } from "lucide-react";

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [target, setTarget] = useState("all");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setSending(true);
    try {
      await fetch("/api/notifications/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, target }),
      });
      setSent(true);
      setTitle("");
      setBody("");
    } catch (err) {
      console.error("Broadcast failed:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold text-slate-900">Send Notification</h1>

      {sent && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          Notification sent successfully!
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Target Audience</label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All Members</option>
            <option value="active">Active Members Only</option>
            <option value="agencies">All Agencies</option>
            <option value="state">By State</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title..." />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Notification body..." rows={4} />
        </div>
        <Button onClick={handleSend} disabled={!title || !body || sending} className="bg-brand-red hover:bg-brand-red-hover">
          <Send className="mr-2 h-4 w-4" />
          {sending ? "Sending..." : "Send Notification"}
        </Button>
      </div>

      <div>
        <h2 className="font-heading text-lg font-semibold text-slate-900">Recent Broadcasts</h2>
        <div className="mt-4 space-y-2">
          {[
            { title: "New Agency Rating System", target: "All Members", date: "Jun 18, 2026" },
            { title: "HNA Compliance Reminder", target: "All Agencies", date: "Jun 15, 2026" },
            { title: "Legal Fund Now Available", target: "Active Members", date: "Jun 10, 2026" },
          ].map((b, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-sm">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-900">{b.title}</p>
                  <p className="text-xs text-slate-500">To: {b.target}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">{b.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
