
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock } from "lucide-react";
import ProfileSummary from "@/components/profile/ProfileSummary";
import PersonalInfoForm from "@/components/profile/PersonalInfoForm";
import PasswordForm from "@/components/profile/PasswordForm";

const ProfilePage = () => {
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
          <CardContent>
            <ProfileSummary />
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
                <PersonalInfoForm />
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <PasswordForm />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
