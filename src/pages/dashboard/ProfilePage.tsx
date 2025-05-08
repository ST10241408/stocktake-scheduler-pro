import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { User, CheckCircle2, Lock, Eye, EyeOff } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "" // Using phone instead of phoneNumber
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating profile with:", formData);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully."
      });
    }, 1000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation password do not match.",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Your new password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    console.log("Changing password");
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully."
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center pt-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.avatar} /> {/* Using avatar instead of profileImage */}
              <AvatarFallback className="text-2xl bg-primary/10">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <h2 className="font-semibold text-xl mt-4">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600 capitalize mb-1">{user?.role}</p>
            
            <div className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> 
              Account active
            </div>
            
            <Separator className="my-4" />
            
            <div className="w-full space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Member since:</span>
                <span className="font-medium">May 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last login:</span>
                <span className="font-medium">Today</span>
              </div>
            </div>
            
            <Button variant="outline" className="mt-6 w-full">Upload Photo</Button>
          </CardContent>
        </Card>
        
        {/* Settings Tabs Card */}
        <Card className="md:col-span-2">
          <Tabs defaultValue="personal-info">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Account Settings</CardTitle>
                <TabsList>
                  <TabsTrigger value="personal-info" className="flex gap-2 items-center">
                    <User className="h-4 w-4" /> Profile
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex gap-2 items-center">
                    <Lock className="h-4 w-4" /> Security
                  </TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                Update your account preferences and settings
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="personal-info" className="mt-0">
                <form onSubmit={handleUpdateProfile}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handlePersonalInfoChange}
                        disabled
                      />
                      <p className="text-xs text-gray-500">
                        Email addresses cannot be changed. Contact admin for assistance.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (optional)</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handlePersonalInfoChange}
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <Button type="submit" className="mt-2">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <form onSubmit={handleChangePassword}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input 
                          id="currentPassword"
                          name="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter your current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input 
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter your new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirm your new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>Password requirements:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Minimum 6 characters long</li>
                        <li>Include at least one number</li>
                        <li>Include at least one special character</li>
                      </ul>
                    </div>
                    
                    <Button type="submit" className="mt-2">
                      Change Password
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
