import { useAuth } from "../context/AuthContext";
import PatientDashboard from "./patient/PatientDashboard";
import DoctorDashboard from "./doctor/DoctorDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Layout from "../components/Layout";

const Dashboard = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case "PATIENT":
      return <PatientDashboard />;
    case "DOCTOR":
      return <DoctorDashboard />;
    case "ADMIN":
      return <AdminDashboard />;
    default:
      return (
        <Layout>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-700">Unknown Role</h2>
            <p className="text-gray-500">Please contact support.</p>
          </div>
        </Layout>
      );
  }
};

export default Dashboard;
