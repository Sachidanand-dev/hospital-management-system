import Layout from "../../components/Layout";
import { Users, Calendar, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const DoctorDashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage appointments and patients</p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's Appointments</p>
                <h3 className="text-2xl font-bold text-gray-900">0</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <h3 className="text-2xl font-bold text-gray-900">0</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                <ClipboardList size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Reports</p>
                <h3 className="text-2xl font-bold text-gray-900">0</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
