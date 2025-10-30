import React, { useState } from 'react';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', preferredDate: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://server-rho-cyan.vercel.app/api/form3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || 'Failed to send request');
      }

      setSent(true);
      setForm({ name: '', email: '', company: '', message: '', preferredDate: '' });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
      // close after short delay when success
      if (!error) setTimeout(() => { onClose?.(); setSent(false); }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md sm:max-w-lg mx-4 z-10"> {/* changed max widths */}
        <div className="bg-[#0d0d12]/95 rounded-lg p-4 sm:p-6 lg:p-8 shadow-xl border border-[#22222b] max-h-[90vh] overflow-auto"> {/* responsive padding + max-h */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Schedule Free Consultation</h3>
            <button onClick={onClose} className="text-sm text-white/70 hover:text-white">Close</button>
          </div>

          {sent ? (
            <div className="p-6 text-center">
              <div className="text-green-400 font-semibold mb-2">Request sent</div>
              <p className="text-sm text-white/70">We'll contact you shortly to confirm the appointment.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-sm block mb-1 text-white/80">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 rounded px-3 py-2 bg-[#0b0b10] border border-[#22222b] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="min-w-0">
                  <label className="text-sm block mb-1 text-white/80">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full min-w-0 rounded px-3 py-2 bg-[#0b0b10] border border-[#22222b] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
                  />
                </div>
                <div className="min-w-0">
                  <label className="text-sm block mb-1 text-white/80">Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full min-w-0 rounded px-3 py-2 bg-[#0b0b10] border border-[#22222b] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm block mb-1 text-white/80">Preferred date / time</label>
                <input
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  className="w-full min-w-0 rounded px-3 py-2 bg-[#0b0b10] border border-[#22222b] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
                  placeholder="e.g. 2025-10-20 10:00 AM"
                />
              </div>

              <div>
                <label className="text-sm block mb-1 text-white/80">Message / Goals</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full min-w-0 rounded px-3 py-2 bg-[#0b0b10] border border-[#22222b] text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e57b46]/20"
                />
              </div>

              {error && <div className="text-sm text-red-400">{error}</div>}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"> {/* stack on mobile */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 px-4 py-2 bg-gradient-to-r from-[#e57b46] to-[#B9AEDF] text-white rounded hover:opacity-95 disabled:opacity-60"
                >
                  {loading ? 'Sending...' : 'Request Consultation'}
                </button>
                <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 border rounded text-white/90 border-[#2a2a34] hover:bg-[#0f0f14]">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;