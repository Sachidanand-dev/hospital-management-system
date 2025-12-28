import Layout from "../../components/Layout";
import { Calendar, Clock, FileText, Plus } from "lucide-react";
import { motion } from "framer-motion";

const PatientDashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your health and appointments
          </p>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between cursor-pointer hover:shadow-md transition-all"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Book Appointment
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Schedule a visit with a doctor
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <Plus size={24} />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between cursor-pointer hover:shadow-md transition-all"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Medical History
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                View your past records
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <FileText size={24} />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between cursor-pointer hover:shadow-md transition-all"
          >
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                Upcoming Visits
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Check scheduled appointments
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <Calendar size={24} />
            </div>
          </motion.div>
        </div>

        {/* Recent Activity / Placeholder List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Appointments</h3>
          </div>
          <div className="p-6 text-center text-gray-500 py-12">
            <p>No appointments found. Book your first one!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
