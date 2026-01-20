"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Role, homework as initialHomework, getSubjectName } from "@/lib/data";
import {
  ArrowLeft,
  BookOpen,
  Upload,
  CheckCircle,
  FileText,
  Camera,
} from "lucide-react";
import Link from "next/link";

export default function StudentHomeworkPage() {
  const [role, setRole] = useState<Role>("student");
  const [homeworkList] = useState(initialHomework);

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
            <h1 className="text-2xl font-bold text-gray-900">My Homework</h1>
            <p className="text-gray-500 mt-1">View and submit your homework</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {homeworkList.length}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
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
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Homework List */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Homework</CardTitle>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                {homeworkList.map((hw) => (
                  <div key={hw.id} className="p-6">
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
                      <div className="flex flex-col gap-2">
                        <Button size="sm">
                          <Camera className="w-4 h-4" />
                          Upload Photo
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Upload className="w-4 h-4" />
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {homeworkList.length === 0 && (
                  <div className="p-12 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No homework assigned</p>
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
