"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Role } from "@/lib/data";
import { Users, Phone, Mail, BookOpen } from "lucide-react";

export default function StudentTeachersPage() {
  const [role, setRole] = useState<Role>("student");

  const teachers = [
    {
      name: "Mrs. Smith",
      subject: "Mathematics",
      phone: "+91 98765 43210",
      email: "smith@school.edu",
      image: "S",
    },
    {
      name: "Mr. Johnson",
      subject: "English",
      phone: "+91 98765 43211",
      email: "johnson@school.edu",
      image: "J",
    },
    {
      name: "Dr. Patel",
      subject: "Science",
      phone: "+91 98765 43212",
      email: "patel@school.edu",
      image: "P",
    },
    {
      name: "Ms. Reddy",
      subject: "Social Studies",
      phone: "+91 98765 43213",
      email: "reddy@school.edu",
      image: "R",
    },
    {
      name: "Mr. Kumar",
      subject: "Hindi",
      phone: "+91 98765 43214",
      email: "kumar@school.edu",
      image: "K",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Teachers</h1>
          <p className="text-gray-500 mt-1">
            Contact information of your teachers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((teacher, index) => (
            <div key={index} className="card p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">
                    {teacher.image}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{teacher.name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {teacher.subject}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href={`tel:${teacher.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                >
                  <Phone className="w-4 h-4" />
                  {teacher.phone}
                </a>
                <a
                  href={`mailto:${teacher.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                >
                  <Mail className="w-4 h-4" />
                  {teacher.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
