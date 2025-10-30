import { useMemo, useState } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { base44Client } from '@/api/base44Client.js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select.jsx';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableEmpty,
} from '@/components/ui/table.jsx';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog.jsx';

const UserDashboard = () => {
  const queryClient = useQueryClient();
  const { data: bookings, isLoading, isError, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: base44Client.getBookings,
  });
  const { data: governorates, isLoading: isLoadingGov } = useQuery({
    queryKey: ['governorates'],
    queryFn: base44Client.getGovernorates,
  });

  const mutation = useMutation({
    mutationFn: base44Client.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [date, setDate] = useState('');
  const [traveler, setTraveler] = useState('');

  const cities = useMemo(() => {
    const match = governorates?.find((item) => item.name === selectedGovernorate);
    return match?.cities ?? [];
  }, [governorates, selectedGovernorate]);

  const handleCreateBooking = (event) => {
    event.preventDefault();
    mutation.mutate(
      {
        traveler,
        governorate: selectedGovernorate,
        city: selectedCity,
        date,
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
          setSelectedGovernorate('');
          setSelectedCity('');
          setDate('');
          setTraveler('');
        },
      }
    );
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">حجوزاتي</h1>
          <p className="mt-1 text-sm text-slate-500">تابع آخر حجوزاتك ورتب رحلاتك القادمة.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button className="whitespace-nowrap">إضافة حجز جديد</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إنشاء حجز جديد</DialogTitle>
              <DialogDescription>
                اختر المنطقة والمدينة والتاريخ لتأكيد طلب الحجز. لن يتم تأكيد الحجز إلا بعد مراجعة فريقنا.
              </DialogDescription>
            </DialogHeader>
            <form className="mt-6 space-y-4" onSubmit={handleCreateBooking}>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">اسم المسافر</label>
                <Input value={traveler} onChange={(event) => setTraveler(event.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">المنطقة</label>
                <Select
                  value={selectedGovernorate}
                  onValueChange={(value) => {
                    setSelectedGovernorate(value);
                    setSelectedCity('');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={isLoadingGov ? 'جاري التحميل...' : 'اختر المنطقة'}
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {(governorates ?? []).map((governorate) => (
                      <SelectItem key={governorate.id} value={governorate.name}>
                        {governorate.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">المدينة</label>
                <Select
                  value={selectedCity}
                  onValueChange={setSelectedCity}
                  disabled={!cities.length}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={cities.length ? 'اختر المدينة' : 'اختر المنطقة أولاً'}
                    />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-600">تاريخ الرحلة</label>
                <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
              </div>
              {mutation.isError && (
                <p className="text-sm text-red-600">
                  {mutation.error?.message || 'تعذر حفظ الحجز، حاول مرة أخرى لاحقاً.'}
                </p>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    إلغاء
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={mutation.isPending || !selectedGovernorate || !selectedCity}
                >
                  {mutation.isPending ? 'جاري الإرسال...' : 'حفظ الحجز'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && <p className="text-sm text-slate-500">جاري تحميل الحجوزات...</p>}
        {isError && (
          <p className="text-sm text-red-600">
            {error?.message || 'حدث خطأ أثناء تحميل الحجوزات.'}
          </p>
        )}
      {!isLoading && !isError && (!bookings || bookings.length === 0) && (
        <TableEmpty message="لم تقم بأي حجوزات حتى الآن." />
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <Table>
          <TableCaption>عرض أحدث الحجوزات.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>المسافر</TableHead>
              <TableHead>المنطقة</TableHead>
              <TableHead>المدينة</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.traveler}</TableCell>
                <TableCell>{booking.governorate}</TableCell>
                <TableCell>{booking.city}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                    {booking.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default UserDashboard;
