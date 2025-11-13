import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { pages } from '@/configs/pages';
import { RESET_PASSWORD_MUTATION } from '@/graphql/auth';
import { useMutation } from '@apollo/client/react';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenParam = queryParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    try {
      const { data } = await resetPassword({
        variables: {
          input: { token, password, confirmPassword }
        }
      });

      if (data?.reset_password?.success) {
        toast.success(data.reset_password?.message || 'Password reset successful');
        navigate(pages.login);
      } else {
        toast.error(data?.reset_password?.message || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('An error occurred: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center px-4">
      <Card className="w-full min-w-sm max-w-lg lg:px-4 lg:py-10">
        <CardHeader>
          <img src="logo.png" alt="Logo" className="h-10 w-auto flex-shrink-0 mb-10" />
          <CardTitle className="text-base md:text-2xl">Reset Your Password</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Please enter your new password below.</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 mb-6">
            {!token && (
              <div className="space-y-2">
                <Label htmlFor="token" className="md:text-base">
                  Reset Token
                </Label>
                <Input
                  id="token"
                  type="text"
                  placeholder="Enter your reset token"
                  className="min-h-10"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">The token should be included in the URL. If not, please check your email.</p>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password" className="md:text-base">
                New Password
              </Label>
              <div className="flex items-center justify-between relative">
                <Input
                  id="password"
                  type={isShowPassword ? 'text' : 'password'}
                  className="min-h-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your new password"
                  minLength={8}
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
              <Label htmlFor="confirmPassword" className="md:text-base">
                Confirm Password
              </Label>
              <div className="flex items-center justify-between relative">
                <Input
                  id="confirmPassword"
                  type={isShowConfirmPassword ? 'text' : 'password'}
                  className="min-h-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your new password"
                  minLength={8}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsShowConfirmPassword((prev) => !prev)}
                  className="absolute right-0.5 top-1/2 transform -translate-y-1/2"
                >
                  {isShowConfirmPassword ? <EyeOff className="text-gray-300" /> : <Eye className="text-gray-300" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full min-h-10 bg-blue-500 hover:bg-blue-600" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
            <div className="text-center text-gray-500 text-sm md:text-base">
              Remember your password?{' '}
              <Link to={pages.login} className="text-blue-500 underline">
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
