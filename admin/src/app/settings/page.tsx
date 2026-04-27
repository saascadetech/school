"use client";

import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Save,
  Building,
  Clock,
  Bell,
  Shield,
  Users,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

interface SchoolSettings {
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  schoolEmail: string;
  principalName: string;
  academicYear: string;
  workingDays: string[];
  periodTimings: { period: number; startTime: string; endTime: string }[];
  attendanceThreshold: number;
  gradingSystem: string;
  lateMarkMinutes: number;
  autoGenerateReports: boolean;
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SchoolSettings>({
    schoolName: "",
    schoolAddress: "",
    schoolPhone: "",
    schoolEmail: "",
    principalName: "",
    academicYear: new Date().getFullYear().toString(),
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    periodTimings: [
      { period: 1, startTime: "08:00", endTime: "08:45" },
      { period: 2, startTime: "08:45", endTime: "09:30" },
      { period: 3, startTime: "09:45", endTime: "10:30" },
      { period: 4, startTime: "10:30", endTime: "11:15" },
      { period: 5, startTime: "11:30", endTime: "12:15" },
      { period: 6, startTime: "13:00", endTime: "13:45" },
      { period: 7, startTime: "13:45", endTime: "14:30" },
    ],
    attendanceThreshold: 75,
    gradingSystem: "standard",
    lateMarkMinutes: 15,
    autoGenerateReports: true,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const savedSettings = localStorage.getItem("schoolSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem("schoolSettings", JSON.stringify(settings));
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const toggleWorkingDay = (day: string) => {
    setSettings((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));
  };

  const updatePeriodTiming = (
    period: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setSettings((prev) => ({
      ...prev,
      periodTimings: prev.periodTimings.map((p) =>
        p.period === period ? { ...p, [field]: value } : p,
      ),
    }));
  };

  const tabs = [
    { id: "general", label: "General", icon: Building },
    { id: "academic", label: "Academic", icon: Clock },
    { id: "attendance", label: "Attendance", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Settings</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </header>

        <div className="flex h-[calc(100vh-73px)]">
          {/* Sidebar Tabs */}
          <div className="w-56 bg-white border-r border-gray-200 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      School Information
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          School Name *
                        </label>
                        <input
                          type="text"
                          value={settings.schoolName}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              schoolName: e.target.value,
                            })
                          }
                          placeholder="Enter school name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Principal Name
                        </label>
                        <input
                          type="text"
                          value={settings.principalName}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              principalName: e.target.value,
                            })
                          }
                          placeholder="Enter principal name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          School Address
                        </label>
                        <input
                          type="text"
                          value={settings.schoolAddress}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              schoolAddress: e.target.value,
                            })
                          }
                          placeholder="Enter full address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={settings.schoolPhone}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              schoolPhone: e.target.value,
                            })
                          }
                          placeholder="Enter phone number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={settings.schoolEmail}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              schoolEmail: e.target.value,
                            })
                          }
                          placeholder="Enter email address"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "academic" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Academic Year
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Academic Year
                      </label>
                      <input
                        type="text"
                        value={settings.academicYear}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            academicYear: e.target.value,
                          })
                        }
                        placeholder="e.g., 2026"
                        className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Working Days
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {DAYS_OF_WEEK.map((day) => (
                        <button
                          key={day}
                          onClick={() => toggleWorkingDay(day)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            settings.workingDays.includes(day)
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Period Timings
                    </h2>
                    <div className="space-y-3">
                      {settings.periodTimings.map((period) => (
                        <div
                          key={period.period}
                          className="flex items-center gap-4"
                        >
                          <span className="w-20 text-sm font-medium text-gray-600">
                            Period {period.period}
                          </span>
                          <input
                            type="time"
                            value={period.startTime}
                            onChange={(e) =>
                              updatePeriodTiming(
                                period.period,
                                "startTime",
                                e.target.value,
                              )
                            }
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                          />
                          <span className="text-gray-400">to</span>
                          <input
                            type="time"
                            value={period.endTime}
                            onChange={(e) =>
                              updatePeriodTiming(
                                period.period,
                                "endTime",
                                e.target.value,
                              )
                            }
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "attendance" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Attendance Rules
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Minimum Attendance Threshold (%)
                        </label>
                        <input
                          type="number"
                          value={settings.attendanceThreshold}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              attendanceThreshold: Number(e.target.value),
                            })
                          }
                          min="0"
                          max="100"
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Students below this threshold will not be allowed to
                          appear for exams
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Late Mark After (minutes)
                        </label>
                        <input
                          type="number"
                          value={settings.lateMarkMinutes}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              lateMarkMinutes: Number(e.target.value),
                            })
                          }
                          min="0"
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Students arriving after this time will be marked as
                          late
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Grading System
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Grading System
                      </label>
                      <select
                        value={settings.gradingSystem}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            gradingSystem: e.target.value,
                          })
                        }
                        className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      >
                        <option value="standard">Standard (A-F)</option>
                        <option value="percentage">Percentage (0-100)</option>
                        <option value="gpa4">GPA (4.0 Scale)</option>
                        <option value="gpa10">GPA (10.0 Scale)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Report Generation
                    </h2>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          Auto-generate Progress Reports
                        </p>
                        <p className="text-sm text-gray-500">
                          Automatically generate student progress reports at end
                          of term
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSettings({
                            ...settings,
                            autoGenerateReports: !settings.autoGenerateReports,
                          })
                        }
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          settings.autoGenerateReports
                            ? "bg-indigo-600"
                            : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            settings.autoGenerateReports ? "translate-x-6" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Security Settings
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-800">
                            Two-Factor Authentication
                          </p>
                          <p className="text-sm text-gray-500">
                            Require 2FA for all admin accounts
                          </p>
                        </div>
                        <button className="relative w-12 h-6 bg-gray-300 rounded-full">
                          <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-800">
                            Session Timeout
                          </p>
                          <p className="text-sm text-gray-500">
                            Auto-logout after inactivity
                          </p>
                        </div>
                        <select className="px-3 py-2 border border-gray-300 rounded-lg">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-gray-800">
                            Password Policy
                          </p>
                          <p className="text-sm text-gray-500">
                            Enforce strong passwords
                          </p>
                        </div>
                        <button className="relative w-12 h-6 bg-indigo-600 rounded-full">
                          <span className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full translate-x-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
