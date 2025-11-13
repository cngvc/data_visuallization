import { AppNavbar } from '@/components/app-navbar';
import { AppSidebar } from '@/components/app-sidebar';
import { useAuthStore } from '@/store/auth.store';
import { Outlet } from 'react-router';
import LoadingPage from './loading';

export function AppLayout() {
  const { loading } = useAuthStore();
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <AppSidebar className="border-r" />
      <div className="flex flex-col flex-1">
        <AppNavbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AppLayout;
