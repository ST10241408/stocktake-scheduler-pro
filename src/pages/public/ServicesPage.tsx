
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

const ServicesPage = () => {
  const services = [
    {
      title: "Full Inventory Count",
      description: "A comprehensive count of all inventory items in your business.",
      features: [
        "Complete count of all stock items",
        "Detailed inventory reports",
        "Variance analysis",
        "Recommendations for stock optimization"
      ],
      price: "Starting from R499",
      popular: true
    },
    {
      title: "Spot Check",
      description: "Quick verification of select inventory areas or categories.",
      features: [
        "Focused counting of specific sections",
        "Quick turnaround time",
        "Accuracy verification",
        "Discrepancy identification"
      ],
      price: "Starting from R299",
      popular: false
    },
    {
      title: "Cyclical Counting",
      description: "Regular scheduled counting of different inventory sections.",
      features: [
        "Scheduled recurring counts",
        "Systematic rotation through inventory",
        "Trend analysis reports",
        "Continuous improvement recommendations"
      ],
      price: "Starting from R399/month",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg text-gray-600 mb-8">
              Comprehensive stocktaking solutions tailored to your business needs
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`border rounded-lg overflow-hidden ${service.popular ? 'border-primary shadow-lg' : 'border-gray-200'}`}
              >
                {service.popular && (
                  <div className="bg-primary text-white text-center py-2">
                    <span className="font-medium">Most Popular</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-2xl font-bold mb-6">{service.price}</p>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                    Select Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Service Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Service Process</h2>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: "Initial Consultation",
                description: "We meet with you to understand your business needs, inventory structure, and specific requirements."
              },
              {
                step: 2,
                title: "Planning & Preparation",
                description: "We develop a tailored stocktaking plan and prepare all necessary resources and personnel."
              },
              {
                step: 3,
                title: "Execution",
                description: "Our professional team conducts the stocktake with minimal disruption to your business operations."
              },
              {
                step: 4,
                title: "Reporting & Analysis",
                description: "We provide detailed reports with analysis, identifying discrepancies and offering recommendations."
              },
              {
                step: 5,
                title: "Follow-up Support",
                description: "We offer ongoing support to help implement improvements based on the stocktake findings."
              }
            ].map((step, index) => (
              <div key={index} className="flex mb-8 last:mb-0">
                <div className="mr-6">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  {index < 4 && <div className="w-px h-full bg-gray-300 mx-auto mt-2"></div>}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Industries We Serve */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Industries We Serve</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Retail", "Warehousing", "Manufacturing", "Hospitality",
              "Healthcare", "Construction", "Electronics", "Automotive"
            ].map((industry, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <h3 className="font-medium">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  );
};

export default ServicesPage;
