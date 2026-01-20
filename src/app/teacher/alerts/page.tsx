"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, students } from "@/lib/data";
import { AlertTriangle, Users, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeacherAlertsPage() {
  const [role, setRole] = useState<Role>("teacher");

  const lowAttendanceStudents = students
    .filter((s) => s.attendance.filter((a) => a.present).length < 3)
    .map((s) => ({
      ...s,
      attendanceRate: Math.round(
        (s.attendance.filter((a) => a.present).length / s.attendance.length) *
          100,
      ),
    }));

  const alerts = [
    {
      type: "attendance",
      title: "Low Attendance Alert",
      count: lowAttendanceStudents.length,
    },
    { type: "fee", title: "Fee Pending", count: 3 },
    { type: "homework", title: "Homework Pending", count: 5 },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
          <p className="text-gray-500 mt-1">
            Important notifications requiring your attention
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={cn(
                "card p-4 border-l-4",
                alert.type === "attendance"
                  ? "border-l-red-500"
                  : alert.type === "fee"
                    ? "border-l-amber-500"
                    : "border-l-blue-500",
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{alert.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {alert.count}
                  </p>
                </div>
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    alert.type === "attendance"
                      ? "bg-red-100"
                      : alert.type === "fee"
                        ? "bg-amber-100"
                        : "bg-blue-100",
                  )}
                >
                  <AlertTriangle
                    className={cn(
                      "w-5 h-5",
                      alert.type === "attendance"
                        ? "text-red-600"
                        : alert.type === "fee"
                          ? "text-amber-600"
                          : "text-blue-600",
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {lowAttendanceStudents.length > 0 && (
          <div className="card mb-6">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Low Attendance Alert
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {lowAttendanceStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-red-600">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {student.classId} • Roll: {student.rollNumber}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        "font-bold",
                        student.attendanceRate < 75
                          ? "text-red-600"
                          : "text-amber-600",
                      )}
                    >
                      {student.attendanceRate}%
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        Call
                      </button>
                      <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Recent Notifications
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              {
                notification: "PTM scheduled for Jan 25, 2026",
                time: "2 hours ago",
                type: "info",
              },
              {
                notification: "New syllabus uploaded for Mathematics",
                time: "Yesterday",
                type: "success",
              },
              {
                notification: "Exam schedule updated",
                time: "2 days ago",
                type: "warning",
              },
            ].map((item, index) => (
              <div key={index} className="p-4">
                <p className="text-sm text-gray-900">{item.notification}</p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
