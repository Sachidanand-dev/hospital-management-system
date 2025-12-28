import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Lock,
  Mail,
  User,
  Loader2,
  AlertCircle,
  Stethoscope,
  ShieldPlus,
} from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT",
  });
  const [formError, setFormError] = useState(null);

  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setFormError(err.response?.data?.message || "Registration failed");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Branding & Info (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-indigo-900">
        <div className="absolute inset-0 bg-linear-to-bl from-indigo-900 via-purple-900 to-indigo-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=2028&q=80')] bg-cover bg-center mix-blend-overlay"></div>

        {/* Animated Shapes */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[100px]"
        />

        <div className="relative z-10 flex flex-col justify-center px-12 text-white h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl">
                <ShieldPlus size={32} className="text-indigo-200" />
              </div>
              <span className="text-2xl font-bold tracking-wider">
                MEDICARE+
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Join the Leading <br /> Healthcare Network
            </h1>

            <div className="space-y-4 text-indigo-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center">
                  <Stethoscope size={16} />
                </div>
                <span>Connect with top specialists</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center">
                  <User size={16} />
                </div>
                <span>Manage patient records securely</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-md w-full"
        >
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Get started with your free account today.
            </p>
          </div>

          {(error || formError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3 text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100"
            >
              <AlertCircle size={20} className="shrink-0" />
              <span>{formError || error}</span>
            </motion.div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="group">
              <label
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="group">
              <label
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="group">
              <label
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
                htmlFor="role"
              >
                I am a...
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  className="block w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50 appearance-none"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="PATIENT">Patient (Seeking Care)</option>
                  <option value="DOCTOR">Doctor (Medical Professional)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group">
              <label
                className="block text-sm font-medium text-gray-700 mb-1 ml-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-white/50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30 transition-all mt-6"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
