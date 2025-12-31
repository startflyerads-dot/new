import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Homepage from "./pages/homepage";
import ServicesPage from "./pages/services";
import ClientPortal from "./pages/client-portal";
import Resources from "./pages/resources";
import ContactPage from "./pages/contact";
import About from "./pages/about";
import Privacy from "./pages/privacy";
import TermsPage from "./pages/terms";
import cookies from "./pages/cookies";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Admin Portal (Placeholder for now)
const AdminPortal = lazy(() => import("./pages/admin-portal"));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/cookie" element={cookies()} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/client-portal" element={
            <ProtectedRoute>
              <ClientPortal />
            </ProtectedRoute>
          } />

          <Route path="/admin-portal" element={
            <ProtectedRoute adminOnly>
              <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>}>
                <AdminPortal />
              </Suspense>
            </ProtectedRoute>
          } />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;