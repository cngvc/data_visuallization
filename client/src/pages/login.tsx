import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { pages } from '@/configs/pages';
import { useAuthStore } from '@/store/auth.store';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      toast.success('Login successful');
      navigate(pages.dashboard);
    } catch (error) {
      toast.error('Login failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center px-4">
      <Card className="w-full min-w-sm max-w-lg lg:px-4 lg:py-10">
        <CardHeader>
          <img src="logo.png" alt="Logo" className="h-10 w-auto flex-shrink-0 mb-10" />
          <CardTitle className="text-base md:text-2xl">Login in to your account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="md:text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="min-h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="md:text-base">
                  Password
                </Label>
                <Link to={pages.forgotPassword} className="text-sm md:text-base text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center justify-between relative">
                <Input
                  id="password"
                  type={isShowPassword ? 'text' : 'password'}
                  className="min-h-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsShowPassword((prev) => !prev)}
                  className="absolute right-0.5 top-1/2 transform -translate-y-1/2"
                >
                  {isShowPassword ? <EyeOff className="text-gray-300" /> : <Eye className="text-gray-300" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full min-h-10 bg-blue-500 hover:bg-blue-600" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-center text-gray-500 text-sm md:text-base">
              Don't have an account?{' '}
              <Link to={pages.signup} className="text-blue-500 underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
