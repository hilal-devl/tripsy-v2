import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/user', label: 'لوحة المستخدم' },
  { to: '/admin', label: 'لوحة الإدارة' },
  { to: '/destinations', label: 'الوجهات' },
];

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="container flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="text-2xl font-bold text-primary-600">Tripsy</div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 transition hover:bg-primary-50 ${
                    isActive ? 'bg-primary-100 text-primary-700' : 'text-slate-700'
                  }`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="container flex-1 py-10">
        <Outlet />
      </main>
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Tripsy. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
};

export default Layout;
