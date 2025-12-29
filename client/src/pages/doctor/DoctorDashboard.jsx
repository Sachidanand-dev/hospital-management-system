import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyAppointments } from "../../api/appointment.api";
import DoctorStats from "../../components/doctor/DoctorStats";
import DoctorAppointments from "../../components/doctor/DoctorAppointments";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const data = await getMyAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Failed to load appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <Layout>
      <div className="space-y-6 px-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, Dr. {user?.name?.split(" ")[0]} 👨‍⚕️
          </h1>
          <p className="text-gray-500">Here's your schedule for today.</p>
        </div>

        <DoctorStats appointments={appointments} />

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Patient Appointments
          </h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <DoctorAppointments
              appointments={appointments}
              onUpdate={fetchAppointments}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
