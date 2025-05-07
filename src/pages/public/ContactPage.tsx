
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    service: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible."
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        service: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-8">
              Get in touch with our team for inquiries, quotes, or to schedule a service
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services? Need a quote? Or want to schedule a stocktake? 
                Our team is ready to assist you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">011 403 2996</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">info@dialastocktaker.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      Ground Floor, Known as - Braamfontein Centre,<br />
                      Rosebank College Building,<br />
                      23 Jorissen St, Braamfontein,<br />
                      Johannesburg, 2017
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Weekend: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Team Members Section */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-6">Meet Our Team</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Jane Smith",
                      position: "Customer Relations",
                      image: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
                    },
                    {
                      name: "Michael Brown",
                      position: "Operations Manager",
                      image: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
                    },
                    {
                      name: "Sarah Johnson",
                      position: "Inventory Specialist",
                      image: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
                    }
                  ].map((member, index) => (
                    <div key={index} className="text-center">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                      <h4 className="font-semibold mt-2">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Company Image */}
              <div className="mt-10">
                <img 
                  src="https://i.pinimg.com/736x/46/02/ae/4602aef9d8f43d6c8007d617b29db38d.jpg" 
                  alt="Company Office" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="John Smith" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder="(123) 456-7890" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange}
                      placeholder="Your Company Ltd." 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service">Service Interested In</Label>
                  <Select 
                    value={formData.service} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-inventory">Full Inventory Count</SelectItem>
                      <SelectItem value="spot-check">Spot Check</SelectItem>
                      <SelectItem value="cyclical">Cyclical Counting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry..." 
                    rows={5} 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section with embedded Google Map */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="w-full h-96 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.1292740358167!2d28.03105717541484!3d-26.19247267708384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c1a50a1f6dd%3A0xa0c29202d30d5aa8!2sDial%20a%20Student!5e0!3m2!1sen!2sza!4v1746605396844!5m2!1sen!2sza" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Dial a Stocktaker Location"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  );
};

export default ContactPage;
