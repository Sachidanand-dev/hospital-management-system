import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Users, UserPlus, Calendar, Activity, Loader2 } from "lucide-react";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const statsRes = await api.get("/admin/stats");
        setStats(statsRes.data);

        const appointmentsRes = await api.get("/admin/appointments");
        setAppointments(appointmentsRes.data);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 px-6 pb-10">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            System overview and user management
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Users size={20} className="text-blue-500" /> Total Patients
            </h3>
            <p className="text-4xl font-bold text-gray-800">
              {stats.totalPatients}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <UserPlus size={20} className="text-green-500" /> Total Doctors
            </h3>
            <p className="text-4xl font-bold text-gray-800">
              {stats.totalDoctors}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Calendar size={20} className="text-purple-500" /> Appointments
            </h3>
            <p className="text-4xl font-bold text-gray-800">
              {stats.totalAppointments}
            </p>
          </div>
        </div>

        {/* Recent Appointments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">All Appointments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-semibold">
                <tr>
                  <th className="px-6 py-3">Patient</th>
                  <th className="px-6 py-3">Age</th>
                  <th className="px-6 py-3">Doctor</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Queue No.</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.length > 0 ? (
                  appointments.map((apt) => (
                    <tr key={apt._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {apt.patient?.user?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4">{apt.patient?.age || "-"}</td>
                      <td className="px-6 py-4">
                        Dr. {apt.doctor?.user?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(apt.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">
                          #{apt.queueNumber || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            apt.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : apt.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
