"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, students } from "@/lib/data";
import { FileText, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentResultsPage() {
  const [role, setRole] = useState<Role>("student");
  const student = students[0];

  const results = [
    {
      exam: "Unit Test 1",
      date: "Dec 15, 2025",
      percentage: 82,
      grade: "A",
      status: "published",
    },
    {
      exam: "Mid-Term",
      date: "Dec 30, 2025",
      percentage: 78,
      grade: "B+",
      status: "published",
    },
    {
      exam: "Unit Test 2",
      date: "Jan 10, 2026",
      percentage: 85,
      grade: "A",
      status: "published",
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-100";
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-100";
    return "text-amber-600 bg-amber-100";
  };

  const overallAverage = Math.round(
    results.reduce((sum, r) => sum + r.percentage, 0) / results.length,
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
          <p className="text-gray-500 mt-1">View your examination results</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-sm text-gray-500">Overall Average</p>
            <p className="text-2xl font-bold text-blue-600">
              {overallAverage}%
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Total Exams</p>
            <p className="text-2xl font-bold text-gray-900">{results.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Highest Grade</p>
            <p className="text-2xl font-bold text-green-600">A</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Class Rank</p>
            <p className="text-2xl font-bold text-purple-600">#3</p>
          </div>
        </div>

        <div className="card">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">All Results</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Exam
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Percentage
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Grade
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {results.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {result.exam}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500">
                      {result.date}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-sm font-medium text-gray-900">
                        {result.percentage}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-sm font-medium",
                          getGradeColor(result.grade),
                        )}
                      >
                        {result.grade}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button className="btn btn-outline text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
