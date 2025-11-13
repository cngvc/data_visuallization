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

export default function Signup() {
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await signup({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        organization_name: organization
      });
      toast.success('Account created successfully');
      navigate(pages.dashboard);
    } catch (error) {
      toast.error('Signup failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center px-4">
      <Card className="w-full min-w-sm max-w-lg lg:px-4 lg:py-10">
        <CardHeader>
          <img src="logo.png" alt="Logo" className="h-10 w-auto flex-shrink-0 mb-10" />
          <CardTitle className="text-base md:text-2xl">Sign up in to Club Assist</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 mb-6">
            <div className="flex space-x-2">
              <div className="space-y-2 flex-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                type="text"
                placeholder="Enter your organization name"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center justify-between relative">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  className="min-h-10"
                  type={isShowPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="flex items-center justify-between relative">
                <Input
                  id="confirmPassword"
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="min-h-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
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
              {loading ? 'Creating account...' : 'Sign Up'}
            </Button>
            <div className="text-center text-gray-500 text-sm md:text-base">
              Already have an account?{' '}
              <Link to={pages.login} className="text-blue-500 underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
