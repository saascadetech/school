"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Menu,
  Calendar,
} from "lucide-react";

const classes = [
  {
    id: 1,
    name: "Class 3-A",
    subject: "Mathematics",
    time: "8:30 AM",
    students: 35,
  },
  {
    id: 2,
    name: "Class 4-B",
    subject: "Mathematics",
    time: "10:00 AM",
    students: 32,
  },
  {
    id: 3,
    name: "Class 5-A",
    subject: "Mathematics",
    time: "11:30 AM",
    students: 30,
  },
];

const todayAttendance = [
  { id: 1, name: "Aarav Sharma", rollNo: "3A01", status: "present" },
  { id: 2, name: "Priya Patel", rollNo: "3A02", status: "present" },
  { id: 3, name: "Rahul Kumar", rollNo: "3A03", status: "absent" },
  { id: 4, name: "Sneha Gupta", rollNo: "3A04", status: "present" },
  { id: 5, name: "Vikram Singh", rollNo: "3A05", status: "late" },
];

export default function TeacherAttendancePage() {
  const [role, setRole] = useState<Role>("teacher");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(1);

  const presentCount = todayAttendance.filter(
    (s) => s.status === "present",
  ).length;
  const absentCount = todayAttendance.filter(
    (s) => s.status === "absent",
  ).length;
  const lateCount = todayAttendance.filter((s) => s.status === "late").length;

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
        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          T
        </div>
      </header>

      <main className="pt-16 lg:pt-0 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Attendance Management
            </h1>
            <p className="text-gray-500">Take and track student attendance</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Present</p>
                  <p className="text-xl font-bold text-gray-900">
                    {presentCount}
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
                    {absentCount}
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
                  <p className="text-xl font-bold text-gray-900">{lateCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Class Selection */}
          <div className="card p-4 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Select Class</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedClass === cls.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium text-gray-900">{cls.name}</p>
                  <p className="text-sm text-gray-500">{cls.subject}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {cls.time} • {cls.students} students
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Attendance List */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">
                Class 3-A Students
              </h2>
              <button className="btn btn-primary text-sm">
                Save Attendance
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {todayAttendance.map((student) => (
                <div
                  key={student.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Roll No: {student.rollNo}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={`p-2 rounded-lg ${
                        student.status === "present"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-2 rounded-lg ${
                        student.status === "absent"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-2 rounded-lg ${
                        student.status === "late"
                          ? "bg-amber-100 text-amber-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                    </button>
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
