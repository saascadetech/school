"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Role,
  activities as initialActivities,
  students,
  getClass,
} from "@/lib/data";
import {
  ArrowLeft,
  Plus,
  Calendar,
  Award,
  Users,
  Download,
} from "lucide-react";
import Link from "next/link";

export default function TeacherActivitiesPage() {
  const [role, setRole] = useState<Role>("teacher");
  const [activities, setActivities] = useState(initialActivities);

  const classData = getClass("class-1");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 pt-16 lg:pt-0 lg:ml-64">
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
                <h1 className="text-2xl font-bold text-gray-900">
                  Activities & Certificates
                </h1>
                <p className="text-gray-500 mt-1">
                  Create activities and generate certificates
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4" />
                Create Activity
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Activities</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activities.length}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Certificates</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {students.length}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Upcoming Activities */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upcoming Activities</CardTitle>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-xl ${
                            activity.type === "quiz"
                              ? "bg-blue-100 text-blue-600"
                              : activity.type === "drawing"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge
                              variant={
                                activity.type === "quiz"
                                  ? "info"
                                  : activity.type === "drawing"
                                    ? "success"
                                    : "warning"
                              }
                            >
                              {activity.type.charAt(0).toUpperCase() +
                                activity.type.slice(1)}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {classData?.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {activity.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm">
                          <Users className="w-4 h-4" />
                          Manage
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                          Certificate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {activities.length === 0 && (
                  <div className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No activities scheduled</p>
                    <Button variant="secondary" className="mt-4">
                      <Plus className="w-4 h-4" />
                      Create First Activity
                    </Button>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Certificate Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Certificate Templates</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-6 border border-gray-200 rounded-xl hover:border-[#1e3a5f] transition-colors cursor-pointer">
                  <Award className="w-10 h-10 text-[#1e3a5f] mb-4" />
                  <h3 className="font-medium text-gray-900">
                    Lesson Completion
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Awarded when all lessons in a subject are completed
                  </p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl hover:border-[#1e3a5f] transition-colors cursor-pointer">
                  <Award className="w-10 h-10 text-emerald-600 mb-4" />
                  <h3 className="font-medium text-gray-900">
                    Activity Participation
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Awarded for participating in school activities
                  </p>
                </div>
                <div className="p-6 border border-gray-200 rounded-xl hover:border-[#1e3a5f] transition-colors cursor-pointer">
                  <Award className="w-10 h-10 text-amber-600 mb-4" />
                  <h3 className="font-medium text-gray-900">
                    Perfect Attendance
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Awarded for 100% attendance
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
