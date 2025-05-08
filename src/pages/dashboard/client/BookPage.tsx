
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { CalendarIcon, Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const timeSlots = [
  "08:00 AM", 
  "09:00 AM", 
  "10:00 AM", 
  "11:00 AM", 
  "12:00 PM", 
  "01:00 PM", 
  "02:00 PM", 
  "03:00 PM", 
  "04:00 PM"
];

const serviceTypes = [
  { id: "full-inventory", name: "Full Inventory Count" },
  { id: "partial-count", name: "Partial Stock Count" },
  { id: "spot-check", name: "Spot Check" },
  { id: "annual-audit", name: "Annual Audit Support" },
  { id: "overnight-count", name: "Overnight Counting" }
];

const BookPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [serviceType, setServiceType] = useState<string | undefined>(undefined);
  
  const [bookingForm, setBookingForm] = useState({
    location: "",
    storeSize: "",
    estimatedItems: "",
    specialInstructions: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!date || !timeSlot || !serviceType || !bookingForm.location || !bookingForm.storeSize) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    // Create booking object
    const booking = {
      clientId: user?.id,
      clientName: `${user?.firstName} ${user?.lastName}`,
      date: date,
      time: timeSlot,
      serviceType,
      location: bookingForm.location,
      storeSize: bookingForm.storeSize,
      estimatedItems: bookingForm.estimatedItems,
      specialInstructions: bookingForm.specialInstructions,
      status: "requested"
    };
    
    console.log("Submitting booking:", booking);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Booking Submitted",
        description: "Your booking request has been submitted successfully.",
      });
      
      // Reset form
      setDate(undefined);
      setTimeSlot(undefined);
      setServiceType(undefined);
      setBookingForm({
        location: "",
        storeSize: "",
        estimatedItems: "",
        specialInstructions: ""
      });
      
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Book a Service</h1>
        <p className="text-gray-600">Schedule a stocktaking service for your business</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Service Booking</CardTitle>
          <CardDescription>
            Fill out the form below to schedule a stocktaking service
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceType">Service Type*</Label>
                <Select
                  value={serviceType}
                  onValueChange={setServiceType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => 
                          date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                          date.getDay() === 0 || 
                          date.getDay() === 6
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground">
                    Business days (Monday-Friday) only
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Time Slot*</Label>
                  <Select 
                    value={timeSlot} 
                    onValueChange={setTimeSlot}
                    disabled={!date}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {timeSlot || "Select time"}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    All times are in local time zone
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Store Location*</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Full store address"
                  value={bookingForm.location}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeSize">Store Size (sq ft/m²)*</Label>
                  <Input
                    id="storeSize"
                    name="storeSize"
                    placeholder="Approximate store size"
                    value={bookingForm.storeSize}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estimatedItems">Estimated Item Count</Label>
                  <Input
                    id="estimatedItems"
                    name="estimatedItems"
                    placeholder="Approximate number of items"
                    value={bookingForm.estimatedItems}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  placeholder="Any special requirements or notes"
                  value={bookingForm.specialInstructions}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                * Required fields
              </p>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Submitting..." : "Book Service"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookPage;
