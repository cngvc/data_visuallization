import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { Settings2 } from 'lucide-react';

function TotalUtilization() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Total Utilization"
        icon={<Settings2 className="size-6" />}
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

export default TotalUtilization;
