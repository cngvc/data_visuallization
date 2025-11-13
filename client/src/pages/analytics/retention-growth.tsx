import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { Layers } from 'lucide-react';

function RetentionGrowth() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Retention & Growth"
        icon={<Layers className="size-6" />}
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

export default RetentionGrowth;
