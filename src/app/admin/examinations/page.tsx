"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, examinations, examResults } from "@/lib/data";
import {
  FileText,
  Plus,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExaminationsPage() {
  const [role, setRole] = useState<Role>("principal");
  const [activeTab, setActiveTab] = useState<"upcoming" | "results">(
    "upcoming",
  );

  const upcomingExams = examinations.filter((e) => e.status === "scheduled");
  const completedExams = examinations.filter((e) => e.status === "completed");

  const statusLabels: Record<string, { label: string; class: string }> = {
    scheduled: { label: "Scheduled", class: "bg-blue-100 text-blue-700" },
    in_progress: { label: "In Progress", class: "bg-amber-100 text-amber-700" },
    completed: { label: "Completed", class: "bg-green-100 text-green-700" },
    cancelled: { label: "Cancelled", class: "bg-red-100 text-red-700" },
  };

  const resultStatusLabels: Record<string, { label: string; class: string }> = {
    pending: { label: "Pending", class: "bg-amber-100 text-amber-700" },
    published: { label: "Published", class: "bg-green-100 text-green-700" },
    under_review: { label: "Under Review", class: "bg-blue-100 text-blue-700" },
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Examinations</h1>
            <p className="text-gray-500 mt-1">Manage exams and results</p>
          </div>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Schedule Exam
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              activeTab === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            Upcoming Exams
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              activeTab === "results"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            Results
          </button>
        </div>

        {activeTab === "upcoming" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Exams</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {examinations.length}
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
                    <p className="text-sm text-gray-500">Upcoming</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {upcomingExams.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {completedExams.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Results Published</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {
                        examResults.filter((r) => r.status === "published")
                          .length
                      }
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {examinations.map((exam) => (
                <div key={exam.id} className="card p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            statusLabels[exam.status].class,
                          )}
                        >
                          {statusLabels[exam.status].label}
                        </span>
                        <span className="text-xs text-gray-500">
                          {exam.examType}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {exam.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(exam.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exam.startTime} - {exam.endTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {exam.examType}
                        </span>
                        <span>Max Marks: {exam.maxMarks}</span>
                      </div>
                    </div>
                    <button className="btn btn-outline flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "results" && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Exam
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Class
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Total Students
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Average
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Pass %
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {examResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">
                        {result.examName}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {result.class}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {result.totalStudents}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {result.averageMarks}%
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={cn(
                            "font-medium",
                            result.passPercentage >= 75
                              ? "text-green-600"
                              : result.passPercentage >= 50
                                ? "text-amber-600"
                                : "text-red-600",
                          )}
                        >
                          {result.passPercentage}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            resultStatusLabels[result.status].class,
                          )}
                        >
                          {resultStatusLabels[result.status].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
