"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, students, examinations, examResults, classes } from "@/lib/data";
import {
  FileText,
  Save,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  Edit,
  Eye,
  Download,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarksEntryPage() {
  const [role, setRole] = useState<Role>("teacher");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  // Filter exams for teacher's classes
  const availableExams = examinations.filter(
    (e) => e.status === "scheduled" || e.status === "completed",
  );

  // Mock marks data - in real app, this would come from admin results
  const studentMarks = [
    { studentId: "stud-1", rollNumber: "01", name: "Aarav Sharma", marks: 85 },
    { studentId: "stud-2", rollNumber: "02", name: "Priya Patel", marks: 92 },
    { studentId: "stud-3", rollNumber: "03", name: "Rahul Kumar", marks: 78 },
    { studentId: "stud-4", rollNumber: "04", name: "Sneha Reddy", marks: 88 },
    { studentId: "stud-5", rollNumber: "05", name: "Vikram Singh", marks: 72 },
  ];

  const filteredStudents = studentMarks.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.includes(searchQuery),
  );

  const handleSave = (studentId: string) => {
    setSavedStatus((prev) => ({ ...prev, [studentId]: true }));
    setIsEditing(null);
    setTimeout(() => {
      setSavedStatus((prev) => ({ ...prev, [studentId]: false }));
    }, 3000);
  };

  const handleBulkSave = () => {
    // In real app, save all marks to admin backend
    alert("All marks saved successfully!");
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C+";
    if (percentage >= 40) return "C";
    return "F";
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-100";
    if (percentage >= 60) return "text-blue-600 bg-blue-100";
    if (percentage >= 40) return "text-amber-600 bg-amber-100";
    return "text-red-600 bg-red-100";
  };

  // Calculate statistics
  const totalStudents = studentMarks.length;
  const avgMarks = Math.round(
    studentMarks.reduce((sum, s) => sum + s.marks, 0) / totalStudents,
  );
  const passCount = studentMarks.filter((s) => s.marks >= 40).length;
  const passRate = Math.round((passCount / totalStudents) * 100);

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Marks Entry</h1>
            <p className="text-gray-500 mt-1">
              Enter and manage student marks for examinations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn btn-outline flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Template
            </button>
            <button className="btn btn-outline flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Bulk Upload
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Exam
              </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="form-select w-full"
              >
                <option value="">Choose an exam...</option>
                {availableExams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name} - {exam.examType} ({exam.maxMarks} marks)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="form-select w-full"
              >
                <option value="">Choose a class...</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}-{cls.section}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Student
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or roll number..."
                  className="form-input w-full pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalStudents}
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
                <p className="text-sm text-gray-500">Average Marks</p>
                <p className="text-2xl font-bold text-blue-600">{avgMarks}%</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pass Rate</p>
                <p className="text-2xl font-bold text-green-600">{passRate}%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Entries Pending</p>
                <p className="text-2xl font-bold text-amber-600">
                  {studentMarks.filter((s) => !marks[s.studentId]).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Marks Entry Table */}
        <div className="card">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Marks Entry</h2>
            <div className="flex items-center gap-2">
              <button className="btn btn-outline text-sm flex items-center gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </button>
              <button
                onClick={handleBulkSave}
                className="btn btn-primary text-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save All
              </button>
            </div>
          </div>
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
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Max Marks
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Marks Obtained
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Percentage
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Grade
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((student) => {
                  const currentMarks =
                    marks[student.studentId] ?? student.marks;
                  const percentage = Math.round((currentMarks / 100) * 100);
                  const grade = getGrade(percentage);
                  const isSaved = savedStatus[student.studentId];

                  return (
                    <tr key={student.studentId} className="hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-900">
                        {student.rollNumber}
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">
                          {student.name}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm text-gray-600">100</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isEditing === student.studentId ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={currentMarks}
                            onChange={(e) =>
                              setMarks((prev) => ({
                                ...prev,
                                [student.studentId]:
                                  parseInt(e.target.value) || 0,
                              }))
                            }
                            className="form-input w-20 text-center"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium text-gray-900">
                            {currentMarks}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm text-gray-600">
                          {percentage}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span
                          className={cn(
                            "px-2 py-1 rounded text-sm font-medium",
                            getGradeColor(percentage),
                          )}
                        >
                          {grade}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {isSaved ? (
                          <span className="flex items-center justify-center gap-1 text-green-600 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Saved
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Pending</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {isEditing === student.studentId ? (
                            <>
                              <button
                                onClick={() => handleSave(student.studentId)}
                                className="p-1 hover:bg-green-100 rounded text-green-600"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setIsEditing(null)}
                                className="p-1 hover:bg-gray-100 rounded text-gray-500"
                              >
                                <AlertCircle className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setIsEditing(student.studentId)}
                                className="p-1 hover:bg-blue-100 rounded text-blue-600"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
                                <Eye className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-blue-900">
                📊 Quick Analysis - Unit Test Mathematics
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Top Scorer: Priya Patel (92%) • Lowest: Vikram Singh (72%) •
                Class Average: 83%
              </p>
            </div>
            <button className="btn btn-outline text-sm">Generate Report</button>
          </div>
        </div>
      </main>
    </div>
  );
}
