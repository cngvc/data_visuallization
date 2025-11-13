import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { Trophy } from 'lucide-react';

function TopMembers() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Top Members"
        icon={<Trophy className="size-6" />}
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

export default TopMembers;
