"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import {
  Role,
  students,
  classes,
  subjects,
  homework,
  examinations,
  examResults,
  getStudentFeeStatus,
} from "@/lib/data";
import {
  Users,
  BookOpen,
  ClipboardList,
  CheckCircle,
  Calendar,
  TrendingUp,
  MessageSquare,
  FileText,
  BarChart,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  Award,
  ChevronRight,
  Edit,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Generate schedule from admin timetable data
const todaySchedule = [
  {
    time: "8:30 AM",
    class: "Class 3-A",
    subject: "Mathematics",
    status: "completed",
    periodNumber: 1,
  },
  {
    time: "10:00 AM",
    class: "Class 4-B",
    subject: "English",
    status: "completed",
    periodNumber: 2,
  },
  {
    time: "11:30 AM",
    class: "Class 3-A",
    subject: "Mathematics",
    status: "upcoming",
    periodNumber: 3,
  },
  {
    time: "2:00 PM",
    class: "Class 5-A",
    subject: "English",
    status: "pending",
    periodNumber: 4,
  },
];

const pendingTasks = [
  {
    id: 1,
    task: "Grade Math Homework - Class 3-A",
    due: "Today",
    priority: "high",
    type: "grading",
  },
  {
    id: 2,
    task: "Enter Unit Test Marks - Class 4-B",
    due: "Tomorrow",
    priority: "high",
    type: "marks",
  },
  {
    id: 3,
    task: "Upload Chapter 5 Notes",
    due: "Jan 22",
    priority: "medium",
    type: "homework",
  },
  {
    id: 4,
    task: "Prepare Quiz - Fractions",
    due: "Jan 23",
    priority: "low",
    type: "exam",
  },
  {
    id: 5,
    task: "Parent Call - Aarav's Progress",
    due: "Today",
    priority: "medium",
    type: "communication",
  },
];

// Low attendance students (syncs with admin attendance reports)
const lowAttendanceStudents = students.filter(
  (s) => s.attendance.filter((a) => a.present).length < 3,
);

// Upcoming exams (syncs with admin examinations)
const upcomingExams = examinations.filter(
  (e) => e.status === "scheduled" && new Date(e.date) >= new Date(),
);

export default function TeacherDashboard() {
  const [role, setRole] = useState<Role>("teacher");
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "performance" | "communication"
  >("overview");

  const totalStudents = students.length;
  const classesToday = 4;
  const homeworkPending = 12;
  const pendingGrades = pendingTasks.filter((t) => t.type === "grading").length;
  const lowAttendanceCount = lowAttendanceStudents.length;

  // Calculate class average from admin exam results
  const getClassAverage = (classId: string) => {
    const results = examResults.filter((r) => r.status === "published");
    if (results.length === 0) return 0;
    return Math.round(
      results.reduce((sum, r) => sum + r.averageMarks, 0) / results.length,
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 overflow-x-hidden max-w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Teacher Dashboard
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Welcome back! Here's your teaching overview for today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 whitespace-nowrap">
              Mrs. Smith • Mathematics & English
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: "overview", label: "Overview", icon: BarChart },
            { id: "students", label: "My Students", icon: Users },
            { id: "performance", label: "Performance", icon: TrendingUp },
            {
              id: "communication",
              label: "Communication",
              icon: MessageSquare,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5 sm:gap-2 whitespace-nowrap text-sm",
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
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalStudents}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Classes Today</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {classesToday}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending Grades</p>
                    <p className="text-2xl font-bold text-amber-600">
                      {pendingGrades}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Edit className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Low Attendance</p>
                    <p className="text-2xl font-bold text-red-600">
                      {lowAttendanceCount}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Class Average</p>
                    <p className="text-2xl font-bold text-purple-600">80%</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Today's Schedule */}
              <div className="lg:col-span-2 card">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">
                    Today's Schedule
                  </h2>
                  <Link
                    href="/teacher/attendance"
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    Take Attendance <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {todaySchedule.map((slot, index) => (
                    <div
                      key={index}
                      className="p-4 flex items-center gap-4 hover:bg-gray-50"
                    >
                      <div className="text-sm font-medium text-gray-500 w-20">
                        {slot.time}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {slot.class}
                        </p>
                        <p className="text-sm text-gray-500">{slot.subject}</p>
                      </div>
                      <span
                        className={cn(
                          "px-2.5 py-0.5 text-xs rounded-full font-medium",
                          slot.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : slot.status === "upcoming"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600",
                        )}
                      >
                        {slot.status.charAt(0).toUpperCase() +
                          slot.status.slice(1)}
                      </span>
                      {slot.status === "completed" && (
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Tasks */}
              <div className="card">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Pending Tasks</h2>
                  <span className="text-xs text-gray-500">
                    {pendingTasks.length} tasks
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full mt-2",
                            task.priority === "high"
                              ? "bg-red-500"
                              : task.priority === "medium"
                                ? "bg-amber-500"
                                : "bg-green-500",
                          )}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {task.task}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500">
                              Due: {task.due}
                            </p>
                            <span
                              className={cn(
                                "text-xs px-1.5 py-0.5 rounded",
                                task.type === "grading"
                                  ? "bg-amber-100 text-amber-700"
                                  : task.type === "marks"
                                    ? "bg-purple-100 text-purple-700"
                                    : task.type === "communication"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-gray-100 text-gray-700",
                              )}
                            >
                              {task.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <Link
                    href="/teacher/tasks"
                    className="btn btn-outline w-full text-sm"
                  >
                    View All Tasks
                  </Link>
                </div>
              </div>
            </div>

            {/* Alerts & Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Low Attendance Alert */}
              {lowAttendanceStudents.length > 0 && (
                <div className="card border-l-4 border-l-red-500">
                  <div className="p-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Low Attendance Alert
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {lowAttendanceStudents.map((student) => {
                      const presentCount = student.attendance.filter(
                        (a) => a.present,
                      ).length;
                      const total = student.attendance.length;
                      const percentage = Math.round(
                        (presentCount / total) * 100,
                      );
                      return (
                        <div
                          key={student.id}
                          className="p-4 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {student.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {student.classId} • Roll: {student.rollNumber}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className={cn(
                                "font-bold",
                                percentage < 75
                                  ? "text-red-600"
                                  : "text-amber-600",
                              )}
                            >
                              {percentage}%
                            </p>
                            <button className="text-xs text-blue-600 hover:text-blue-700">
                              Contact Parent
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Upcoming Exams */}
              <div className="card">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Upcoming Examinations
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {upcomingExams.slice(0, 3).map((exam) => (
                    <div
                      key={exam.id}
                      className="p-4 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{exam.name}</p>
                        <p className="text-sm text-gray-500">
                          {exam.examType} • {exam.maxMarks} marks
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(exam.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {exam.startTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <Link
                    href="/teacher/exams"
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    View All Exams <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {/* My Students Tab */}
        {activeTab === "students" && (
          <div className="card">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">My Students</h2>
              <div className="flex items-center gap-2">
                <select className="form-select text-sm">
                  <option>All Classes</option>
                  <option>Class 3-A</option>
                  <option>Class 4-B</option>
                  <option>Class 5-A</option>
                </select>
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
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Class
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                      Attendance
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                      Avg Marks
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                      Homework
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((student) => {
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
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {student.rollNumber}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {student.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {student.parentName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {student.classId.replace("class-", "Class ")}-
                          {student.section}
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
                          <span className="text-sm text-gray-600">3/5</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Eye className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <MessageSquare className="w-4 h-4 text-blue-500" />
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
        )}

        {/* Performance Tab */}
        {activeTab === "performance" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="card p-4">
                <p className="text-sm text-gray-500">Class Average</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">80%</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +5% vs last exam
                </p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Pass Rate</p>
                <p className="text-3xl font-bold text-green-600 mt-1">95%</p>
                <p className="text-xs text-gray-500 mt-1">
                  5 students below passing
                </p>
              </div>
              <div className="card p-4">
                <p className="text-sm text-gray-500">Top Performer</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  Priya P.
                </p>
                <p className="text-xs text-gray-500 mt-1">95% average</p>
              </div>
            </div>

            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">
                  Student Performance Overview
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {students.map((student) => {
                    const performance = 65 + Math.random() * 30;
                    return (
                      <div key={student.id} className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium text-gray-700">
                          {student.name}
                        </div>
                        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              performance >= 80
                                ? "bg-green-500"
                                : performance >= 60
                                  ? "bg-blue-500"
                                  : performance >= 40
                                    ? "bg-amber-500"
                                    : "bg-red-500",
                            )}
                            style={{ width: `${performance}%` }}
                          />
                        </div>
                        <div className="w-12 text-sm font-medium text-gray-900 text-right">
                          {Math.round(performance)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Communication Tab */}
        {activeTab === "communication" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Message */}
            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">
                  Send Message to Parents
                </h2>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Class
                  </label>
                  <select className="form-select w-full">
                    <option>All Classes</option>
                    <option>Class 3-A</option>
                    <option>Class 4-B</option>
                    <option>Class 5-A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message Type
                  </label>
                  <select className="form-select w-full">
                    <option>General Announcement</option>
                    <option>Homework Reminder</option>
                    <option>Exam Notice</option>
                    <option>Attendance Alert</option>
                    <option>Fee Reminder</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    className="form-textarea w-full"
                    rows={4}
                    placeholder="Type your message here..."
                  />
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-primary flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Send SMS
                  </button>
                  <button className="btn btn-outline flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Communications */}
            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">
                  Recent Communications
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  {
                    type: "sms",
                    message: "Homework reminder for Class 3-A",
                    date: "Today, 10:30 AM",
                    recipients: "25 parents",
                  },
                  {
                    type: "email",
                    message: "PTM Schedule - January 2026",
                    date: "Yesterday",
                    recipients: "All parents",
                  },
                  {
                    type: "call",
                    message: "Call with Aarav's parents regarding attendance",
                    date: "Jan 18, 2026",
                    recipients: "1 parent",
                  },
                ].map((comm, idx) => (
                  <div key={idx} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "px-2 py-0.5 text-xs rounded font-medium",
                              comm.type === "sms"
                                ? "bg-green-100 text-green-700"
                                : comm.type === "email"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700",
                            )}
                          >
                            {comm.type.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comm.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 mt-1">
                          {comm.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          To: {comm.recipients}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <Link
              href="/teacher/attendance"
              className="card p-4 flex flex-col items-center gap-2 hover:border-blue-300 transition-colors cursor-pointer"
            >
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Take Attendance
              </span>
            </Link>
            <Link
              href="/teacher/homework"
              className="card p-4 flex flex-col items-center gap-2 hover:border-emerald-300 transition-colors cursor-pointer"
            >
              <ClipboardList className="w-6 h-6 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Assign Homework
              </span>
            </Link>
            <Link
              href="/teacher/marks"
              className="card p-4 flex flex-col items-center gap-2 hover:border-purple-300 transition-colors cursor-pointer"
            >
              <Edit className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Enter Marks
              </span>
            </Link>
            <Link
              href="/teacher/syllabus"
              className="card p-4 flex flex-col items-center gap-2 hover:border-amber-300 transition-colors cursor-pointer"
            >
              <BookOpen className="w-6 h-6 text-amber-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Syllabus Progress
              </span>
            </Link>
            <Link
              href="/teacher/activities"
              className="card p-4 flex flex-col items-center gap-2 hover:border-red-300 transition-colors cursor-pointer"
            >
              <Award className="w-6 h-6 text-red-600" />
              <span className="text-sm font-medium text-gray-700 text-center">
                Activities
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="teacher" />
    </div>
  );
}
