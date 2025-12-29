import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyAppointments } from "../../api/appointment.api";
import AppointmentBooking from "../../components/patient/AppointmentBooking";
import AppointmentsList from "../../components/patient/AppointmentsList";
import Layout from "../../components/Layout";
import { Calendar, History, Activity, Plus } from "lucide-react";
import { motion } from "framer-motion";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to load appointments", error);
      }
    };
    loadAppointments();
  }, [refresh]);

  const handleBookingSuccess = () => {
    setRefresh((prev) => prev + 1);
    setActiveTab("history");
  };

  return (
    <Layout>
      <div className="space-y-6 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Hello, {user?.name} 👋
            </h1>
            <p className="text-gray-500">Welcome to your patient portal.</p>
          </div>

          <button
            onClick={() => setActiveTab("book")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Plus size={20} />
            Book Appointment
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 font-medium">Upcoming</p>
                <h3 className="text-3xl font-bold mt-1">
                  {
                    appointments.filter(
                      (a) =>
                        a.status === "SCHEDULED" &&
                        new Date(a.date) >= new Date()
                    ).length
                  }
                </h3>
              </div>
              <div className="bg-white/20 p-2.5 rounded-xl">
                <Calendar size={24} className="text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Total Visits</p>
                <h3 className="text-3xl font-bold mt-1 text-gray-800">
                  {appointments.length}
                </h3>
              </div>
              <div className="bg-gray-50 p-2.5 rounded-xl">
                <History size={24} className="text-gray-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium">Next Visit</p>
                {(() => {
                  const next = appointments
                    .filter(
                      (a) =>
                        a.status === "SCHEDULED" &&
                        new Date(a.date) >= new Date()
                    )
                    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

                  return next ? (
                    <div>
                      <h3 className="text-lg font-bold mt-1 text-gray-800">
                        {new Date(next.date).toLocaleDateString()}
                      </h3>
                      <p className="text-xs text-blue-600">{next.startTime}</p>
                    </div>
                  ) : (
                    <h3 className="text-lg font-bold mt-1 text-gray-400">
                      None
                    </h3>
                  );
                })()}
              </div>
              <div className="bg-green-50 p-2.5 rounded-xl">
                <Activity size={24} className="text-green-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === "overview"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Overview
            {activeTab === "overview" && (
              <motion.div
                layoutId="tab"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("book")}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === "book"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Book Appointment
            {activeTab === "book" && (
              <motion.div
                layoutId="tab"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === "history"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            History
            {activeTab === "history" && (
              <motion.div
                layoutId="tab"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
              />
            )}
          </button>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h3 className="font-bold text-gray-800 text-lg">
                Recent Activity
              </h3>
              <AppointmentsList appointments={appointments.slice(0, 3)} />
              {appointments.length > 3 && (
                <button
                  onClick={() => setActiveTab("history")}
                  className="text-blue-600 font-medium text-sm hover:underline"
                >
                  View all appointments
                </button>
              )}
            </div>
          )}

          {activeTab === "book" && (
            <div className="max-w-3xl">
              <AppointmentBooking onSuccess={handleBookingSuccess} />
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">
                  Appointment History
                </h3>
              </div>
              <AppointmentsList appointments={appointments} />
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
