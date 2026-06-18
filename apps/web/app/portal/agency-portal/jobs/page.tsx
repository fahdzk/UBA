
import Link from "next/link";
import { Plus, Briefcase, MapPin, Clock, Users } from "lucide-react";

const MOCK_JOBS = [
  { id: "1", title: "Brand Ambassador - Nike Store", location: "New York, NY", status: "OPEN", applications: 12, posted: "2 days ago" },
  { id: "2", title: "Event Staff - Mercedes Benz", location: "Los Angeles, CA", status: "OPEN", applications: 8, posted: "3 days ago" },
  { id: "3", title: "Retail Ambassador - Apple", location: "San Francisco, CA", status: "CLOSED", applications: 24, posted: "2 weeks ago" },
];

export default function AgencyJobsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Jobs</h1><p className="text-gray-500 mt-1">Manage your job postings</p></div>
        <Link href="/portal/agency-portal/jobs/new" className="flex items-center gap-2 px-4 py-2 bg-[#032B66] text-white rounded-lg hover:bg-[#032B66]/90"><Plus size={16} /> Post Job</Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          {MOCK_JOBS.map((job) => (
            <div key={job.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
              <div className="bg-blue-100 p-2 rounded-lg"><Briefcase size={18} className="text-blue-600" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{job.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                  <span className="flex items-center gap-1"><Users size={14} />{job.applications} apps</span>
                  <span className="flex items-center gap-1"><Clock size={14} />{job.posted}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${job.status === "OPEN" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{job.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
