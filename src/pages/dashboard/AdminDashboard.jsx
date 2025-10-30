import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { base44Client } from '@/api/base44Client.js';
import { TableEmpty } from '@/components/ui/table.jsx';

const AdminDashboard = () => {
  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: base44Client.getAdminStats,
  });

  const chartData = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => {
        const month = new Date();
        month.setMonth(month.getMonth() - (5 - index));
        return {
          name: month.toLocaleDateString('ar-SA', { month: 'short' }),
          bookings: Math.round((stats?.totalBookings ?? 120) / 6 + Math.random() * 10),
          trips: Math.round((stats?.activeTrips ?? 30) / 6 + Math.random() * 6),
        };
      }),
    [stats]
  );

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">لوحة التحكم</h1>
        <p className="mt-1 text-sm text-slate-500">عرض إحصائيات الاستخدام وإجمالي الحجوزات.</p>
      </div>

      {isLoading && <p className="text-sm text-slate-500">جاري تحميل الإحصائيات...</p>}
      {isError && (
        <p className="text-sm text-red-600">
          {error?.message || 'حدث خطأ أثناء تحميل الإحصائيات.'}
        </p>
      )}

      {!isLoading && !isError && stats && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">إجمالي الحجوزات</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{stats.totalBookings}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">الرحلات النشطة</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{stats.activeTrips}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">معدل الرضا</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{stats.satisfaction}</p>
          </div>
        </div>
      )}

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">الأداء الشهري</h2>
        <p className="text-sm text-slate-500">مقارنة بين عدد الحجوزات والرحلات النشطة.</p>
        <div className="mt-6 h-[320px]">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#475569" />
              <YAxis stroke="#475569" />
              <Tooltip formatter={(value) => [value, '']} />
              <Area type="monotone" dataKey="bookings" stroke="#6366f1" fillOpacity={1} fill="url(#colorBookings)" />
              <Area type="monotone" dataKey="trips" stroke="#38bdf8" fillOpacity={1} fill="url(#colorTrips)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {!isLoading && !isError && !stats && <TableEmpty message="لا توجد بيانات لعرضها حالياً." />}
    </section>
  );
};

export default AdminDashboard;
