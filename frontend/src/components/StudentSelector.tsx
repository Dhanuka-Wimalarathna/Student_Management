"use client";

import { useState, useEffect } from "react";
import { Search, User, Check } from "lucide-react";
import { Student } from "@/app/types/student";

interface StudentSelectorProps {
  selectedStudents: Student[];
  onStudentsChange: (students: Student[]) => void;
}

export default function StudentSelector({
  selectedStudents,
  onStudentsChange,
}: StudentSelectorProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/students");
        if (response.ok) {
          const data = await response.json();
          console.log("📊 Student Data from Database:", data);
          setStudents(data);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search - with safe property access
  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      (student?.name?.toLowerCase() || "").includes(searchLower) ||
      (student?.nic || "").includes(searchTerm) ||
      (student?.id?.toString() || "").includes(searchTerm)
    );
  });

  const toggleStudentSelection = (student: Student) => {
    const isSelected = selectedStudents.some((s) => s.id === student.id);

    if (isSelected) {
      // Remove student
      onStudentsChange(selectedStudents.filter((s) => s.id !== student.id));
    } else {
      // Add student
      onStudentsChange([...selectedStudents, student]);
    }
  };

  const selectAllStudents = () => {
    onStudentsChange(filteredStudents);
  };

  const clearSelection = () => {
    onStudentsChange([]);
  };

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search students by name, NIC or ID..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Selection Actions */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={selectAllStudents}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Select All
        </button>
        <button
          type="button"
          onClick={clearSelection}
          className="text-sm text-gray-600 hover:text-gray-700 font-medium"
        >
          Clear All
        </button>
        <span className="text-sm text-gray-500 ml-auto">
          {selectedStudents.length} selected
        </span>
      </div>

      {/* Students List */}
      <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {students.length === 0
              ? "No students available"
              : "No students found"}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredStudents.map((student) => {
              const isSelected = selectedStudents.some(
                (s) => s.id === student.id
              );

              return (
                <div
                  key={student.id}
                  className={`p-3 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => toggleStudentSelection(student)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isSelected
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isSelected ? <Check size={16} /> : <User size={16} />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {student?.firstName && student?.lastName
                            ? `${student.firstName} ${student.lastName}`
                            : student?.name || "Unknown Student"}
                        </p>
                        <p className="text-sm text-gray-500">
                          ID: {student?.id} • NIC: {student?.nic || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student?.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student?.status || "unknown"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
