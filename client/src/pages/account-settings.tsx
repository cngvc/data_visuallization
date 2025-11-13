import PersonalInformationSection from '@/components/account/personal-information-section';
import SecuritySection from '@/components/account/security-section';
import Layout from '@/components/layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Loader2 } from 'lucide-react';

const AccountSettings = () => {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <Layout>
        <Alert>
          <AlertTitle>Unauthorized</AlertTitle>
          <AlertDescription>You are not authorized to view this page.</AlertDescription>
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <PersonalInformationSection user={user!} />
        <SecuritySection />
      </div>
    </Layout>
  );
};

export default AccountSettings;
