"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import { Clock, Edit, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TeacherTasksPage() {
  const [role, setRole] = useState<Role>("teacher");

  const tasks = [
    {
      id: 1,
      task: "Grade Math Homework - Class 3-A",
      due: "Today",
      priority: "high",
      type: "grading",
    },
    {
      id: 2,
      task: "Enter Unit Test Marks - Class 4-B",
      due: "Tomorrow",
      priority: "high",
      type: "marks",
    },
    {
      id: 3,
      task: "Upload Chapter 5 Notes",
      due: "Jan 22",
      priority: "medium",
      type: "homework",
    },
    {
      id: 4,
      task: "Prepare Quiz - Fractions",
      due: "Jan 23",
      priority: "low",
      type: "exam",
    },
    {
      id: 5,
      task: "Parent Call - Aarav's Progress",
      due: "Today",
      priority: "medium",
      type: "communication",
    },
  ];

  const completedTasks = tasks
    .slice(0, 2)
    .map((t) => ({ ...t, id: t.id + 10 }));

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-500 mt-1">Manage your pending tasks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">High Priority</p>
            <p className="text-2xl font-bold text-red-600">
              {tasks.filter((t) => t.priority === "high").length}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Due Today</p>
            <p className="text-2xl font-bold text-amber-600">
              {tasks.filter((t) => t.due === "Today").length}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {completedTasks.length}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Pending Tasks</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mt-2",
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                          ? "bg-amber-500"
                          : "bg-green-500",
                    )}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{task.task}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due: {task.due}
                      </span>
                      <span
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded",
                          task.type === "grading"
                            ? "bg-amber-100 text-amber-700"
                            : task.type === "marks"
                              ? "bg-purple-100 text-purple-700"
                              : task.type === "communication"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700",
                        )}
                      >
                        {task.type}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline text-sm">
                  Mark Complete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card mt-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Completed Tasks</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 flex items-center justify-between opacity-60"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 line-through">
                      {task.task}
                    </p>
                    <p className="text-xs text-gray-500">
                      Completed on Jan 18, 2026
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
