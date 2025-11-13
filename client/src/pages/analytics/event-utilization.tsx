import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { CalendarCheck } from 'lucide-react';

function EventUtilization() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Event Utilization"
        icon={<CalendarCheck className="size-6" />}
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

export default EventUtilization;
