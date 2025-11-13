import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from '@/graphql/queries';
import { useEffect, useState } from 'react';

const userRoles: { value: UserRole; label: string }[] = [
  { value: UserRole.ORG_ADMIN, label: 'Org Admin' },
  { value: UserRole.USER, label: 'User' }
];

export interface UserFormValues {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface OrganizationUserFormProps {
  defaultValues?: UserFormValues;
  onSubmit: (values: UserFormValues) => void;
  isSubmitting: boolean;
  isEdit?: boolean;
}

const OrganizationUserForm = ({ defaultValues, onSubmit, isSubmitting, isEdit = false }: OrganizationUserFormProps) => {
  const [formValues, setFormValues] = useState<UserFormValues>({
    email: defaultValues?.email || '',
    first_name: defaultValues?.first_name || '',
    last_name: defaultValues?.last_name || '',
    role: defaultValues?.role || ''
  });

  const [errors, setErrors] = useState({
    email: '',
    first_name: '',
    last_name: '',
    role: ''
  });

  useEffect(() => {
    if (defaultValues) {
      setFormValues(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (field: keyof UserFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      email: '',
      first_name: '',
      last_name: '',
      role: ''
    };
    let isValid = true;
    if (!isEdit) {
      if (!formValues.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }

      if (!formValues.first_name.trim()) {
        newErrors.first_name = 'First name is required';
        isValid = false;
      }

      if (!formValues.last_name.trim()) {
        newErrors.last_name = 'Last name is required';
        isValid = false;
      }
    }
    if (!formValues.role) {
      newErrors.role = 'Role is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formValues.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="user@example.com"
          className={errors.email ? 'border-red-500' : ''}
          readOnly={isEdit}
          disabled={isEdit}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          value={formValues.first_name}
          onChange={(e) => handleChange('first_name', e.target.value)}
          placeholder="John"
          className={errors.first_name ? 'border-red-500' : ''}
          readOnly={isEdit}
          disabled={isEdit}
        />
        {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          value={formValues.last_name}
          onChange={(e) => handleChange('last_name', e.target.value)}
          placeholder="Doe"
          className={errors.last_name ? 'border-red-500' : ''}
          readOnly={isEdit}
          disabled={isEdit}
        />
        {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={formValues.role} onValueChange={(value) => handleChange('role', value)}>
          <SelectTrigger className={`border-red-500 ${errors.role ? 'border-red-500' : ''} w-full`}>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {userRoles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};

export default OrganizationUserForm;
