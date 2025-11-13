import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { MemberInput } from '@/graphql/mutations';
import type { IFamily, IMember, IMembershipType } from '@/graphql/queries';
import { useFamilies } from '@/hooks/use-families';
import { useMemberMutations } from '@/hooks/use-member-mutations';
import { useMembershipTypes } from '@/hooks/use-membership-types';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';
import DatePicker from './date-picker';

interface MemberFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  member?: IMember | null;
}

export default function MemberFormDialog({ isOpen, onClose, onSuccess, member }: MemberFormDialogProps) {
  const isEditing = !!member;
  const { data: families } = useFamilies({
    limit: -1
  });
  const { data: membershipTypes } = useMembershipTypes({
    limit: -1
  });

  const [formData, setFormData] = useState<MemberInput>({
    family_id: member?.family_id?._id,
    first_name: member?.first_name || '',
    last_name: member?.last_name || '',
    gender: member?.gender,
    email: member?.email || '',
    phone: member?.phone || '',
    date_of_birth: formatDate(member?.date_of_birth),
    address: member?.address,
    city: member?.city,
    state: member?.state,
    zip_code: member?.zip_code,
    membership_type_id: member?.membership_type_id?._id,
    membership_assignment_type: member?.membership_assignment_type,
    membership_status: member?.membership_status,
    family_role: member?.family_role,
    allow_child_login: member?.allow_child_login,
    profile_image_url: member?.profile_image_url,
    membership_start_date: formatDate(member?.membership_start_date),
    membership_end_date: formatDate(member?.membership_end_date)
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createMember, updateMember, loading } = useMemberMutations(onSuccess);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing && member?._id) {
        await updateMember(member._id, formData);
      } else {
        await createMember(formData);
      }
    } catch (error) {
      toast(`Failed to ${isEditing ? 'update' : 'create'} member: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Member' : 'Add New Member'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  disabled={loading}
                />
                {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  disabled={loading}
                />
                {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled={loading}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" disabled={loading} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth *</Label>
                <DatePicker value={formData.date_of_birth} onChange={handleInputChange.bind(null, 'date_of_birth')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender || undefined}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                  disabled={loading}
                >
                  <SelectTrigger id="gender" className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      None
                    </SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="City" disabled={loading} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="State" disabled={loading} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip_code">Zip Code</Label>
                <Input
                  id="zip_code"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="family_id">Family</Label>
                <Select
                  value={formData.family_id || undefined}
                  onValueChange={(value) => handleSelectChange('family_id', value)}
                  disabled={loading}
                >
                  <SelectTrigger id="family_id" className="w-full">
                    <SelectValue placeholder="Select Family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      None
                    </SelectItem>
                    {families.map((family: IFamily) => (
                      <SelectItem key={family._id} value={family._id}>
                        {family.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="family_role">Family Role</Label>
                <Select
                  value={formData.family_role || undefined}
                  onValueChange={(value) => handleSelectChange('family_role', value)}
                  disabled={loading}
                >
                  <SelectTrigger id="family_role" className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      None
                    </SelectItem>
                    <SelectItem value="Primary">Primary</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="membership_type_id">Membership Type</Label>
                <Select
                  value={formData.membership_type_id || undefined}
                  onValueChange={(value) => handleSelectChange('membership_type_id', value)}
                  disabled={loading}
                >
                  <SelectTrigger id="membership_type_id" className="w-full">
                    <SelectValue placeholder="Select Membership Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      None
                    </SelectItem>
                    {membershipTypes.map((type: IMembershipType) => (
                      <SelectItem key={type._id} value={type._id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="membership_status">Membership Status</Label>
                <Select
                  value={formData.membership_status || undefined}
                  onValueChange={(value) => handleSelectChange('membership_status', value)}
                  disabled={loading}
                >
                  <SelectTrigger id="membership_status" className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none" disabled>
                      None
                    </SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="membership_start_date">Membership Start Date</Label>
                <DatePicker value={formData.membership_start_date} onChange={handleInputChange.bind(null, 'membership_start_date')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="membership_end_date">Membership End Date</Label>
                <DatePicker value={formData.membership_end_date} onChange={handleInputChange.bind(null, 'membership_end_date')} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="membership_assignment_type">Membership Assignment Type</Label>
              <Select
                value={formData.membership_assignment_type || undefined}
                onValueChange={(value) => handleSelectChange('membership_assignment_type', value)}
                disabled={loading}
              >
                <SelectTrigger id="membership_assignment_type" className="w-full">
                  <SelectValue placeholder="Select Assignment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Secondary">Secondary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="allow_child_login"
                checked={formData.allow_child_login || false}
                onCheckedChange={(checked) => handleSwitchChange('allow_child_login', checked)}
                disabled={loading}
              />
              <Label htmlFor="allow_child_login">Allow Child Login</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile_image_url">Profile Image URL</Label>
              <Input
                id="profile_image_url"
                name="profile_image_url"
                value={formData.profile_image_url}
                onChange={handleChange}
                placeholder="Profile Image URL"
                disabled={loading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
