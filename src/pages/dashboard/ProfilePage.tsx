
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Update to use firstName and lastName directly without depending on phone or avatar
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "" // Use phoneNumber instead of phone
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
        title: "Profile Updated",
        description: "Your profile information has been updated successfully."
      });
    }, 1000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }
    
    console.log("Updating password with:", passwordData);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password Updated",
        description: "Your password has been updated successfully."
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }, 1000);
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(prev => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center pt-2">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.profileImage} /> {/* Use profileImage instead of avatar */}
              <AvatarFallback className="text-2xl bg-primary/10">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="mt-4 text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            
            <Separator className="my-4" />
            
            <div className="w-full text-left">
              <p className="text-sm mb-1">Account Type:</p>
              <p className="font-medium mb-4 capitalize">{user?.role || "User"}</p>
              
              <p className="text-sm mb-1">Member Since:</p>
              <p className="font-medium">
                {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Logout
            </Button>
          </CardFooter>
        </Card>
        
        {/* Tabs Section */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handlePersonalInfoChange}
                        disabled
                      />
                      <p className="text-sm text-muted-foreground">
                        Your email address cannot be changed
                      </p>
                    </div>
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handlePersonalInfoChange}
                        placeholder="Your phone number"
                      />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Change your password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdatePassword}>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input 
                          id="currentPassword"
                          name="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={toggleCurrentPasswordVisibility}
                        >
                          {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input 
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={toggleNewPasswordVisibility}
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit">Update Password</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
