import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { SlidersVertical } from 'lucide-react';

function UtilizationDrivers() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Utilization Drivers"
        icon={<SlidersVertical className="size-6" />}
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

export default UtilizationDrivers;
