import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { PackageCheck } from 'lucide-react';

function MembershipUtilization() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Membership Utilization"
        icon={<PackageCheck className="size-6" />}
        onExportPdf={() => {}}
        onExportCsv={() => {}}
        onToday={() => {}}
        onPeriodChange={() => {}}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />
    </Layout>
  );
}

export default MembershipUtilization;
