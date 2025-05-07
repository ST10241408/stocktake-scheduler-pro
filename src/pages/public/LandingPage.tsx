
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Briefcase, CheckCircle, CalendarClock, TrendingUp, Users } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Professional Stocktaking Services for Your Business
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8">
              Accurate, efficient, and reliable inventory management solutions tailored to your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/contact">Book a Service</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose Dial a Stocktaker?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
              <p className="text-gray-600">Our trained professionals ensure accurate and efficient stocktaking services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Detailed Reports</h3>
              <p className="text-gray-600">Comprehensive stock analysis and actionable insights for your business.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
              <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <CalendarClock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">Book services at times that work for your business operations.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Our simple process makes stocktaking hassle-free for your business
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: "Book a Service",
                description: "Choose a date and time that suits your schedule.",
                icon: CalendarClock
              },
              {
                step: 2,
                title: "Preparation",
                description: "We'll help you prepare for an efficient stocktake.",
                icon: Briefcase
              },
              {
                step: 3,
                title: "Stocktaking",
                description: "Our expert team will count and record your inventory.",
                icon: CheckCircle
              },
              {
                step: 4,
                title: "Reporting",
                description: "Receive detailed reports with valuable insights.",
                icon: TrendingUp
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="pt-4 text-center">
                    <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                {item.step < 4 && (
                  <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-4 z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="#E23D28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to optimize your inventory management?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our team and discover how our stocktaking services can benefit your business.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Dial a Stocktaker revolutionized our inventory management. The team was professional and the insights from their reports helped us optimize our stock levels.",
                author: "Jane Smith",
                company: "Retail Solutions Ltd"
              },
              {
                quote: "We've been using their services for over 2 years now. Their accuracy and attention to detail have saved us time and improved our overall efficiency.",
                author: "Michael Brown",
                company: "Warehouse Distributors"
              },
              {
                quote: "The flexibility in scheduling and their expertise in handling diverse inventory types made the process seamless for our multi-branch operation.",
                author: "Sarah Johnson",
                company: "Global Supplies Inc"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                <svg className="h-8 w-8 text-primary mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.51.88-3.995 2.987-3.995 5.402v2.607h3.983v7.84h-9.966zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.511.88-3.996 2.987-3.996 5.402v2.607h3.983v7.84h-9.983z" />
                </svg>
                <p className="mb-4 text-gray-600">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for industry insights and tips on inventory management
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  );
};

export default LandingPage;
