import { pages } from '@/configs/pages';
import { useAuthStore } from '@/store/auth.store';
import { Navigate, Outlet } from 'react-router';
import LoadingPage from './loading';

interface PublicRouteProps {
  children?: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAuthStore();
  if (loading) {
    return <LoadingPage />;
  }
  if (isAuthenticated) {
    return <Navigate to={pages.dashboard} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
