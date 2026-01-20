"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Role, subjects, Subject, getStudent } from "@/lib/data";
import { ArrowLeft, BookOpen, Check, Clock } from "lucide-react";
import Link from "next/link";

export default function StudentSyllabusPage() {
  const [role, setRole] = useState<Role>("student");

  // Demo student - in real app this would come from auth
  const student = getStudent("stud-1");
  const studentSubjects = subjects; // Show all subjects for demo

  const getSubjectProgress = (subject: Subject) => {
    const completed = subject.lessons.filter((l) => l.completed).length;
    const total = subject.lessons.length;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  };

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
            <h1 className="text-2xl font-bold text-gray-900">
              My Syllabus Progress
            </h1>
            <p className="text-gray-500 mt-1">
              Track your learning progress across all subjects
            </p>
          </div>

          {/* Overall Progress */}
          <Card className="mb-6">
            <CardBody>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-[#1e3a5f] text-white">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Overall Progress</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(
                        (studentSubjects.reduce(
                          (acc, s) =>
                            acc + s.lessons.filter((l) => l.completed).length,
                          0,
                        ) /
                          studentSubjects.reduce(
                            (acc, s) => acc + s.lessons.length,
                            0,
                          )) *
                          100,
                      )}
                      %
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-gray-600">
                      {studentSubjects.reduce(
                        (acc, s) =>
                          acc + s.lessons.filter((l) => l.completed).length,
                        0,
                      )}{" "}
                      Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {studentSubjects.reduce(
                        (acc, s) =>
                          acc + s.lessons.filter((l) => !l.completed).length,
                        0,
                      )}{" "}
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Subjects */}
          <div className="space-y-6">
            {studentSubjects.map((subject) => {
              const progress = getSubjectProgress(subject);
              return (
                <Card key={subject.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#1e3a5f]" />
                        {subject.name}
                      </CardTitle>
                      <div className="w-full sm:w-32">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          {progress.completed}/{progress.total} lessons
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="p-0">
                    <div className="divide-y divide-gray-100">
                      {subject.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center justify-between p-4 ${
                            lesson.completed ? "bg-emerald-50" : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium text-sm ${
                                lesson.completed
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {lesson.number}
                            </div>
                            <div>
                              <p
                                className={`font-medium ${
                                  lesson.completed
                                    ? "text-emerald-800"
                                    : "text-gray-700"
                                }`}
                              >
                                {lesson.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                Lesson {lesson.number}
                              </p>
                            </div>
                          </div>
                          {lesson.completed && (
                            <span className="flex items-center gap-1 text-emerald-600 text-sm">
                              <Check className="w-4 h-4" />
                              Completed
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
