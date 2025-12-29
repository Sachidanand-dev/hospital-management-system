import { Clock, Calendar, User, MapPin } from "lucide-react";

const AppointmentsList = ({ appointments }) => {
  if (!appointments?.length) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
          <Calendar size={32} />
        </div>
        <h3 className="text-gray-900 font-bold text-lg">
          No Appointments Found
        </h3>
        <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
          You haven't scheduled any appointments yet. Book one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {appointments.map((apt, index) => (
        <div
          key={apt._id}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          style={{
            animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards`,
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 text-white">
                <User size={28} />
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  Dr. {apt.doctor?.user?.name || "Unknown"}
                </h4>
                <p className="text-blue-600 font-medium">
                  {apt.doctor?.specialization}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${
                  apt.status === "SCHEDULED"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : apt.status === "COMPLETED"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {apt.status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Calendar size={16} className="text-blue-500" />
              {new Date(apt.date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
              <Clock size={16} className="text-orange-500" />
              {apt.startTime}
            </div>
            {apt.doctor?.hospital && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                <MapPin size={16} className="text-purple-500" />
                {apt.doctor.hospital}
              </div>
            )}
          </div>
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AppointmentsList;
