import React, { useState } from "react";

const ScheduleFreeConsultation = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "",
    consultationType: "",
    services: [],
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      services: checked ? [...prev.services, value] : prev.services.filter((s) => s !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to schedule");
      setStatus({ type: "success", message: data.message || "Consultation scheduled!" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        date: "",
        time: "",
        consultationType: "",
        services: [],
        message: "",
      });
      if (typeof onClose === "function") setTimeout(onClose, 1200);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-[#0d0d12]/80 backdrop-blur-md p-6 rounded-2xl border border-[#1a1a23] shadow-lg"
      >
        <h3 className="text-lg font-semibold text-white">Schedule Free Consultation</h3>

        <div className="grid sm:grid-cols-2 gap-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="px-3 py-2 rounded-lg bg-[#0b0b10] border border-[#22222b] text-dark placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="px-3 py-2 rounded-lg bg-[#0b0b10] border border-[#22222b] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="px-3 py-2 rounded-lg bg-[#0b0b10] border border-[#22222b] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
          />
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="px-3 py-2 rounded-lg bg-[#0b0b10] border border-[#22222b] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <label className="text-white/80 text-sm">
            <div className="mb-1">Preferred Date</div>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#0b0b10] border border-[#22222b] text-white focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
              required
            />
          </label>
          <label className="text-white/80 text-sm">
            <div className="mb-1">Preferred Time</div>
            <input
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-[#0b0b10] border border-[#22222b] text-white focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
              required
            />
          </label>
        </div>

        <select
          name="consultationType"
          value={formData.consultationType}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-[#0b0b10] border border-[#22222b] text-white focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
        >
          <option value="">Select Consultation Type</option>
          <option value="Business Strategy">Business Strategy</option>
          <option value="Website Development">Website Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
        </select>

        <div>
          <div className="text-white/80 mb-2">Select Services</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Web Design", "App Development", "Branding", "SEO"].map((s) => (
              <label key={s} className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  value={s}
                  checked={formData.services.includes(s)}
                  onChange={handleServiceChange}
                  className="w-4 h-4 accent-[#e57b46] bg-transparent border border-[#22222b] rounded-sm"
                />
                <span className="text-sm">{s}</span>
              </label>
            ))}
          </div>
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          className="w-full px-3 py-2 rounded-lg bg-[#0b0b10] border border-[#22222b] text-white placeholder:text-white/30"
          rows={4}
        />

        {status && (
          <div
            className={`p-3 rounded-md text-sm ${
              status.type === "success" ? "bg-[#072614] text-green-300" : "bg-[#2a0e0f] text-red-300"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 px-4 bg-gradient-to-r from-[#e57b46] to-[#B9AEDF] text-white rounded-lg shadow-md hover:opacity-95 transition"
          >
            {loading ? "Scheduling..." : "Schedule Now"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-transparent text-white rounded-lg border border-[#22222b] hover:bg-[#0f0f14] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleFreeConsultation;