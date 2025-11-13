import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PlayerReportInput } from '@/graphql/mutations';
import type { IPlayerReport } from '@/graphql/queries';
import { useCourts } from '@/hooks/use-courts';
import { usePlayerReportMutations } from '@/hooks/use-member-report-mutations';
import { formatDate } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MemberSelector } from './member-selector';

interface PlayerReportFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  report?: IPlayerReport | null;
  mode?: 'view' | 'edit' | 'create';
}

export default function PlayerReportFormDialog({ isOpen, onClose, onSuccess, report, mode = 'view' }: PlayerReportFormDialogProps) {
  const isEditing = mode === 'edit';
  const isCreating = mode === 'create';
  const isViewOnly = mode === 'view';
  const { data: courts = [] } = useCourts();

  const [formData, setFormData] = useState<PlayerReportInput>({
    member_id: report?.member_id?._id || '',
    start_date_time: formatDate(report?.start_date_time, "yyyy-MM-dd'T'HH:mm"),
    end_date_time: formatDate(report?.end_date_time, "yyyy-MM-dd'T'HH:mm"),
    is_cancelled: report?.is_cancelled || false,
    is_approved: report?.is_approved ?? true,
    cancelled_on_utc: formatDate(report?.cancelled_on_utc, "yyyy-MM-dd'T'HH:mm"),
    reservation_member_id: report?.reservation_member_id,
    court_ids: report?.court_ids?.map((court) => court._id) || [],
    booking_type: report?.booking_type || '',
    reservation_id: report?.reservation_id?._id
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCourtIds, setSelectedCourtIds] = useState<string[]>(report?.court_ids?.map((court) => court._id) || []);

  const { createPlayerReport, updatePlayerReport, loading } = usePlayerReportMutations(() => {
    onSuccess?.();
    onClose();
  });

  useEffect(() => {
    if (isOpen && report && (isEditing || isViewOnly)) {
      setFormData({
        member_id: report.member_id?._id || '',
        start_date_time: formatDate(report.start_date_time, "yyyy-MM-dd'T'HH:mm"),
        end_date_time: formatDate(report.end_date_time, "yyyy-MM-dd'T'HH:mm"),
        is_cancelled: report.is_cancelled || false,
        is_approved: report.is_approved ?? true,
        cancelled_on_utc: formatDate(report.cancelled_on_utc, "yyyy-MM-dd'T'HH:mm"),
        reservation_member_id: report.reservation_member_id,
        court_ids: report.court_ids?.map((court) => court._id) || [],
        booking_type: report.booking_type || '',
        reservation_id: report.reservation_id?._id
      });
      setSelectedCourtIds(report.court_ids?.map((court) => court._id) || []);
    } else if (isOpen && isCreating) {
      setFormData({
        member_id: '',
        start_date_time: '',
        end_date_time: '',
        is_cancelled: false,
        is_approved: true,
        cancelled_on_utc: null,
        court_ids: [],
        booking_type: ''
      });
      setSelectedCourtIds([]);
    }
    setErrors({});
  }, [isOpen, report, isEditing, isViewOnly, isCreating]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.member_id) {
      newErrors.member_id = 'Member is required';
    }

    if (!formData.booking_type) {
      newErrors.booking_type = 'Booking type is required';
    }

    if (!formData.start_date_time) {
      newErrors.start_date_time = 'Start date is required';
    }

    if (!formData.end_date_time) {
      newErrors.end_date_time = 'End date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleCourtChange = (courtId: string, checked: boolean) => {
    if (checked) {
      setSelectedCourtIds((prev) => [...prev, courtId]);
      setFormData((prev) => ({
        ...prev,
        court_ids: [...(prev.court_ids || []), courtId]
      }));
    } else {
      setSelectedCourtIds((prev) => prev.filter((id) => id !== courtId));
      setFormData((prev) => ({
        ...prev,
        court_ids: (prev.court_ids || []).filter((id) => id !== courtId)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing && report?._id) {
        await updatePlayerReport(report._id, formData);
      } else if (isCreating) {
        await createPlayerReport(formData);
      }
    } catch (error) {
      toast.error(
        `Failed to ${isEditing ? 'update' : 'create'} member report: ${error instanceof Error ? error.message : 'An unknown error occurred'}`
      );
    }
  };

  if (isViewOnly && report) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="min-w-md max-w-2xl">
          <DialogHeader>
            <DialogTitle>Member Report Details</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Member</Label>
              <div className="col-span-3">
                {report.member_id ? (
                  <div>
                    <p className="font-medium">{`${report.member_id.first_name} ${report.member_id.last_name}`}</p>
                    <p className="text-sm text-muted-foreground">{report.member_id.email || 'No email'}</p>
                  </div>
                ) : (
                  'N/A'
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Booking Type</Label>
              <div className="col-span-3">{report.booking_type || 'N/A'}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Start Date</Label>
              <div className="col-span-3">{report.start_date_time}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>End Date</Label>
              <div className="col-span-3">{report.end_date_time}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Created On</Label>
              <div className="col-span-3">{report.created_at}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Courts</Label>
              <div className="col-span-3">
                {report.court_ids && report.court_ids.length > 0
                  ? report.court_ids.map((court) => court.label).join(', ')
                  : 'No courts assigned'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Approved</Label>
              <div className="col-span-3">{report.is_approved ? 'Yes' : 'No'}</div>
            </div>

            {report.reservation_id && (
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label>Reservation</Label>
                <div className="col-span-3">
                  <p>ID: {report.reservation_id._id}</p>
                  {report.reservation_id.court_ids && (
                    <p>Court: {report.reservation_id.court_ids.map((court) => court.label).join(', ')}</p>
                  )}
                  {report.reservation_id.reservation_type_id && <p>Type: {report.reservation_id.reservation_type_id.name}</p>}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Member Report' : 'Create Member Report'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="member_id">Member *</Label>
              <div className="col-span-3">
                <MemberSelector value={formData.member_id} onSelect={(value) => handleSelectChange('member_id', value)} />
                {errors.member_id && <p className="text-sm text-red-500">{errors.member_id}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="booking_type">Booking Type *</Label>
              <div className="col-span-3">
                <Select
                  value={formData.booking_type || undefined}
                  onValueChange={(value) => handleSelectChange('booking_type', value)}
                  disabled={loading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select booking type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="CourtReservation">Court Reservation</SelectItem>
                  </SelectContent>
                </Select>
                {errors.booking_type && <p className="text-sm text-red-500">{errors.booking_type}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="start_date_time">Start Date *</Label>
              <div className="col-span-3">
                <Input
                  id="start_date_time"
                  name="start_date_time"
                  type="datetime-local"
                  value={formData.start_date_time}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.start_date_time && <p className="text-sm text-red-500">{errors.start_date_time}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="end_date_time">End Date *</Label>
              <div className="col-span-3">
                <Input
                  id="end_date_time"
                  name="end_date_time"
                  type="datetime-local"
                  value={formData.end_date_time}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.end_date_time && <p className="text-sm text-red-500">{errors.end_date_time}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
              <Label>Courts</Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                {courts.map((court) => (
                  <div key={court._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`court-${court._id}`}
                      checked={selectedCourtIds.includes(court._id)}
                      onCheckedChange={(checked) => handleCourtChange(court._id, checked === true)}
                      disabled={loading}
                    />
                    <Label htmlFor={`court-${court._id}`} className="cursor-pointer">
                      {court.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Status</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_approved"
                    checked={formData.is_approved || false}
                    onCheckedChange={(checked) => handleCheckboxChange('is_approved', checked === true)}
                    disabled={loading}
                  />
                  <Label htmlFor="is_approved" className="cursor-pointer">
                    Approved
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_cancelled"
                    checked={formData.is_cancelled || false}
                    onCheckedChange={(checked) => handleCheckboxChange('is_cancelled', checked === true)}
                    disabled={loading}
                  />
                  <Label htmlFor="is_cancelled" className="cursor-pointer">
                    Cancelled
                  </Label>
                </div>
              </div>
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
