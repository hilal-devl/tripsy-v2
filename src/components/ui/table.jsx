const Table = ({ className = '', children, ...props }) => (
  <div className="w-full overflow-x-auto">
    <table
      className={`min-w-full divide-y divide-slate-200 text-right text-sm text-slate-700 ${className}`}
      {...props}
    >
      {children}
    </table>
  </div>
);

const TableHeader = (props) => <thead className="bg-slate-100" {...props} />;
const TableBody = (props) => <tbody className="divide-y divide-slate-200 bg-white" {...props} />;
const TableFooter = (props) => <tfoot className="bg-slate-100" {...props} />;
const TableRow = ({ className = '', ...props }) => (
  <tr className={`transition hover:bg-primary-50/60 ${className}`} {...props} />
);
const TableHead = ({ className = '', ...props }) => (
  <th
    className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${className}`}
    {...props}
  />
);
const TableCell = ({ className = '', ...props }) => (
  <td className={`whitespace-nowrap px-4 py-3 text-sm text-slate-700 ${className}`} {...props} />
);
const TableCaption = ({ className = '', ...props }) => (
  <caption className={`caption-top pb-4 text-sm text-slate-500 ${className}`} {...props} />
);
const TableEmpty = ({ icon = '🗂️', message = 'لا توجد بيانات متاحة حالياً.' }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
    <div className="text-4xl">{icon}</div>
    <p className="mt-3 text-sm text-slate-500">{message}</p>
  </div>
);

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableEmpty,
};
