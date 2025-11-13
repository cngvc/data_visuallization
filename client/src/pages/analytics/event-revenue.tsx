import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { Calendar } from 'lucide-react';

function EventRevenue() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Event Revenue"
        icon={<Calendar className="size-6" />}
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

export default EventRevenue;
