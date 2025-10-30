# Tripsy

واجهة تجريبية مبنية بـ [Vite](https://vitejs.dev/) و[React 18](https://react.dev/) مع دعم RTL افتراضي باللغة العربية. المشروع يستخدم Tailwind CSS v4, React Router, TanStack Query و Recharts لعرض البيانات.

## المتطلبات

- Node.js 18 أو أحدث
- npm 9 أو أحدث

## البدء

```bash
npm install
npm run dev
```

يفتح الأمر الأخير الخادم المحلي عادة على `http://localhost:5173`.

## الأوامر المتاحة

| الأمر            | الوصف                                   |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | تشغيل بيئة التطوير.                     |
| `npm run build`  | إنشاء نسخة الإنتاج.                     |
| `npm run preview`| معاينة نسخة الإنتاج محلياً.             |
| `npm run lint`   | تشغيل ESLint للتحقق من جودة الشفرة.      |
| `npm run format` | تنسيق الملفات باستخدام Prettier.        |

## المتغيرات البيئية

يمكن ضبط الاتصال بخدمة Base44 عبر ملف `.env` داخل جذر المشروع:

```env
VITE_BASE44_URL="https://example.com/api"
VITE_BASE44_APP_ID="your-app-id"
VITE_BASE44_TOKEN="your-token"
```

في حال عدم ضبط المتغيرات السابقة سيتم استخدام بيانات وهمية مع محاكاة للتأخير ومعالجة الأخطاء.

## التراخيص

الكود متاح لأغراض الاختبار والتجربة.
