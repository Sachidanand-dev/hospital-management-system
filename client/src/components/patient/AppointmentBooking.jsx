import { useState, useEffect } from "react";
import { getAllDoctors } from "../../api/doctor.api";
import { bookAppointment } from "../../api/appointment.api";
import {
  Loader2,
  Calendar,
  Stethoscope,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const AppointmentBooking = ({ onSuccess }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    reason: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctors();
        setDoctors(data);
      } catch (err) {
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await bookAppointment({ ...formData });
      setSuccess(
        `Appointment booked successfully! Your Queue Number is ${response.queueNumber}`
      );
      setFormData({
        doctorId: "",
        date: "",
        reason: "",
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Calendar className="text-blue-600" />
        Book New Appointment
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Doctor
          </label>

          <div className="relative">
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none bg-white font-medium text-gray-700"
            >
              <option value="" disabled>
                Choose a specialist...
              </option>
              {doctors.length > 0 ? (
                doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    Dr. {doc.user?.name || "Unknown"} - {doc.specialization}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No doctors available
                </option>
              )}
            </select>
            <Stethoscope className="absolute left-3 top-2.5 text-gray-400 h-5 w-5 pointer-events-none" />
            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 h-5 w-5 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
              <Calendar className="absolute left-3 top-2.5 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason (Optional)
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            placeholder="Briefly describe your symptoms..."
            rows="2"
            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        {/* Simplified form for debugging */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-all"
        >
          {submitting ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Confirm Appointment"
          )}
        </button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
