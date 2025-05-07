
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, Calendar, MapPin, FileText, CalendarClock, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";

// Helper to format date
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color;
  
  switch (status) {
    case 'completed':
      color = 'bg-green-100 text-green-800';
      break;
    case 'in-progress':
      color = 'bg-blue-100 text-blue-800';
      break;
    case 'scheduled':
      color = 'bg-purple-100 text-purple-800';
      break;
    case 'confirmed':
      color = 'bg-indigo-100 text-indigo-800';
      break;
    case 'cancelled':
      color = 'bg-red-100 text-red-800';
      break;
    default:
      color = 'bg-gray-100 text-gray-800';
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {status.replace('-', ' ')}
    </span>
  );
};

// Job card component
const JobCard = ({ job }: { job: any }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(job.scheduledDate)}
            </CardDescription>
          </div>
          <StatusBadge status={job.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">{job.estimatedDuration} hours</div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="text-sm">{job.location}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="ghost" size="sm" className="ml-auto gap-1">
          View Details <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Mock job data
const mockJobs = [
  {
    id: "1",
    title: "Quarterly Inventory Audit",
    scheduledDate: new Date("2023-06-25"),
    location: "Main Warehouse, 123 Business Street",
    status: "scheduled",
    estimatedDuration: 8,
    description: "Full inventory count of all warehouse stock",
    report: null,
  },
  {
    id: "2",
    title: "Monthly Stock Verification",
    scheduledDate: new Date("2023-05-15"),
    location: "East Branch Store, 456 Market Avenue",
    status: "completed",
    estimatedDuration: 6,
    description: "Monthly verification of retail stock levels",
    report: {
      id: "r1",
      url: "#",
      name: "May_Stock_Verification_Report.pdf"
    },
  },
  {
    id: "3",
    title: "Annual Inventory Count",
    scheduledDate: new Date("2023-04-10"),
    location: "Main Warehouse, 123 Business Street",
    status: "completed",
    estimatedDuration: 10,
    description: "Complete annual inventory count for financial reporting",
    report: {
      id: "r2",
      url: "#",
      name: "Annual_Inventory_Report_2023.pdf"
    },
  },
];

const ClientDashboard = () => {
  // State for booking form
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    jobTitle: "",
    location: "",
    preferredDate: "",
    notes: "",
  });
  
  // Handle booking form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm({
      ...bookingForm,
      [name]: value,
    });
  };
  
  // Handle booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingForm);
    // Here you would send the booking to your API
    setIsDialogOpen(false);
    // Reset form
    setBookingForm({
      jobTitle: "",
      location: "",
      preferredDate: "",
      notes: "",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Client Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your stocktaking services.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <CalendarClock className="mr-2 h-4 w-4" /> Book a Stocktake
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Request a Stocktake Service</DialogTitle>
              <DialogDescription>
                Fill out this form to request a stocktaking service for your business.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Service Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={bookingForm.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Monthly Inventory Count"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={bookingForm.location}
                  onChange={handleInputChange}
                  placeholder="Full address where service is needed"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <div className="relative">
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={bookingForm.preferredDate}
                    onChange={handleInputChange}
                    required
                    className="pl-10"
                  />
                  <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={bookingForm.notes}
                  onChange={handleInputChange}
                  placeholder="Please include any specific requirements or details about your inventory"
                  rows={3}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Stocktakes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Next: June 25, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed This Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Last: May 15, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Download from Reports tab</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs Section */}
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="pt-4">
          <div>
            {mockJobs.filter(job => job.status === 'scheduled' || job.status === 'confirmed').length > 0 ? (
              mockJobs
                .filter(job => job.status === 'scheduled' || job.status === 'confirmed')
                .map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <Card className="bg-muted/40">
                <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
                  <CalendarClock className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">No upcoming stocktakes scheduled</p>
                  <Button 
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Book a Service
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="pt-4">
          <div>
            {mockJobs.filter(job => job.status === 'completed').length > 0 ? (
              mockJobs
                .filter(job => job.status === 'completed')
                .map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <Card className="bg-muted/40">
                <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">No completed stocktakes yet</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>
                Download reports from your completed stocktaking services
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockJobs.filter(job => job.report).length > 0 ? (
                <div className="space-y-4">
                  {mockJobs
                    .filter(job => job.report)
                    .map(job => (
                      <div key={job.id} className="flex items-center justify-between p-3 bg-muted/40 rounded-md">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(job.scheduledDate)}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-6 pb-6">
                  <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">No reports available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Help & Support Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Assistance?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-muted/30 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Contact Your Coordinator</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Reach out directly to your assigned service coordinator
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 text-primary p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span className="text-sm">+1 (234) 567-8901</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 text-primary p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span className="text-sm">coordinator@dialastocktaker.com</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-muted/30 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Find answers to common questions about our services
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View FAQs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
