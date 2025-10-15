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
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Exams</h1>
        <ExamTable exams={examData} />
      </div>
    </Layout>
  );
}
