"use client";

import Link from "next/link";
import { Home, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { PiExam } from "react-icons/pi";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/students", label: "Students", icon: <Users size={18} /> },
    { href: "/exams", label: "Exams", icon: <PiExam size={18} /> }
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="px-6 py-5 font-bold text-2xl text-blue-600 border-b">
        Madushani Driving School
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              pathname === link.href
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>

      <div className="px-6 py-3 border-t text-sm text-gray-500">
        © 2025 All Rights Reserved.
      </div>
    </div>
  );
}
