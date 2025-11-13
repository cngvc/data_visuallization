import {
  Activity,
  Banknote,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarPlus,
  CalendarX,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  CircleGauge,
  Coins,
  CreditCard,
  Crosshair,
  FolderClosed,
  Gavel,
  GraduationCap,
  Home,
  Hourglass,
  Layers,
  PackageCheck,
  Settings,
  Settings2,
  ShieldUser,
  SlidersVertical,
  SquareKanban,
  SquareSlash,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  Users
} from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import { pages } from '@/configs/pages';
import { Link, useLocation } from 'react-router';
import ChatAI from './chat-ai';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const data = {
  navMain: [
    {
      label: 'Club Analyst'
    },
    {
      title: 'Club Overview',
      url: pages.dashboard,
      icon: <Home className="size-6!" strokeWidth={1.5} />
    },
    {
      title: 'Financial Summary',
      icon: <CircleDollarSign className="size-6!" strokeWidth={1.5} />,
      items: [
        {
          title: 'Total Revenue',
          url: pages.totalRevenue,
          icon: <Coins className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Revenue Per Court Hour',
          url: pages.revenuePerCourtHour,
          icon: <Hourglass className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Revenue Source',
          url: pages.revenueSource,
          icon: <SquareKanban className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Event Revenue',
          url: pages.eventRevenue,
          icon: <Calendar className="!size-4" strokeWidth={1.5} />
        }
      ]
    },
    {
      title: 'Court Utilization',
      icon: <Gavel className="size-6!" strokeWidth={1.5} />,
      items: [
        {
          title: 'Total Utilization',
          url: pages.totalUtilization,
          icon: <Settings2 className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Utilization Drivers',
          url: pages.utilizationDrivers,
          icon: <SlidersVertical className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Utilization Optimization',
          url: pages.utilizationOptimization,
          icon: <CircleGauge className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Event Utilization',
          url: pages.eventUtilization,
          icon: <CalendarCheck className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Utilization Forecasting',
          url: pages.utilizationForecasting,
          icon: <TrendingUp className="!size-4" strokeWidth={1.5} />
        }
      ]
    },

    {
      title: 'Member Activity',
      icon: <Users className="size-6!" strokeWidth={1.5} />,
      items: [
        {
          title: 'Membership Utilization',
          url: pages.membershipUtilization,
          icon: <PackageCheck className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Specific Utilization',
          url: pages.specificUtilization,
          icon: <Crosshair className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Retention & Growth',
          url: pages.retentionGrowth,
          icon: <Layers className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Top Members',
          url: pages.topMembers,
          icon: <Trophy className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Club Attendance',
          url: pages.clubAttendance,
          icon: <UserCheck className="!size-4" strokeWidth={1.5} />
        }
      ]
    },
    {
      title: 'Staff Productivity',
      icon: <SquareSlash className="size-6!" strokeWidth={1.5} />,
      items: [
        {
          title: 'Staff Activity',
          url: pages.staffActivity,
          icon: <Activity className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Staff Compliance',
          url: pages.staffCompliance,
          icon: <ShieldUser className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Coaching Performance',
          url: pages.coachingPerformance,
          icon: <TrendingUp className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Retail Conversion',
          url: pages.retailConversion,
          icon: <Banknote className="!size-4" strokeWidth={1.5} />
        }
      ]
    },
    {
      title: 'Forecasting',
      url: pages.forecasting,
      icon: <TrendingUp className="size-6!" strokeWidth={1.5} />
    },
    {
      label: 'Data Management'
    },
    {
      title: 'Families',
      url: pages.families,
      icon: <Users className="size-6!" strokeWidth={1.5} />
    },
    {
      title: 'Members',
      url: pages.members,
      icon: <User className="size-6!" strokeWidth={1.5} />
    },
    {
      title: 'Events',
      url: pages.events,
      icon: <Calendar className="size-6!" strokeWidth={1.5} />
    },
    {
      title: 'Event Registrations',
      icon: <CalendarPlus className="size-6!" strokeWidth={1.5} />,
      items: [
        {
          title: 'Active',
          url: pages.eventRegistrationsActive,
          icon: <CalendarCheck className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Cancelled',
          url: pages.eventRegistrationsCancelled,
          icon: <CalendarX className="!size-4" strokeWidth={1.5} />
        }
      ]
    },
    {
      title: 'Reservations',
      url: pages.reservations,
      icon: <CalendarClock className="size-6!" strokeWidth={1.5} />
    },
    {
      title: 'Transactions',
      icon: <CreditCard className="size-6!" strokeWidth={1.5} />,
      items: [
        {
          title: 'List',
          url: pages.transactions,
          icon: <CreditCard className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Sales Summary',
          url: pages.salesSummary,
          icon: <ChartNoAxesCombined className="!size-4" strokeWidth={1.5} />
        }
      ]
    },
    {
      title: 'Revenue Recognition',
      url: pages.revenueRecognition,
      icon: <CircleDollarSign className="size-6!" strokeWidth={1.5} />
    },
    {
      title: 'Settings',
      icon: <Settings className="size-6!" strokeWidth={1.5} />,
      items: [
        {
          title: 'Event Categories',
          url: pages.eventCategories,
          icon: <Calendar className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Reservation Types',
          url: pages.reservationTypes,
          icon: <CalendarCheck className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Membership Types',
          url: pages.membershipTypes,
          icon: <GraduationCap className="!size-4" strokeWidth={1.5} />
        },
        {
          title: 'Courts',
          url: pages.courts,
          icon: <FolderClosed className="!size-4" strokeWidth={1.5} />
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const params = useLocation();
  const path = params.pathname;
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={pages.dashboard}>
                <img src="/logo.png" alt="Logo" className="h-9 w-auto flex-shrink-0" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, i) => {
              if (item.label) {
                return (
                  <SidebarMenuItem key={i}>
                    <SidebarGroupLabel className="uppercase text-xs mt-4 mb-2 h-4">{item.label}</SidebarGroupLabel>
                  </SidebarMenuItem>
                );
              }
              const isCurrent = path === item.url;
              const isOpen = isCurrent || (item.items && item.items.some((i) => path === i.url));
              return (
                <Collapsible key={item.url} className="group/collapsible" defaultOpen={isOpen}>
                  <SidebarGroup className="py-0">
                    <CollapsibleTrigger className="p-0 truncate">
                      <SidebarMenu>
                        <SidebarMenuItem>
                          {item.url ? (
                            <SidebarMenuButton asChild>
                              <Link to={item.url!} className="flex items-center gap-2 font-medium line-clamp-1 text-sm">
                                {item.icon}
                                {item.title}
                              </Link>
                            </SidebarMenuButton>
                          ) : (
                            <SidebarMenuButton className="flex items-center gap-2 font-medium text-sm">
                              {item.icon}
                              {item.title}
                              <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                              <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                            </SidebarMenuButton>
                          )}
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarGroupContent>
                        {item.items?.length ? (
                          <SidebarMenuSub>
                            {item.items.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link to={item.url!} className="flex text-xs py-2 items-center gap-2 font-normal">
                                    {item.icon}
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        ) : null}
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              );
            })}
          </SidebarMenu>
          <ChatAI />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
