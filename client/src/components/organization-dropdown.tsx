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
import type { IUserOrganization } from '@/graphql/queries';
import { useCurrentUser } from '@/hooks/use-current-user';
import { ArrowUpRight, Building, ChevronDown, LoaderIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Label } from './ui/label';

export function OrganizationDropdown() {
  const { organizations, currentOrganization, switchOrganization, loading } = useCurrentUser();
  if (!organizations || organizations.length === 0) {
    return null;
  }
  return (
    <div className="flex items-center gap-2">
      {loading && <LoaderIcon className="size-6 text-muted-foreground animate-spin" />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Building className="h-4 w-4" />
            <span className="max-w-[150px] truncate">{currentOrganization?.name || 'Select Organization'}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {organizations.map((org: IUserOrganization) => (
            <DropdownMenuItem
              key={org._id}
              asChild
              className={`cursor-pointer ${currentOrganization?._id === org.organization_id._id ? 'bg-accent' : ''} mb-0.5`}
            >
              <div className="w-full justify-between grid grid-cols-[1fr_auto] py-3">
                <Label
                  onClick={() => {
                    setTimeout(() => {
                      switchOrganization(org.organization_id._id);
                    }, 100);
                  }}
                  className="truncate line-clamp-1"
                >
                  {org.organization_id.name}
                </Label>
                <Link to={`${pages.organizationSettings}/${org.organization_id._id}`}>
                  <ArrowUpRight className="h-4 w-4 opacity-50" />
                </Link>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default OrganizationDropdown;
