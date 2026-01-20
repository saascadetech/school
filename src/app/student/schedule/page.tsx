"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import { Calendar, Clock, BookOpen, MapPin } from "lucide-react";

export default function StudentSchedulePage() {
  const [role, setRole] = useState<Role>("student");
  const [selectedDay, setSelectedDay] = useState("Monday");

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const schedule = [
    {
      time: "8:30 AM",
      subject: "Mathematics",
      room: "Room 101",
      teacher: "Mrs. Smith",
    },
    {
      time: "10:00 AM",
      subject: "English",
      room: "Room 102",
      teacher: "Mr. Johnson",
    },
    {
      time: "11:30 AM",
      subject: "Science",
      room: "Lab 2",
      teacher: "Dr. Patel",
    },
    {
      time: "2:00 PM",
      subject: "Social Studies",
      room: "Room 103",
      teacher: "Ms. Reddy",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
          <p className="text-gray-500 mt-1">View your weekly class schedule</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {weekDays.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedDay === day
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="card">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">
              {selectedDay}'s Classes
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {schedule.map((period, index) => (
              <div key={index} className="p-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 w-24">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{period.time}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{period.subject}</p>
                  <p className="text-sm text-gray-500">{period.teacher}</p>
                </div>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {period.room}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="card p-4">
            <p className="text-sm text-gray-500">Total Periods</p>
            <p className="text-2xl font-bold text-gray-900">24</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Classes Today</p>
            <p className="text-2xl font-bold text-blue-600">4</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Subjects</p>
            <p className="text-2xl font-bold text-purple-600">6</p>
          </div>
        </div>
      </main>
    </div>
  );
}
