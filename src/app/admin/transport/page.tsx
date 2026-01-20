"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Role, transportRoutes, students, getStudent } from "@/lib/data";
import { Bus, Plus, MapPin, Phone, User, Users } from "lucide-react";

export default function AdminTransportPage() {
  const [role, setRole] = useState<Role>("admin");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={role} onRoleChange={setRole} />

      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Transport Management
                </h1>
                <p className="text-gray-500 mt-1">
                  Manage routes and student allocations
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4" />
                Add Route
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Routes</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {transportRoutes.length}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Students Using</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {students.filter((s) => s.transportRoute).length}
                  </p>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {transportRoutes.length}
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Routes */}
          <div className="space-y-6">
            {transportRoutes.map((route) => (
              <Card key={route.id}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Bus className="w-5 h-5 text-[#1e3a5f]" />
                        {route.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        {route.vehicleNumber}
                      </p>
                    </div>
                    <Badge variant="info">
                      {route.studentIds.length} Students
                    </Badge>
                  </div>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm text-gray-500">Pickup</span>
                      </div>
                      <p className="font-medium text-gray-900">
                        {route.pickupPoint}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-500">Drop</span>
                      </div>
                      <p className="font-medium text-gray-900">
                        {route.dropPoint}
                      </p>
                    </div>
                  </div>

                  {/* Driver Info */}
                  <div className="border-t border-gray-100 p-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Driver Details
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#1e3a5f] flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {route.driverName}
                          </p>
                          <p className="text-sm text-gray-500">Driver</p>
                        </div>
                      </div>
                      <a
                        href={`tel:${route.driverPhone}`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2d5a8a] transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {route.driverPhone}
                      </a>
                    </div>
                  </div>

                  {/* Students on Route */}
                  <div className="border-t border-gray-100 p-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Students on this Route
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {route.studentIds.map((studentId) => {
                        const student = getStudent(studentId);
                        return (
                          <Badge key={studentId} variant="default">
                            {student?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
