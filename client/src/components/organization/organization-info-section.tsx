import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UPDATE_ORGANIZATION_MUTATION } from '@/graphql/mutations';
import { UserRole, type IOrganization } from '@/graphql/queries';
import { useMutation } from '@apollo/client/react';
import { Pencil, Save, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface OrganizationInfoSectionProps {
  organization: IOrganization;
  role?: UserRole;
}

const OrganizationInfoSection = ({ organization, role }: OrganizationInfoSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: organization.name || '',
    description: organization.description || ''
  });

  const [updateOrganization, { loading }] = useMutation(UPDATE_ORGANIZATION_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await updateOrganization({
        variables: {
          id: organization._id,
          input: {
            name: formData.name,
            description: formData.description
          }
        }
      });
      if (data && data.update_organization && data.update_organization.success) {
        toast.success('Organization information updated successfully');
        setIsEditing(false);
      } else {
        const errorMessage = data && data.update_organization ? data.update_organization.message : 'Failed to update organization';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: organization.name || '',
      description: organization.description || ''
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="relative">
          Organization Information
          <div className="flex justify-between items-center absolute top-0 right-0">
            {!isEditing ? (
              <Button
                variant="outline"
                className="rounded-full h-10 aspect-square bg-gray-200 hover:bg-gray-300"
                size="sm"
                onClick={() => setIsEditing(true)}
                disabled={role !== UserRole.ORG_ADMIN}
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing || loading}
              placeholder="Organization name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={!isEditing || loading}
              rows={3}
              placeholder="Description"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrganizationInfoSection;
