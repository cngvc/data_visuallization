import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { UserCheck } from 'lucide-react';

function ClubAttendance() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Club Attendance"
        icon={<UserCheck className="size-6" />}
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

export default ClubAttendance;
