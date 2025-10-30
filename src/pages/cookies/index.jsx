import React from "react";
import { Helmet } from "react-helmet";

const CookiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy — startflyerads</title>
        <meta name="description" content="Learn about the cookies startflyerads uses and how to manage them." />
        <link rel="canonical" href="/cookies" />
      </Helmet>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <section className="bg-card p-6 rounded-2xl border border-border">
            <h1 className="text-2xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground mb-4">
              We use cookies to improve your experience, analyze traffic, and deliver personalized content.
            </p>

            <h2 className="text-lg font-semibold mt-4">What are cookies?</h2>
            <p className="text-muted-foreground">
              Cookies are small text files stored on your device to remember preferences and collect analytics.
            </p>

            <h2 className="text-lg font-semibold mt-4">How we use cookies</h2>
            <ul className="list-disc ml-5 text-muted-foreground">
              <li>Essential cookies to enable site functionality</li>
              <li>Analytics cookies to understand site usage</li>
              <li>Advertising cookies for relevant ads</li>
            </ul>

            <h2 className="text-lg font-semibold mt-4">Manage cookies</h2>
            <p className="text-muted-foreground">
              You can control cookies via your browser settings. Disabling some cookies may affect site functionality.
            </p>

            <p className="text-xs text-muted-foreground mt-6">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </main>
    </>
  );
};

export default CookiesPage;