import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { ShieldUser } from 'lucide-react';

function StaffCompliance() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Staff Compliance"
        icon={<ShieldUser className="size-6" />}
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

export default StaffCompliance;
