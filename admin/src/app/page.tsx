"use client";

import Link from "next/link";
import {
  Users,
  BookOpen,
  DollarSign,
  FileText,
  Bell,
  ClipboardList,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const stats = [
  {
    label: "Total Students",
    value: "1,234",
    icon: Users,
    color: "bg-blue-500",
  },
  { label: "Total Staff", value: "89", icon: BookOpen, color: "bg-green-500" },
  {
    label: "Fee Collection",
    value: "₹12.5L",
    icon: DollarSign,
    color: "bg-purple-500",
  },
  { label: "Notices", value: "5", icon: FileText, color: "bg-orange-500" },
];

const recentActivity = [
  {
    type: "attendance",
    message: "Attendance marked for Class 10-A",
    time: "2 hours ago",
  },
  {
    type: "homework",
    message: "Homework assigned for Class 9-B",
    time: "4 hours ago",
  },
  {
    type: "notice",
    message: "New notice published: Holiday on 15th Aug",
    time: "1 day ago",
  },
  {
    type: "fee",
    message: "Fee payment received from Rahul Sharma",
    time: "2 days ago",
  },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </header>

        <div className="p-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{stat.label}</span>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Link
              href="/students"
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Manage Students</p>
                <p className="text-sm text-gray-500">
                  Add, edit, view students
                </p>
              </div>
            </Link>
            <Link
              href="/attendance"
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-green-100 rounded-lg">
                <ClipboardList className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Mark Attendance</p>
                <p className="text-sm text-gray-500">
                  Daily attendance tracking
                </p>
              </div>
            </Link>
            <Link
              href="/notices"
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-orange-100 rounded-lg">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Send Notice</p>
                <p className="text-sm text-gray-500">Broadcast to parents</p>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="p-4 flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-indigo-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
