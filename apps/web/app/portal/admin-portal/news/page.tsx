
import Link from "next/link";
import { Plus, Newspaper, Calendar, Eye } from "lucide-react";

const MOCK_POSTS = [
  { id: "1", title: "New Partnership Announcement", slug: "new-partnership", published: true, date: "2026-06-15", views: 245 },
  { id: "2", title: "Platform Updates - June 2026", slug: "june-updates", published: true, date: "2026-06-10", views: 189 },
  { id: "3", title: "Upcoming Features", slug: "upcoming-features", published: false, date: "2026-06-18", views: 0 },
];

export default function AdminNewsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">News</h1><p className="text-gray-500 mt-1">Manage news and announcements</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#032B66] text-white rounded-lg hover:bg-[#032B66]/90"><Plus size={16} /> New Post</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          {MOCK_POSTS.map((post) => (
            <div key={post.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className="bg-blue-100 p-2 rounded-lg"><Newspaper size={18} className="text-blue-600" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><Calendar size={14} />{post.date}</span>
                  <span className="flex items-center gap-1"><Eye size={14} />{post.views}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{post.published ? "Published" : "Draft"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
