import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ServicesPage from "./pages/services";
import ClientPortal from "./pages/client-portal";
import Resources from "./pages/resources";
import ContactPage from "./pages/contact";
import About from "./pages/about";
import Homepage from "./pages/homepage";
import cookies from "./pages/cookies";
import Privacy from "./pages/privacy";
import TermsPage from "./pages/terms";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/client-portal" element={<ClientPortal />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/cookie" element={cookies()} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsPage />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;