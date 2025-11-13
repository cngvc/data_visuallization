import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { ReservationInput } from '@/graphql/mutations';
import type { IReservation } from '@/graphql/queries';
import { useCourts } from '@/hooks/use-courts';
import { useReservationMutations } from '@/hooks/use-reservation-mutations';
import { useReservationTypes } from '@/hooks/use-reservation-types';
import { cn, formatDate } from '@/lib/utils';
import { format } from 'date-fns';
import { CircleDollarSign, CircleUser } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { MultiSelect } from './multiple-select';
import { Card, CardContent } from './ui/card';

interface ReservationFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reservation?: IReservation | null;
  isViewOnly?: boolean;
}

export default function ReservationFormDialog({ isOpen, onClose, onSuccess, reservation, isViewOnly = false }: ReservationFormDialogProps) {
  const isEditing = !!reservation && !isViewOnly;
  const isCreating = !reservation && !isViewOnly;

  const { data: courts = [], loading: courtsLoading } = useCourts({
    filter: {
      limit: -1
    }
  });
  const { data: reservationTypes = [], loading: reservationTypesLoading } = useReservationTypes({
    filter: {
      limit: -1
    }
  });

  const [formData, setFormData] = useState<ReservationInput>({
    reservation_type_id: reservation?.reservation_type_id?._id || '',
    court_ids: reservation?.court_ids?.map((court) => court._id) || [],
    start_time: formatDate(reservation?.start_time, "yyyy-MM-dd'T'HH:mm"),
    end_time: formatDate(reservation?.end_time, "yyyy-MM-dd'T'HH:mm"),
    status: reservation?.status || 'Active',
    cancelled_on: reservation?.cancelled_on ? formatDate(reservation.cancelled_on, "yyyy-MM-dd'T'HH:mm") : null,
    player_ids: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { createReservation, updateReservation, loading } = useReservationMutations(onSuccess);

  useEffect(() => {
    if (isOpen && reservation && (isEditing || isViewOnly)) {
      setFormData({
        reservation_type_id: reservation.reservation_type_id?._id || '',
        court_ids: reservation.court_ids?.map((court) => court._id) || [],
        start_time: formatDate(reservation.start_time, "yyyy-MM-dd'T'HH:mm") || '',
        end_time: formatDate(reservation.end_time, "yyyy-MM-dd'T'HH:mm") || '',
        status: reservation.status || 'Completed',
        cancelled_on: reservation.cancelled_on ? formatDate(reservation.cancelled_on, "yyyy-MM-dd'T'HH:mm") : null,
        player_ids: []
      });

      if (reservation.player_ids && Array.isArray(reservation.player_ids)) {
        const playerIds = reservation.player_ids
          .map((player: { member_id?: { _id: string } }) => player.member_id?._id)
          .filter(Boolean) as string[];
        setFormData((prev) => ({ ...prev, player_ids: playerIds }));
      }
    } else if (isOpen && isCreating) {
      setFormData({
        reservation_type_id: '',
        court_ids: [],
        start_time: '',
        end_time: '',
        status: 'Completed',
        cancelled_on: null,
        player_ids: []
      });
    }
  }, [isOpen, reservation, isEditing, isViewOnly, isCreating]);

  const handleSubmit = async () => {
    const validationErrors: Record<string, string> = {};

    if (!formData.reservation_type_id) {
      validationErrors.reservation_type_id = 'Reservation type is required';
    }
    if (!formData.court_ids.length) {
      validationErrors.court_ids = 'Court is required';
    }
    if (!formData.start_time) {
      validationErrors.start_time = 'Start time is required';
    }
    if (!formData.end_time) {
      validationErrors.end_time = 'End time is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (isEditing && reservation) {
      await updateReservation(reservation._id, formData);
    } else {
      await createReservation(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = useCallback(
    (name: string, value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  const handleCancelledChange = (checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        status: 'Cancelled',
        cancelled_on: format(new Date(), "yyyy-MM-dd'T'HH:mm")
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        status: 'Completed',
        cancelled_on: null
      }));
    }
  };

  if (isViewOnly && reservation) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reservation Details</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Reservation Type</Label>
              <div className="col-span-3">{reservation.reservation_type_id?.name || 'N/A'}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Court</Label>
              <div className="col-span-3">{reservation.court_ids?.map((court) => court.label).join(', ') || 'N/A'}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Start Time</Label>
              <div className="col-span-3">{reservation.start_time}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>End Time</Label>
              <div className="col-span-3">{reservation.end_time}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Status</Label>
              <div className="col-span-3">{reservation.status || 'N/A'}</div>
            </div>

            {reservation.status === 'cancelled' && (
              <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                <Label>Cancelled On</Label>
                <div className="col-span-3">{reservation.cancelled_on}</div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Created At</Label>
              <div className="col-span-3">{reservation.created_at}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label>Updated At</Label>
              <div className="col-span-3">{reservation.updated_at}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
              <Label className="pt-2">Players</Label>
              <div className="col-span-3">
                {reservation.player_ids && reservation.player_ids.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {reservation.player_ids.map((player) => (
                      <Card key={player._id} className="py-2">
                        <CardContent className="px-3">
                          <div className="flex items-center">
                            <CircleUser strokeWidth={1.5} className="mr-2" size={16} /> {player.member_id?.first_name}{' '}
                            {player.member_id?.last_name}
                          </div>
                          <div className="flex items-center">
                            <CircleDollarSign strokeWidth={1.5} className="mr-2" size={16} /> Paid: {player.paid_amount || 0}
                          </div>
                          <div className="flex items-center">
                            <CircleDollarSign strokeWidth={1.5} className="mr-2" size={16} /> Balance: {player.price_to_pay || 0}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  'No players assigned'
                )}
              </div>
            </div>
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Reservation' : 'Create Reservation'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="reservation_type_id" className="text-left">
              Reservation Type
            </Label>
            <div className="col-span-3">
              <Select
                value={formData.reservation_type_id}
                onValueChange={(value) => handleSelectChange('reservation_type_id', value)}
                disabled={reservationTypesLoading}
              >
                <SelectTrigger className={cn(errors.reservation_type_id ? 'border-red-500' : '', 'w-full')}>
                  <SelectValue placeholder="Select reservation type" />
                </SelectTrigger>
                <SelectContent>
                  {reservationTypes.map((type) => (
                    <SelectItem key={type._id} value={type._id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.reservation_type_id && <p className="text-red-500 text-sm mt-1">{errors.reservation_type_id}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="court_id" className="text-left">
              Court
            </Label>
            <div className="col-span-3">
              <MultiSelect
                values={formData.court_ids}
                options={courts.map((court) => ({ value: court._id, label: court.label }))}
                onValueChange={(value) => handleSelectChange('court_ids', value)}
                disabled={courtsLoading}
              />
              {errors.court_id && <p className="text-red-500 text-sm mt-1">{errors.court_id}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="start_time" className="text-left">
              Start Time
            </Label>
            <div className="col-span-3">
              <Input
                id="start_time"
                name="start_time"
                type="datetime-local"
                value={formData.start_time}
                onChange={handleChange}
                className={errors.start_time ? 'border-red-500' : ''}
              />
              {errors.start_time && <p className="text-red-500 text-sm mt-1">{errors.start_time}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="end_time" className="text-left">
              End Time
            </Label>
            <div className="col-span-3">
              <Input
                id="end_time"
                name="end_time"
                type="datetime-local"
                value={formData.end_time}
                onChange={handleChange}
                className={errors.end_time ? 'border-red-500' : ''}
              />
              {errors.end_time && <p className="text-red-500 text-sm mt-1">{errors.end_time}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="is_cancelled" className="text-left">
              Cancelled
            </Label>
            <div className="col-span-3 flex items-center">
              <Switch id="is_cancelled" checked={formData.status === 'Cancelled'} onCheckedChange={handleCancelledChange} />
              <span className="ml-2">{formData.status === 'Cancelled' ? 'Yes' : 'No'}</span>
            </div>
          </div>

          {formData.status === 'Cancelled' && (
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="cancelled_on" className="text-left">
                Cancelled On
              </Label>
              <div className="col-span-3">
                <Input
                  id="cancelled_on"
                  name="cancelled_on"
                  type="datetime-local"
                  value={formData.cancelled_on || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
