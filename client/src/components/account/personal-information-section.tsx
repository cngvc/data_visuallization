import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UPDATE_ME_MUTATION } from '@/graphql/auth';
import type { IAuthUser } from '@/graphql/queries';
import { useMutation } from '@apollo/client/react';
import { Pencil, Save, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PersonalInformationSectionProps {
  user: IAuthUser;
}

const PersonalInformationSection = ({ user }: PersonalInformationSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
  });
  const [updateMe, { loading }] = useMutation(UPDATE_ME_MUTATION);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await updateMe({
        variables: {
          input: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email
          }
        }
      });
      if (data && data.update_me && data.update_me.success) {
        toast.success('Personal information updated successfully');
        setIsEditing(false);
      } else {
        const errorMessage = data && data.update_me ? data.update_me.message : 'Failed to update personal information';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="relative">
          Personal Information
          <div className="flex justify-between items-center absolute top-0 right-0">
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
        <div className="space-y-4 relative">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={!isEditing || loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={!isEditing || loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} disabled={!isEditing || loading} />
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationSection;
