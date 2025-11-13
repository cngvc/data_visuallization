import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { pages } from '@/configs/pages';
import { useAuthStore } from '@/store/auth.store';
import { LogOut, Settings, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

const UserButton = () => {
  const { user, isAuthenticated, logout, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error('Failed to logout');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="sm" className="w-9 px-0" disabled>
        <span className="sr-only">Loading</span>
      </Button>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link to={pages.login}>
          <User className="h-4 w-4 mr-2" /> Sign In
        </Link>
      </Button>
    );
  }

  const firstCharacter = user.email.charAt(0).toUpperCase();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full p-0">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground">{firstCharacter}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="pt-2 pb-4 text-sm font-medium leading-tight line-clamp-1 break-all">{user.email}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate(pages.accountSettings)} disabled={loading} className="cursor-pointer">
            <Settings className="h-4 w-4 mr-2" /> Account Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} disabled={loading} className="cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
