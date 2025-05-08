
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Search, 
  Send, 
  Plus, 
  Phone, 
  Mail, 
  Clock, 
  User, 
  Filter 
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Mock data for demonstration
const mockContacts = [
  { 
    id: 1, 
    name: "Jane Smith", 
    company: "ABC Retail", 
    email: "jane.smith@abcretail.com", 
    phone: "071 234 5678",
    avatar: "/lovable-uploads/Jane Smith.jpg",
    lastActive: new Date(2024, 4, 5, 10, 30),
    unreadCount: 2
  },
  { 
    id: 2, 
    name: "Michael Brown", 
    company: "123 Supermarket", 
    email: "m.brown@123super.com", 
    phone: "082 345 6789",
    avatar: "/lovable-uploads/Michael Brown.jpg",
    lastActive: new Date(2024, 4, 6, 15, 45),
    unreadCount: 0
  },
  { 
    id: 3, 
    name: "Sarah Johnson", 
    company: "City Electronics", 
    email: "sarah@cityelectronics.com", 
    phone: "073 456 7890",
    avatar: "/lovable-uploads/sarah johnson.jpg",
    lastActive: new Date(2024, 4, 7, 9, 15),
    unreadCount: 5
  },
  { 
    id: 4, 
    name: "David Wilson", 
    company: "Fashion Hub", 
    email: "dwilson@fashionhub.com", 
    phone: "060 567 8901",
    avatar: "",
    lastActive: new Date(2024, 4, 7, 14, 20),
    unreadCount: 1
  },
  { 
    id: 5, 
    name: "Emily Adams", 
    company: "Grocery World", 
    email: "emily.a@groceryworld.co.za", 
    phone: "078 678 9012",
    avatar: "",
    lastActive: new Date(2024, 4, 8, 11, 10),
    unreadCount: 0
  },
];

const mockMessages = {
  1: [
    {
      id: 1,
      senderId: "self",
      text: "Good morning Jane, I'm following up on the scheduled stocktake for next week. Are there any specific preparations we should be aware of?",
      timestamp: new Date(2024, 4, 5, 8, 30),
      read: true
    },
    {
      id: 2,
      senderId: 1,
      text: "Hi there! Yes, we've cleared the warehouse section you requested. However, we still need to know how many staff members will be coming so we can prepare the access cards.",
      timestamp: new Date(2024, 4, 5, 9, 15),
      read: true
    },
    {
      id: 3,
      senderId: "self",
      text: "Great! We'll be sending a team of 4 people. They'll arrive at approximately 8:00 AM. Would you like me to send their names and ID numbers in advance?",
      timestamp: new Date(2024, 4, 5, 10, 0),
      read: true
    },
    {
      id: 4,
      senderId: 1,
      text: "Yes, that would be very helpful. Please email those details to security@abcretail.com and copy me as well. Also, will you need any specific equipment from our side?",
      timestamp: new Date(2024, 4, 5, 10, 10),
      read: false
    },
    {
      id: 5,
      senderId: 1,
      text: "One more thing - our IT department wants to know if your team will need access to our inventory management system or if you'll be using your own devices exclusively.",
      timestamp: new Date(2024, 4, 5, 10, 15),
      read: false
    }
  ],
  3: [
    {
      id: 1,
      senderId: "self",
      text: "Hello Sarah, this is regarding your request for a quotation for the annual stocktake. Could you confirm the total square footage of your store?",
      timestamp: new Date(2024, 4, 6, 11, 30),
      read: true
    },
    {
      id: 2,
      senderId: 3,
      text: "Hi, our main floor is approximately 500 square meters, and we have an additional storage area of about 200 square meters.",
      timestamp: new Date(2024, 4, 6, 13, 45),
      read: true
    },
    {
      id: 3,
      senderId: "self",
      text: "Thank you for that information. Based on the size, we estimate it would take our team about 6-8 hours to complete a full inventory count. Would you prefer a weekend or weekday service?",
      timestamp: new Date(2024, 4, 7, 9, 0),
      read: true
    },
    {
      id: 4,
      senderId: 3,
      text: "We'd definitely prefer a weekend, specifically Sunday if possible. We're closed on Sundays so that would be ideal.",
      timestamp: new Date(2024, 4, 7, 9, 5),
      read: false
    },
    {
      id: 5,
      senderId: 3,
      text: "Also, could you provide a breakdown of your pricing structure? We'd like to understand how the costs are calculated.",
      timestamp: new Date(2024, 4, 7, 9, 7),
      read: false
    },
    {
      id: 6,
      senderId: 3,
      text: "And do you provide any reports after the stocktake is complete? We'd need detailed category-wise inventory reports.",
      timestamp: new Date(2024, 4, 7, 9, 10),
      read: false
    },
    {
      id: 7,
      senderId: 3,
      text: "Sorry for all the questions, but we also want to know how soon you could schedule us in. We're hoping to get this done within the next 3 weeks if possible.",
      timestamp: new Date(2024, 4, 7, 9, 15),
      read: false
    }
  ],
  4: [
    {
      id: 1,
      senderId: 4,
      text: "Hello, I'm interested in your stocktaking services. Do you have experience with fashion retail inventory?",
      timestamp: new Date(2024, 4, 7, 14, 0),
      read: false
    }
  ]
};

const MessagesPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const [newMessageForm, setNewMessageForm] = useState({
    recipient: "",
    subject: "",
    message: ""
  });

  // Filter contacts based on search term and filter type
  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || 
                          (filterType === "unread" && contact.unreadCount > 0);
    
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Create new message object
    const newMsg = {
      id: messages[selectedContact.id]?.length + 1 || 1,
      senderId: "self",
      text: newMessage,
      timestamp: new Date(),
      read: true
    };
    
    // Update messages state
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [
        ...(prev[selectedContact.id] || []),
        newMsg
      ]
    }));
    
    // Clear input
    setNewMessage("");
    
    // Simulate response after delay (for demo purposes only)
    setTimeout(() => {
      const autoResponse = {
        id: messages[selectedContact.id]?.length + 2 || 2,
        senderId: selectedContact.id,
        text: `Thanks for your message. This is an automated response. ${selectedContact.name} will get back to you soon.`,
        timestamp: new Date(Date.now() + 60000), // 1 minute later
        read: false
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: [
          ...(prev[selectedContact.id] || []),
          autoResponse
        ]
      }));
      
      // Update unread count
      const updatedContacts = mockContacts.map(c => {
        if (c.id === selectedContact.id) {
          return { ...c, unreadCount: c.unreadCount + 1 };
        }
        return c;
      });
    }, 2000);
  };

  const handleCreateNewMessage = (e) => {
    e.preventDefault();
    
    toast({
      title: "Message sent",
      description: `Your message to ${newMessageForm.recipient} has been sent.`
    });
    
    setShowNewMessageForm(false);
    setNewMessageForm({ recipient: "", subject: "", message: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-gray-600">Communicate with clients and team members</p>
        </div>
        <Button 
          onClick={() => setShowNewMessageForm(true)} 
          className="flex items-center gap-2"
        >
          <Plus size={16} /> New Message
        </Button>
      </div>
      
      {showNewMessageForm ? (
        <Card>
          <CardHeader>
            <CardTitle>New Message</CardTitle>
            <CardDescription>Send a message to a client or team member</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateNewMessage} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="recipient">Recipient</label>
                <Select
                  value={newMessageForm.recipient}
                  onValueChange={(value) => setNewMessageForm(prev => ({ ...prev, recipient: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockContacts.map(contact => (
                      <SelectItem key={contact.id} value={contact.name}>
                        {contact.name} ({contact.company})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject">Subject</label>
                <Input
                  id="subject"
                  placeholder="Message subject"
                  value={newMessageForm.subject}
                  onChange={(e) => setNewMessageForm(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message">Message</label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  rows={6}
                  value={newMessageForm.message}
                  onChange={(e) => setNewMessageForm(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewMessageForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Send Message</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contacts/Conversations List */}
          <Card className="md:col-span-1">
            <CardHeader className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All messages</SelectItem>
                    <SelectItem value="unread">Unread only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto">
                {filteredContacts.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    No conversations found
                  </div>
                ) : (
                  <div>
                    {filteredContacts.map((contact) => (
                      <div 
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 ${
                          selectedContact.id === contact.id ? "bg-gray-100" : ""
                        }`}
                      >
                        <Avatar>
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="bg-primary/10">
                            {contact.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{contact.name}</p>
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(contact.lastActive, { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{contact.company}</p>
                        </div>
                        {contact.unreadCount > 0 && (
                          <Badge variant="secondary" className="ml-auto">
                            {contact.unreadCount}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Chat/Message Area */}
          <Card className="md:col-span-2">
            {selectedContact ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedContact.avatar} />
                        <AvatarFallback className="bg-primary/10">
                          {selectedContact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedContact.name}</h3>
                        <p className="text-sm text-gray-500">{selectedContact.company}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" title="Call">
                        <Phone size={18} />
                      </Button>
                      <Button size="sm" variant="ghost" title="Email">
                        <Mail size={18} />
                      </Button>
                      <Button size="sm" variant="ghost" title="User Profile">
                        <User size={18} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 flex flex-col h-[500px]">
                  <div className="flex-1 overflow-y-auto p-4">
                    {messages[selectedContact.id]?.length > 0 ? (
                      <div className="space-y-4">
                        {messages[selectedContact.id].map((message) => {
                          const isSelf = message.senderId === "self";
                          return (
                            <div 
                              key={message.id} 
                              className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
                            >
                              <div 
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  isSelf 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-gray-100"
                                }`}
                              >
                                <p>{message.text}</p>
                                <div 
                                  className={`text-xs mt-1 ${
                                    isSelf ? "text-primary-foreground/70" : "text-gray-500"
                                  }`}
                                >
                                  {format(message.timestamp, "h:mm a")}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <MessageSquare size={48} className="mx-auto opacity-20 mb-2" />
                          <p>No messages yet</p>
                          <p className="text-sm">Start the conversation by sending a message</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-t p-4">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Textarea
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="resize-none"
                        rows={1}
                      />
                      <Button type="submit" size="icon" className="shrink-0">
                        <Send size={18} />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare size={48} className="mx-auto opacity-20 mb-2" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Quick access to selected contact details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedContact ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Contact Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    <span>{selectedContact.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    <span>{selectedContact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    <span>{selectedContact.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Activity</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-500" />
                    <span>Last active: {format(selectedContact.lastActive, "PPp")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-gray-500" />
                    <span>
                      {messages[selectedContact.id]?.length || 0} messages in conversation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Select a contact to view their details
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesPage;
