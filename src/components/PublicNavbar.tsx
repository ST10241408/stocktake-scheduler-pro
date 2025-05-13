
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { X, Menu } from "lucide-react";

const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/a0e238a9-2618-48d1-a66d-909fab2f2473.png" 
              alt="Dial a Stocktaker" 
              className="h-8 md:h-10"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  link.name === "Services" 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : isActive(link.path)
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Login/Dashboard Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    link.name === "Services" 
                    ? "bg-primary text-white" 
                    : isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 flex flex-col space-y-2 border-t mt-2">
                {isAuthenticated ? (
                  <Button onClick={() => {
                    navigate("/dashboard");
                    setIsMenuOpen(false);
                  }}>
                    Dashboard
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}>
                      Login
                    </Button>
                    <Button onClick={() => {
                      navigate("/register");
                      setIsMenuOpen(false);
                    }}>
                      Register
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicNavbar;
