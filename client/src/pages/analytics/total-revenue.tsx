import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { Coins } from 'lucide-react';

function TotalRevenue() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Total Revenue"
        icon={<Coins className="size-6" />}
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

export default TotalRevenue;
