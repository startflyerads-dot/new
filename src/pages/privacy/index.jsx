import React from "react";
import { Helmet } from "react-helmet";
import Privacy from "../../components/ui/Privacy";

const PrivacyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — startflyerads</title>
        <meta name="description" content="Read the privacy policy of startflyerads. Learn how we collect, use and protect your data." />
        <link rel="canonical" href="/privacy" />
      </Helmet>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <Privacy />
        </div>
      </main>
    </>
  );
};

export default PrivacyPage;