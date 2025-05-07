
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MoreHorizontal, Mail, Phone, Edit, Trash2, UserPlus } from "lucide-react";
import { format } from "date-fns";
import { User, UserRole } from "@/types";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  
  // Mock data for users
  const users: User[] = [
    {
      id: "user-001",
      companyId: "comp-001",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      role: "admin",
      createdAt: new Date("2024-01-15")
    },
    {
      id: "user-002",
      companyId: "comp-001",
      firstName: "Emma",
      lastName: "Johnson",
      email: "emma.johnson@example.com",
      phone: "+1 (555) 234-5678",
      role: "coordinator",
      createdAt: new Date("2024-02-10")
    },
    {
      id: "user-003",
      companyId: "comp-001",
      firstName: "Michael",
      lastName: "Williams",
      email: "michael.w@example.com",
      phone: "+1 (555) 345-6789",
      role: "scanner",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      createdAt: new Date("2024-03-05")
    },
    {
      id: "user-004",
      companyId: "comp-001",
      firstName: "Sarah",
      lastName: "Brown",
      email: "sarah.brown@example.com",
      role: "supervisor",
      createdAt: new Date("2024-03-15")
    },
    {
      id: "user-005",
      companyId: "comp-001",
      firstName: "David",
      lastName: "Miller",
      email: "david.m@example.com",
      phone: "+1 (555) 678-9012",
      role: "scanner",
      createdAt: new Date("2024-04-01")
    },
    {
      id: "user-006",
      companyId: "comp-001",
      firstName: "Jennifer",
      lastName: "Wilson",
      email: "j.wilson@example.com",
      phone: "+1 (555) 789-0123",
      role: "receptionist",
      createdAt: new Date("2024-04-10")
    },
    {
      id: "user-007",
      companyId: "comp-001",
      firstName: "Robert",
      lastName: "Taylor",
      email: "robert.t@example.com",
      role: "client",
      createdAt: new Date("2024-04-20")
    }
  ];

  // Filter users based on search query and role filter
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone && user.phone.includes(searchQuery));
      
    const matchesRole = roleFilter === 'all' ? true : user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Helper function for role badge styling
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Admin</Badge>;
      case 'coordinator':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Coordinator</Badge>;
      case 'scanner':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Scanner</Badge>;
      case 'supervisor':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Supervisor</Badge>;
      case 'client':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Client</Badge>;
      case 'receptionist':
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">Receptionist</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {roleFilter !== 'all' ? `Role: ${roleFilter}` : "Filter by role"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setRoleFilter('all')}>
                  All Roles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('admin')}>
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('coordinator')}>
                  Coordinator
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('scanner')}>
                  Scanner
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('supervisor')}>
                  Supervisor
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('client')}>
                  Client
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('receptionist')}>
                  Receptionist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Users Table */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-primary/10">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5 text-gray-500" />
                            <span>{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5 text-gray-500" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getRoleBadge(user.role)}
                      </TableCell>
                      <TableCell>
                        {format(user.createdAt, "MMM d, yyyy")}
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
                              <Edit className="h-4 w-4" />
                              <span>Edit User</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center gap-2 text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete User</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No users found matching your search criteria
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

export default UsersPage;
