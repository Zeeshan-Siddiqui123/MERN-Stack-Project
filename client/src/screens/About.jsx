import React from 'react';
import {
  FaClock,
  FaCogs,
  FaBolt,
  FaAward,
  FaShieldAlt,
  FaCheckCircle,
  FaThumbsUp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen mt-22 text-white px-4 py-10 md:px-20  animate-fade-in animate-slide-down">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#f49521] tracking-wide mb-4">
          About Auric Watch
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Precision. Elegance. Innovation. Auric Watch is more than a timepiece—it's a legacy.
        </p>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <img
            src="/images/logo.png"
            alt="Auric Watch"
            className="w-full max-w-md object-cover"
            style={{
              animation: 'badgeBounce 2s ease-in-out '
            }}
          />
        </div>

        <div className="space-y-6">
          <Feature
            icon={<FaClock size={24} className="text-[#f49521]" />}
            title="Timeless Craftsmanship"
            description="Designed by master artisans, every Auric watch blends tradition with modern minimalism."
          />
          <Feature
            icon={<FaCogs size={24} className="text-[#f49521]" />}
            title="Precision Engineering"
            description="Driven by advanced mechanics and refined design, it ensures accuracy and durability."
          />
          <Feature
            icon={<FaBolt size={24} className="text-[#f49521]" />}
            title="Modern Aesthetics"
            description="Minimalist. Bold. Iconic. Our designs suit every personality and occasion."
          />
          <Feature
            icon={<FaAward size={24} className="text-[#f49521]" />}
            title="Trusted Legacy"
            description="Auric is trusted by over 1000 satisfied users in Pakistan. Excellence is our promise."
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-20 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#f49521]">Our Mission</h2>
        <p className="text-gray-300 text-lg">
          At Auric, we believe time is art. Our mission is to create watches that not only keep
          time—but define it. We blend cutting-edge innovation with refined aesthetics to deliver
          something truly timeless.
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-[#f49521] mb-10">Why Choose Auric?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <WhyCard
            icon={<FaCheckCircle size={32} className="text-[#f49521]" />}
            title="Premium Quality"
            desc="Only the finest materials—crafted with care and precision."
          />
          <WhyCard
            icon={<FaThumbsUp size={32} className="text-[#f49521]" />}
            title="Customer Satisfaction"
            desc="Over 1000+ customers trust us. Your satisfaction is guaranteed."
          />
          <WhyCard
            icon={<FaShieldAlt size={32} className="text-[#f49521]" />}
            title="1-Year Warranty"
            desc="Every watch comes with full warranty and premium support."
          />
        </div>
      </div>

      {/* Contact & Details Section */}
      <div className="mt-20 border-t border-gray-700 pt-12">
        <h2 className="text-3xl font-bold  text-[#f49521] mb-8 lg:text-center">
          Contact & Company Info
        </h2>

        <div className="flex flex-wrap items-center justify-start gap-8 text-gray-300 lg:justify-center">


          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#f49521]" />
              <span>Karachi, Pakistan</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#f49521]" />
              <span>+92 3220257882</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#f49521]" />
              <span>aurictime0@gmail.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaFacebook className="text-[#f49521]" />
              <span>/auricwatch</span>
            </div>
            <div className="flex items-center gap-3">
              <FaInstagram className="text-[#f49521]" />
              <span>auric_time_</span>
            </div>
            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-[#f49521]" />
              <span>Auric Time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Feature Component
const Feature = ({ icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div>{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

// Reusable Card for "Why Choose Us"
const WhyCard = ({ icon, title, desc }) => (
  <div className="bg-[#1f1f1f] p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
    <div className="mb-4">{icon}</div>
    <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
    <p className="text-gray-400">{desc}</p>
  </div>
);

export default About;
