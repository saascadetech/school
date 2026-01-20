"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, students } from "@/lib/data";
import {
  TrendingUp,
  Award,
  BarChart,
  Target,
  BookOpen,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentPerformancePage() {
  const [role, setRole] = useState<Role>("student");

  const student = students[0]; // Demo student

  const subjects = [
    { name: "Mathematics", score: 85, grade: "A", trend: "up" },
    { name: "English", score: 78, grade: "B+", trend: "same" },
    { name: "Science", score: 92, grade: "A+", trend: "up" },
    { name: "Social Studies", score: 72, grade: "B", trend: "down" },
    { name: "Hindi", score: 88, grade: "A", trend: "up" },
  ];

  const examResults = [
    { exam: "Unit Test 1", total: 100, obtained: 82, percentage: 82 },
    { exam: "Mid-Term", total: 100, obtained: 78, percentage: 78 },
    { exam: "Unit Test 2", total: 100, obtained: 85, percentage: 85 },
  ];

  const overallAverage = Math.round(
    examResults.reduce((sum, r) => sum + r.percentage, 0) / examResults.length,
  );

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A+") || grade.startsWith("A"))
      return "text-green-600 bg-green-100";
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-100";
    if (grade.startsWith("C")) return "text-amber-600 bg-amber-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Performance</h1>
          <p className="text-gray-500 mt-1">Track your academic progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Overall Average</p>
                <p className="text-2xl font-bold text-blue-600">
                  {overallAverage}%
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Class Rank</p>
                <p className="text-2xl font-bold text-green-600">#3</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Highest Score</p>
                <p className="text-2xl font-bold text-purple-600">92%</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Improvement</p>
                <p className="text-2xl font-bold text-emerald-600">+7%</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">
                Subject-wise Performance
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.name} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {subject.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">
                            {subject.score}%
                          </span>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              getGradeColor(subject.grade),
                            )}
                          >
                            {subject.grade}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            subject.score >= 80
                              ? "bg-green-500"
                              : subject.score >= 60
                                ? "bg-blue-500"
                                : "bg-amber-500",
                          )}
                          style={{ width: `${subject.score}%` }}
                        />
                      </div>
                    </div>
                    {subject.trend === "up" && (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                    {subject.trend === "down" && (
                      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Exam Results</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {examResults.map((exam, index) => (
                <div
                  key={index}
                  className="p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">{exam.exam}</p>
                    <p className="text-sm text-gray-500">
                      {exam.obtained}/{exam.total} marks
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {exam.percentage}%
                    </p>
                    <p className="text-xs text-green-600">
                      {exam.obtained >= 40 ? "Passed" : "Failed"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card mt-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Performance Summary</h2>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">Strongest Subject</p>
              <p className="text-lg font-bold text-green-800">Science (92%)</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-700">Needs Improvement</p>
              <p className="text-lg font-bold text-amber-800">
                Social Studies (72%)
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">Average Improvement</p>
              <p className="text-lg font-bold text-blue-800">+3% per exam</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
