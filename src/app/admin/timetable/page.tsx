"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Role, classes, getSubjectName } from "@/lib/data";
import { Calendar, Plus, Clock, BookOpen, Printer } from "lucide-react";

export default function AdminTimetablePage() {
  const [role, setRole] = useState<Role>("admin");
  const classData = classes[0];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Timetable Setup
                </h1>
                <p className="text-gray-500 mt-1">Manage class timetables</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
                <Button>
                  <Plus className="w-4 h-4" />
                  Add Period
                </Button>
              </div>
            </div>
          </div>

          {/* Timetable */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {classData?.name} - Section {classData?.section}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Weekly timetable</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Period
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Subject
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Time
                      </th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {classData?.timetable.map((period, index) => (
                      <tr key={period.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1e3a5f] text-white flex items-center justify-center text-sm font-medium">
                              {period.periodNumber}
                            </div>
                            <span className="font-medium text-gray-900">
                              Period {period.periodNumber}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-700">
                              {getSubjectName(period.subjectId)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>
                              {9 + index * 1}:00 - {9 + index * 1 + 1}:00
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
