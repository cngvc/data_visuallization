import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { CircleGauge } from 'lucide-react';

function UtilizationOptimization() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Utilization Optimization"
        icon={<CircleGauge className="size-6" />}
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

export default UtilizationOptimization;
