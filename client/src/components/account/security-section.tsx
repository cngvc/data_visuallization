import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CHANGE_PASSWORD_MUTATION } from '@/graphql/auth';
import { useMutation } from '@apollo/client/react';
import { Eye, EyeOff, Pencil, Save, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const SecuritySection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      toast.error('New password and confirm password do not match');
      return;
    }
    try {
      const { data } = await changePassword({
        variables: {
          input: {
            current_password: formData.current_password,
            new_password: formData.new_password
          }
        }
      });
      if (data && data.change_password_me && data.change_password_me.success) {
        toast.success('Password changed successfully');
        setIsEditing(false);
        setFormData({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
      } else {
        const errorMessage = data && data.change_password_me ? data.change_password_me.message : 'Failed to change password';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  const handleCancel = () => {
    setFormData({
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="relative">
          Security
          <div className="flex justify-between items-center absolute right-0 top-0">
            {!isEditing ? (
              <Button
                variant="outline"
                className="rounded-full h-10 aspect-square bg-gray-200 hover:bg-gray-300"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" className="text-gray-500" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button
                  variant="default"
                  className="bg-blue-100 hover:bg-blue-200 text-blue-500"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isEditing ? (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current_password"
                    name="current_password"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={formData.current_password}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Current Password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new_password"
                    name="new_password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={formData.new_password}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="New Password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    disabled={loading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-sm text-muted-foreground">
              <p>••••••••</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySection;
