import { pages } from '@/configs/pages';
import { useAuthStore } from '@/store/auth.store';
import { Navigate, Outlet } from 'react-router';
import LoadingPage from './loading';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuthStore();
  if (loading) {
    return <LoadingPage />;
  }
  if (!isAuthenticated) {
    return <Navigate to={pages.login} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
