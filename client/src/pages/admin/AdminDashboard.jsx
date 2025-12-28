import Layout from "../../components/Layout";
import { Users, UserPlus, Settings } from "lucide-react";

const AdminDashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            System overview and user management
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Users size={20} className="text-blue-500" /> User Management
            </h3>
            <p className="text-sm text-gray-500 mt-2">View and edit users</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <UserPlus size={20} className="text-green-500" /> Add Doctor
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Register new medical staff
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
