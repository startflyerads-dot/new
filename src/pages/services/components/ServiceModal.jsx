import React, { useEffect, useState } from 'react';

const ServiceModal = ({ service, isOpen, onClose, type = 'details' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'sent'|'error'

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', company: '', budget: '', timeline: '', message: '' });
      setSending(false);
      setStatus(null);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target || {};
    if (!name) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!formData.name || !formData.email) {
      setStatus('error');
      return;
    }

    setSending(true);
    setStatus(null);

    try {
      const payload = {
        service: service ? { id: service.id, title: service.title } : null,
        form: formData,
        timestamp: new Date().toISOString(),
        metadata: {
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          url: typeof window !== 'undefined' ? window.location.href : ''
        }
      };

      const res = await fetch('https://server-rho-cyan.vercel.app/api/form5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to send');

      setStatus('sent');
      setTimeout(() => onClose && onClose(), 1100);
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setSending(false); 
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div className="bg-[#0b1220] rounded-2xl w-full max-w-lg p-6 text-white shadow-2xl border border-white/5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{`Request Quote ${service ? `— ${service.title}` : ''}`}</h3>
          <button
            onClick={() => onClose && onClose()}
            className="text-slate-300 hover:text-white transition"
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full p-3 bg-[#0f1724] border border-[#21303f] rounded placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 bg-[#0f1724] border border-[#21303f] rounded placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company (optional)"
            className="w-full p-3 bg-[#0f1724] border border-[#21303f] rounded placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget (optional)"
            className="w-full p-3 bg-[#0f1724] border border-[#21303f] rounded placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            placeholder="Desired timeline"
            className="w-full p-3 bg-[#0f1724] border border-[#21303f] rounded placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full p-3 bg-[#0f1724] border border-[#21303f] rounded placeholder:text-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows="4"
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={sending}
              className="px-4 py-2 bg-primary text-primary-foreground rounded shadow hover:brightness-105 transition flex items-center gap-2"
            >
              {sending ? 'Sending...' : 'Get Quote'}
            </button>

            <button
              type="button"
              onClick={() => onClose && onClose()}
              className="px-4 py-2 border border-white/10 text-slate-300 rounded hover:bg-white/2 transition"
            >
              Cancel
            </button>
          </div>

          {status === 'sent' && <div className="text-sm text-green-400">Quote request sent.</div>}
          {status === 'error' && <div className="text-sm text-red-400">Failed to send. Ensure required fields are filled.</div>}
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;