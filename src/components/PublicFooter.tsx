
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const PublicFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
              <span className="font-bold text-lg text-white">Dial a Stocktaker</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Professional stocktaking services for businesses of all sizes. Accurate, efficient, and reliable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Our Services", path: "/services" },
                { name: "FAQ", path: "/faq" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Retail Stocktaking",
                "Warehouse Inventory",
                "Year-End Stock Counts",
                "Asset Verification",
                "Inventory Management"
              ].map((service) => (
                <li key={service}>
                  <Link 
                    to="/services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Business Street, City, Country, ZIP</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">+123 456 7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <a href="mailto:info@dialastocktaker.com" className="text-gray-400 hover:text-white transition-colors">info@dialastocktaker.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Dial a Stocktaker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
