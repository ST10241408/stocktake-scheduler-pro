
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Calendar, Clock, MoreHorizontal, Search, User, MapPin, FileText } from "lucide-react";
import { Job } from "@/types";

const JobsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Mock data for jobs
  const jobs: Job[] = [
    {
      id: "job-001",
      companyId: "comp-001",
      clientId: "client-001",
      title: "Annual Inventory Count - SuperMart",
      description: "Complete inventory count of all products in the store.",
      location: "123 Retail Avenue, Commerce City",
      scheduledDate: new Date("2025-05-15T09:00:00"),
      estimatedDuration: 8,
      status: "scheduled",
      assignedUsers: {
        coordinatorId: "user-001",
        scannerId: "user-002",
        supervisorId: "user-003"
      },
      notes: "Client requested extra attention to electronics section.",
      createdAt: new Date("2025-05-01T10:30:00"),
      updatedAt: new Date("2025-05-02T14:45:00")
    },
    {
      id: "job-002",
      companyId: "comp-001",
      clientId: "client-002",
      title: "Quarterly Stock Check - Warehouse Plus",
      description: "Cycle count of high-value inventory items.",
      location: "456 Distribution Lane, Logistics Park",
      scheduledDate: new Date("2025-05-20T08:00:00"),
      estimatedDuration: 6,
      status: "confirmed",
      assignedUsers: {
        coordinatorId: "user-001"
      },
      notes: "",
      createdAt: new Date("2025-05-03T11:15:00"),
      updatedAt: new Date("2025-05-03T11:15:00")
    },
    {
      id: "job-003",
      companyId: "comp-001",
      clientId: "client-003",
      title: "Monthly Audit - TechStore",
      description: "Verification of electronic stock levels and product conditions.",
      location: "789 Tech Boulevard, Innovation District",
      scheduledDate: new Date("2025-05-10T10:00:00"),
      estimatedDuration: 4,
      status: "in-progress",
      assignedUsers: {
        coordinatorId: "user-001",
        scannerId: "user-004"
      },
      notes: "Focus on new product arrivals and returns.",
      createdAt: new Date("2025-04-28T09:00:00"),
      updatedAt: new Date("2025-05-05T16:30:00")
    },
    {
      id: "job-004",
      companyId: "comp-001",
      clientId: "client-004",
      title: "Spot Check - Fashion Boutique",
      description: "Verification of seasonal collection inventory.",
      location: "321 Fashion Street, Style Quarter",
      scheduledDate: new Date("2025-05-05T14:00:00"),
      estimatedDuration: 3,
      status: "completed",
      assignedUsers: {
        coordinatorId: "user-005",
        scannerId: "user-006",
        supervisorId: "user-007"
      },
      notes: "Client was satisfied with the speed and accuracy.",
      createdAt: new Date("2025-04-25T13:45:00"),
      updatedAt: new Date("2025-05-05T17:30:00")
    },
    {
      id: "job-005",
      companyId: "comp-001",
      clientId: "client-005",
      title: "Inventory Reconciliation - Foodmart",
      description: "Full inventory count and reconciliation with system data.",
      location: "567 Market Street, Downtown",
      scheduledDate: new Date("2025-05-18T07:00:00"),
      estimatedDuration: 10,
      status: "requested",
      assignedUsers: {},
      notes: "Large supermarket with multiple departments.",
      createdAt: new Date("2025-05-04T10:00:00"),
      updatedAt: new Date("2025-05-04T10:00:00")
    }
  ];

  // Filter jobs based on search query and status filter
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter ? job.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  // Helper function for status badge styling
  const getStatusBadge = (status: Job['status']) => {
    switch (status) {
      case 'requested':
        return <Badge variant="outline" className="bg-gray-100">Requested</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Scheduled</Badge>;
      case 'in-progress':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Jobs Management</h1>
        <Button>
          Add New Job
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Jobs</CardTitle>
          <CardDescription>
            Manage and monitor all stocktaking jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search jobs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {statusFilter ? `Status: ${statusFilter}` : "Filter by status"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("requested")}>
                  Requested
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("scheduled")}>
                  Scheduled
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Jobs Table */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-gray-500" />
                          <span className="truncate max-w-[200px]">{job.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-gray-500" />
                            <span>{format(job.scheduledDate, "dd MMM yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{format(job.scheduledDate, "h:mm a")} ({job.estimatedDuration}h)</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(job.status)}
                      </TableCell>
                      <TableCell>
                        {Object.keys(job.assignedUsers).length > 0 ? (
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-gray-500" />
                            <span>{Object.keys(job.assignedUsers).length} users</span>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>View Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>Assign Users</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>Update Status</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No jobs found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsPage;
