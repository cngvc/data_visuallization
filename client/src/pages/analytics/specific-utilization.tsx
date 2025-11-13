import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { Crosshair } from 'lucide-react';

function SpecificUtilization() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Specific Utilization"
        icon={<Crosshair className="size-6" />}
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

export default SpecificUtilization;
