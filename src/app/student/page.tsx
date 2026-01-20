"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role, students } from "@/lib/data";
import {
  Users,
  BookOpen,
  ClipboardList,
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const upcomingClasses = [
  {
    time: "8:30 AM",
    subject: "Mathematics",
    room: "Room 101",
    status: "upcoming",
  },
  { time: "10:00 AM", subject: "Science", room: "Lab 2", status: "upcoming" },
  {
    time: "11:30 AM",
    subject: "English",
    room: "Room 105",
    status: "upcoming",
  },
  {
    time: "2:00 PM",
    subject: "Social Studies",
    room: "Room 103",
    status: "upcoming",
  },
];

const pendingHomework = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Chapter 5 - Exercise 3",
    due: "Today 5:00 PM",
  },
  {
    id: 2,
    subject: "Science",
    title: "Lab Report: Photosynthesis",
    due: "Tomorrow 9:00 AM",
  },
];

export default function StudentDashboard() {
  const [role, setRole] = useState<Role>("student");

  const attendanceRate = 94;
  const assignmentsPending = pendingHomework.length;

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, Student!
          </h1>
          <p className="text-gray-500 mt-1">
            Here's your schedule and assignments for today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {attendanceRate}%
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
                <p className="text-sm text-gray-500">Assignments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignmentsPending}
                </p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Classes Today</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Subjects</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Today's Classes</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="p-4 flex items-center gap-4">
                  <div className="text-sm font-medium text-gray-500 w-20">
                    {cls.time}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{cls.subject}</p>
                    <p className="text-sm text-gray-500">{cls.room}</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                    {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Homework */}
          <div className="card">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Pending Homework</h2>
              <Link
                href="/student/homework"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All →
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {pendingHomework.map((hw) => (
                <div key={hw.id} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600 uppercase">
                      {hw.subject}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {hw.title}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-amber-600">
                    <Clock className="w-3 h-3" />
                    Due: {hw.due}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              href="/student/attendance"
              className="card p-4 flex flex-col items-center gap-2 hover:border-blue-300 transition-colors cursor-pointer"
            >
              <CheckCircle className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Attendance
              </span>
            </Link>
            <Link
              href="/student/homework"
              className="card p-4 flex flex-col items-center gap-2 hover:border-emerald-300 transition-colors cursor-pointer"
            >
              <ClipboardList className="w-6 h-6 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">
                Homework
              </span>
            </Link>
            <Link
              href="/student/fees"
              className="card p-4 flex flex-col items-center gap-2 hover:border-purple-300 transition-colors cursor-pointer"
            >
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Fees</span>
            </Link>
            <Link
              href="/student/transport"
              className="card p-4 flex flex-col items-center gap-2 hover:border-amber-300 transition-colors cursor-pointer"
            >
              <Calendar className="w-6 h-6 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">
                Transport
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
