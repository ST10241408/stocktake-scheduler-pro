
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Briefcase, CalendarClock, ArrowUpRight, 
  TrendingUp, Clock, CheckCircle, AlertTriangle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { JobStatus } from "@/types";

// Component to show status count card
const StatusCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  color,
}: {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ElementType;
  color?: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`${color || 'text-muted-foreground'} p-2 rounded-full bg-muted/20`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};

// Recent activity item
const ActivityItem = ({
  title,
  timestamp,
  description,
  type,
}: {
  title: string;
  timestamp: Date;
  description: string;
  type: "job" | "client" | "user";
}) => {
  const getIcon = () => {
    switch (type) {
      case "job":
        return <CalendarClock className="h-4 w-4" />;
      case "client":
        return <Briefcase className="h-4 w-4" />;
      case "user":
        return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
      <div className={`
        rounded-full p-2 flex-shrink-0
        ${type === "job" ? "bg-blue-100 text-blue-600" : ""}
        ${type === "client" ? "bg-green-100 text-green-600" : ""}
        ${type === "user" ? "bg-purple-100 text-purple-600" : ""}
      `}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground">
            {formatTime(timestamp)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

// Mock data for jobs
const mockJobs = [
  {
    id: "1",
    companyId: "1",
    clientId: "1",
    title: "Annual Inventory Count",
    clientName: "Retail Solutions Inc.",
    description: "Complete annual inventory verification",
    location: "123 Main St",
    scheduledDate: new Date("2023-06-15"),
    estimatedDuration: 8,
    status: "completed" as JobStatus,
    assignedUsers: {
      coordinatorId: "1",
      scannerId: "2",
      supervisorId: "3"
    },
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-06-16")
  },
  {
    id: "2",
    companyId: "1",
    clientId: "2",
    title: "Monthly Stock Check",
    clientName: "Metro Supermarkets",
    description: "Regular monthly inventory verification",
    location: "456 Market St",
    scheduledDate: new Date("2023-06-25"),
    estimatedDuration: 6,
    status: "scheduled" as JobStatus,
    assignedUsers: {
      coordinatorId: "1",
      scannerId: "2"
    },
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-05")
  },
  {
    id: "3",
    companyId: "1",
    clientId: "3",
    title: "Quarterly Audit",
    clientName: "Tech Warehouse Ltd",
    description: "Electronics and high-value items audit",
    location: "789 Tech Blvd",
    scheduledDate: new Date("2023-06-18"),
    estimatedDuration: 10,
    status: "in-progress" as JobStatus,
    assignedUsers: {
      coordinatorId: "1",
      scannerId: "2",
      supervisorId: "3"
    },
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-06-18")
  },
  {
    id: "4",
    companyId: "1",
    clientId: "1",
    title: "Equipment Verification",
    clientName: "Retail Solutions Inc.",
    description: "Verify all equipment and assets",
    location: "123 Main St",
    scheduledDate: new Date("2023-06-30"),
    estimatedDuration: 4,
    status: "confirmed" as JobStatus,
    assignedUsers: {
      coordinatorId: "1"
    },
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-12")
  },
  {
    id: "5",
    companyId: "1",
    clientId: "2",
    title: "New Store Setup",
    clientName: "Metro Supermarkets",
    description: "Initial inventory for new store location",
    location: "789 New St",
    scheduledDate: new Date("2023-07-05"),
    estimatedDuration: 12,
    status: "requested" as JobStatus,
    assignedUsers: {},
    createdAt: new Date("2023-06-14"),
    updatedAt: new Date("2023-06-14")
  }
];

// Mock activity data
const recentActivities = [
  {
    id: "1",
    title: "New job request received",
    timestamp: new Date("2023-06-18T14:30:00"),
    description: "Metro Supermarkets requested a stocktake for their new location",
    type: "job" as const
  },
  {
    id: "2",
    title: "New client added",
    timestamp: new Date("2023-06-18T11:15:00"),
    description: "Fashion Outlet Inc. was added as a new client",
    type: "client" as const
  },
  {
    id: "3",
    title: "Job completed",
    timestamp: new Date("2023-06-17T17:45:00"),
    description: "Annual Inventory Count for Retail Solutions Inc. was completed",
    type: "job" as const
  },
  {
    id: "4",
    title: "New user registered",
    timestamp: new Date("2023-06-17T10:20:00"),
    description: "Sarah Johnson joined as a Scanner",
    type: "user" as const
  },
  {
    id: "5",
    title: "Job rescheduled",
    timestamp: new Date("2023-06-16T15:10:00"),
    description: "Tech Warehouse Ltd quarterly audit rescheduled to June 18",
    type: "job" as const
  }
];

// Helper function to format time
const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return 'Just now';
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Count jobs by status
  const jobCounts = {
    total: mockJobs.length,
    requested: mockJobs.filter(job => job.status === "requested").length,
    scheduled: mockJobs.filter(job => job.status === "scheduled").length,
    inProgress: mockJobs.filter(job => job.status === "in-progress").length,
    completed: mockJobs.filter(job => job.status === "completed").length,
  };

  const upcomingJobs = mockJobs
    .filter(job => ["scheduled", "confirmed"].includes(job.status))
    .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
    .slice(0, 5);
    
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/dashboard/jobs')}>
            View All Jobs
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Total Jobs"
          value={jobCounts.total}
          icon={CalendarClock}
          description="This month"
          color="text-blue-500"
        />
        <StatusCard
          title="New Requests"
          value={jobCounts.requested}
          icon={Clock}
          description="Awaiting confirmation"
          color="text-amber-500"
        />
        <StatusCard
          title="In Progress"
          value={jobCounts.inProgress}
          icon={TrendingUp}
          description="Currently active"
          color="text-primary"
        />
        <StatusCard
          title="Completed"
          value={jobCounts.completed}
          icon={CheckCircle}
          description="This month"
          color="text-green-500"
        />
      </div>
      
      {/* Tabs Section */}
      <Tabs defaultValue="upcoming">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Jobs</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          
          <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/dashboard/jobs')}>
            View All <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        
        <TabsContent value="upcoming" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingJobs.length > 0 ? (
                  upcomingJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4">
                      <div className="flex items-start gap-4">
                        <div className={`
                          rounded-full p-2 
                          ${job.status === 'scheduled' ? 'bg-blue-100 text-blue-600' : ''}
                          ${job.status === 'confirmed' ? 'bg-green-100 text-green-600' : ''}
                          ${job.status === 'requested' ? 'bg-amber-100 text-amber-600' : ''}
                          ${job.status === 'in-progress' ? 'bg-primary/10 text-primary' : ''}
                        `}>
                          <CalendarClock className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {job.clientName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {job.scheduledDate.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {job.status.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No upcoming jobs</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-0">
          <Card>
            <CardContent className="p-4">
              <div className="divide-y">
                {recentActivities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    title={activity.title}
                    timestamp={activity.timestamp}
                    description={activity.description}
                    type={activity.type}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Performance Stats Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Month-to-Date Stats</CardTitle>
            <CardDescription>Job performance this month</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm">Jobs Completed</p>
                  <p className="text-sm font-medium">75%</p>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm">Client Satisfaction</p>
                  <p className="text-sm font-medium">92%</p>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm">Scanner Utilization</p>
                  <p className="text-sm font-medium">68%</p>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">New Clients</p>
                  <p className="text-2xl font-bold">+4</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">$24.5k</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Team Performance</CardTitle>
            <CardDescription>Employee productivity overview</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              {[
                { name: "Coordinators", count: 3, jobsAssigned: 18, completion: "94%" },
                { name: "Scanners", count: 8, jobsAssigned: 32, completion: "87%" },
                { name: "Supervisors", count: 2, jobsAssigned: 12, completion: "95%" },
              ].map((role) => (
                <div key={role.name} className="bg-gray-50 rounded-md p-3">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">{role.name}</h4>
                    <span className="text-sm bg-primary/10 text-primary px-2 rounded-full">
                      {role.count} active
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{role.jobsAssigned} jobs assigned</span>
                    <span>Completion rate: {role.completion}</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-2">
                <h4 className="font-medium mb-2">Alerts</h4>
                <div className="flex items-center gap-2 text-sm bg-amber-50 text-amber-600 p-2 rounded-md">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <span>2 jobs scheduled for today need scanners assigned</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
