"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Role,
  students,
  subjects,
  classes,
  feePayments,
  feeStructure,
} from "@/lib/data";
import {
  Download,
  FileText,
  Users,
  BookOpen,
  DollarSign,
  Bus,
} from "lucide-react";

export default function AdminReportsPage() {
  const [role, setRole] = useState<Role>("admin");

  const completedLessons = subjects.reduce(
    (acc, s) => acc + s.lessons.filter((l) => l.completed).length,
    0,
  );
  const totalLessons = subjects.reduce((acc, s) => acc + s.lessons.length, 0);
  const totalPaid = feePayments.reduce((sum, p) => sum + p.amount, 0);
  const studentsWithTransport = students.filter((s) => s.transportRoute).length;

  const reports = [
    {
      title: "Syllabus Completion Report",
      description: "Overview of lessons completed across all subjects",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
      action: "Download",
    },
    {
      title: "Attendance Register",
      description: "Daily attendance records for all students",
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
      action: "Download",
    },
    {
      title: "Fee Collection Report",
      description: "Fee payments and pending amounts",
      icon: DollarSign,
      color: "bg-amber-50 text-amber-600",
      action: "Download",
    },
    {
      title: "Transport Allocation List",
      description: "Students assigned to each transport route",
      icon: Bus,
      color: "bg-purple-50 text-purple-600",
      action: "Download",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-500 mt-1">
              Generate and export school reports
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Syllabus</p>
                  <p className="text-xl font-bold text-gray-900">
                    {completedLessons}/{totalLessons}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Students</p>
                  <p className="text-xl font-bold text-gray-900">
                    {students.length}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Collection</p>
                  <p className="text-xl font-bold text-gray-900">
                    {Math.round(
                      (totalPaid / (feeStructure.totalFee * students.length)) *
                        100,
                    )}
                    %
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transport</p>
                  <p className="text-xl font-bold text-gray-900">
                    {studentsWithTransport}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report, index) => (
              <Card key={index} hover>
                <CardBody>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${report.color}`}>
                        <report.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {report.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {report.description}
                        </p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      <Download className="w-4 h-4" />
                      {report.action}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Export Options */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary">
                  <FileText className="w-4 h-4" />
                  Export as PDF
                </Button>
                <Button variant="secondary">
                  <FileText className="w-4 h-4" />
                  Export as Excel
                </Button>
                <Button variant="secondary">
                  <FileText className="w-4 h-4" />
                  Export as CSV
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
