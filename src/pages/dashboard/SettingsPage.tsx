
import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { 
  Bell, 
  Globe, 
  Palette, 
  Shield, 
  Mail, 
  Smartphone 
} from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newJobAlerts: true,
    marketingEmails: false,
    systemUpdates: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: false,
    highContrast: false,
    fontSize: "medium",
    reduceMotion: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    deviceHistory: true
  });

  const handleNotificationToggle = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof notificationSettings]
    }));
  };

  const handleAppearanceToggle = (key: string) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof appearanceSettings]
    }));
  };

  const handleSecurityToggle = (key: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof securitySettings]
    }));
  };

  const saveSettings = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully."
      });
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-gray-600">Manage your system preferences and configurations</p>
      </div>
      
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications from the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via text message
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={() => handleNotificationToggle('smsNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Job Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Get notified when new jobs are created
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newJobAlerts}
                    onCheckedChange={() => handleNotificationToggle('newJobAlerts')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">
                      Receive promotional content and updates
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={() => handleNotificationToggle('marketingEmails')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">System Updates</Label>
                    <p className="text-sm text-gray-500">
                      Get notified about system changes and updates
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={() => handleNotificationToggle('systemUpdates')}
                  />
                </div>
              </div>
              
              <Button onClick={saveSettings} disabled={saving}>
                {saving ? "Saving..." : "Save Notification Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the application looks and behaves
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-gray-500">
                      Use a darker color theme
                    </p>
                  </div>
                  <Switch
                    checked={appearanceSettings.darkMode}
                    onCheckedChange={() => handleAppearanceToggle('darkMode')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">High Contrast</Label>
                    <p className="text-sm text-gray-500">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch
                    checked={appearanceSettings.highContrast}
                    onCheckedChange={() => handleAppearanceToggle('highContrast')}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label className="text-base">Font Size</Label>
                  <p className="text-sm text-gray-500">
                    Choose your preferred text size
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      variant={appearanceSettings.fontSize === "small" ? "default" : "outline"}
                      onClick={() => setAppearanceSettings(prev => ({ ...prev, fontSize: "small" }))}
                      className="w-full"
                    >
                      Small
                    </Button>
                    <Button 
                      variant={appearanceSettings.fontSize === "medium" ? "default" : "outline"}
                      onClick={() => setAppearanceSettings(prev => ({ ...prev, fontSize: "medium" }))}
                      className="w-full"
                    >
                      Medium
                    </Button>
                    <Button 
                      variant={appearanceSettings.fontSize === "large" ? "default" : "outline"}
                      onClick={() => setAppearanceSettings(prev => ({ ...prev, fontSize: "large" }))}
                      className="w-full"
                    >
                      Large
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Reduce Motion</Label>
                    <p className="text-sm text-gray-500">
                      Minimize animations throughout the interface
                    </p>
                  </div>
                  <Switch
                    checked={appearanceSettings.reduceMotion}
                    onCheckedChange={() => handleAppearanceToggle('reduceMotion')}
                  />
                </div>
              </div>
              
              <Button onClick={saveSettings} disabled={saving}>
                {saving ? "Saving..." : "Save Appearance Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security options for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={() => handleSecurityToggle('twoFactorAuth')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Login Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Get notified of new sign-ins to your account
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.loginAlerts}
                    onCheckedChange={() => handleSecurityToggle('loginAlerts')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Device History</Label>
                    <p className="text-sm text-gray-500">
                      Track devices that have accessed your account
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.deviceHistory}
                    onCheckedChange={() => handleSecurityToggle('deviceHistory')}
                  />
                </div>
              </div>
              
              <Button onClick={saveSettings} disabled={saving}>
                {saving ? "Saving..." : "Save Security Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
