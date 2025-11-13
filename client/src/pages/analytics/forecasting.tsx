import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { TrendingUp } from 'lucide-react';

function Forecasting() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Forecasting"
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

export default Forecasting;
