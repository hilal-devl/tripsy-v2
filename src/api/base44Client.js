const BASE_URL = import.meta.env.VITE_BASE44_URL;
const APP_ID = import.meta.env.VITE_BASE44_APP_ID;
const TOKEN = import.meta.env.VITE_BASE44_TOKEN;

const hasRemote = Boolean(BASE_URL && APP_ID && TOKEN);

const mockGovernorates = [
  {
    id: 'riyadh',
    name: 'منطقة الرياض',
    cities: ['الرياض', 'الخرج', 'وادي الدواسر'],
  },
  {
    id: 'makkah',
    name: 'منطقة مكة المكرمة',
    cities: ['مكة المكرمة', 'جدة', 'الطائف'],
  },
  {
    id: 'eastern',
    name: 'المنطقة الشرقية',
    cities: ['الدمام', 'الخبر', 'الأحساء'],
  },
];

const mockDestinations = [
  {
    id: '1',
    title: 'الطائف - مدينة الورود',
    description: 'استمتع بالطبيعة الجبلية والأجواء المعتدلة.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: '2',
    title: 'جدة التاريخية',
    description: 'اكتشف روعة البحر الأحمر والأسواق الشعبية.',
    image:
      'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: '3',
    title: 'العلا - أعجوبة الزمن',
    description: 'رحلة عبر التاريخ في قلب الصحراء.',
    image:
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=60',
  },
];

const mockBookings = [
  {
    id: 'b1',
    traveler: 'ليان الدوسري',
    governorate: 'منطقة الرياض',
    city: 'الرياض',
    date: '2024-11-05',
    status: 'مؤكد',
  },
  {
    id: 'b2',
    traveler: 'سلمان الشهري',
    governorate: 'منطقة مكة المكرمة',
    city: 'جدة',
    date: '2024-11-12',
    status: 'قيد المراجعة',
  },
];

const mockStats = {
  totalBookings: 128,
  activeTrips: 32,
  satisfaction: 4.7,
};

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));
const clone = (value) => JSON.parse(JSON.stringify(value));

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-App-Id': APP_ID,
    Authorization: `Bearer ${TOKEN}`,
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'تعذر الاتصال بخدمة Base44');
  }

  return response.json();
}

async function getGovernorates() {
  if (!hasRemote) {
    await delay();
    return clone(mockGovernorates);
  }

  return request('/governorates');
}

async function getDestinations() {
  if (!hasRemote) {
    await delay();
    return clone(mockDestinations);
  }

  return request('/destinations');
}

async function getBookings() {
  if (!hasRemote) {
    await delay();
    return clone(mockBookings);
  }

  return request('/bookings');
}

async function createBooking(payload) {
  if (!hasRemote) {
    await delay();
    const newBooking = {
      id: `mock-${Math.random().toString(36).slice(2, 8)}`,
      status: 'قيد المراجعة',
      ...payload,
    };
    mockBookings.unshift(newBooking);
    return newBooking;
  }

  return request('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function getAdminStats() {
  if (!hasRemote) {
    await delay();
    return { ...mockStats };
  }

  return request('/stats');
}

export const base44Client = {
  getGovernorates,
  getDestinations,
  getBookings,
  createBooking,
  getAdminStats,
};
