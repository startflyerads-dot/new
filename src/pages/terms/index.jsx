import React from "react";
import { Helmet } from "react-helmet";

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions — startflyerads</title>
        <meta name="description" content="Terms and conditions for using startflyerads services and website." />
        <link rel="canonical" href="/terms" />
      </Helmet>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <section className="bg-card p-6 rounded-2xl border border-border">
            <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground mb-4">
              Welcome to startflyerads. By using our website and services you agree to the following terms and conditions.
            </p>

            <h2 className="text-lg font-semibold mt-4">1. Use of Service</h2>
            <p className="text-muted-foreground">
              You agree to use our services for lawful purposes only. startflyerads reserves the right to suspend or terminate accounts that violate these terms.
            </p>

            <h2 className="text-lg font-semibold mt-4">2. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, logos and materials on this site are the property of startflyerads or its licensors.
            </p>

            <h2 className="text-lg font-semibold mt-4">3. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              startflyerads is not liable for indirect or consequential damages arising from use of our services.
            </p>

            <h2 className="text-lg font-semibold mt-4">4. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these terms contact <a href="mailto:legal@startflyerads.com" className="text-primary">legal@startflyerads.com</a>.
            </p>

            <p className="text-xs text-muted-foreground mt-6">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </main>
    </>
  );
};

export default TermsPage;