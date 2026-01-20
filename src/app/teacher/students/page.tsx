"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, students, getStudentFeeStatus } from "@/lib/data";
import {
  Users,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeacherStudentsPage() {
  const [role, setRole] = useState<Role>("teacher");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedClass || s.classId === selectedClass),
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
            <p className="text-gray-500 mt-1">View and manage your students</p>
          </div>
          <button className="btn btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="card p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students..."
                className="form-input w-full pl-10"
              />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="form-select"
            >
              <option value="">All Classes</option>
              <option value="class-3-A">Class 3-A</option>
              <option value="class-4-B">Class 4-B</option>
              <option value="class-5-A">Class 5-A</option>
            </select>
            <button className="btn btn-outline flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Roll No
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Student Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Parent Name
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Attendance
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Performance
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Fee Status
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student) => {
                  const presentCount = student.attendance.filter(
                    (a) => a.present,
                  ).length;
                  const attendanceRate = student.attendance.length
                    ? Math.round(
                        (presentCount / student.attendance.length) * 100,
                      )
                    : 100;
                  const feeStatus = getStudentFeeStatus(student.id);

                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {student.rollNumber}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {student.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {student.classId.replace("class-", "Class ")}-
                              {student.section}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900">
                          {student.parentName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student.parentPhone}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-sm font-medium",
                            attendanceRate >= 90
                              ? "bg-green-100 text-green-700"
                              : attendanceRate >= 75
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700",
                          )}
                        >
                          {attendanceRate}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm font-medium text-gray-900">
                          78%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-sm font-medium",
                            feeStatus.isPaid
                              ? "bg-green-100 text-green-700"
                              : feeStatus.due > 0
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700",
                          )}
                        >
                          {feeStatus.isPaid
                            ? "Paid"
                            : feeStatus.due > 0
                              ? "Pending"
                              : "Overdue"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-blue-100 rounded text-blue-600">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-green-100 rounded text-green-600">
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
