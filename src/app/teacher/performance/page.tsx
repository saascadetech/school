"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, students } from "@/lib/data";
import { TrendingUp, TrendingDown, Award, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeacherPerformancePage() {
  const [role, setRole] = useState<Role>("teacher");

  const classPerformance = [
    { exam: "Unit Test 1", average: 78, highest: 95, lowest: 52 },
    { exam: "Mid-Term", average: 82, highest: 98, lowest: 58 },
    { exam: "Unit Test 2", average: 75, highest: 92, lowest: 48 },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Performance Analytics
          </h1>
          <p className="text-gray-500 mt-1">
            Track student and class performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Class Average</p>
                <p className="text-2xl font-bold text-blue-600">78%</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pass Rate</p>
                <p className="text-2xl font-bold text-green-600">92%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Top Performer</p>
                <p className="text-2xl font-bold text-purple-600">Priya P.</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Improvement</p>
                <p className="text-2xl font-bold text-emerald-600">+5%</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Exam Performance Trends
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {classPerformance.map((exam, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium text-gray-700">
                    {exam.exam}
                  </div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${exam.average}%` }}
                    />
                  </div>
                  <div className="w-20 text-right">
                    <span className="text-sm font-medium text-gray-900">
                      {exam.average}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Top Students</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {students.slice(0, 5).map((student, index) => (
              <div
                key={student.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      index === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : index === 1
                          ? "bg-gray-100 text-gray-700"
                          : index === 2
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700",
                    )}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.classId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">92%</p>
                  <p className="text-xs text-green-600">+3% this month</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
