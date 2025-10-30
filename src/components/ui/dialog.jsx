import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

const DialogContext = createContext(null);

const Dialog = ({ children, open: openProp, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const setOpen = (value) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a <Dialog>');
  }
  return context;
};

const DialogTrigger = ({ children }) => {
  const { setOpen } = useDialog();
  return cloneElement(children, {
    onClick: (event) => {
      children.props?.onClick?.(event);
      setOpen(true);
    },
  });
};

const DialogPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};

const DialogContent = ({ className = '', children }) => {
  const { open, setOpen } = useDialog();

  if (!open) return null;

  return (
    <DialogPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
        onClick={() => setOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          className={`w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl focus:outline-none ${className}`}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </DialogPortal>
  );
};

const DialogHeader = ({ className = '', children }) => (
  <div className={`space-y-2 text-right ${className}`}>{children}</div>
);

const DialogTitle = ({ className = '', children }) => (
  <h2 className={`text-xl font-semibold text-slate-900 ${className}`}>{children}</h2>
);

const DialogDescription = ({ className = '', children }) => (
  <p className={`text-sm text-slate-500 ${className}`}>{children}</p>
);

const DialogFooter = ({ className = '', children }) => (
  <div className={`mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end ${className}`}>
    {children}
  </div>
);

const DialogClose = ({ asChild = false, children }) => {
  const { setOpen } = useDialog();

  if (asChild) {
    return cloneElement(children, {
      onClick: (event) => {
        children.props?.onClick?.(event);
        setOpen(false);
      },
    });
  }

  return (
    <button
      type="button"
      className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-100"
      onClick={() => setOpen(false)}
    >
      إغلاق
    </button>
  );
};

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};
