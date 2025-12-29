import { Users, Calendar, Clock, Activity } from "lucide-react";

const DoctorStats = ({ appointments }) => {
  const totalPatients = new Set(appointments.map((a) => a.patient?._id)).size;
  const todayAppointments = appointments.filter((a) => {
    const today = new Date().toISOString().split("T")[0];
    return a.date && a.date.startsWith(today) && a.status === "SCHEDULED";
  }).length;

  const stats = [
    {
      label: "Total Patients",
      value: totalPatients,
      icon: Users,
      bg: "bg-linear-to-br from-blue-500 to-blue-600",
      text: "text-white",
      iconBg: "bg-white/20",
      iconColor: "text-white",
    },
    {
      label: "Today's Appointments",
      value: todayAppointments,
      icon: Calendar,
      bg: "bg-white",
      text: "text-gray-900",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      border: "border-gray-100",
    },
    {
      label: "Pending Reviews",
      value: "0",
      icon: Activity,
      bg: "bg-white",
      text: "text-gray-900",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      border: "border-gray-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-6 rounded-2xl shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1 ${
            stat.bg
          } ${stat.border ? `border ${stat.border}` : ""}`}
        >
          <div className={`p-4 rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p
              className={`text-sm font-medium opacity-80 ${
                stat.text === "text-white" ? "text-blue-50" : "text-gray-500"
              }`}
            >
              {stat.label}
            </p>
            <h3 className={`text-3xl font-bold ${stat.text}`}>{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorStats;
