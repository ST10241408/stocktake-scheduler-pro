
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">About Dial a Stocktaker</h1>
            <p className="text-lg text-gray-600 mb-8">
              Professional stocktaking services tailored to meet the needs of businesses across various industries
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2015, Dial a Stocktaker was established with a simple mission: to provide accurate, efficient, and reliable inventory management solutions to businesses of all sizes.
              </p>
              <p className="text-gray-600 mb-4">
                What began as a small team of inventory specialists has grown into a comprehensive stocktaking service with nationwide coverage. Our founder, recognizing the critical importance of precise inventory control, assembled a team of experts dedicated to delivering exceptional service.
              </p>
              <p className="text-gray-600">
                Today, we serve hundreds of businesses across multiple industries, maintaining our commitment to accuracy, professionalism, and customer satisfaction.
              </p>
            </div>
            <div className="bg-gray-100 h-72 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Company image placeholder</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Accuracy",
                description: "We pride ourselves on delivering precise and reliable inventory counts, minimizing discrepancies and providing dependable data."
              },
              {
                title: "Integrity",
                description: "We operate with complete transparency and honesty, building trust with our clients through ethical business practices."
              },
              {
                title: "Excellence",
                description: "We continuously strive for the highest standards of service, constantly refining our methods to exceed client expectations."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-primary">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jane Smith",
                role: "CEO & Founder",
                bio: "With over 15 years of experience in inventory management, Jane founded Dial a Stocktaker to address the unmet needs of businesses struggling with inventory control."
             img: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
              
              },
              {
                name: "Michael Brown",
                role: "Operations Director",
                bio: "Michael oversees our daily operations, ensuring that our teams deliver consistent, high-quality service to every client."
            img: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
               
              },
              {
                name: "Sarah Johnson",
                role: "Client Relations Manager",
                bio: "Sarah works directly with our clients to understand their unique needs and develop tailored stocktaking solutions."
              img: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
              
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Photo</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to experience professional stocktaking?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how our services can benefit your business
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  );
};

export default AboutPage;
