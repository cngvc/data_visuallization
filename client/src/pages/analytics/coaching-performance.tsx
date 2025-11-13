import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { TrendingUp } from 'lucide-react';

function CoachingPerformance() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Coaching Performance"
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

export default CoachingPerformance;
