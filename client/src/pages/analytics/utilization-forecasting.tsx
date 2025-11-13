import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { TrendingUp } from 'lucide-react';

function UtilizationForecasting() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Utilization Forecasting"
        icon={<TrendingUp className="size-6" />}
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

export default UtilizationForecasting;
