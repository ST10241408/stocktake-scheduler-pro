
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Search, 
  Filter, 
  Download,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { format, addDays, subDays, startOfWeek, addWeeks, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

// Mock data for bookings
const generateMockBookings = () => {
  const statuses = ["requested", "confirmed", "scheduled", "in-progress", "completed", "cancelled"];
  const serviceTypes = ["full-inventory", "partial-count", "spot-check", "annual-audit", "overnight-count"];
  const clients = [
    { name: "Jane Smith", company: "ABC Retail", avatar: "/lovable-uploads/Jane Smith.jpg" },
    { name: "Michael Brown", company: "123 Supermarket", avatar: "/lovable-uploads/Michael Brown.jpg" },
    { name: "Sarah Johnson", company: "City Electronics", avatar: "/lovable-uploads/sarah johnson.jpg" },
    { name: "David Wilson", company: "Fashion Hub", avatar: "" },
    { name: "Emily Adams", company: "Grocery World", avatar: "" }
  ];
  
  const locations = [
    "Sandton City Mall, Johannesburg", 
    "V&A Waterfront, Cape Town", 
    "Gateway Theatre of Shopping, Durban", 
    "Menlyn Park Shopping Centre, Pretoria", 
    "Eastgate Shopping Centre, Bedfordview",
    "Canal Walk, Cape Town",
    "Brooklyn Mall, Pretoria",
    "Clearwater Mall, Roodepoort"
  ];
  
  return Array(15).fill(0).map((_, i) => {
    const today = new Date();
    const randomDayOffset = Math.floor(Math.random() * 14) - 7; // -7 to +6 days from today
    const bookingDate = addDays(today, randomDayOffset);
    const client = clients[Math.floor(Math.random() * clients.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: `BK-${1000 + i}`,
      clientName: client.name,
      clientCompany: client.company,
      clientAvatar: client.avatar,
      serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
      date: bookingDate,
      time: `${Math.floor(Math.random() * 8) + 8}:00 ${Math.floor(Math.random() * 8) + 8 < 12 ? 'AM' : 'PM'}`, // 8 AM to 4 PM
      duration: Math.floor(Math.random() * 6) + 2, // 2-8 hours
      location: locations[Math.floor(Math.random() * locations.length)],
      storeSize: `${Math.floor(Math.random() * 900) + 100} m²`, // 100-1000 m²
      status,
      createdAt: subDays(bookingDate, Math.floor(Math.random() * 10) + 3) // Created 3-13 days before booking date
    };
  });
};

const mockBookings = generateMockBookings();

const getStatusBadge = (status) => {
  switch (status) {
    case "requested":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Requested</Badge>;
    case "confirmed":
      return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Confirmed</Badge>;
    case "scheduled":
      return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Scheduled</Badge>;
    case "in-progress":
      return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">In Progress</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Completed</Badge>;
    case "cancelled":
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getServiceTypeLabel = (type) => {
  switch (type) {
    case "full-inventory": return "Full Inventory Count";
    case "partial-count": return "Partial Stock Count";
    case "spot-check": return "Spot Check";
    case "annual-audit": return "Annual Audit Support";
    case "overnight-count": return "Overnight Counting";
    default: return type;
  }
};

const BookingsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedBooking, setSelectedBooking] = useState(mockBookings[0]);
  const [calendarView, setCalendarView] = useState("week");
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // Week starts on Monday
  
  // Filter bookings based on search term, status, and date
  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.clientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    const matchesDate = !dateFilter || isSameDay(booking.date, dateFilter);
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  // Group bookings by date for calendar view
  const bookingsByDate = {};
  mockBookings.forEach(booking => {
    const dateStr = format(booking.date, "yyyy-MM-dd");
    if (!bookingsByDate[dateStr]) {
      bookingsByDate[dateStr] = [];
    }
    bookingsByDate[dateStr].push(booking);
  });
  
  const handleStatusChange = (booking, newStatus) => {
    console.log(`Changing booking ${booking.id} status from ${booking.status} to ${newStatus}`);
    
    toast({
      title: "Booking Status Updated",
      description: `${booking.clientCompany} booking has been ${newStatus}.`,
    });
    
    // In a real app, you would update the booking in the database
    // and then refresh the data
  };
  
  const handleExportBookings = () => {
    toast({
      title: "Export Started",
      description: "Your bookings export is being prepared and will download shortly.",
    });
    console.log("Exporting bookings:", filteredBookings);
  };
  
  const navigateWeek = (direction) => {
    if (direction === "next") {
      setCurrentWeek(addWeeks(currentWeek, 1));
    } else {
      setCurrentWeek(addWeeks(currentWeek, -1));
    }
  };
  
  // Generate week days for the calendar
  const weekDays = Array(7).fill(0).map((_, i) => addDays(currentWeek, i));
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bookings Management</h1>
          <p className="text-gray-600">View and manage all stocktaking appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={calendarView} onValueChange={setCalendarView}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="list">List View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleExportBookings} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Download size={16} /> Export
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="requested">Requested</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !dateFilter && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={dateFilter}
                    onSelect={setDateFilter}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {dateFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDateFilter(undefined)}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {calendarView === "list" ? (
            <div className="rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No bookings found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow 
                        key={booking.id}
                        className={cn(
                          "cursor-pointer hover:bg-gray-50",
                          selectedBooking?.id === booking.id && "bg-gray-50"
                        )}
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={booking.clientAvatar} />
                              <AvatarFallback className="bg-primary/10">
                                {booking.clientName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{booking.clientName}</div>
                              <div className="text-sm text-gray-500">{booking.clientCompany}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getServiceTypeLabel(booking.serviceType)}</TableCell>
                        <TableCell>
                          <div className="font-medium">{format(booking.date, "MMM d, yyyy")}</div>
                          <div className="text-sm text-gray-500">{booking.time} • {booking.duration}h</div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{booking.location}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <Select
                            defaultValue={booking.status}
                            onValueChange={(value) => handleStatusChange(booking, value)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmed">Confirm</SelectItem>
                              <SelectItem value="scheduled">Schedule</SelectItem>
                              <SelectItem value="in-progress">Start</SelectItem>
                              <SelectItem value="completed">Complete</SelectItem>
                              <SelectItem value="cancelled">Cancel</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          ) : calendarView === "week" ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">
                  Week of {format(currentWeek, "MMM d, yyyy")}
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateWeek("prev")}
                  >
                    Previous Week
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateWeek("next")}
                  >
                    Next Week
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day, i) => (
                  <div key={i} className="text-center font-medium">
                    <div className="text-xs text-gray-500">{format(day, "EEE")}</div>
                    <div className={cn(
                      "text-sm rounded-full w-8 h-8 flex items-center justify-center mx-auto",
                      isSameDay(day, new Date()) && "bg-primary text-primary-foreground"
                    )}>
                      {format(day, "d")}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2 mt-2">
                {weekDays.map((day, i) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const dayBookings = bookingsByDate[dateStr] || [];
                  
                  return (
                    <div key={i} className="min-h-[150px] border rounded-md p-2">
                      {dayBookings.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                          No bookings
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {dayBookings.map(booking => (
                            <div 
                              key={booking.id}
                              onClick={() => setSelectedBooking(booking)}
                              className={cn(
                                "text-xs p-2 rounded-md cursor-pointer border",
                                booking.status === "requested" && "bg-yellow-50 border-yellow-200",
                                booking.status === "confirmed" && "bg-blue-50 border-blue-200",
                                booking.status === "scheduled" && "bg-purple-50 border-purple-200",
                                booking.status === "in-progress" && "bg-orange-50 border-orange-200",
                                booking.status === "completed" && "bg-green-50 border-green-200",
                                booking.status === "cancelled" && "bg-red-50 border-red-200"
                              )}
                            >
                              <div className="font-medium truncate">{booking.clientCompany}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <Clock size={10} />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4">
              <CalendarComponent
                mode="single"
                selected={dateFilter}
                onSelect={setDateFilter}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-1">
                <h3 className="font-medium text-sm">
                  Bookings on {dateFilter ? format(dateFilter, "MMMM d, yyyy") : "selected date"}:
                </h3>
                {!dateFilter ? (
                  <p className="text-gray-500 text-sm">Select a date to view bookings</p>
                ) : (
                  <>
                    {(bookingsByDate[format(dateFilter, "yyyy-MM-dd")] || []).map(booking => (
                      <div 
                        key={booking.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={booking.clientAvatar} />
                            <AvatarFallback className="bg-primary/10 text-xs">
                              {booking.clientName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{booking.clientCompany}</div>
                            <div className="text-xs text-gray-500">{booking.time} • {getServiceTypeLabel(booking.serviceType)}</div>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    ))}
                    {(bookingsByDate[format(dateFilter, "yyyy-MM-dd")] || []).length === 0 && (
                      <p className="text-gray-500 text-sm">No bookings on this date</p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedBooking && (
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>
              Complete information about the selected booking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Client Information</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={selectedBooking.clientAvatar} />
                    <AvatarFallback className="bg-primary/10">
                      {selectedBooking.clientName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedBooking.clientName}</div>
                    <div className="text-sm text-gray-500">{selectedBooking.clientCompany}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Store Size</div>
                    <div>{selectedBooking.storeSize}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      {selectedBooking.location}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Service Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Service Type</div>
                    <div>{getServiceTypeLabel(selectedBooking.serviceType)}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        {format(selectedBooking.date, "MMM d, yyyy")}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Time</div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        {selectedBooking.time}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div>{selectedBooking.duration} hours</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div>{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Created</div>
                    <div>{format(selectedBooking.createdAt, "MMM d, yyyy")}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex flex-wrap gap-2 justify-end">
              {selectedBooking.status === "requested" && (
                <>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleStatusChange(selectedBooking, "cancelled")}
                  >
                    <XCircle size={16} /> Decline
                  </Button>
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => handleStatusChange(selectedBooking, "confirmed")}
                  >
                    <CheckCircle size={16} /> Confirm Booking
                  </Button>
                </>
              )}
              
              {selectedBooking.status === "confirmed" && (
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => handleStatusChange(selectedBooking, "scheduled")}
                >
                  <Calendar size={16} /> Schedule
                </Button>
              )}
              
              {selectedBooking.status === "scheduled" && (
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => handleStatusChange(selectedBooking, "in-progress")}
                >
                  Start Job
                </Button>
              )}
              
              {selectedBooking.status === "in-progress" && (
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => handleStatusChange(selectedBooking, "completed")}
                >
                  <CheckCircle size={16} /> Complete Job
                </Button>
              )}
              
              {["confirmed", "scheduled"].includes(selectedBooking.status) && (
                <Button 
                  variant="outline"
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  onClick={() => handleStatusChange(selectedBooking, "cancelled")}
                >
                  <XCircle size={16} /> Cancel Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingsPage;
