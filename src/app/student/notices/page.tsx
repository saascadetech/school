"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import { Bell, Calendar, Clock, FileText } from "lucide-react";

export default function StudentNoticesPage() {
  const [role, setRole] = useState<Role>("student");

  const notices = [
    {
      title: "PTM Scheduled",
      date: "Jan 20, 2026",
      priority: "high",
      content:
        "Parent-Teacher Meeting will be held on Jan 25, 2026. All parents are requested to attend.",
    },
    {
      title: "Holiday Notice",
      date: "Jan 18, 2026",
      priority: "medium",
      content: "School will remain closed on Jan 26 (Republic Day).",
    },
    {
      title: "Exam Schedule",
      date: "Jan 15, 2026",
      priority: "low",
      content:
        "Unit Test 3 schedule has been published. Check the Exams section for details.",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
          <p className="text-gray-500 mt-1">School announcements and notices</p>
        </div>

        <div className="space-y-4">
          {notices.map((notice, index) => (
            <div
              key={index}
              className={`card border-l-4 ${notice.priority === "high" ? "border-l-red-500" : notice.priority === "medium" ? "border-l-amber-500" : "border-l-blue-500"}`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${notice.priority === "high" ? "bg-red-100" : notice.priority === "medium" ? "bg-amber-100" : "bg-blue-100"}`}
                    >
                      <Bell
                        className={`w-5 h-5 ${notice.priority === "high" ? "text-red-600" : notice.priority === "medium" ? "text-amber-600" : "text-blue-600"}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {notice.title}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notice.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${notice.priority === "high" ? "bg-red-100 text-red-700" : notice.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}
                  >
                    {notice.priority.charAt(0).toUpperCase() +
                      notice.priority.slice(1)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">{notice.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
