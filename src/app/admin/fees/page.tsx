"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Role,
  students,
  feeStructure,
  feePayments,
  getStudentFeeStatus,
} from "@/lib/data";
import {
  DollarSign,
  Plus,
  Download,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export default function AdminFeesPage() {
  const [role, setRole] = useState<Role>("admin");

  const totalExpected = feeStructure.totalFee * students.length;
  const totalPaid = feePayments.reduce((sum, p) => sum + p.amount, 0);
  const totalDue = totalExpected - totalPaid;

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
                  Fees Management
                </h1>
                <p className="text-gray-500 mt-1">
                  Track and manage fee collection
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">
                  <Download className="w-4 h-4" />
                  Export Report
                </Button>
                <Button>
                  <Plus className="w-4 h-4" />
                  Record Payment
                </Button>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Expected</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{totalExpected.toLocaleString()}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Collected</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{totalPaid.toLocaleString()}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-red-50 text-red-600">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{totalDue.toLocaleString()}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Collection Rate</p>
                  <p className="text-xl font-bold text-gray-900">
                    {Math.round((totalPaid / totalExpected) * 100)}%
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Fee Structure */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Fee Structure - Class 3</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">
                    Annual Fee per Student
                  </p>
                  <p className="text-sm text-gray-500">Due: April 30, 2026</p>
                </div>
                <p className="text-2xl font-bold text-[#1e3a5f]">
                  ₹{feeStructure.totalFee.toLocaleString()}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Student Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Student Payment Status</CardTitle>
            </CardHeader>
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Student
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Parent
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Paid
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                        Due
                      </th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {students.map((student) => {
                      const status = getStudentFeeStatus(student.id);
                      return (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">
                              {student.name}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-gray-600">
                              {student.parentName}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-gray-900 font-medium">
                              ₹{status.paid.toLocaleString()}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p
                              className={
                                status.due > 0
                                  ? "text-red-600"
                                  : "text-emerald-600"
                              }
                            >
                              ₹{status.due.toLocaleString()}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Badge
                              variant={status.isPaid ? "success" : "warning"}
                            >
                              {status.isPaid ? "Paid" : "Due"}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
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
