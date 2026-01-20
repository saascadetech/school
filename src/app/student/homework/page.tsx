"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import {
  BookOpen,
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  Download,
} from "lucide-react";

const homeworkList = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Chapter 5 - Exercise 3",
    dueDate: "Today",
    dueTime: "5:00 PM",
    status: "pending",
    priority: "high",
    description:
      "Solve all questions from exercise 3 of chapter 5 on algebraic expressions.",
  },
  {
    id: 2,
    subject: "Science",
    title: "Lab Report: Photosynthesis",
    dueDate: "Tomorrow",
    dueTime: "9:00 AM",
    status: "pending",
    priority: "medium",
    description:
      "Write a complete lab report on the photosynthesis experiment conducted in class.",
  },
  {
    id: 3,
    subject: "English",
    title: "Essay: My Favorite Season",
    dueDate: "Jan 22",
    dueTime: "12:00 PM",
    status: "pending",
    priority: "low",
    description:
      "Write a 500-word essay describing your favorite season with examples.",
  },
  {
    id: 4,
    subject: "Mathematics",
    title: "Chapter 4 - Review Questions",
    dueDate: "Jan 15",
    dueTime: "5:00 PM",
    status: "completed",
    priority: "medium",
    description: "Complete all review questions from chapter 4 on fractions.",
  },
];

export default function StudentHomeworkPage() {
  const [role, setRole] = useState<Role>("student");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingCount = homeworkList.filter(
    (h) => h.status === "pending",
  ).length;
  const completedCount = homeworkList.filter(
    (h) => h.status === "completed",
  ).length;

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
          <h1 className="font-semibold text-gray-900">Homework</h1>
        </div>
        <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          S
        </div>
      </header>

      <main className="pt-16 lg:pt-0 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 hidden lg:block">
              My Homework
            </h1>
            <p className="text-gray-500">
              Keep track of your assignments and submissions
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-bold text-gray-900">
                    {pendingCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-xl font-bold text-gray-900">
                    {completedCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Homework List */}
          <div className="space-y-4">
            {homeworkList.map((hw) => (
              <div key={hw.id} className="card p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      hw.subject === "Mathematics"
                        ? "bg-blue-100"
                        : hw.subject === "Science"
                          ? "bg-green-100"
                          : "bg-purple-100"
                    }`}
                  >
                    <BookOpen
                      className={`w-6 h-6 ${
                        hw.subject === "Mathematics"
                          ? "text-blue-600"
                          : hw.subject === "Science"
                            ? "text-green-600"
                            : "text-purple-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500 uppercase">
                        {hw.subject}
                      </span>
                      {hw.priority === "high" && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                          High Priority
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          hw.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {hw.status.charAt(0).toUpperCase() + hw.status.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {hw.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {hw.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {hw.dueDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {hw.dueTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:flex-col">
                    {hw.status === "pending" ? (
                      <button className="btn btn-primary text-sm">
                        Submit
                      </button>
                    ) : (
                      <button className="btn btn-secondary text-sm flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        View
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
