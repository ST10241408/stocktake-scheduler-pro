
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Client } from "@/types";

const ClientsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Client form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentClientId, setCurrentClientId] = useState<string | null>(null);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  
  // Mock client data
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      companyId: "1",
      name: "Retail Solutions Inc.",
      contactPerson: "John Smith",
      email: "john@retailsolutions.com",
      phone: "+1 (123) 456-7890",
      address: "123 Main St, City, State",
      notes: "Large retail chain with multiple locations",
      createdAt: new Date("2023-01-15"),
    },
    {
      id: "2",
      companyId: "1",
      name: "Metro Supermarkets",
      contactPerson: "Sarah Johnson",
      email: "sarah@metrosupermarkets.com",
      phone: "+1 (234) 567-8901",
      address: "456 Market St, City, State",
      notes: "Monthly stocktaking required",
      createdAt: new Date("2023-02-20"),
    },
    {
      id: "3",
      companyId: "1",
      name: "Tech Warehouse Ltd",
      contactPerson: "Michael Brown",
      email: "michael@techwarehouse.com",
      phone: "+1 (345) 678-9012",
      address: "789 Tech Blvd, City, State",
      notes: "High-value electronics stocktaking",
      createdAt: new Date("2023-03-10"),
    },
  ]);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle client form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentClientId) {
      // Update existing client
      setClients(clients.map(client => 
        client.id === currentClientId 
          ? { ...client, ...formData }
          : client
      ));
      
      toast({
        title: "Client Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new client
      const newClient: Client = {
        id: (clients.length + 1).toString(),
        companyId: user?.companyId || "1",
        ...formData,
        createdAt: new Date(),
      };
      
      setClients([...clients, newClient]);
      
      toast({
        title: "Client Added",
        description: `${formData.name} has been added successfully.`,
      });
    }
    
    // Reset form and close dialog
    resetForm();
    setIsDialogOpen(false);
  };
  
  // Reset form to default state
  const resetForm = () => {
    setFormData({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    });
    setIsEditing(false);
    setCurrentClientId(null);
  };
  
  // Open edit dialog
  const openEditDialog = (client: Client) => {
    setFormData({
      name: client.name,
      contactPerson: client.contactPerson,
      email: client.email,
      phone: client.phone,
      address: client.address,
      notes: client.notes || "",
    });
    setIsEditing(true);
    setCurrentClientId(client.id);
    setIsDialogOpen(true);
  };
  
  // Delete client
  const deleteClient = (id: string) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      setClients(clients.filter(client => client.id !== id));
      
      toast({
        title: "Client Deleted",
        description: "Client has been deleted successfully.",
      });
    }
  };
  
  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-gray-500">Manage your client information</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search clients..."
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" /> Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Client" : "Add New Client"}</DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Update the client information below." 
                    : "Enter the client details to add them to your system."
                  }
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Client Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditing ? "Update Client" : "Add Client"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden lg:table-cell">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.contactPerson}</TableCell>
                  <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{client.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {client.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(client)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteClient(client.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  {searchTerm ? "No clients match your search" : "No clients found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientsPage;
