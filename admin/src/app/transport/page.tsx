"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Bus, Eye, Edit2, Trash2, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface TransportRoute {
  id: string;
  name: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  pickupPoint: string;
  dropPoint: string;
  fare: number;
  students?: { id: string; name: string; classId: string }[];
}

interface FormData {
  name: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  pickupPoint: string;
  dropPoint: string;
  fare: string;
}

export default function TransportPage() {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<TransportRoute | null>(
    null,
  );
  const [formData, setFormData] = useState<FormData>({
    name: "",
    vehicleNumber: "",
    driverName: "",
    driverPhone: "",
    pickupPoint: "",
    dropPoint: "",
    fare: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, []);

  async function fetchRoutes() {
    try {
      const res = await fetch(`${API_URL}/api/transport`);
      if (res.ok) {
        const data = await res.json();
        setRoutes(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Failed to fetch routes:", err);
    } finally {
      setLoading(false);
    }
  }

  function validateForm(): boolean {
    if (!formData.name.trim()) {
      alert("Route name is required");
      return false;
    }
    if (!formData.vehicleNumber.trim()) {
      alert("Vehicle number is required");
      return false;
    }
    if (!formData.driverName.trim()) {
      alert("Driver name is required");
      return false;
    }
    if (!formData.driverPhone.trim()) {
      alert("Driver phone is required");
      return false;
    }
    if (!formData.pickupPoint.trim()) {
      alert("Pickup point is required");
      return false;
    }
    if (!formData.dropPoint.trim()) {
      alert("Drop point is required");
      return false;
    }
    if (
      !formData.fare ||
      isNaN(Number(formData.fare)) ||
      Number(formData.fare) < 0
    ) {
      alert("Valid fare is required");
      return false;
    }
    return true;
  }

  async function handleAddRoute() {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/transport`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          vehicleNumber: formData.vehicleNumber,
          driverName: formData.driverName,
          driverPhone: formData.driverPhone,
          pickupPoint: formData.pickupPoint,
          dropPoint: formData.dropPoint,
          fare: Number(formData.fare),
        }),
      });

      if (res.ok) {
        alert("Success: Route created");
        setShowAddModal(false);
        resetForm();
        fetchRoutes();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create route");
      }
    } catch (error) {
      alert("Failed to create route");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateRoute() {
    if (!validateForm()) return;
    if (!selectedRoute) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/transport`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedRoute.id,
          name: formData.name,
          vehicleNumber: formData.vehicleNumber,
          driverName: formData.driverName,
          driverPhone: formData.driverPhone,
          pickupPoint: formData.pickupPoint,
          dropPoint: formData.dropPoint,
          fare: Number(formData.fare),
        }),
      });

      if (res.ok) {
        alert("Success: Route updated");
        setShowEditModal(false);
        resetForm();
        fetchRoutes();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update route");
      }
    } catch (error) {
      alert("Failed to update route");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteRoute() {
    if (!selectedRoute) return;

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/transport`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedRoute.id }),
      });

      if (res.ok) {
        alert("Success: Route deleted");
        setShowDeleteModal(false);
        setSelectedRoute(null);
        fetchRoutes();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete route");
      }
    } catch (error) {
      alert("Failed to delete route");
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      vehicleNumber: "",
      driverName: "",
      driverPhone: "",
      pickupPoint: "",
      dropPoint: "",
      fare: "",
    });
  }

  function openViewModal(route: TransportRoute) {
    setSelectedRoute(route);
    setShowViewModal(true);
  }

  function openEditModal(route: TransportRoute) {
    setSelectedRoute(route);
    setFormData({
      name: route.name,
      vehicleNumber: route.vehicleNumber,
      driverName: route.driverName,
      driverPhone: route.driverPhone,
      pickupPoint: route.pickupPoint,
      dropPoint: route.dropPoint,
      fare: route.fare.toString(),
    });
    setShowEditModal(true);
  }

  function openDeleteConfirm(route: TransportRoute) {
    setSelectedRoute(route);
    setShowDeleteModal(true);
  }

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driverName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">
            Transport Management
          </h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-64"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Route
            </button>
          </div>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredRoutes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Bus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No transport routes found</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
              >
                Add Route
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRoutes.map((route) => (
                <div
                  key={route.id}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <Bus className="w-5 h-5 text-indigo-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {route.name}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Vehicle:</span>
                      <span className="font-medium">{route.vehicleNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Driver:</span>
                      <span className="font-medium">{route.driverName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-medium">{route.driverPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Route:</span>
                      <span className="font-medium text-xs">
                        {route.pickupPoint} → {route.dropPoint}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Fare:</span>
                      <span className="font-medium text-indigo-600">
                        ₹{route.fare.toLocaleString()}
                      </span>
                    </div>
                    {route.students && route.students.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Students:</span>
                        <span className="font-medium">
                          {route.students.length}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => openViewModal(route)}
                      className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center justify-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => openEditModal(route)}
                      className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(route)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-white rounded-t-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">Add Transport Route</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Route A - City Area"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number *
                </label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleNumber: e.target.value })
                  }
                  placeholder="e.g., MH 12 AB 1234"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Driver Name *
                  </label>
                  <input
                    type="text"
                    value={formData.driverName}
                    onChange={(e) =>
                      setFormData({ ...formData, driverName: e.target.value })
                    }
                    placeholder="e.g., Ramesh Kumar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Driver Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.driverPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, driverPhone: e.target.value })
                    }
                    placeholder="e.g., 9876543210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Point *
                </label>
                <input
                  type="text"
                  value={formData.pickupPoint}
                  onChange={(e) =>
                    setFormData({ ...formData, pickupPoint: e.target.value })
                  }
                  placeholder="e.g., Main Gate, Sector 15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Drop Point *
                </label>
                <input
                  type="text"
                  value={formData.dropPoint}
                  onChange={(e) =>
                    setFormData({ ...formData, dropPoint: e.target.value })
                  }
                  placeholder="e.g., School Campus"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Fare (₹) *
                </label>
                <input
                  type="number"
                  value={formData.fare}
                  onChange={(e) =>
                    setFormData({ ...formData, fare: e.target.value })
                  }
                  placeholder="e.g., 2000"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleAddRoute}
                disabled={saving}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-70"
              >
                {saving ? "Creating..." : "Add Route"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedRoute && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-white rounded-t-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">Route Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <Bus className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {selectedRoute.name}
                  </h3>
                  <p className="text-gray-500">{selectedRoute.vehicleNumber}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Driver Name</span>
                  <span className="font-medium">
                    {selectedRoute.driverName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Driver Phone</span>
                  <span className="font-medium">
                    {selectedRoute.driverPhone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup Point</span>
                  <span className="font-medium">
                    {selectedRoute.pickupPoint}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Drop Point</span>
                  <span className="font-medium">{selectedRoute.dropPoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Fare</span>
                  <span className="font-medium text-indigo-600">
                    ₹{selectedRoute.fare.toLocaleString()}
                  </span>
                </div>
                {selectedRoute.students && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned Students</span>
                    <span className="font-medium">
                      {selectedRoute.students.length}
                    </span>
                  </div>
                )}
              </div>

              {selectedRoute.students && selectedRoute.students.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Assigned Students
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                    {selectedRoute.students.map((student) => (
                      <div key={student.id} className="text-sm text-gray-600">
                        • {student.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(selectedRoute);
                }}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
              >
                Edit Route
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setShowDeleteModal(true);
                }}
                className="py-3 px-6 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedRoute && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-white rounded-t-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">Edit Route</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Route Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Route A - City Area"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number *
                </label>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleNumber: e.target.value })
                  }
                  placeholder="e.g., MH 12 AB 1234"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Driver Name *
                  </label>
                  <input
                    type="text"
                    value={formData.driverName}
                    onChange={(e) =>
                      setFormData({ ...formData, driverName: e.target.value })
                    }
                    placeholder="e.g., Ramesh Kumar"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Driver Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.driverPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, driverPhone: e.target.value })
                    }
                    placeholder="e.g., 9876543210"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Point *
                </label>
                <input
                  type="text"
                  value={formData.pickupPoint}
                  onChange={(e) =>
                    setFormData({ ...formData, pickupPoint: e.target.value })
                  }
                  placeholder="e.g., Main Gate, Sector 15"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Drop Point *
                </label>
                <input
                  type="text"
                  value={formData.dropPoint}
                  onChange={(e) =>
                    setFormData({ ...formData, dropPoint: e.target.value })
                  }
                  placeholder="e.g., School Campus"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Fare (₹) *
                </label>
                <input
                  type="number"
                  value={formData.fare}
                  onChange={(e) =>
                    setFormData({ ...formData, fare: e.target.value })
                  }
                  placeholder="e.g., 2000"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleUpdateRoute}
                disabled={saving}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-70"
              >
                {saving ? "Updating..." : "Update Route"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRoute && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="bg-white rounded-t-2xl w-full max-w-md">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Route?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{selectedRoute.name}"? This
                action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteRoute}
                  disabled={saving}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-70"
                >
                  {saving ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
