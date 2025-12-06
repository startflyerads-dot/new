import React from 'react';
import Header from '../ui/Header';
import Footer from '../ui/footer'

export default function Privacy() {
  // default theme color (can be changed centrally)
  const primaryColor = '#06b6d4'; // teal-cyan
  const primaryText = '#0f1724'; // dark foreground for buttons

  return (
    <>
    <Header/>
    <main className="py-16 bg-gradient from-slate-900 via-slate-900 to-slate-800 text-slate-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-white">Privacy Policy</h1>
          <p className="text-sm text-slate-300 mb-6">
            Effective date: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">Introduction</h2>
            <p className="leading-relaxed text-slate-300">
              Startflyer Ads ("we", "us", "our") respects your privacy. This policy explains what information we collect,
              how we use it, with whom we share it, and the choices you have regarding your information when you use
              our website and services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">Information we collect</h2>
            <ul className="list-disc pl-5 leading-relaxed text-slate-300">
              <li>Contact information you provide (name, email, phone, company).</li>
              <li>Form responses and submissions (quotes, wizard answers, messages).</li>
              <li>Automatically collected data (IP address, browser type, device, pages visited, timestamps).</li>
              <li>Cookies and similar tracking technologies.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">How we use your information</h2>
            <p className="leading-relaxed text-slate-300">
              We use information to respond to inquiries, send quotes, provide services, improve the website and marketing,
              and for security and analytics. We may also use data to comply with legal obligations.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">Cookies & tracking</h2>
            <p className="leading-relaxed text-slate-300">
              We use cookies and similar technologies to enable core site functionality, remember preferences, and
              analyze site usage. You can control cookies through your browser settings; blocking cookies may affect
              site features.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">Third-party services</h2>
            <p className="leading-relaxed text-slate-300">
              We may share data with trusted third-party providers (email services, analytics, payment processors) to
              operate and improve our services. Those providers are required to protect your information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">Data retention & security</h2>
            <p className="leading-relaxed text-slate-300">
              We retain personal data as long as necessary to provide services and comply with legal obligations. We
              implement reasonable technical and organizational measures to protect data, but no method of transmission
              or storage is 100% secure.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">Your rights</h2>
            <p className="leading-relaxed text-slate-300">
              Depending on your jurisdiction, you may have rights to access, correct, delete, or export your personal
              data, and to object to certain processing. To exercise your rights, contact us using the details below.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">Children</h2>
            <p className="leading-relaxed text-slate-300">
              Our services are not directed to children under 16. We do not knowingly collect personal data from children.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-slate-100">Contact us</h2>
            <p className="leading-relaxed text-slate-300">
              For questions or requests about this policy or your personal data, contact:
            </p>
            <ul className="list-none pl-0 mt-3 text-slate-300">
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:startflyerads@gmail.com" className="text-cyan-400 hover:underline">
                  startflyerads@gmail.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href="tel:+919876543210" className="text-cyan-400 hover:underline">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-medium mb-2 text-slate-100">Changes to this policy</h2>
            <p className="leading-relaxed text-slate-300">
              We may update this policy periodically. We will post the revised policy on this page with an updated
              effective date.
            </p>
          </section>

          <div className="mt-8 flex gap-3">
            <a
              href="/contact"
              className="inline-block px-5 py-3 font-semibold rounded-md"
              style={{ backgroundColor: primaryColor, color: primaryText }}
            >
              Contact Us
            </a>
            <a
              href="/"
              className="inline-block px-5 py-3 border rounded-md hover:bg-slate-700/50"
              style={{ borderColor: 'rgba(148,163,184,0.12)', color: '#e6eef3' }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
    <Footer/>
    </>

  );
}