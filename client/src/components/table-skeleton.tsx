import { Skeleton } from './ui/skeleton';

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

const TableSkeleton = ({ columns = 8, rows = 5 }: TableSkeletonProps) => {
  return (
    <div className="font-sans p-5 bg-gray-50 rounded-lg shadow-md flex flex-col items-start box-border">
      <div className="w-full mb-6">
        <Skeleton className="h-8 w-48 mb-5" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4">
          <Skeleton className="h-10 w-full sm:w-3/5" />
          <Skeleton className="h-10 w-full sm:w-40" />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          <div className="bg-gray-100 rounded-t-lg p-3">
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(columns, 12)}, 1fr)` }}>
              {[...Array(columns)].map((_, index) => (
                <Skeleton key={index} className="h-6" />
              ))}
            </div>
          </div>

          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className="border-b border-gray-200 p-3">
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(columns, 12)}, 1fr)` }}>
                {[...Array(columns)].map((_, colIndex) => (
                  <Skeleton key={colIndex} className="h-5" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
