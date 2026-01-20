"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import { Calendar, Clock, Star } from "lucide-react";

export default function StudentCalendarPage() {
  const [role, setRole] = useState<Role>("student");

  const events = [
    { title: "Republic Day", date: "Jan 26, 2026", type: "holiday" },
    { title: "PTM", date: "Jan 25, 2026", type: "meeting" },
    { title: "Unit Test 3 - Math", date: "Jan 25, 2026", type: "exam" },
    { title: "Unit Test 3 - Science", date: "Jan 27, 2026", type: "exam" },
    { title: "Annual Day", date: "Feb 10, 2026", type: "event" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Academic Calendar
          </h1>
          <p className="text-gray-500 mt-1">
            View holidays, events, and important dates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card p-4">
              <h2 className="font-semibold text-gray-900 mb-4">January 2026</h2>
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="py-2 text-sm font-medium text-gray-500"
                    >
                      {day}
                    </div>
                  ),
                )}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i + 1;
                  const isCurrentMonth = day <= 31;
                  const isHoliday = day === 26;
                  const isEvent = day === 25;
                  return (
                    <div
                      key={i}
                      className={`py-3 text-sm rounded-lg ${
                        isHoliday
                          ? "bg-red-100 text-red-700 font-bold"
                          : isEvent
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : isCurrentMonth
                              ? "bg-gray-50 text-gray-900"
                              : "text-gray-300"
                      }`}
                    >
                      {isCurrentMonth ? day : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Upcoming Events</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {events.map((event, index) => (
                <div key={index} className="p-4 flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      event.type === "holiday"
                        ? "bg-red-100"
                        : event.type === "exam"
                          ? "bg-blue-100"
                          : event.type === "meeting"
                            ? "bg-amber-100"
                            : "bg-purple-100"
                    }`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        event.type === "holiday"
                          ? "text-red-600"
                          : event.type === "exam"
                            ? "text-blue-600"
                            : event.type === "meeting"
                              ? "text-amber-600"
                              : "text-purple-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
