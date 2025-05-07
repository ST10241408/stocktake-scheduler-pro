
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Public pages
import LandingPage from "./pages/public/LandingPage";
import AboutPage from "./pages/public/AboutPage";
import ServicesPage from "./pages/public/ServicesPage";
import ContactPage from "./pages/public/ContactPage";
import FaqPage from "./pages/public/FaqPage";
import NotFound from "./pages/NotFound";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Dashboard pages
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import ClientDashboard from "./pages/dashboard/client/ClientDashboard";
import ClientsPage from "./pages/dashboard/ClientsPage";
import JobsPage from "./pages/dashboard/JobsPage";
import UsersPage from "./pages/dashboard/UsersPage";
import ProfilePage from "./pages/dashboard/ProfilePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="client" element={<ClientDashboard />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
