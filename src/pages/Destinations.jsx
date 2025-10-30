import { useQuery } from '@tanstack/react-query';
import { base44Client } from '@/api/base44Client.js';
import { TableEmpty } from '@/components/ui/table.jsx';

const Destinations = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['destinations'],
    queryFn: base44Client.getDestinations,
  });

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">وجهات مميزة</h1>
        <p className="mt-1 text-sm text-slate-500">اختر من بين أبرز الوجهات السياحية داخل المملكة.</p>
      </div>

      {isLoading && <p className="text-sm text-slate-500">جاري تحميل الوجهات...</p>}
      {isError && (
        <p className="text-sm text-red-600">
          {error?.message || 'حدث خطأ أثناء تحميل الوجهات.'}
        </p>
      )}

      {!isLoading && !isError && (!data || data.length === 0) && (
        <TableEmpty message="لم يتم العثور على وجهات في الوقت الحالي." />
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((destination) => (
            <article
              key={destination.id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {destination.image && (
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="text-lg font-semibold text-slate-900">{destination.title}</h2>
                <p className="flex-1 text-sm text-slate-600">{destination.description}</p>
                {destination.price && (
                  <p className="text-sm font-semibold text-primary-600">ابتداءً من {destination.price}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Destinations;
