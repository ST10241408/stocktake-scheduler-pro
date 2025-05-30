
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
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFound from "./pages/NotFound";

// Dashboard pages
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import ClientDashboard from "./pages/dashboard/client/ClientDashboard";
import ClientsPage from "./pages/dashboard/ClientsPage";
import JobsPage from "./pages/dashboard/JobsPage";
import UsersPage from "./pages/dashboard/UsersPage";
import ProfilePage from "./pages/dashboard/ProfilePage";

// New pages for various roles
import SettingsPage from "./pages/dashboard/SettingsPage";
import BookPage from "./pages/dashboard/client/BookPage";
import ReportsPage from "./pages/dashboard/supervisor/ReportsPage";
import MessagesPage from "./pages/dashboard/receptionist/MessagesPage";
import BookingsPage from "./pages/dashboard/receptionist/BookingsPage";

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* Admin routes */}
              <Route index element={<AdminDashboard />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="users" element={<UsersPage />} />
              
              {/* Common routes */}
              <Route path="clients" element={<ClientsPage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              
              {/* Client routes */}
              <Route path="client" element={<ClientDashboard />} />
              <Route path="book" element={<BookPage />} />
              
              {/* Supervisor routes */}
              <Route path="reports" element={<ReportsPage />} />
              
              {/* Receptionist routes */}
              <Route path="messages" element={<MessagesPage />} />
              <Route path="bookings" element={<BookingsPage />} />
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
