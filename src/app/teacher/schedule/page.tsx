"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import { Calendar, Clock, BookOpen, Users, MapPin } from "lucide-react";

export default function TeacherSchedulePage() {
  const [role, setRole] = useState<Role>("teacher");
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
      class: "Class 3-A",
      subject: "Mathematics",
      room: "Room 101",
    },
    {
      time: "10:00 AM",
      class: "Class 4-B",
      subject: "English",
      room: "Room 102",
    },
    {
      time: "11:30 AM",
      class: "Class 3-A",
      subject: "Mathematics",
      room: "Room 101",
    },
    {
      time: "2:00 PM",
      class: "Class 5-A",
      subject: "English",
      room: "Room 103",
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
              <div
                key={index}
                className="p-4 flex items-center gap-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-2 text-gray-500 w-24">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{period.time}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{period.class}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {period.subject}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {period.room}
                    </span>
                  </div>
                </div>
                <button className="btn btn-outline text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Periods</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Classes Today</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Free Periods</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
