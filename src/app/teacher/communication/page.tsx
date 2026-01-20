"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import { MessageSquare, Mail, Phone, Send, Clock } from "lucide-react";

export default function TeacherCommunicationPage() {
  const [role, setRole] = useState<Role>("teacher");

  const recentMessages = [
    {
      type: "sms",
      message: "Homework reminder for Class 3-A",
      time: "Today, 10:30 AM",
      recipients: 25,
    },
    {
      type: "email",
      message: "PTM Schedule - January 2026",
      time: "Yesterday",
      recipients: 50,
    },
    {
      type: "call",
      message: "Call with Aarav's parents",
      time: "Jan 18, 2026",
      recipients: 1,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
          <p className="text-gray-500 mt-1">
            Send messages to parents and students
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Send Message</h2>
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
                  placeholder="Type your message..."
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

          <div className="card">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">
                Recent Communications
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {recentMessages.map((msg, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 text-xs rounded font-medium ${
                          msg.type === "sms"
                            ? "bg-green-100 text-green-700"
                            : msg.type === "email"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {msg.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {msg.time}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {msg.recipients} recipients
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 mt-2">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
