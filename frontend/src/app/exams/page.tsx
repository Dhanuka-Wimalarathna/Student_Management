"use client";

import Layout from "@/components/ui/Layout";
import ExamTable from "@/components/ExamTable";

export default function ExamsPage() {
  const examData = [
    {
      id: 1,
      studentName: "John Smith",
      examDate: "2024-01-15",
      marks: 85,
      status: "Passed",
    },
    {
      id: 2,
      studentName: "Emma Johnson",
      examDate: "2024-01-16",
      marks: 72,
      status: "Passed",
    },
    {
      id: 3,
      studentName: "Michael Brown",
      examDate: "2024-01-17",
      marks: 45,
      status: "Failed",
    },
    {
      id: 4,
      studentName: "Sarah Davis",
      examDate: "2024-01-18",
      marks: 60,
      status: "Passed",
    },
    {
      id: 5,
      studentName: "David Wilson",
      examDate: "2024-01-19",
      marks: 0,
      status: "Pending",
    },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Exam Details</h1>
        <p className="text-gray-600 mt-1">Check student test result </p>
      </div>
      <ExamTable exams={examData} />
    </Layout>
  );
}
