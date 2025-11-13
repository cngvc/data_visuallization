import AnalyticsPageHeader from '@/components/analytics-page-header';
import Layout from '@/components/layout';
import { Banknote } from 'lucide-react';

function RetailConversion() {
  return (
    <Layout>
      <AnalyticsPageHeader
        title="Retail Conversion"
        icon={<Banknote className="size-6" />}
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

export default RetailConversion;
