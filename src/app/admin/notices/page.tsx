"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, notices } from "@/lib/data";
import {
  FileText,
  Plus,
  Search,
  Calendar,
  User,
  Edit,
  Trash2,
  Eye,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function NoticesPage() {
  const [role, setRole] = useState<Role>("principal");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const publishedCount = notices.filter((n) => n.status === "published").length;
  const draftCount = notices.filter((n) => n.status === "draft").length;
  const urgentCount = notices.filter((n) => n.type === "urgent").length;

  const typeLabels: Record<string, { label: string; class: string }> = {
    general: { label: "General", class: "bg-gray-100 text-gray-700" },
    academic: { label: "Academic", class: "bg-blue-100 text-blue-700" },
    event: { label: "Event", class: "bg-green-100 text-green-700" },
    urgent: { label: "Urgent", class: "bg-red-100 text-red-700" },
    holiday: { label: "Holiday", class: "bg-purple-100 text-purple-700" },
    exam: { label: "Exam", class: "bg-amber-100 text-amber-700" },
  };

  const statusLabels: Record<string, { label: string; class: string }> = {
    draft: { label: "Draft", class: "bg-gray-100 text-gray-700" },
    published: { label: "Published", class: "bg-green-100 text-green-700" },
    archived: { label: "Archived", class: "bg-red-100 text-red-700" },
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Notices & Circulars
            </h1>
            <p className="text-gray-500 mt-1">
              Manage school notices and communications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-outline flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send Bulk SMS
            </button>
            <button className="btn btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Notice
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Notices</p>
                <p className="text-2xl font-bold text-gray-900">
                  {notices.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {publishedCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Drafts</p>
                <p className="text-2xl font-bold text-amber-600">
                  {draftCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <div key={notice.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        typeLabels[notice.type].class,
                      )}
                    >
                      {typeLabels[notice.type].label}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        statusLabels[notice.status].class,
                      )}
                    >
                      {statusLabels[notice.status].label}
                    </span>
                    <span className="text-xs text-gray-400">
                      Published:{" "}
                      {new Date(notice.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {notice.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{notice.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {notice.publishedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Target: {notice.targetAudience.join(", ")}
                    </span>
                    {notice.expiryDate && (
                      <span>
                        Expires:{" "}
                        {new Date(notice.expiryDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Eye className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
