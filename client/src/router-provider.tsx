import { AppLayout } from '@/components/app-layout';
import { ProtectedRoute } from '@/components/protected-route';
import { PublicRoute } from '@/components/public-route';
import { pages } from '@/configs/pages';
import Activities from '@/pages/activities';
import ClubAttendance from '@/pages/analytics/club-attendance';
import ClubOverview from '@/pages/analytics/club-overview';
import CoachingPerformance from '@/pages/analytics/coaching-performance';
import EventRevenue from '@/pages/analytics/event-revenue';
import EventUtilization from '@/pages/analytics/event-utilization';
import Forecasting from '@/pages/analytics/forecasting';
import MembershipUtilization from '@/pages/analytics/membership-utilization';
import RetailConversion from '@/pages/analytics/retail-conversion';
import RetentionGrowth from '@/pages/analytics/retention-growth';
import RevenuePerCourtHour from '@/pages/analytics/revenue-per-court-hour';
import RevenueSource from '@/pages/analytics/revenue-source';
import SpecificUtilization from '@/pages/analytics/specific-utilization';
import StaffActivity from '@/pages/analytics/staff-activity';
import StaffCompliance from '@/pages/analytics/staff-compliance';
import TopMembers from '@/pages/analytics/top-members';
import TotalRevenue from '@/pages/analytics/total-revenue';
import TotalUtilization from '@/pages/analytics/total-utilization';
import UtilizationDrivers from '@/pages/analytics/utilization-drivers';
import UtilizationForecasting from '@/pages/analytics/utilization-forecasting';
import UtilizationOptimization from '@/pages/analytics/utilization-optimization';
import Courts from '@/pages/courts';
import EventCategories from '@/pages/event-categories';
import Events from '@/pages/events';
import Families from '@/pages/families';
import Login from '@/pages/login';
import PlayerReports from '@/pages/member-reports';
import Members from '@/pages/members';
import MembershipTypes from '@/pages/membership-types';
import NotFound from '@/pages/not-found';
import ReservationTypes from '@/pages/reservation-types';
import Reservations from '@/pages/reservations';
import RevenueRecognition from '@/pages/revenue-recognition';
import SalesSummary from '@/pages/sales-summary';
import Signup from '@/pages/signup';
import Transactions from '@/pages/transactions';
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router';
import AccountSettings from './pages/account-settings';
import ReservationPlayers from './pages/event-registrations';
import ForgotPassword from './pages/forgot-password';
import OrganizationSettings from './pages/organization-settings';
import ResetPassword from './pages/reset-password';

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: pages.login,
        element: <Login />
      },
      {
        path: pages.signup,
        element: <Signup />
      },
      {
        path: pages.forgotPassword,
        element: <ForgotPassword />
      },
      {
        path: pages.resetPassword,
        element: <ResetPassword />
      }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: pages.transactions,
            element: <Transactions />
          },
          {
            path: pages.salesSummary,
            element: <SalesSummary />
          },
          {
            path: pages.activities,
            element: <Activities />
          },
          {
            path: pages.members,
            element: <Members />
          },
          {
            path: pages.reservations,
            element: <Reservations />
          },
          {
            path: pages.eventRegistrationsActive,
            element: <ReservationPlayers status="Active" />
          },
          {
            path: pages.eventRegistrationsCancelled,
            element: <ReservationPlayers status="Cancelled" />
          },
          {
            path: pages.events,
            element: <Events />
          },
          {
            path: pages.families,
            element: <Families />
          },
          {
            path: pages.memberReports,
            element: <PlayerReports />
          },
          {
            path: pages.reservationTypes,
            element: <ReservationTypes />
          },
          {
            path: pages.membershipTypes,
            element: <MembershipTypes />
          },
          {
            path: pages.courts,
            element: <Courts />
          },
          {
            path: pages.revenueRecognition,
            element: <RevenueRecognition />
          },
          {
            path: pages.eventCategories,
            element: <EventCategories />
          },
          {
            path: pages.accountSettings,
            element: <AccountSettings />
          },
          {
            path: `${pages.organizationSettings}/:id`,
            element: <OrganizationSettings />
          },
          {
            path: pages.dashboard,
            element: <ClubOverview />
          },
          {
            path: pages.totalRevenue,
            element: <TotalRevenue />
          },
          {
            path: pages.revenuePerCourtHour,
            element: <RevenuePerCourtHour />
          },
          {
            path: pages.revenueSource,
            element: <RevenueSource />
          },
          {
            path: pages.eventRevenue,
            element: <EventRevenue />
          },
          {
            path: pages.totalUtilization,
            element: <TotalUtilization />
          },
          {
            path: pages.utilizationDrivers,
            element: <UtilizationDrivers />
          },
          {
            path: pages.utilizationOptimization,
            element: <UtilizationOptimization />
          },
          {
            path: pages.eventUtilization,
            element: <EventUtilization />
          },
          {
            path: pages.utilizationForecasting,
            element: <UtilizationForecasting />
          },
          {
            path: pages.staffActivity,
            element: <StaffActivity />
          },
          {
            path: pages.staffCompliance,
            element: <StaffCompliance />
          },
          {
            path: pages.coachingPerformance,
            element: <CoachingPerformance />
          },
          {
            path: pages.retailConversion,
            element: <RetailConversion />
          },
          {
            path: pages.membershipUtilization,
            element: <MembershipUtilization />
          },
          {
            path: pages.specificUtilization,
            element: <SpecificUtilization />
          },
          {
            path: pages.retentionGrowth,
            element: <RetentionGrowth />
          },
          {
            path: pages.topMembers,
            element: <TopMembers />
          },
          {
            path: pages.clubAttendance,
            element: <ClubAttendance />
          },
          {
            path: pages.forecasting,
            element: <Forecasting />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}

export default RouterProvider;
