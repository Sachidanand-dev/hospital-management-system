import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Activity,
  ShieldCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  Heart,
} from "lucide-react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const services = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Online Booking",
      desc: "Book appointments instantly without waiting in long queues.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Qualified Doctors",
      desc: "Get treated by highly qualified and experienced specialists.",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "24/7 Support",
      desc: "Round-the-clock support for all your medical emergencies.",
    },
  ];

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "Simply create an account, log in, and choose your preferred doctor and date. It's that easy!",
    },
    {
      question: "Can I cancel my appointment?",
      answer:
        "Yes, you can cancel or reschedule your appointment from your dashboard.",
    },
    {
      question: "Is my medical data safe?",
      answer:
        "Absolutely. We use industry-standard encryption to protect your personal and medical information.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 lg:pt-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
              Next-Gen Healthcare
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
              Modern Healthcare <br />
              <span className="text-blue-600">Simplified for You.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Experience the future of hospital management. Book appointments,
              access records, and consult with doctors seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
              >
                Book Appointment
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 font-bold rounded-xl transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              We provide the best healthcare experience with modern technology
              and compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group cursor-default"
              >
                <div className="mb-6 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {faq.question}
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 pt-2 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MediCare</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Providing advanced healthcare management solutions for a better
                tomorrow.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-blue-400">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-blue-400">
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail size={16} /> support@medicare.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} /> +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} /> 123 Health St, NY
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} MediCare System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
