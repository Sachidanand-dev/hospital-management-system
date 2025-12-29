import { updateAppointmentStatus } from "../../api/appointment.api";
import { Check, X, Clock, Calendar, User, MoreVertical } from "lucide-react";

const DoctorAppointments = ({ appointments, onUpdate }) => {
  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      onUpdate();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (!appointments?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <Calendar className="text-gray-300 mb-3" size={48} />
        <p className="text-gray-500 font-medium">No appointments scheduled.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Patient
              </th>
              <th className="p-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Schedule
              </th>
              <th className="p-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Complaint
              </th>
              <th className="p-5 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                Status
              </th>
              <th className="p-5 font-semibold text-gray-500 text-xs uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {appointments.map((apt) => (
              <tr
                key={apt._id}
                className="group hover:bg-blue-50/30 transition-colors duration-200"
              >
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm ring-2 ring-white">
                      {apt.patient?.user?.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {apt.patient?.user?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md inline-block mt-1">
                        Age: {apt.patient?.age || "?"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                      <Calendar size={14} className="text-blue-500" />
                      {new Date(apt.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={14} className="text-orange-500" />
                      {apt.startTime}
                    </span>
                  </div>
                </td>
                <td className="p-5">
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-600 truncate bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      {apt.reason}
                    </p>
                  </div>
                </td>
                <td className="p-5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      apt.status === "SCHEDULED"
                        ? "bg-amber-100 text-amber-700 border border-amber-200"
                        : apt.status === "COMPLETED"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-rose-100 text-rose-700 border border-rose-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        apt.status === "SCHEDULED"
                          ? "bg-amber-500"
                          : apt.status === "COMPLETED"
                          ? "bg-emerald-500"
                          : "bg-rose-500"
                      }`}
                    ></span>
                    {apt.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  {apt.status === "SCHEDULED" ? (
                    <div className="flex justify-end gap-2 opacity-100 transition-opacity">
                      <button
                        onClick={() => handleStatusUpdate(apt._id, "COMPLETED")}
                        className="flex items-center justify-center w-8 h-8 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-all border border-transparent hover:border-emerald-200"
                        title="Mark Complete"
                      >
                        <Check size={16} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(apt._id, "CANCELLED")}
                        className="flex items-center justify-center w-8 h-8 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-lg transition-all border border-transparent hover:border-rose-200"
                        title="Cancel Appointment"
                      >
                        <X size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-300 text-sm italic">--</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;
