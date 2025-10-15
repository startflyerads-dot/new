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
      // POST to your backend function that will send the email to startflyerads@gmail.com
      const res = await fetch('/api/consultation', {
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
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-lg mx-4 p-6 shadow-xl z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Schedule Free Consultation</h3>
          <button onClick={onClose} className="text-sm text-muted-foreground">Close</button>
        </div>

        {sent ? (
          <div className="p-6 text-center">
            <div className="text-green-600 font-semibold mb-2">Request sent</div>
            <p className="text-sm text-muted-foreground">We'll contact you shortly to confirm the appointment.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-sm block mb-1">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm block mb-1">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="text-sm block mb-1">Company</label>
                <input name="company" value={form.company} onChange={handleChange} className="w-full border rounded px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="text-sm block mb-1">Preferred date / time</label>
              <input name="preferredDate" value={form.preferredDate} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="e.g. 2025-10-20 10:00 AM" />
            </div>

            <div>
              <label className="text-sm block mb-1">Message / Goals</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="4" className="w-full border rounded px-3 py-2" />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="flex items-center justify-between gap-3">
              <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded hover:opacity-95 disabled:opacity-60">
                {loading ? 'Sending...' : 'Request Consultation'}
              </button>
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;