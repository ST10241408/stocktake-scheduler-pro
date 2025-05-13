
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
      ]
    },
    {
      title: "Spot Check",
      description: "Quick verification of select inventory areas or categories.",
      features: [
        "Focused counting of specific sections",
        "Quick turnaround time",
        "Accuracy verification",
        "Discrepancy identification"
      ]
    },
    {
      title: "Cyclical Counting",
      description: "Regular scheduled counting of different inventory sections.",
      features: [
        "Scheduled recurring counts",
        "Systematic rotation through inventory",
        "Trend analysis reports",
        "Continuous improvement recommendations"
      ]
    },
    {
      title: "Inventory Auditing",
      description: "Thorough examination of inventory records and processes.",
      features: [
        "Comprehensive inventory audits",
        "Process improvement recommendations",
        "Inventory discrepancy analysis",
        "Customized audit reports"
      ]
    },
    {
      title: "Asset Verification",
      description: "Complete verification of all company assets and equipment.",
      features: [
        "Physical asset verification",
        "Asset tagging and categorization",
        "Depreciation assessment",
        "Asset registry creation"
      ]
    },
    {
      title: "Year-End Stock Count",
      description: "Specialized stock counts for year-end financial reporting.",
      features: [
        "Compliant with financial reporting standards",
        "Coordination with accounting teams",
        "Detailed valuation reports",
        "Fast turnaround for tight deadlines"
      ]
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
                className="border rounded-lg overflow-hidden border-gray-200"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Use Dial a Stocktaker */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Use Dial a Stocktaker?</h2>
          
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>Our counters are all put through screening and thorough training sessions.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>The majority of stocktakers have taken stock for at least four years.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>The counters have a high propensity for physical work and the financial reward is motivating.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>Dial a Stocktaker has fully trained Coordinators who take control of all the menial, but yet vital functions. They also have the experience to pin-point problem areas and offer solutions.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>Dial a Stocktaker will pay the stocktakers on your behalf thereby saving you time and administrative costs.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span>We have at our disposal the expertise, experience and reliability gained from over 19 years of service with the temporary market.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Service Process */}
      <section className="py-16">
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
      
      {/* Stocktaker Requirements & Training */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Becoming a Stocktaker</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Requirements to Become a Stocktaker</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Reliable transportation and ability to travel to various locations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Strong attention to detail and mathematical aptitude</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Physical stamina for long periods of standing and counting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Ability to work flexible hours including evenings and weekends</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Clean background check and reliability assessment</span>
                </li>
              </ul>
            </div>
            
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Training Process</h3>
              <p className="mb-4">All new stocktakers go through our comprehensive training program:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Initial classroom training on counting methodologies and procedures</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Hands-on training with experienced stocktakers</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>System and technology training for digital inventory management</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Industry-specific training for specialized inventory types</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>Ongoing professional development and refresher courses</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Application Process</h3>
              <p className="mb-4">Our stocktaker recruitment process includes:</p>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">1. Initial Application</h4>
                  <p>Submit your application online with your work history and availability.</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">2. Screening Interview</h4>
                  <p>Participate in a preliminary interview to assess your qualifications.</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">3. Training Department</h4>
                  <p>Attend in-person sessions with our training department for assessment and initial training.</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">4. Probationary Period</h4>
                  <p>Complete supervised stocktaking assignments to demonstrate proficiency.</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">5. Final Approval</h4>
                  <p>Upon successful completion of training and probation, receive login credentials and become part of our stocktaking team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Proposal Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Proposal</h2>
          
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
            <ol className="space-y-4">
              <li className="flex">
                <span className="font-bold mr-2">1.</span>
                <p>YOU identify an area of concern as a test case.</p>
              </li>
              <li className="flex">
                <span className="font-bold mr-2">2.</span>
                <p>Dial a Stocktaker assesses the job and quotes an appropriate rate.</p>
              </li>
              <li className="flex">
                <span className="font-bold mr-2">3.</span>
                <p><strong>Please Note:</strong> The rate is determined by various factors including: No. of stocktakers required, Dates of stocktake, duration of stocktake, physical location and level of skill required.</p>
              </li>
              <li className="flex">
                <span className="font-bold mr-2">4.</span>
                <p>The agreed rate together with our terms and conditions of service will be sent to you for confirmation.</p>
              </li>
            </ol>
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
              "Healthcare", "Construction", "Electronics", "Automotive",
              "Food & Beverage", "Logistics", "Pharmaceuticals", "Fashion & Apparel"
            ].map((industry, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <h3 className="font-medium">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  );
};

export default ServicesPage;
