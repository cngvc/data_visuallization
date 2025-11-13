import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { LayoutDashboard } from 'lucide-react';

function ClubOverview() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Club Overview"
        icon={<LayoutDashboard className="size-6" />}
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

export default ClubOverview;
