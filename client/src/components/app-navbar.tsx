import OrganizationDropdown from '@/components/organization-dropdown';
import { Button } from '@/components/ui/button';
import UserButton from '@/components/user-button';
import { pages } from '@/configs/pages';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Activity } from 'lucide-react';
import { Link } from 'react-router';

export function AppNavbar() {
  const { isAuthenticated } = useCurrentUser();

  return (
    <header className="sticky top-0 z-50 flex items-center gap-4 border-b bg-background px-4 sm:px-6 py-4">
      <div className="flex flex-1 items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <>
              <OrganizationDropdown />
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Activities"
                className="rounded-full aspect-square bg-gray-200 hover:bg-gray-300"
              >
                <Link to={pages.activities}>
                  <Activity className="h-5 w-5" />
                </Link>
              </Button>
            </>
          )}
          <UserButton />
        </div>
      </div>
    </header>
  );
}

export default AppNavbar;
