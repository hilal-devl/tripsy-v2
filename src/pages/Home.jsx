import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44Client } from '@/api/base44Client.js';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['governorates'],
    queryFn: base44Client.getGovernorates,
  });

  const [fromGovernorate, setFromGovernorate] = useState('');
  const [toGovernorate, setToGovernorate] = useState('');
  const [travelDate, setTravelDate] = useState('');

  const governorates = data ?? [];

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-alert
    alert(`البحث عن رحلة من ${fromGovernorate} إلى ${toGovernorate} في ${travelDate}`);
  };

  const isDisabled = !governorates.length || isLoading;

  return (
    <section className="space-y-12">
      <div className="rounded-3xl bg-gradient-to-br from-primary-500 via-primary-400 to-primary-600 px-10 py-16 text-white shadow-lg">
        <h1 className="text-4xl font-bold">رحلتك القادمة تبدأ من هنا</h1>
        <p className="mt-4 max-w-2xl text-lg text-primary-50">
          اكتشف وجهات مميزة داخل المملكة، خطط واحجز بكل سهولة مع Tripsy.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-6 rounded-2xl bg-white/10 p-6 backdrop-blur-lg sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="space-y-2">
            <label className="block text-sm text-primary-50">منطقة الانطلاق</label>
            {isLoading && <div className="h-10 animate-pulse rounded-lg bg-white/40" />}
            {isError && (
              <p className="text-sm text-red-100">
                {error?.message || 'حدث خطأ أثناء تحميل المناطق.'}
              </p>
            )}
            {!isLoading && !isError && !governorates.length && (
              <p className="text-sm text-primary-100">لا تتوفر مناطق حالياً.</p>
            )}
            {!isLoading && !isError && governorates.length > 0 && (
              <Select
                value={fromGovernorate}
                onValueChange={setFromGovernorate}
                disabled={isLoading || isError || !governorates.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنطقة" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {governorates.map((governorate) => (
                    <SelectItem key={governorate.id} value={governorate.name}>
                      {governorate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-primary-50">منطقة الوصول</label>
            {isLoading && <div className="h-10 animate-pulse rounded-lg bg-white/40" />}
            {isError && (
              <p className="text-sm text-red-100">
                {error?.message || 'حدث خطأ أثناء تحميل المناطق.'}
              </p>
            )}
            {!isLoading && !isError && !governorates.length && (
              <p className="text-sm text-primary-100">لا تتوفر مناطق حالياً.</p>
            )}
            {!isLoading && !isError && governorates.length > 0 && (
              <Select
                value={toGovernorate}
                onValueChange={setToGovernorate}
                disabled={isLoading || isError || !governorates.length}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر المنطقة" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {governorates.map((governorate) => (
                    <SelectItem key={governorate.id} value={governorate.name}>
                      {governorate.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-primary-50">تاريخ الرحلة</label>
            <Input
              type="date"
              value={travelDate}
              onChange={(event) => setTravelDate(event.target.value)}
              disabled={isDisabled}
            />
          </div>

          <div className="flex items-end">
            <Button type="submit" className="w-full" disabled={isDisabled || !travelDate}>
              ابحث الآن
            </Button>
          </div>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'حجوزات فورية',
            description: 'نقدم لك خيارات متعددة للحجز السريع مع أفضل العروض.',
          },
          {
            title: 'خدمة العملاء 24/7',
            description: 'فريقنا جاهز دائماً لدعمك والإجابة على استفساراتك.',
          },
          {
            title: 'وجهات متنوعة',
            description: 'استكشف العديد من الوجهات السياحية داخل المملكة.',
          },
        ].map((feature) => (
          <div key={feature.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
