"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  TrendingUp,
  Menu,
} from "lucide-react";

const attendanceData = [
  { date: "Jan 19, 2026", day: "Monday", status: "present" },
  { date: "Jan 18, 2026", day: "Sunday", status: "holiday" },
  { date: "Jan 17, 2026", day: "Saturday", status: "weekend" },
  { date: "Jan 16, 2026", day: "Friday", status: "present" },
  { date: "Jan 15, 2026", day: "Thursday", status: "late" },
  { date: "Jan 14, 2026", day: "Wednesday", status: "present" },
  { date: "Jan 13, 2026", day: "Tuesday", status: "present" },
  { date: "Jan 12, 2026", day: "Monday", status: "absent" },
  { date: "Jan 11, 2026", day: "Sunday", status: "holiday" },
  { date: "Jan 10, 2026", day: "Saturday", status: "weekend" },
];

export default function StudentAttendancePage() {
  const [role, setRole] = useState<Role>("student");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const presentDays = attendanceData.filter(
    (d) => d.status === "present",
  ).length;
  const absentDays = attendanceData.filter((d) => d.status === "absent").length;
  const lateDays = attendanceData.filter((d) => d.status === "late").length;
  const attendanceRate = Math.round(
    (presentDays / (presentDays + absentDays + lateDays)) * 100,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role={role} onRoleChange={setRole} />

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="font-semibold text-gray-900">Attendance</h1>
        </div>
        <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          S
        </div>
      </header>

      <main className="pt-16 lg:pt-0 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 hidden lg:block">
              My Attendance
            </h1>
            <p className="text-gray-500">Track your attendance record</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Present</p>
                  <p className="text-xl font-bold text-gray-900">
                    {presentDays}
                  </p>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Absent</p>
                  <p className="text-xl font-bold text-gray-900">
                    {absentDays}
                  </p>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Late</p>
                  <p className="text-xl font-bold text-gray-900">{lateDays}</p>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="text-xl font-bold text-gray-900">
                    {attendanceRate}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Calendar */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Attendance Record</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {attendanceData.map((record, index) => (
                <div
                  key={index}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{record.date}</p>
                      <p className="text-sm text-gray-500">{record.day}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      record.status === "present"
                        ? "bg-green-100 text-green-700"
                        : record.status === "absent"
                          ? "bg-red-100 text-red-700"
                          : record.status === "late"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {record.status.charAt(0).toUpperCase() +
                      record.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
