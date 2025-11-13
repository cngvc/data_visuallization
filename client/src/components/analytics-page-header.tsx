import DatePicker from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useState } from 'react';

function AnalyticsPageHeader({
  title,
  icon,
  onExportPdf,
  onExportCsv,
  onToday,
  onPeriodChange,
  onStartDateChange,
  onEndDateChange
}: {
  title: string;
  icon: React.ReactNode;
  onExportPdf?: () => void;
  onExportCsv?: () => void;
  onToday?: () => void;
  onPeriodChange?: (periodType: string) => void;
  onStartDateChange?: (startDate: string) => void;
  onEndDateChange?: (endDate: string) => void;
}) {
  const [periodType, setPeriodType] = useState('this-month-to-date');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-2 justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          {icon} {title}
        </h1>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white" onClick={onExportPdf}>
            <SquareArrowOutUpRight className="size-4" />
            Export PDF
          </Button>

          <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white" onClick={onExportCsv}>
            <SquareArrowOutUpRight className="size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-between">
        <Button onClick={onToday} className="bg-blue-100 hover:bg-blue-200 text-blue-500">
          Today
        </Button>

        <div className="flex-1">
          <DatePicker
            placeholder="Pick a Start Date"
            onChange={(value) => {
              setStartDate(value);
              onStartDateChange?.(value);
            }}
            value={startDate}
          />
        </div>
        <div className="flex-1">
          <DatePicker
            placeholder="Pick an End Date"
            onChange={(value) => {
              setEndDate(value);
              onEndDateChange?.(value);
            }}
            value={endDate}
          />
        </div>

        <Select
          value={periodType}
          onValueChange={(value) => {
            setPeriodType(value);
            onPeriodChange?.(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month-to-date">This month to date</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="this-year-to-date">This year to date</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
            <SelectItem value="this-week">This week</SelectItem>
            <SelectItem value="last-week">Last week</SelectItem>
            <SelectItem value="all-time-to-date">All time to date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default AnalyticsPageHeader;
