
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PublicNavbar from "@/components/PublicNavbar";
import PublicFooter from "@/components/PublicFooter";

const FaqPage = () => {
  const faqs = [
    {
      question: "What is stocktaking and why is it important?",
      answer: "Stocktaking is the process of physically counting, checking, and verifying inventory or stock items in a business. It's important because it helps maintain accurate inventory records, identify discrepancies, prevent theft or loss, comply with accounting regulations, and make informed business decisions based on correct inventory data."
    },
    {
      question: "How often should my business conduct a stocktake?",
      answer: "The frequency depends on your business type and size. Retail businesses typically conduct full stocktakes annually, with smaller cycle counts throughout the year. Businesses with high-value inventory or high turnover may require more frequent counts. We can help determine the optimal schedule for your specific needs."
    },
    {
      question: "How long does a typical stocktake take?",
      answer: "The duration varies based on inventory size, complexity, and preparation. Small retail stores might take a few hours, while large warehouses could require several days. Our team works efficiently to minimize disruption to your operations, and we can provide a time estimate after assessing your specific requirements."
    },
    {
      question: "Do I need to close my business during a stocktake?",
      answer: "Not necessarily. While some businesses prefer to close during stocktaking for maximum accuracy, we also offer solutions for counts during non-operational hours or methods to count while remaining open. Our team can work around your schedule to minimize disruption to your business operations."
    },
    {
      question: "What information do you need before conducting a stocktake?",
      answer: "Ideally, we need access to your current inventory management system or records, information about your stock organization and layout, details of any specific inventory challenges, and any particular requirements or focus areas for the count. Our team will work with you during the planning phase to gather all necessary information."
    },
    {
      question: "How do you handle discrepancies found during the stocktake?",
      answer: "Discrepancies are documented in detail in our reports, with explanations where possible. We categorize variances by type (e.g., missing items, excess items, damaged goods) and provide recommendations for addressing these issues and improving inventory management processes."
    },
    {
      question: "What technology do you use for stocktaking?",
      answer: "We utilize advanced mobile scanning devices, barcode/RFID technology, and specialized inventory management software that integrates with most business systems. Our technology allows for faster counts, greater accuracy, and detailed reporting compared to manual methods."
    },
    {
      question: "Can you integrate with our existing inventory management system?",
      answer: "Yes, our services are designed to work with most major inventory management systems. We can import your existing data before the count and export the results back into your system afterward, ensuring a seamless process with minimal disruption to your operations."
    },
    {
      question: "What reports will I receive after the stocktake?",
      answer: "You'll receive comprehensive reports including a full inventory count, variance analysis comparing actual counts to expected inventory levels, valuation reports, categorized inventory breakdowns, discrepancy explanations, and recommendations for inventory management improvements."
    },
    {
      question: "Do you provide any follow-up services after the stocktake?",
      answer: "Yes, we offer follow-up consultations to discuss findings and implement improvements, regular cycle counting programs, inventory management training for your staff, and ongoing support to address any inventory challenges identified during the stocktake."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our stocktaking services
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQ Accordion */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Still Have Questions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-8">
              Our team is here to help with any additional questions you may have about our stocktaking services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <PublicFooter />
    </div>
  );
};

export default FaqPage;
