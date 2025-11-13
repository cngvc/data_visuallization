import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { Hourglass } from 'lucide-react';

function RevenuePerCourtHour() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Revenue Per Court Hour"
        icon={<Hourglass className="size-6" />}
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

export default RevenuePerCourtHour;
