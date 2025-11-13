import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { SquareKanban } from 'lucide-react';

function RevenueSource() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Revenue Source"
        icon={<SquareKanban className="size-6" />}
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

export default RevenueSource;
