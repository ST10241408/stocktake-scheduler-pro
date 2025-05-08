
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";
import { Mail } from "lucide-react";

const AboutPage = () => {
  // Team members data
  const team = [
    {
      name: "Jane Smith",
      role: "CEO & Founder",
      bio: "With over 15 years of experience in inventory management, Jane founded Dial a Stocktaker to address the unmet needs of businesses struggling with inventory control.",
      img: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
    },
    {
      name: "Michael Brown",
      role: "Operations Director",
      bio: "Michael oversees all stocktaking operations, ensuring our teams deliver accurate and efficient services to all clients.",
      img: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Client Relations Manager",
      bio: "Sarah manages our client relationships, ensuring each business receives personalized attention and solutions tailored to their specific needs.",
      img: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Dial a Stocktaker</h1>
          <p className="text-xl text-gray-700 mb-8">
            We're a professional stocktaking service committed to accuracy, efficiency, and reliability.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6">
                Dial a Stocktaker was founded in 2010 with a simple mission: to provide businesses with accurate, efficient, and reliable stocktaking services that help them manage their inventory effectively and make informed business decisions.
              </p>
              <p className="text-lg mb-6">
                What started as a small team serving local retail shops has grown into a nationwide operation with specialized teams handling various sectors including retail, hospitality, warehousing, and manufacturing.
              </p>
              <p className="text-lg mb-6">
                Our commitment to precision, cutting-edge technology, and exceptional customer service has made us the preferred partner for businesses of all sizes across South Africa.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://i.pinimg.com/736x/46/02/ae/4602aef9d8f43d6c8007d617b29db38d.jpg" 
                alt="Company history" 
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <div className="h-1 w-24 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Accuracy</h3>
              <p className="text-gray-600">We are committed to delivering precise and error-free inventory counts that you can rely on for critical business decisions.</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Efficiency</h3>
              <p className="text-gray-600">Our streamlined processes and expert teams ensure minimal disruption to your business operations during stocktaking.</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-600">We operate with complete transparency and honesty in all our interactions, building lasting relationships based on trust.</p>
            </div>
          </div>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  );
};

export default AboutPage;
