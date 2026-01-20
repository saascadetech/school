"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import { FileText, Clock, MapPin } from "lucide-react";

export default function StudentExamsPage() {
  const [role, setRole] = useState<Role>("student");

  const upcomingExams = [
    {
      name: "Unit Test 3 - Mathematics",
      date: "Jan 25, 2026",
      time: "10:00 AM",
      room: "Room 101",
      maxMarks: 100,
    },
    {
      name: "Unit Test 3 - Science",
      date: "Jan 27, 2026",
      time: "2:00 PM",
      room: "Lab 2",
      maxMarks: 100,
    },
    {
      name: "Unit Test 3 - English",
      date: "Jan 29, 2026",
      time: "11:00 AM",
      room: "Room 102",
      maxMarks: 100,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Examinations</h1>
          <p className="text-gray-500 mt-1">
            View upcoming exams and schedules
          </p>
        </div>

        <div className="card mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Upcoming Exams</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{exam.name}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {exam.date} at {exam.time}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exam.room}
                      </span>
                      <span className="text-sm text-gray-500">
                        Max Marks: {exam.maxMarks}
                      </span>
                    </div>
                  </div>
                  <button className="btn btn-outline text-sm">
                    View Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="card p-4">
            <p className="text-sm text-gray-500">Upcoming Exams</p>
            <p className="text-2xl font-bold text-blue-600">
              {upcomingExams.length}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Exams Completed</p>
            <p className="text-2xl font-bold text-green-600">3</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Preparation Days</p>
            <p className="text-2xl font-bold text-amber-600">4</p>
          </div>
        </div>
      </main>
    </div>
  );
}
