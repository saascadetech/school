"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Role, getStudent, getStudentFeeStatus } from "@/lib/data";
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  CheckCircle,
  Download,
  Receipt,
} from "lucide-react";
import Link from "next/link";

export default function StudentFeesPage() {
  const [role, setRole] = useState<Role>("student");
  const student = getStudent("stud-1");
  const feeStatus = getStudentFeeStatus("stud-1");

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
            <h1 className="text-2xl font-bold text-gray-900">
              Fees & Payments
            </h1>
            <p className="text-gray-500 mt-1">
              View your fee details and payments
            </p>
          </div>

          {/* Fee Summary */}
          <Card className="mb-6">
            <CardBody>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#1e3a5f] text-white">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Fee</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ₹{feeStatus.total.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-xl min-w-[100px]">
                    <p className="text-xl font-bold text-emerald-600">
                      ₹{feeStatus.paid.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">Paid</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl min-w-[100px]">
                    <p className="text-xl font-bold text-red-600">
                      ₹{feeStatus.due.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600">Due</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Payment Status */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">
                    {Math.round((feeStatus.paid / feeStatus.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round((feeStatus.paid / feeStatus.total) * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Due Date</p>
                    <p className="font-medium text-gray-900">April 30, 2026</p>
                  </div>
                </div>
                <Badge variant={feeStatus.isPaid ? "success" : "warning"}>
                  {feeStatus.isPaid ? "Fully Paid" : "Payment Due"}
                </Badge>
              </div>
            </CardBody>
          </Card>

          {/* Payment Actions */}
          {!feeStatus.isPaid && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Make Payment</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1">
                    <DollarSign className="w-4 h-4" />
                    Pay ₹{feeStatus.due.toLocaleString()}
                  </Button>
                  <Button variant="secondary">
                    <Receipt className="w-4 h-4" />
                    View Receipts
                  </Button>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        First Installment
                      </p>
                      <p className="text-sm text-gray-500">January 10, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold text-gray-900">₹6,000</p>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
