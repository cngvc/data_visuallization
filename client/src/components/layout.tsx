import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { pages } from '@/configs/pages';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { open } = useSidebar();
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={pages.dashboard}>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">{location.pathname.split('/').pop()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className={cn(`flex flex-1 flex-col gap-4 p-4 min-w-lg`, open ? 'md:w-[calc(100vw-285px)]' : 'w-full')}>{children}</div>
      </SidebarInset>
    </>
  );
}
