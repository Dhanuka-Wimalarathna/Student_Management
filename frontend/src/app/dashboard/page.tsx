"use client";

import Layout from "@/components/ui/Layout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StudentSelector from "@/components/StudentSelector";
import { Student } from "@/app/types/student";
import { Users, Package, BookOpen, Bell, FileText, Car } from "lucide-react";
import { useState } from "react";

export default function DashboardPage() {
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [selectedExamType, setSelectedExamType] = useState<
    "written" | "practical" | null
  >(null);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  const handleManageExams = () => {
    setIsExamModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsExamModalOpen(false);
    setSelectedExamType(null);
    setSelectedStudents([]);
  };

  console.log("Selected Students:", selectedStudents);

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to your student management system
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Quickly access frequently used features
              </p>
            </div>
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Button onClick={handleManageExams} variant="secondary">
                <FileText size={18} />
                Manage Exams
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Card
          title="Total Students"
          description="All Registered"
          value="120"
          icon={<Users className="w-5 h-5 text-primary-600" />}
        />
        <Card
          title="New Registrations"
          description="This Month"
          value="5"
          icon={<Package className="w-5 h-5 text-success-600" />}
        />
        <Card
          title="Written Exam"
          description="This Week"
          value="32"
          icon={<BookOpen className="w-5 h-5 text-accent-600" />}
        />
        <Card
          title="Trial Exam"
          description="This Week"
          value="3"
          icon={<Bell className="w-5 h-5 text-warning-600" />}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-600 font-medium">
                Completion Rate
              </p>
              <p className="text-2xl font-bold text-primary-600 mt-1">84%</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-bold">✓</span>
            </div>
          </div>
        </div>

        <div className="bg-success-50 rounded-xl p-4 border border-success-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-success-600 font-medium">
                Avg. Attendance
              </p>
              <p className="text-2xl font-bold text-success-600 mt-1">92%</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
              <span className="text-success-600 font-bold">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-accent-50 rounded-xl p-4 border border-accent-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-accent-600 font-medium">
                Satisfaction
              </p>
              <p className="text-2xl font-bold text-accent-600 mt-1">4.8/5</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
              <span className="text-accent-600 font-bold">⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Exams Modal */}
      <Modal
        isOpen={isExamModalOpen}
        onClose={handleCloseModal}
        title="Schedule Exam"
      >
        <div className="space-y-6">
          {/* Exam Type Selection */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Select Exam Type
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={selectedExamType === "written" ? "primary" : "outline"}
                className={`justify-center py-3 transition-all duration-200 ${
                  selectedExamType === "written"
                    ? "bg-blue-600 text-white shadow-lg border-blue-600"
                    : "border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                }`}
                onClick={() => setSelectedExamType("written")}
              >
                <BookOpen size={18} />
                Written Exam
              </Button>
              <Button
                variant={
                  selectedExamType === "practical" ? "primary" : "outline"
                }
                className={`justify-center py-3 transition-all duration-200 ${
                  selectedExamType === "practical"
                    ? "bg-blue-600 text-white shadow-lg border-blue-600"
                    : "border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50"
                }`}
                onClick={() => setSelectedExamType("practical")}
              >
                <Car size={18} />
                Practical Exam
              </Button>
            </div>
          </div>

          {/* Conditional Exam Details Form */}
          {selectedExamType && (
            <div className="space-y-4 border-t pt-4">
              <p className="text-gray-600">
                Scheduling{" "}
                <span className="font-semibold capitalize text-blue-600">
                  {selectedExamType}
                </span>{" "}
                exam. Please fill in the details below.
              </p>

              {/* Common Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Student Selector Component */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Students
                  </label>
                  <StudentSelector
                    selectedStudents={selectedStudents}
                    onStudentsChange={setSelectedStudents}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Show message when no exam type selected */}
          {!selectedExamType && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-3 text-gray-300" />
              <p>Please select an exam type to continue</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <Button
              onClick={() => {
                if (selectedExamType) {
                  console.log(
                    `Scheduling ${selectedExamType} exam for students:`,
                    selectedStudents,
                  );
                  // Add your scheduling logic here
                }
              }}
              className="justify-center"
              disabled={!selectedExamType || selectedStudents.length === 0}
            >
              Schedule Exam
            </Button>
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="justify-center"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
