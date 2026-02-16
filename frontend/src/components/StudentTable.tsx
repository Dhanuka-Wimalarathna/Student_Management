"use client";

import { Student } from "@/app/types/student";

interface StudentTableProps {
  students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
  if (students.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-500">No students found</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Enrolled":
        return "bg-blue-100 text-blue-800";
      case "Exams":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-4 py-3 font-semibold">ID</th>
          <th className="px-4 py-3 font-semibold">Name</th>
          <th className="px-4 py-3 font-semibold">NIC</th>
          <th className="px-4 py-3 font-semibold">Phone</th>
          <th className="px-4 py-3 font-semibold">Status</th>
          <th className="px-4 py-3 font-semibold">Vehicle Category</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr
            key={student.id}
            className="border-b hover:bg-gray-50 transition-colors"
          >
            <td className="px-4 py-3 text-gray-900 font-medium">
              {student.id}
            </td>
            <td className="px-4 py-3 text-gray-900 font-medium">
              {`${student.firstName || ""} ${student.lastName || ""}`.trim() ||
                student.name ||
                "N/A"}
            </td>
            <td className="px-4 py-3 text-gray-900 font-medium">
              {student.nic}
            </td>
            <td className="px-4 py-3 text-gray-900 font-medium">
              {student.phone}
            </td>
            <td className="px-4 py-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                  student.status,
                )}`}
              >
                {student.status}
              </span>
            </td>
            <td className="px-4 py-3 text-gray-900 font-medium">
              {student.vehicleCategory || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
