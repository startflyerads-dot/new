import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || (import.meta?.env?.VITE_EMAILJS_SERVICE_ID);
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || (import.meta?.env?.VITE_EMAILJS_TEMPLATE_ID);
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || (import.meta?.env?.VITE_EMAILJS_PUBLIC_KEY);

const sendEmail = async (formData) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return { ok: false, error: new Error('EmailJS not configured (missing env vars)') };
  }

  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
    return { ok: true, result };
  } catch (error) {
    return { ok: false, error };
  }
};

export default sendEmail;