"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Role,
  homework as initialHomework,
  getSubjectName,
  subjects,
} from "@/lib/data";
import {
  ArrowLeft,
  Plus,
  BookOpen,
  Calendar,
  FileText,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function TeacherHomeworkPage() {
  const [role, setRole] = useState<Role>("teacher");
  const [homeworkList, setHomeworkList] = useState(initialHomework);
  const [showAddModal, setShowAddModal] = useState(false);

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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Homework</h1>
                <p className="text-gray-500 mt-1">
                  Manage assignments for your classes
                </p>
              </div>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                Assign Homework
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {homeworkList.length}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Due This Week</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {homeworkList.length}
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
                  <p className="text-sm text-gray-500">Reviewed</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Homework List */}
          <Card>
            <CardHeader>
              <CardTitle>All Homework</CardTitle>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                {homeworkList.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="info">
                            {getSubjectName(hw.subjectId)}
                          </Badge>
                          <Badge
                            variant={
                              new Date(hw.dueDate) < new Date()
                                ? "danger"
                                : "warning"
                            }
                          >
                            Due {hw.dueDate}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {hw.title}
                        </h3>
                        <p className="text-gray-600 mt-2">{hw.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm">
                          View Submissions
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {homeworkList.length === 0 && (
                  <div className="p-12 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No homework assigned yet</p>
                    <Button
                      variant="secondary"
                      className="mt-4"
                      onClick={() => setShowAddModal(true)}
                    >
                      <Plus className="w-4 h-4" />
                      Assign First Homework
                    </Button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
