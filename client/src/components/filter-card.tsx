import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from './ui/button';

const FilterCard = ({ onApply, onReset, children }: { onApply: () => void; onReset: () => void; children: React.ReactNode }) => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-end border-t gap-2">
        <Button onClick={onApply} className="bg-blue-100 hover:bg-blue-200 text-blue-500">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={onReset} className="text-gray-500">
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FilterCard;
