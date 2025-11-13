import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { Activity } from 'lucide-react';

function StaffActivity() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Staff Activity"
        icon={<Activity className="size-6" />}
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

export default StaffActivity;
