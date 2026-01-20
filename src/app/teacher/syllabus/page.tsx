"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Role, subjects, Subject } from "@/lib/data";
import { ArrowLeft, Check, BookOpen, Clock, Award } from "lucide-react";
import Link from "next/link";

export default function TeacherSyllabusPage() {
  const [role, setRole] = useState<Role>("teacher");
  const [localSubjects, setLocalSubjects] = useState<Subject[]>(subjects);

  const toggleLesson = (subjectId: string, lessonId: string) => {
    setLocalSubjects((prev) =>
      prev.map((subject) => {
        if (subject.id !== subjectId) return subject;
        return {
          ...subject,
          lessons: subject.lessons.map((lesson) => {
            if (lesson.id !== lessonId) return lesson;
            return { ...lesson, completed: !lesson.completed };
          }),
        };
      }),
    );
  };

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
              Syllabus Progress
            </h1>
            <p className="text-gray-500 mt-1">
              Tap lessons to mark as completed. Only exceptions are stored.
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
                        (localSubjects.reduce(
                          (acc, s) =>
                            acc + s.lessons.filter((l) => l.completed).length,
                          0,
                        ) /
                          localSubjects.reduce(
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
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-gray-600">
                      {localSubjects.reduce(
                        (acc, s) =>
                          acc + s.lessons.filter((l) => l.completed).length,
                        0,
                      )}{" "}
                      Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    <span className="text-gray-600">
                      {localSubjects.reduce(
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
            {localSubjects.map((subject) => {
              const progress = getSubjectProgress(subject);
              return (
                <Card key={subject.id}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-[#1e3a5f]" />
                          {subject.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          {progress.completed} of {progress.total} lessons
                          completed
                        </p>
                      </div>
                      <div className="w-full sm:w-32">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#1e3a5f] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                          {progress.percentage}%
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="p-0">
                    <div className="divide-y divide-gray-100">
                      {subject.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => toggleLesson(subject.id, lesson.id)}
                          className={`w-full flex items-center justify-between p-4 transition-all duration-200 ${
                            lesson.completed
                              ? "bg-emerald-50 hover:bg-emerald-100"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium text-sm ${
                                lesson.completed
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {lesson.number}
                            </div>
                            <div className="text-left">
                              <p
                                className={`font-medium ${
                                  lesson.completed
                                    ? "text-emerald-800"
                                    : "text-gray-900"
                                }`}
                              >
                                {lesson.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                Lesson {lesson.number}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <>
                                <Badge variant="success">Completed</Badge>
                                <Check className="w-5 h-5 text-emerald-500" />
                              </>
                            ) : (
                              <Badge variant="default">Pending</Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>

          {/* Certificate Info */}
          <Card className="mt-6">
            <CardBody>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Generate Certificates
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Students receive certificates automatically when lessons are
                    completed. View certificates in Activities section.
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
