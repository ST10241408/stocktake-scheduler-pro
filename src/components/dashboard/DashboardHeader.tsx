
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';

const DashboardHeader = () => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white border-b p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </SidebarTrigger>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm">Welcome, {user?.firstName}!</span>
          <Avatar className="md:hidden">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
