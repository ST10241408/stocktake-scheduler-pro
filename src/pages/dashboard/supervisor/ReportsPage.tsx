
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
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format, subDays } from "date-fns";
import { Download, FileText, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";

// Mock data for demonstration
const generateMockJobData = () => {
  const statuses = ["completed", "in-progress", "scheduled", "cancelled"];
  const locations = [
    "Johannesburg CBD", 
    "Sandton", 
    "Rosebank", 
    "Midrand", 
    "Pretoria", 
    "Soweto",
    "Cape Town", 
    "Durban"
  ];
  
  return Array(20).fill(0).map((_, i) => {
    const date = subDays(new Date(), Math.floor(Math.random() * 30));
    const duration = Math.floor(Math.random() * 5) + 1;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: `JOB-${1000 + i}`,
      date: format(date, "yyyy-MM-dd"),
      client: `Client ${i + 1}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      duration,
      accuracy: Math.floor(Math.random() * 10) + 90, // 90-100% accuracy
      items: Math.floor(Math.random() * 5000) + 1000,
      value: Math.floor(Math.random() * 100000) + 10000,
      status,
      team: Math.floor(Math.random() * 3) + 1 // 1-3 team members
    };
  });
};

const mockJobData = generateMockJobData();

// Chart data preparation
const preparePerformanceData = (jobs) => {
  const accuracyByTeam = {};
  const durationByJobSize = [];
  
  jobs.forEach(job => {
    // Accumulate accuracy by team
    if (!accuracyByTeam[`Team ${job.team}`]) {
      accuracyByTeam[`Team ${job.team}`] = {
        totalAccuracy: 0,
        count: 0
      };
    }
    
    accuracyByTeam[`Team ${job.team}`].totalAccuracy += job.accuracy;
    accuracyByTeam[`Team ${job.team}`].count += 1;
    
    // Map duration by job size
    durationByJobSize.push({
      items: job.items,
      duration: job.duration,
      name: job.client
    });
  });
  
  // Average accuracy by team
  const accuracyData = Object.keys(accuracyByTeam).map(team => ({
    team,
    accuracy: accuracyByTeam[team].totalAccuracy / accuracyByTeam[team].count
  }));
  
  return {
    accuracyData,
    durationByJobSize
  };
};

const jobStatusCounts = mockJobData.reduce((acc, job) => {
  acc[job.status] = (acc[job.status] || 0) + 1;
  return acc;
}, {});

const statusData = Object.keys(jobStatusCounts).map(status => ({
  name: status,
  value: jobStatusCounts[status]
}));

const performanceData = preparePerformanceData(mockJobData);

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportsPage = () => {
  const [timeframe, setTimeframe] = useState("30days");
  const [reportType, setReportType] = useState("jobPerformance");
  
  const handleDownloadReport = () => {
    console.log("Downloading report:", reportType);
    alert("Report download started. Your file will be ready shortly.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports Dashboard</h1>
          <p className="text-gray-600">View and analyze stocktaking performance data</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleDownloadReport} className="flex items-center gap-2">
            <Download size={16} />
            Download Report
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="summary" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" />
            Trends
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Status Distribution</CardTitle>
                <CardDescription>
                  Overview of current job statuses for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Team Accuracy Ratings</CardTitle>
                <CardDescription>
                  Average accuracy percentage by team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData.accuracyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="team" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="accuracy" fill="#8884d8" name="Accuracy %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Jobs Summary</CardTitle>
              <CardDescription>
                Overview of recently completed and in-progress jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Duration (hrs)</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockJobData.slice(0, 5).map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.id}</TableCell>
                        <TableCell>{job.date}</TableCell>
                        <TableCell>{job.client}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{job.duration}</TableCell>
                        <TableCell>{job.accuracy}%</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            job.status === "completed" ? "bg-green-100 text-green-800" :
                            job.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                            job.status === "scheduled" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {job.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Job Duration vs. Size</CardTitle>
              <CardDescription>
                Analysis of time spent relative to inventory size
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData.durationByJobSize}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="items" label={{ value: 'Number of Items', position: 'bottom', offset: 0 }} />
                    <YAxis label={{ value: 'Duration (hours)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="duration"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Job Duration"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Detailed breakdown of job efficiency and accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Team Size</TableHead>
                      <TableHead>Items Counted</TableHead>
                      <TableHead>Duration (hrs)</TableHead>
                      <TableHead>Items/Hour</TableHead>
                      <TableHead>Accuracy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockJobData.slice(0, 10).map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.id}</TableCell>
                        <TableCell>{job.client}</TableCell>
                        <TableCell>{job.team}</TableCell>
                        <TableCell>{job.items.toLocaleString()}</TableCell>
                        <TableCell>{job.duration}</TableCell>
                        <TableCell>{Math.round(job.items / job.duration).toLocaleString()}</TableCell>
                        <TableCell>{job.accuracy}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Value Trends</CardTitle>
              <CardDescription>
                Monthly trends in inventory values by location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockJobData.slice(0, 8)}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 50,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip formatter={(value) => `R ${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" name="Inventory Value (R)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Completion Trends</CardTitle>
                <CardDescription>
                  Number of completed jobs over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockJobData.filter(job => job.status === "completed").slice(0, 10)}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="duration" stroke="#8884d8" name="Duration (hrs)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Accuracy Improvement</CardTitle>
                <CardDescription>
                  Tracking accuracy improvements over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockJobData.slice(0, 10)}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[85, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="accuracy" stroke="#FF8042" name="Accuracy %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
