import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { pages } from '@/configs/pages';
import { Home } from 'lucide-react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <span className="text-6xl">🔍</span>
          </div>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to={pages.dashboard} className="inline-flex items-center gap-2">
              <Home className="size-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
