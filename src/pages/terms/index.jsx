import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldAlert, Scale, CreditCard, Ban, Mail } from 'lucide-react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';

export default function TermsPage() {
  // Theme colors kept for compatibility if needed elsewhere
  const primaryColor = '#06b6d4'; // teal-cyan
  const primaryText = '#0f1724'; // dark foreground for buttons

  return (
    <>
      <Header />
      <div className="py-16 from-slate-900 via-slate-900 to-slate-800 text-slate-100 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl shadow-lg p-8 backdrop-blur-sm">
            
            {/* Header */}
            <div className="border-b border-slate-700 pb-8 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white flex items-center gap-3">
                <FileText className="text-primary" size={32} />
                Terms & Conditions
              </h1>
              <p className="text-slate-400">
                Please read these terms carefully before using our services. By accessing or using StartFlyerAds, you agree to be bound by these terms.
              </p>
              <p className="text-sm text-slate-500 mt-4">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Section 1: Introduction */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-100 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-primary text-xs font-bold">1</span>
                Agreement to Terms
              </h2>
              <p className="leading-relaxed text-slate-300">
                Welcome to StartFlyerAds. These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "you") and StartFlyerAds ("we", "us", "our") concerning your access to and use of our website and advertising services. If you do not agree with these Terms, you must not use our services.
              </p>
            </section>

            {/* Section 2: Services */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-100 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-primary text-xs font-bold">2</span>
                Services Provided
              </h2>
              <p className="leading-relaxed text-slate-300 mb-3">
                StartFlyerAds provides digital advertising solutions, including but not limited to ad campaign management, analytics, and creative optimization services. We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
              </p>
            </section>

            {/* Section 3: User Accounts */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-100 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-primary text-xs font-bold">3</span>
                User Accounts
              </h2>
              <ul className="list-disc pl-5 leading-relaxed text-slate-300 marker:text-primary space-y-2">
                <li>
                  <strong>Registration:</strong> You may need to register for an account to access certain features. You agree to provide accurate, current, and complete information during registration.
                </li>
                <li>
                  <strong>Security:</strong> You are responsible for safeguarding your password and for any activities or actions under your account. You must notify us immediately of any unauthorized use of your account.
                </li>
                <li>
                  <strong>Eligibility:</strong> You must be at least 18 years old to use our services.
                </li>
              </ul>
            </section>

            {/* Section 4: Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-100 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-primary text-xs font-bold">4</span>
                Intellectual Property
              </h2>
              <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                <p className="leading-relaxed text-slate-300 mb-3">
                  <strong>Our Content:</strong> The website, its original content, features, and functionality are owned by StartFlyerAds and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="leading-relaxed text-slate-300">
                  <strong>Your Content:</strong> You retain ownership of any content (images, text, ads) you submit to our services. However, by submitting content, you grant us a worldwide, non-exclusive license to use, reproduce, and display such content for the purpose of providing our services.
                </p>
              </div>
            </section>

            {/* Section 5: Prohibited Activities */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-100 flex items-center gap-2">
                <Ban size={20} className="text-red-400" />
                Prohibited Activities
              </h2>
              <p className="leading-relaxed text-slate-300 mb-3">You agree not to engage in any of the following prohibited activities:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                {[
                  "Violating laws or regulations",
                  "Infringing intellectual property rights",
                  "Distributing malware or viruses",
                  "Fraudulent or deceptive practices",
                  "Interfering with site security",
                  "Data scraping or mining"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 bg-slate-700/30 px-3 py-2 rounded-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 6: Payment & Refunds */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-100 flex items-center gap-2">
                <CreditCard size={20} className="text-primary" />
                Payment & Refund Policy
              </h2>
              <p className="leading-relaxed text-slate-300 mb-3">
                All fees for services are due as specified at the point of purchase. Prices are subject to change with notice.
              </p>
              <p className="leading-relaxed text-slate-300">
                Unless otherwise stated in a specific service agreement, payments for ad spend and service fees are <strong>non-refundable</strong> once the service has commenced or the ad campaign has launched.
              </p>
            </section>

            {/* Section 7: Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-100 flex items-center gap-2">
                <ShieldAlert size={20} className="text-amber-400" />
                Limitation of Liability
              </h2>
              <p className="leading-relaxed text-slate-300 italic border-l-2 border-amber-500/50 pl-4">
                To the maximum extent permitted by law, StartFlyerAds shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of your access to or use of our services.
              </p>
            </section>

            {/* Section 8: Governing Law */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-slate-100 flex items-center gap-2">
                <Scale size={20} className="text-slate-400" />
                Governing Law
              </h2>
              <p className="leading-relaxed text-slate-300">
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which StartFlyerAds operates, without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Section 9: Contact */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-3 text-slate-100 flex items-center gap-2">
                <Mail size={20} className="text-primary" />
                Contact Us
              </h2>
              <p className="leading-relaxed text-slate-300 mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="inline-block bg-slate-900 px-6 py-4 rounded-lg border border-slate-700">
                <a href="mailto:legal@startflyerads.com" className="text-primary hover:text-primary/80 font-medium hover:underline text-lg">
                  legal@startflyerads.com
                </a>
              </div>
            </section>

            {/* Footer Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
              <Link
                to="/"
                className="inline-flex justify-center items-center px-6 py-3 font-semibold rounded-md transition-all active:scale-95 text-center bg-primary text-primary-foreground hover:brightness-110"
              >
                Accept & Continue
              </Link>
              <Link
                to="/privacy"
                className="inline-flex justify-center items-center px-6 py-3 border border-primary/20 rounded-md text-primary hover:bg-primary/10 transition-colors text-center"
              >
                Privacy Policy
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}