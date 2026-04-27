"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  BarChart3,
  Calendar,
  Eye,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ClassData {
  id: string;
  name: string;
}

interface AcademicReport {
  exams: { id: string; name: string; class?: { name: string } }[];
  subjectAnalysis: {
    subject: string;
    totalStudents: number;
    avgMarks: number;
    maxMarks: number;
    minMarks: number;
    passCount: number;
    failCount: number;
    passRate: number;
  }[];
  topPerformers: {
    id: string;
    name: string;
    class: string;
    marks: number;
    maxMarks: number;
    percentage: number;
  }[];
  gradeDistribution: { A: number; B: number; C: number; D: number; F: number };
  summary: { totalMarks: number; overallAvg: number };
}

interface AttendanceReport {
  classId: string;
  className: string;
  totalStudents: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  halfDayDays: number;
  attendancePercentage: number;
}

interface FeesReport {
  summary: {
    academicYear: string;
    totalExpected: number;
    totalCollected: number;
    totalPending: number;
    collectionRate: number;
  };
  classWise: {
    className: string;
    expected: number;
    collected: number;
    pending: number;
    studentsPaid: number;
    studentsTotal: number;
  }[];
  defaulters: {
    id: string;
    name: string;
    class: string;
    expected: number;
    paid: number;
    pending: number;
  }[];
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("academic");
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [selectedClass, setSelectedClass] = useState("");

  // Academic report data
  const [academicReport, setAcademicReport] = useState<AcademicReport | null>(
    null,
  );
  const [selectedExam, setSelectedExam] = useState("");

  // Attendance report data
  const [attendanceReports, setAttendanceReports] = useState<
    AttendanceReport[]
  >([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fees report data
  const [feesReport, setFeesReport] = useState<FeesReport | null>(null);

  useEffect(() => {
    fetchClasses();
    fetchAcademicReport();
  }, []);

  useEffect(() => {
    if (activeTab === "attendance") {
      fetchAttendanceReport();
    } else if (activeTab === "fees") {
      fetchFeesReport();
    }
  }, [activeTab]);

  async function fetchClasses() {
    try {
      const res = await fetch(`${API_URL}/api/classes`);
      if (res.ok) {
        const data = await res.json();
        setClasses(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch classes:", err);
    }
  }

  async function fetchAcademicReport() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedExam) params.set("examId", selectedExam);
      if (selectedClass) params.set("classId", selectedClass);

      const res = await fetch(`${API_URL}/api/reports/academic?${params}`);
      if (res.ok) {
        const data = await res.json();
        setAcademicReport(data);
      }
    } catch (err) {
      console.error("Failed to fetch academic report:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAttendanceReport() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedClass) params.set("classId", selectedClass);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      const res = await fetch(`${API_URL}/api/reports/attendance?${params}`);
      if (res.ok) {
        const data = await res.json();
        setAttendanceReports(data.reports || []);
      }
    } catch (err) {
      console.error("Failed to fetch attendance report:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchFeesReport() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/reports/fees`);
      if (res.ok) {
        const data = await res.json();
        setFeesReport(data);
      }
    } catch (err) {
      console.error("Failed to fetch fees report:", err);
    } finally {
      setLoading(false);
    }
  }

  async function exportData(type: string) {
    try {
      const res = await fetch(
        `${API_URL}/api/reports/export?type=${type}&format=csv`,
      );
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${type}_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error("Failed to export data:", err);
      alert("Failed to export data");
    }
  }

  const tabs = [
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "fees", label: "Fees", icon: DollarSign },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Reports</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportData("students")}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Students
            </button>
            <button
              onClick={() => exportData("staff")}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Staff
            </button>
            <button
              onClick={() => exportData("fees")}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Fees
            </button>
          </div>
        </header>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Sidebar Tabs */}
          <div className="w-56 bg-white border-r border-gray-200 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-6xl">
              {activeTab === "academic" && (
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                    <select
                      value={selectedExam}
                      onChange={(e) => setSelectedExam(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      <option value="">All Exams</option>
                      {academicReport?.exams.map((exam) => (
                        <option key={exam.id} value={exam.id}>
                          {exam.name}{" "}
                          {exam.class?.name ? `(${exam.class.name})` : ""}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      <option value="">All Classes</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={fetchAcademicReport}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                    >
                      Apply
                    </button>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : academicReport ? (
                    <>
                      {/* Summary Cards */}
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                Overall Average
                              </p>
                              <p className="text-2xl font-bold text-gray-800">
                                {academicReport.summary.overallAvg}%
                              </p>
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-xl">
                              <TrendingUp className="w-6 h-6 text-indigo-600" />
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                Total Marks Entry
                              </p>
                              <p className="text-2xl font-bold text-gray-800">
                                {academicReport.summary.totalMarks}
                              </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-xl">
                              <BarChart3 className="w-6 h-6 text-green-600" />
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                Exams Analyzed
                              </p>
                              <p className="text-2xl font-bold text-gray-800">
                                {academicReport.exams.length}
                              </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-xl">
                              <FileText className="w-6 h-6 text-orange-600" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Grade Distribution */}
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Grade Distribution
                        </h3>
                        <div className="grid grid-cols-5 gap-4">
                          {Object.entries(academicReport.gradeDistribution).map(
                            ([grade, count]) => (
                              <div key={grade} className="text-center">
                                <div
                                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-xl font-bold ${
                                    grade === "A"
                                      ? "bg-green-100 text-green-700"
                                      : grade === "B"
                                        ? "bg-blue-100 text-blue-700"
                                        : grade === "C"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : grade === "D"
                                            ? "bg-orange-100 text-orange-700"
                                            : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {grade}
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                  {count} students
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Subject Analysis */}
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Subject-wise Analysis
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Subject
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                  Students
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                  Avg Marks
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                  Pass Rate
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                  Min/Max
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {academicReport.subjectAnalysis.map(
                                (subject, idx) => (
                                  <tr key={idx}>
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                      {subject.subject}
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-600">
                                      {subject.totalStudents}
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-600">
                                      {subject.avgMarks}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          subject.passRate >= 75
                                            ? "bg-green-100 text-green-700"
                                            : subject.passRate >= 50
                                              ? "bg-yellow-100 text-yellow-700"
                                              : "bg-red-100 text-red-700"
                                        }`}
                                      >
                                        {subject.passRate}%
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-gray-600">
                                      {subject.minMarks}/{subject.maxMarks}
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Top Performers */}
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Top Performers
                        </h3>
                        <div className="space-y-3">
                          {academicReport.topPerformers.map((student, idx) => (
                            <div
                              key={student.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-bold text-indigo-600">
                                  {idx + 1}
                                </span>
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {student.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {student.class}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-indigo-600">
                                  {student.percentage}%
                                </p>
                                <p className="text-xs text-gray-500">
                                  {student.marks}/{student.maxMarks}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              )}

              {activeTab === "attendance" && (
                <div className="space-y-6">
                  {/* Filters */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 flex-wrap">
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    >
                      <option value="">All Classes</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="Start Date"
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      placeholder="End Date"
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <button
                      onClick={fetchAttendanceReport}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                    >
                      Apply
                    </button>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Class
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              Students
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              Present
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              Absent
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              Late
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              Attendance %
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {attendanceReports.map((report) => (
                            <tr
                              key={report.classId}
                              className="hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 font-medium text-gray-800">
                                {report.className}
                              </td>
                              <td className="px-4 py-3 text-center text-gray-600">
                                {report.totalStudents}
                              </td>
                              <td className="px-4 py-3 text-center text-green-600 font-medium">
                                {report.presentDays}
                              </td>
                              <td className="px-4 py-3 text-center text-red-600 font-medium">
                                {report.absentDays}
                              </td>
                              <td className="px-4 py-3 text-center text-yellow-600 font-medium">
                                {report.lateDays}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    report.attendancePercentage >= 75
                                      ? "bg-green-100 text-green-700"
                                      : report.attendancePercentage >= 50
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {report.attendancePercentage}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "fees" && (
                <div className="space-y-6">
                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : feesReport ? (
                    <>
                      {/* Summary Cards */}
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                          <p className="text-sm text-gray-500">
                            Total Expected
                          </p>
                          <p className="text-2xl font-bold text-gray-800">
                            ₹{feesReport.summary.totalExpected.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                          <p className="text-sm text-gray-500">Collected</p>
                          <p className="text-2xl font-bold text-green-600">
                            ₹
                            {feesReport.summary.totalCollected.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                          <p className="text-sm text-gray-500">Pending</p>
                          <p className="text-2xl font-bold text-red-600">
                            ₹{feesReport.summary.totalPending.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                          <p className="text-sm text-gray-500">
                            Collection Rate
                          </p>
                          <p className="text-2xl font-bold text-indigo-600">
                            {feesReport.summary.collectionRate}%
                          </p>
                        </div>
                      </div>

                      {/* Class-wise Collection */}
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Class-wise Fee Collection
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                  Class
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                  Expected
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                  Collected
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                  Pending
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                  Collection %
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {feesReport.classWise.map((cls, idx) => (
                                <tr key={idx}>
                                  <td className="px-4 py-3 font-medium text-gray-800">
                                    {cls.className}
                                  </td>
                                  <td className="px-4 py-3 text-right text-gray-600">
                                    ₹{cls.expected.toLocaleString()}
                                  </td>
                                  <td className="px-4 py-3 text-right text-green-600 font-medium">
                                    ₹{cls.collected.toLocaleString()}
                                  </td>
                                  <td className="px-4 py-3 text-right text-red-600 font-medium">
                                    ₹{cls.pending.toLocaleString()}
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        cls.expected > 0
                                          ? Math.round(
                                              (cls.collected / cls.expected) *
                                                100,
                                            ) >= 75
                                            ? "bg-green-100 text-green-700"
                                            : Math.round(
                                                  (cls.collected /
                                                    cls.expected) *
                                                    100,
                                                ) >= 50
                                              ? "bg-yellow-100 text-yellow-700"
                                              : "bg-red-100 text-red-700"
                                          : "bg-gray-100 text-gray-500"
                                      }`}
                                    >
                                      {cls.expected > 0
                                        ? Math.round(
                                            (cls.collected / cls.expected) *
                                              100,
                                          )
                                        : 0}
                                      %
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Defaulters */}
                      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          Fee Defaulters
                        </h3>
                        {feesReport.defaulters.length === 0 ? (
                          <p className="text-center py-8 text-gray-500">
                            No fee defaulters found
                          </p>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Student
                                  </th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Class
                                  </th>
                                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Expected
                                  </th>
                                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Paid
                                  </th>
                                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Pending
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {feesReport.defaulters.map((defaulter) => (
                                  <tr key={defaulter.id}>
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                      {defaulter.name}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                      {defaulter.class}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-600">
                                      ₹{defaulter.expected.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-green-600 font-medium">
                                      ₹{defaulter.paid.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right text-red-600 font-medium">
                                      ₹{defaulter.pending.toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
