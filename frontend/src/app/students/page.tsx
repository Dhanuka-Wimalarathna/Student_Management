"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/ui/Layout";
import StudentTable from "@/components/StudentTable";
import StudentForm, { StudentFormData } from "@/components/StudentForm";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Plus, Users, Search } from "lucide-react";

export interface Student {
  id: number;
  name: string;
  nic: string;
  phone: string;
  status: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  enrollmentDate?: string;
  vehicleCategory?: string;
}

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch students from Next.js API route (hidden backend)
  const fetchStudents = async () => {
    try {
      setLoading(true);
      // Changed from http://localhost:5000/api/students to:
      const response = await fetch("/api/students");

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      console.log("Received students data:", data);

      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (studentData: StudentFormData) => {
    try {
      // Changed from http://localhost:5000/api/students to:
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle backend validation errors specifically
        if (result.details && Array.isArray(result.details)) {
          const errorMessage = result.details.join(", ");
          alert(`Validation Error: ${errorMessage}`);
        } else {
          alert(result.error || "Failed to add student");
        }
        return;
      }

      // Update local state with the new student
      setStudents((prev) => [...prev, result.student]);
      setIsModalOpen(false);

      alert(`Student ${studentData.fullName} added successfully!`);
    } catch (err) {
      alert("Network error: Failed to connect to server");
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      student?.name?.toLowerCase()?.includes(searchLower) ||
      student?.nic?.toLowerCase()?.includes(searchLower) ||
      student?.id?.toString()?.includes(searchTerm)
    );
  });

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
          <Button onClick={fetchStudents} className="mt-2">
            Retry
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">
            Manage all student records and information
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search students by name, NIC or ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0"
            >
              <Plus size={18} />
              Add New Student
            </Button>
          </div>
        </div>
      </div>

      {/* Students Table Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-accent-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">All Students</h2>
              <p className="text-gray-700 text-sm mt-1">
                Complete list of registered students
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary-700">
              <Users className="w-5 h-5 text-primary-600" size={18} />
              <span className="font-semibold text-gray-700">
                {loading ? "Loading..." : `${filteredStudents.length} Students`}
              </span>
            </div>
          </div>
        </div>
        <div className="p-1">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <StudentTable students={filteredStudents} />
          )}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold">1-{filteredStudents.length}</span>{" "}
              of{" "}
              <span className="font-semibold">{filteredStudents.length}</span>{" "}
              students
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Student"
      >
        <StudentForm
          onSubmit={handleAddStudent}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </Layout>
  );
}
