import Layout from "@/components/ui/Layout";
import Card from "@/components/ui/Card";
import { Users, Package, BookOpen, Bell } from "lucide-react";

export default function DashboardPage() {
  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome to your student management system
        </p>
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
    </Layout>
  );
}
