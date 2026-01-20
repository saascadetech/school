"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Role, certificates } from "@/lib/data";
import { ArrowLeft, Award, Download, Calendar } from "lucide-react";
import Link from "next/link";

export default function StudentCertificatesPage() {
  const [role, setRole] = useState<Role>("student");

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
              My Certificates
            </h1>
            <p className="text-gray-500 mt-1">
              View and download your earned certificates
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Certificates</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {certificates.length}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lesson Completion</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Activity Awards</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Certificates List */}
          <Card>
            <CardHeader>
              <CardTitle>All Certificates</CardTitle>
            </CardHeader>
            <CardBody className="p-0">
              {certificates.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-6 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {cert.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                cert.type === "lesson" ? "info" : "success"
                              }
                            >
                              {cert.type === "lesson"
                                ? "Lesson Completion"
                                : "Activity Award"}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {cert.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Certificates Yet
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Complete lessons and participate in activities to earn
                    certificates. They will appear here automatically.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Info Card */}
          <Card className="mt-6">
            <CardBody>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    How to Earn Certificates
                  </h3>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>
                      • Complete all lessons in a subject to get a Lesson
                      Completion certificate
                    </li>
                    <li>
                      • Participate in school activities to get Activity
                      certificates
                    </li>
                    <li>
                      • Maintain perfect attendance for an Attendance award
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
}
