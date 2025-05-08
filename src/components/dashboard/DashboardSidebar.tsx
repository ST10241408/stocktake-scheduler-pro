
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter
} from '@/components/ui/sidebar';
import {
  Users, Briefcase, User, Settings, LogOut,
  CalendarClock, Home, ClipboardList, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { name: 'Profile', path: '/dashboard/profile', icon: User },
    ];

    // Role-specific menu items
    const roleItems = {
      admin: [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Users', path: '/dashboard/users', icon: Users },
        { name: 'Clients', path: '/dashboard/clients', icon: Briefcase },
        { name: 'Jobs', path: '/dashboard/jobs', icon: CalendarClock },
        { name: 'Settings', path: '/dashboard/settings', icon: Settings },
      ],
      coordinator: [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Jobs', path: '/dashboard/jobs', icon: CalendarClock },
        { name: 'Clients', path: '/dashboard/clients', icon: Briefcase },
      ],
      scanner: [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'My Jobs', path: '/dashboard/jobs', icon: ClipboardList },
      ],
      client: [
        { name: 'Dashboard', path: '/dashboard/client', icon: Home },
        { name: 'Book Service', path: '/dashboard/book', icon: CalendarClock },
        { name: 'My Jobs', path: '/dashboard/jobs', icon: Briefcase },
      ],
      supervisor: [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Jobs', path: '/dashboard/jobs', icon: CalendarClock },
        { name: 'Reports', path: '/dashboard/reports', icon: ClipboardList },
      ],
      receptionist: [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Bookings', path: '/dashboard/bookings', icon: CalendarClock },
        { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
        { name: 'Clients', path: '/dashboard/clients', icon: Briefcase },
      ],
    };

    return [
      ...(user?.role ? roleItems[user.role] || [] : []),
      ...commonItems,
    ];
  };

  const navItems = getNavItems();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </div>
          <span className="font-bold text-lg text-primary">StocktakePro</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = path === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary text-white font-medium' 
                      : 'hover:bg-primary/10'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            title="Log out"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
