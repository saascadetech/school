"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import {
  Role,
  students,
  staff,
  examinations,
  examResults,
  feePayments,
  feeStructure,
} from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Users,
  GraduationCap,
  DollarSign,
  BookOpen,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  const [role, setRole] = useState<Role>("principal");
  const [activeTab, setActiveTab] = useState<
    "overview" | "attendance" | "finance" | "academic"
  >("overview");
  const [dateRange, setDateRange] = useState("this_year");

  // Calculate statistics
  const totalStudents = students.length;
  const totalStaff = staff.length;
  const activeStudents = students.filter((s) => s.status === "active").length;

  const averageAttendance = 94;
  const feeCollectionRate = 78;

  const totalRevenue = feePayments.reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = 2500000; // Example value

  // Student distribution by class
  const studentsByClass = [
    { name: "Class 1", count: 85 },
    { name: "Class 2", count: 92 },
    { name: "Class 3", count: 78 },
    { name: "Class 4", count: 95 },
    { name: "Class 5", count: 88 },
    { name: "Class 6", count: 102 },
    { name: "Class 7", count: 95 },
    { name: "Class 8", count: 90 },
  ];

  // Attendance data by month
  const attendanceData = [
    { month: "Jul", rate: 92 },
    { month: "Aug", rate: 95 },
    { month: "Sep", rate: 88 },
    { month: "Oct", rate: 91 },
    { month: "Nov", rate: 94 },
    { month: "Dec", rate: 96 },
  ];

  // Fee collection by month
  const feeCollectionData = [
    { month: "Jan", collected: 450000, expected: 500000 },
    { month: "Feb", collected: 420000, expected: 500000 },
    { month: "Mar", collected: 480000, expected: 500000 },
    { month: "Apr", collected: 390000, expected: 500000 },
    { month: "May", collected: 350000, expected: 500000 },
    { month: "Jun", collected: 410000, expected: 500000 },
  ];

  // Exam performance by subject
  const subjectPerformance = [
    { subject: "Mathematics", average: 72, passRate: 85 },
    { subject: "Science", average: 78, passRate: 92 },
    { subject: "English", average: 75, passRate: 88 },
    { subject: "Social Science", average: 68, passRate: 78 },
    { subject: "Hindi", average: 82, passRate: 95 },
  ];

  // Staff distribution
  const staffDistribution = [
    { name: "Teaching", value: 25, color: "#3B82F6" },
    { name: "Non-Teaching", value: 12, color: "#10B981" },
    { name: "Support", value: 8, color: "#F59E0B" },
  ];

  // Monthly revenue vs expenses
  const revenueVsExpenses = [
    { month: "Jan", revenue: 450000, expenses: 380000 },
    { month: "Feb", revenue: 420000, expenses: 350000 },
    { month: "Mar", revenue: 480000, expenses: 420000 },
    { month: "Apr", revenue: 390000, expenses: 360000 },
    { month: "May", revenue: 350000, expenses: 320000 },
    { month: "Jun", revenue: 410000, expenses: 370000 },
  ];

  const reportTypes = [
    {
      id: "student_list",
      label: "Student List Report",
      description: "Complete list of all students with details",
    },
    {
      id: "attendance_report",
      label: "Attendance Report",
      description: "Monthly attendance summary by class",
    },
    {
      id: "fee_collection",
      label: "Fee Collection Report",
      description: "Fee collection status and pending amounts",
    },
    {
      id: "exam_results",
      label: "Examination Results",
      description: "Student performance in all exams",
    },
    {
      id: "staff_list",
      label: "Staff Directory",
      description: "Complete staff information",
    },
    {
      id: "financial_report",
      label: "Financial Summary",
      description: "Revenue and expenses report",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Reports & Analytics
            </h1>
            <p className="text-gray-500 mt-1">
              Comprehensive school performance insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="form-select text-sm"
            >
              <option value="this_month">This Month</option>
              <option value="this_quarter">This Quarter</option>
              <option value="this_year">This Year</option>
              <option value="all_time">All Time</option>
            </select>
            <button className="btn btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Overview", icon: BarChart },
            { id: "attendance", label: "Attendance", icon: Clock },
            { id: "finance", label: "Finance", icon: DollarSign },
            { id: "academic", label: "Academic", icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalStudents}
                    </p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +8% vs last year
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Staff</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalStaff}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      45 teaching, 12 support
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg Attendance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {averageAttendance}%
                    </p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +2.5% vs last month
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Fee Collection</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {feeCollectionRate}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ₹{(totalRevenue / 100000).toFixed(1)}L collected
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Students by Class */}
              <div className="card">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">
                    Students by Class
                  </h2>
                </div>
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={studentsByClass}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Attendance Trend */}
              <div className="card">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">
                    Attendance Trend
                  </h2>
                </div>
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{ fill: "#10B981" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Revenue vs Expenses */}
            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">
                  Revenue vs Expenses
                </h2>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueVsExpenses}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `₹${value / 1000}K`}
                    />
                    <Tooltip
                      formatter={(value: number | undefined) =>
                        value ? `₹${value.toLocaleString()}` : "₹0"
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="expenses"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="Expenses"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="card p-4">
                <p className="text-sm text-gray-500">Overall Attendance</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">94%</p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Perfect Attendance</p>
                <p className="text-3xl font-bold text-green-600 mt-1">125</p>
                <p className="text-xs text-gray-500 mt-1">students with 100%</p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Low Attendance</p>
                <p className="text-3xl font-bold text-red-600 mt-1">18</p>
                <p className="text-xs text-gray-500 mt-1">
                  below 75% threshold
                </p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Average Late Arrivals</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">23</p>
                <p className="text-xs text-gray-500 mt-1">per day</p>
              </div>
            </div>

            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">
                  Monthly Attendance by Class
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                        Class
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                        Jul
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                        Aug
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                        Sep
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                        Oct
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                        Nov
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                        Dec
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                        Avg
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: "Class 1", data: [95, 96, 92, 94, 95, 97] },
                      { name: "Class 2", data: [92, 94, 90, 93, 94, 95] },
                      { name: "Class 3", data: [88, 91, 85, 89, 90, 92] },
                      { name: "Class 4", data: [94, 95, 91, 93, 94, 96] },
                      { name: "Class 5", data: [90, 92, 88, 91, 92, 93] },
                      { name: "Class 6", data: [93, 94, 90, 92, 93, 95] },
                      { name: "Class 7", data: [89, 91, 86, 88, 90, 92] },
                      { name: "Class 8", data: [91, 93, 89, 91, 92, 94] },
                    ].map((row) => {
                      const avg =
                        row.data.reduce((a, b) => a + b, 0) / row.data.length;
                      return (
                        <tr key={row.name} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {row.name}
                          </td>
                          {row.data.map((value, idx) => (
                            <td key={idx} className="py-3 px-4 text-center">
                              <span
                                className={cn(
                                  "px-2 py-1 rounded text-sm font-medium",
                                  value >= 95
                                    ? "bg-green-100 text-green-700"
                                    : value >= 90
                                      ? "bg-blue-100 text-blue-700"
                                      : value >= 85
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-red-100 text-red-700",
                                )}
                              >
                                {value}%
                              </span>
                            </td>
                          ))}
                          <td className="py-3 px-4 text-center">
                            <span className="font-medium text-gray-900">
                              {avg.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Finance Tab */}
        {activeTab === "finance" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="card p-4">
                <p className="text-sm text-gray-500">Total Revenue (YTD)</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  ₹{(totalRevenue / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Total Expenses (YTD)</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  ₹{(totalExpenses / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Net Surplus</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  ₹{((totalRevenue - totalExpenses) / 100000).toFixed(1)}L
                </p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Pending Fees</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">
                  ₹{(1200000 / 100000).toFixed(1)}L
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">
                    Fee Collection vs Expected
                  </h2>
                </div>
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={feeCollectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `₹${value / 1000}K`}
                      />
                      <Tooltip
                        formatter={(value: number | undefined) =>
                          value ? `₹${value.toLocaleString()}` : "₹0"
                        }
                      />
                      <Bar
                        dataKey="collected"
                        fill="#10B981"
                        name="Collected"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="expected"
                        fill="#E5E7EB"
                        name="Expected"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">
                    Staff Distribution
                  </h2>
                </div>
                <div className="p-4 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={staffDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {staffDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-center gap-6">
                  {staffDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Academic Tab */}
        {activeTab === "academic" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="card p-4">
                <p className="text-sm text-gray-500">Total Exams</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {examinations.length}
                </p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Results Published</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {examResults.filter((r) => r.status === "published").length}
                </p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Overall Average</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">75%</p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Pass Rate</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">88%</p>
              </div>
            </div>

            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">
                  Subject Performance Analysis
                </h2>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="subject"
                      type="category"
                      tick={{ fontSize: 12 }}
                      width={120}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="average"
                      fill="#3B82F6"
                      name="Average Score"
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar
                      dataKey="passRate"
                      fill="#10B981"
                      name="Pass Rate"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Report Generation Section */}
        <div className="mt-8">
          <h2 className="font-semibold text-gray-900 mb-4">Generate Reports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className="card p-4 hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {report.label}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {report.description}
                    </p>
                  </div>
                  <button className="btn btn-outline text-xs py-1 px-2">
                    Generate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
