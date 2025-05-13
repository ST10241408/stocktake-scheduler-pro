import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { CheckCircle2 } from "lucide-react";

interface ProfileSummaryProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string; // Make avatar optional
    createdAt: string;
  };
}

const ProfileSummary = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center text-center pt-2">
      <Avatar className="w-24 h-24">
        <AvatarImage src={user?.avatar as string} />
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
    </div>
  );
};

export default ProfileSummary;
