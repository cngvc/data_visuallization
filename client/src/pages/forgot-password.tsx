import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { pages } from '@/configs/pages';
import { FORGOT_PASSWORD_MUTATION } from '@/graphql/auth';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await forgotPassword({
        variables: {
          input: { email }
        }
      });
      if (data?.forgot_password?.success) {
        toast.success(data.forgot_password?.message || 'Password reset email sent');
        navigate(pages.login);
      } else {
        toast.error(data?.forgot_password?.message || 'Failed to send password reset email');
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
          <CardTitle className="text-base md:text-2xl">Forgot Password</CardTitle>
          <p className="text-sm text-gray-500 mt-2">Enter your email address and we'll send you a link to reset your password.</p>
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
                placeholder="your.email@example.com"
                className="min-h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full min-h-10 bg-blue-500 hover:bg-blue-600" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
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
