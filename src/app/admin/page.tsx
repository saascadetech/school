"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import {
  Role,
  students,
  classes,
  staff,
  feePayments,
  feeStructure,
} from "@/lib/data";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  Bus,
  GraduationCap,
  ClipboardList,
  FileText,
  Activity,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PrincipalDashboard() {
  const [role, setRole] = useState<Role>("principal");

  // Dashboard Statistics
  const totalStudents = students.length;
  const totalStaff = staff.length;
  const activeStudents = students.filter((s) => s.status === "active").length;
  const attendanceRate = 94;
  const feeCollectionRate = 78;
  const totalRevenue = feePayments.reduce((sum, p) => sum + p.amount, 0);
  const totalFeeExpected = totalStudents * feeStructure.totalFee;

  // Staff Statistics
  const teachingStaff = staff.filter((s) => s.role === "teaching").length;
  const nonTeachingStaff = staff.filter(
    (s) => s.role === "non_teaching" || s.role === "support",
  ).length;
  const staffOnLeave = staff.filter((s) => s.status === "on_leave").length;

  // Alerts
  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "5 students have attendance below 75%",
      icon: AlertCircle,
    },
    {
      id: 2,
      type: "info",
      message: "Fee deadline approaching in 10 days",
      icon: Clock,
    },
    {
      id: 3,
      type: "success",
      message: "Annual sports day preparation complete",
      icon: CheckCircle,
    },
    {
      id: 4,
      type: "error",
      message: "2 staff leave requests pending approval",
      icon: AlertCircle,
    },
  ];

  // Recent Activities
  const recentActivities = [
    {
      id: 1,
      action: "New admission",
      description: "Rahul Sharma joined Class 3-A",
      time: "2 hours ago",
      icon: GraduationCap,
    },
    {
      id: 2,
      action: "Fee Payment",
      description: "25 fee payments received today",
      time: "4 hours ago",
      icon: DollarSign,
    },
    {
      id: 3,
      action: "Staff Leave",
      description: "Mrs. Smith applied for 3 days leave",
      time: "5 hours ago",
      icon: Users,
    },
    {
      id: 4,
      action: "Exam Result",
      description: "Half-yearly results declared for Class 4",
      time: "1 day ago",
      icon: ClipboardList,
    },
  ];

  // Monthly Trends
  const monthlyData = [
    { month: "Jul", students: 450, revenue: 450000 },
    { month: "Aug", students: 465, revenue: 480000 },
    { month: "Sep", students: 470, revenue: 520000 },
    { month: "Oct", students: 475, revenue: 510000 },
    { month: "Nov", students: 480, revenue: 550000 },
    { month: "Dec", students: 485, revenue: 580000 },
  ];

  // Fee Collection by Class
  const feeCollectionByClass = [
    { class: "Class 1", collected: 95, total: 100 },
    { class: "Class 2", collected: 88, total: 100 },
    { class: "Class 3", collected: 92, total: 100 },
    { class: "Class 4", collected: 85, total: 100 },
    { class: "Class 5", collected: 78, total: 100 },
  ];

  // Staff Performance Summary
  const staffPerformance = [
    { category: "Excellent", count: 8, percentage: 35 },
    { category: "Good", count: 10, percentage: 43 },
    { category: "Average", count: 4, percentage: 17 },
    { category: "Needs Improvement", count: 1, percentage: 5 },
  ];

  // Upcoming Events
  const upcomingEvents = [
    {
      id: 1,
      title: "Parent-Teacher Meeting",
      date: "2026-01-25",
      type: "meeting",
      priority: "high",
    },
    {
      id: 2,
      title: "Annual Sports Day",
      date: "2026-02-01",
      type: "event",
      priority: "high",
    },
    {
      id: 3,
      title: "Unit Test - Class 3",
      date: "2026-01-28",
      type: "exam",
      priority: "medium",
    },
    {
      id: 4,
      title: "Staff Training Program",
      date: "2026-02-05",
      type: "training",
      priority: "low",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 overflow-x-hidden max-w-full">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Principal Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's your school overview for today.
          </p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalStudents}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" /> +12 this month
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
                <p className="text-sm text-gray-500">Teaching Staff</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teachingStaff}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {nonTeachingStaff} non-teaching
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
                <p className="text-sm text-gray-500">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {attendanceRate}%
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" /> +2.5% vs last week
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Alerts Section */}
          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Alerts & Notifications
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 flex items-start gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      alert.type === "warning"
                        ? "bg-amber-100 text-amber-600"
                        : alert.type === "error"
                          ? "bg-red-100 text-red-600"
                          : alert.type === "success"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600",
                    )}
                  >
                    <alert.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Collection Progress */}
          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">
                Fee Collection by Class
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {feeCollectionByClass.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.class}</span>
                    <span className="font-medium">{item.collected}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        item.collected >= 90
                          ? "bg-green-500"
                          : item.collected >= 80
                            ? "bg-amber-500"
                            : "bg-red-500",
                      )}
                      style={{ width: `${item.collected}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Performance */}
          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">
                Staff Performance Summary
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {staffPerformance.map((perf) => (
                  <div key={perf.category} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{perf.category}</span>
                        <span className="text-gray-500">{perf.count}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${perf.percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">
                      {perf.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activities */}
          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Upcoming Events
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                        event.priority === "high"
                          ? "bg-red-50"
                          : event.priority === "medium"
                            ? "bg-amber-50"
                            : "bg-blue-50",
                      )}
                    >
                      <Calendar
                        className={cn(
                          "w-5 h-5",
                          event.priority === "high"
                            ? "text-red-600"
                            : event.priority === "medium"
                              ? "text-amber-600"
                              : "text-blue-600",
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(event.date).toLocaleDateString("en-IN", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        event.type === "meeting"
                          ? "bg-purple-100 text-purple-700"
                          : event.type === "exam"
                            ? "bg-red-100 text-red-700"
                            : event.type === "event"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700",
                      )}
                    >
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <button className="card p-4 flex flex-col items-center gap-2 hover:border-blue-300 transition-colors cursor-pointer">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Add Staff
              </span>
            </button>
            <button className="card p-4 flex flex-col items-center gap-2 hover:border-emerald-300 transition-colors cursor-pointer">
              <GraduationCap className="w-6 h-6 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                New Admission
              </span>
            </button>
            <button className="card p-4 flex flex-col items-center gap-2 hover:border-purple-300 transition-colors cursor-pointer">
              <DollarSign className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Fee Settings
              </span>
            </button>
            <button className="card p-4 flex flex-col items-center gap-2 hover:border-amber-300 transition-colors cursor-pointer">
              <ClipboardList className="w-6 h-6 text-amber-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Schedule Exam
              </span>
            </button>
            <button className="card p-4 flex flex-col items-center gap-2 hover:border-red-300 transition-colors cursor-pointer">
              <FileText className="w-6 h-6 text-red-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Send Notice
              </span>
            </button>
            <button className="card p-4 flex flex-col items-center gap-2 hover:border-green-300 transition-colors cursor-pointer">
              <Activity className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Generate Report
              </span>
            </button>
          </div>
        </div>

        {/* Yearly Trends */}
        <div className="card">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              Student Enrollment & Revenue Trend
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Month
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                      Students
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                      Growth
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                      Revenue (₹)
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((data, idx) => (
                    <tr key={data.month} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        {data.month} 2025
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-center">
                        {data.students}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {idx > 0 ? (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 text-sm",
                              data.students > monthlyData[idx - 1].students
                                ? "text-green-600"
                                : "text-red-600",
                            )}
                          >
                            {data.students > monthlyData[idx - 1].students ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            )}
                            {Math.abs(
                              data.students - monthlyData[idx - 1].students,
                            )}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 text-right font-medium">
                        ₹{(data.revenue / 100000).toFixed(1)}L
                      </td>
                      <td className="py-3 px-4 text-center">
                        {idx > 0 ? (
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 text-sm",
                              data.revenue > monthlyData[idx - 1].revenue
                                ? "text-green-600"
                                : "text-red-600",
                            )}
                          >
                            {data.revenue > monthlyData[idx - 1].revenue ? (
                              <ArrowUp className="w-3 h-3" />
                            ) : (
                              <ArrowDown className="w-3 h-3" />
                            )}
                            {Math.round(
                              ((data.revenue - monthlyData[idx - 1].revenue) /
                                monthlyData[idx - 1].revenue) *
                                100,
                            )}
                            %
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="admin" />
    </div>
  );
}
