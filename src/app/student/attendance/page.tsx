"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Role, students, getStudent } from "@/lib/data";
import { ArrowLeft, Calendar, Check, X, User } from "lucide-react";
import Link from "next/link";

export default function StudentAttendancePage() {
  const [role, setRole] = useState<Role>("student");
  const student = getStudent("stud-1");

  const todayStatus = student?.attendance[student.attendance.length - 1];
  const presentCount = student?.attendance.filter((a) => a.present).length || 0;
  const totalCount = student?.attendance.length || 0;
  const presentPercentage =
    totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 100;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
            <p className="text-gray-500 mt-1">View your attendance records</p>
          </div>

          {/* Today's Status */}
          <Card className="mb-6">
            <CardBody>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      todayStatus?.present
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {todayStatus?.present ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <X className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Today's Status</p>
                    <p
                      className={`text-2xl font-bold ${
                        todayStatus?.present
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {todayStatus?.present ? "Present" : "Absent"}
                    </p>
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-sm text-gray-500">Attendance Rate</p>
                  <p className="text-3xl font-bold text-[#1e3a5f]">
                    {presentPercentage}%
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Monthly Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Monthly Summary - January 2026</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <p className="text-2xl font-bold text-emerald-600">
                    {presentCount}
                  </p>
                  <p className="text-sm text-gray-600">Present Days</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <p className="text-2xl font-bold text-red-600">
                    {totalCount - presentCount}
                  </p>
                  <p className="text-sm text-gray-600">Absent Days</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">
                    {totalCount}
                  </p>
                  <p className="text-sm text-gray-600">Total Days</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <p className="text-2xl font-bold text-amber-600">
                    {31 - totalCount}
                  </p>
                  <p className="text-sm text-gray-600">Remaining</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Attendance History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                {student?.attendance.map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          record.present
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {record.present ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <X className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {record.date}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "long",
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge variant={record.present ? "success" : "danger"}>
                      {record.present ? "Present" : "Absent"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
